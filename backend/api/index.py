'''
Business: API для управления хоккейным клубом с билетами, бюджетом, трансляциями
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with CORS headers
'''
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    '''Создает подключение к базе данных'''
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    path: str = event.get('queryStringParameters', {}).get('path', '')
    
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json'
    }
    
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}
    
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        if method == 'GET':
            if path == 'players':
                cur.execute('SELECT * FROM players ORDER BY number')
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'players': cur.fetchall()}, default=str)}
            
            elif path == 'matches':
                cur.execute('SELECT * FROM matches ORDER BY date')
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'matches': cur.fetchall()}, default=str)}
            
            elif path == 'news':
                cur.execute('SELECT * FROM news ORDER BY date DESC')
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'news': cur.fetchall()}, default=str)}
            
            elif path == 'tickets':
                match_id = event.get('queryStringParameters', {}).get('match_id')
                if match_id:
                    cur.execute('SELECT seat_number FROM tickets WHERE match_id = %s', (match_id,))
                    booked = [row['seat_number'] for row in cur.fetchall()]
                    return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'booked_seats': booked})}
                return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'match_id required'})}
            
            elif path == 'budget':
                cur.execute('SELECT * FROM budget_transactions ORDER BY transaction_date DESC')
                transactions = cur.fetchall()
                cur.execute('SELECT SUM(amount) as total FROM budget_transactions WHERE type = %s', ('income',))
                income = cur.fetchone()['total'] or 0
                cur.execute('SELECT SUM(amount) as total FROM budget_transactions WHERE type = %s', ('expense',))
                expense = cur.fetchone()['total'] or 0
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({
                    'transactions': transactions,
                    'total_income': float(income),
                    'total_expense': float(expense),
                    'balance': float(income - expense)
                }, default=str)}
            
            elif path == 'shop':
                cur.execute('SELECT * FROM shop_items WHERE available = true')
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'items': cur.fetchall()}, default=str)}
            
            elif path == 'streams':
                cur.execute('SELECT * FROM streams ORDER BY scheduled_time DESC')
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'streams': cur.fetchall()}, default=str)}
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            if path == 'players':
                cur.execute(
                    'INSERT INTO players (name, number, position, photo, bio) VALUES (%s, %s, %s, %s, %s) RETURNING *',
                    (body_data['name'], body_data['number'], body_data['position'], body_data.get('photo'), body_data.get('bio', ''))
                )
                conn.commit()
                return {'statusCode': 201, 'headers': cors_headers, 'body': json.dumps({'player': cur.fetchone()}, default=str)}
            
            elif path == 'matches':
                cur.execute(
                    'INSERT INTO matches (opponent, date, time, location, status, score) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *',
                    (body_data['opponent'], body_data['date'], body_data['time'], body_data['location'], body_data.get('status', 'upcoming'), body_data.get('score'))
                )
                conn.commit()
                return {'statusCode': 201, 'headers': cors_headers, 'body': json.dumps({'match': cur.fetchone()}, default=str)}
            
            elif path == 'news':
                cur.execute(
                    'INSERT INTO news (title, date, image, excerpt, content) VALUES (%s, %s, %s, %s, %s) RETURNING *',
                    (body_data['title'], body_data['date'], body_data['image'], body_data['excerpt'], body_data.get('content', ''))
                )
                conn.commit()
                return {'statusCode': 201, 'headers': cors_headers, 'body': json.dumps({'news': cur.fetchone()}, default=str)}
            
            elif path == 'tickets':
                try:
                    cur.execute(
                        'INSERT INTO tickets (match_id, seat_number, buyer_name, buyer_phone, price) VALUES (%s, %s, %s, %s, %s) RETURNING *',
                        (body_data['match_id'], body_data['seat_number'], body_data['buyer_name'], body_data['buyer_phone'], body_data['price'])
                    )
                    ticket = cur.fetchone()
                    
                    cur.execute(
                        'INSERT INTO budget_transactions (type, description, amount, category) VALUES (%s, %s, %s, %s)',
                        ('income', f'Продажа билета на место {body_data["seat_number"]}', body_data['price'], 'tickets')
                    )
                    
                    conn.commit()
                    return {'statusCode': 201, 'headers': cors_headers, 'body': json.dumps({'ticket': ticket}, default=str)}
                except psycopg2.IntegrityError:
                    conn.rollback()
                    return {'statusCode': 409, 'headers': cors_headers, 'body': json.dumps({'error': 'Seat already booked'})}
            
            elif path == 'budget':
                cur.execute(
                    'INSERT INTO budget_transactions (type, description, amount, category) VALUES (%s, %s, %s, %s) RETURNING *',
                    (body_data['type'], body_data['description'], body_data['amount'], body_data['category'])
                )
                conn.commit()
                return {'statusCode': 201, 'headers': cors_headers, 'body': json.dumps({'transaction': cur.fetchone()}, default=str)}
            
            elif path == 'shop-purchase':
                cur.execute(
                    'INSERT INTO budget_transactions (type, description, amount, category) VALUES (%s, %s, %s, %s)',
                    ('income', f'Покупка в магазине: {body_data["item_name"]}', body_data['amount'], 'merchandise')
                )
                conn.commit()
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'success': True})}
            
            elif path == 'streams':
                cur.execute(
                    'INSERT INTO streams (match_id, title, stream_url, status, scheduled_time, thumbnail) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *',
                    (body_data.get('match_id'), body_data['title'], body_data['stream_url'], body_data.get('status', 'scheduled'), body_data['scheduled_time'], body_data.get('thumbnail'))
                )
                conn.commit()
                return {'statusCode': 201, 'headers': cors_headers, 'body': json.dumps({'stream': cur.fetchone()}, default=str)}
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            
            if path.startswith('players/'):
                player_id = path.split('/')[-1]
                fields = [f'{k} = %s' for k in body_data if k != 'id']
                values = [v for k, v in body_data.items() if k != 'id'] + [player_id]
                cur.execute(f'UPDATE players SET {", ".join(fields)} WHERE id = %s', tuple(values))
                conn.commit()
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'success': True})}
            
            elif path.startswith('matches/'):
                match_id = path.split('/')[-1]
                fields = [f'{k} = %s' for k in body_data if k != 'id']
                values = [v for k, v in body_data.items() if k != 'id'] + [match_id]
                cur.execute(f'UPDATE matches SET {", ".join(fields)} WHERE id = %s', tuple(values))
                conn.commit()
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'success': True})}
            
            elif path.startswith('news/'):
                news_id = path.split('/')[-1]
                fields = [f'{k} = %s' for k in body_data if k != 'id']
                values = [v for k, v in body_data.items() if k != 'id'] + [news_id]
                cur.execute(f'UPDATE news SET {", ".join(fields)} WHERE id = %s', tuple(values))
                conn.commit()
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'success': True})}
            
            elif path.startswith('streams/'):
                stream_id = path.split('/')[-1]
                fields = [f'{k} = %s' for k in body_data if k != 'id']
                values = [v for k, v in body_data.items() if k != 'id'] + [stream_id]
                cur.execute(f'UPDATE streams SET {", ".join(fields)} WHERE id = %s', tuple(values))
                conn.commit()
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'success': True})}
        
        elif method == 'DELETE':
            if path.startswith('players/'):
                cur.execute('DELETE FROM players WHERE id = %s', (path.split('/')[-1],))
                conn.commit()
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'success': True})}
            
            elif path.startswith('matches/'):
                cur.execute('DELETE FROM matches WHERE id = %s', (path.split('/')[-1],))
                conn.commit()
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'success': True})}
            
            elif path.startswith('news/'):
                cur.execute('DELETE FROM news WHERE id = %s', (path.split('/')[-1],))
                conn.commit()
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'success': True})}
            
            elif path.startswith('budget/'):
                cur.execute('DELETE FROM budget_transactions WHERE id = %s', (path.split('/')[-1],))
                conn.commit()
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'success': True})}
            
            elif path.startswith('streams/'):
                cur.execute('DELETE FROM streams WHERE id = %s', (path.split('/')[-1],))
                conn.commit()
                return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'success': True})}
        
        return {'statusCode': 404, 'headers': cors_headers, 'body': json.dumps({'error': 'Not found'})}
    
    except Exception as e:
        if conn:
            conn.rollback()
        return {'statusCode': 500, 'headers': cors_headers, 'body': json.dumps({'error': str(e)})}
    
    finally:
        if conn:
            conn.close()
