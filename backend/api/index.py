'''
Business: API для управления данными сайта хоккейного клуба и бюджетом пользователей
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with CORS headers
'''
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any, Optional

def get_db_connection():
    '''Создает подключение к базе данных'''
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    path: str = event.get('queryStringParameters', {}).get('path', '')
    
    # CORS headers
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json'
    }
    
    # Handle OPTIONS for CORS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': ''
        }
    
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # GET запросы
        if method == 'GET':
            # Получить всех игроков
            if path == 'players':
                cur.execute('SELECT * FROM players ORDER BY number')
                players = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'players': players}, default=str)
                }
            
            # Получить конкретного игрока
            elif path.startswith('players/'):
                player_id = path.split('/')[-1]
                cur.execute('SELECT * FROM players WHERE id = %s', (player_id,))
                player = cur.fetchone()
                if player:
                    return {
                        'statusCode': 200,
                        'headers': cors_headers,
                        'body': json.dumps({'player': player}, default=str)
                    }
                return {
                    'statusCode': 404,
                    'headers': cors_headers,
                    'body': json.dumps({'error': 'Player not found'})
                }
            
            # Получить все матчи
            elif path == 'matches':
                cur.execute('SELECT * FROM matches ORDER BY date')
                matches = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'matches': matches}, default=str)
                }
            
            # Получить все новости
            elif path == 'news':
                cur.execute('SELECT * FROM news ORDER BY date DESC')
                news = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'news': news}, default=str)
                }
            
            # Получить турнирную таблицу
            elif path == 'standings':
                cur.execute('SELECT * FROM standings ORDER BY place')
                standings = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'standings': standings}, default=str)
                }
            
            # Получить бюджет пользователя
            elif path == 'budget':
                user_id = event.get('headers', {}).get('X-User-Id', 'anonymous')
                cur.execute('SELECT * FROM user_budgets WHERE user_identifier = %s', (user_id,))
                budget = cur.fetchone()
                if budget:
                    return {
                        'statusCode': 200,
                        'headers': cors_headers,
                        'body': json.dumps({'budget': budget}, default=str)
                    }
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'budget': {'total_spent': 0}})
                }
        
        # POST запросы (создание и покупки)
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            # Покупка (обновление бюджета)
            if path == 'purchase':
                user_id = event.get('headers', {}).get('X-User-Id', 'anonymous')
                amount = body_data.get('amount', 0)
                purchase_type = body_data.get('type', 'ticket')
                items = json.dumps(body_data.get('items', []))
                
                # Проверяем существует ли бюджет
                cur.execute('SELECT * FROM user_budgets WHERE user_identifier = %s', (user_id,))
                existing = cur.fetchone()
                
                if existing:
                    # Обновляем существующий
                    new_total = existing['total_spent'] + amount
                    cur.execute(
                        'UPDATE user_budgets SET total_spent = %s, last_purchase = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE user_identifier = %s',
                        (new_total, user_id)
                    )
                else:
                    # Создаем новый
                    cur.execute(
                        'INSERT INTO user_budgets (user_identifier, total_spent, last_purchase) VALUES (%s, %s, CURRENT_TIMESTAMP)',
                        (user_id, amount)
                    )
                
                # Добавляем в историю покупок
                cur.execute(
                    'INSERT INTO purchase_history (user_identifier, purchase_type, items, total_amount) VALUES (%s, %s, %s, %s)',
                    (user_id, purchase_type, items, amount)
                )
                
                conn.commit()
                
                # Получаем обновленный бюджет
                cur.execute('SELECT * FROM user_budgets WHERE user_identifier = %s', (user_id,))
                budget = cur.fetchone()
                
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'success': True, 'budget': budget}, default=str)
                }
        
        # PUT запросы (обновление через админку)
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            
            # Обновить игрока
            if path.startswith('players/'):
                player_id = path.split('/')[-1]
                fields = []
                values = []
                
                for key, value in body_data.items():
                    if key != 'id':
                        fields.append(f'{key} = %s')
                        values.append(value)
                
                if fields:
                    values.append(player_id)
                    query = f'UPDATE players SET {", ".join(fields)}, updated_at = CURRENT_TIMESTAMP WHERE id = %s'
                    cur.execute(query, tuple(values))
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'success': True})
                }
            
            # Обновить матч
            elif path.startswith('matches/'):
                match_id = path.split('/')[-1]
                fields = []
                values = []
                
                for key, value in body_data.items():
                    if key != 'id':
                        fields.append(f'{key} = %s')
                        values.append(value)
                
                if fields:
                    values.append(match_id)
                    query = f'UPDATE matches SET {", ".join(fields)}, updated_at = CURRENT_TIMESTAMP WHERE id = %s'
                    cur.execute(query, tuple(values))
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'success': True})
                }
            
            # Обновить новость
            elif path.startswith('news/'):
                news_id = path.split('/')[-1]
                fields = []
                values = []
                
                for key, value in body_data.items():
                    if key != 'id':
                        fields.append(f'{key} = %s')
                        values.append(value)
                
                if fields:
                    values.append(news_id)
                    query = f'UPDATE news SET {", ".join(fields)}, updated_at = CURRENT_TIMESTAMP WHERE id = %s'
                    cur.execute(query, tuple(values))
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'success': True})
                }
        
        # DELETE запросы
        elif method == 'DELETE':
            # Удалить игрока
            if path.startswith('players/'):
                player_id = path.split('/')[-1]
                cur.execute('DELETE FROM players WHERE id = %s', (player_id,))
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'success': True})
                }
            
            # Удалить матч
            elif path.startswith('matches/'):
                match_id = path.split('/')[-1]
                cur.execute('DELETE FROM matches WHERE id = %s', (match_id,))
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'success': True})
                }
            
            # Удалить новость
            elif path.startswith('news/'):
                news_id = path.split('/')[-1]
                cur.execute('DELETE FROM news WHERE id = %s', (news_id,))
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'body': json.dumps({'success': True})
                }
        
        return {
            'statusCode': 404,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Not found'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': str(e)})
        }
    finally:
        if conn:
            conn.close()
