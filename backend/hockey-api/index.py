import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления данными хоккейного клуба (игроки, матчи, новости)
    Args: event - dict с httpMethod, queryStringParameters, body
          context - объект с request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    path = params.get('path', '')
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            if path == 'players':
                cur.execute('SELECT * FROM players ORDER BY number')
                players = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'players': players}, default=str),
                    'isBase64Encoded': False
                }
            
            elif path == 'matches':
                cur.execute('SELECT * FROM matches ORDER BY id DESC')
                matches = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'matches': matches}, default=str),
                    'isBase64Encoded': False
                }
            
            elif path == 'news':
                cur.execute('SELECT * FROM news ORDER BY id DESC')
                news = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'news': news}, default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            if path == 'players':
                cur.execute('''
                    INSERT INTO players (name, number, position, goals, assists, games_played, height, weight, birth_date, nationality, image, is_captain, is_assistant)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING *
                ''', (
                    body_data.get('name'),
                    body_data.get('number'),
                    body_data.get('position'),
                    body_data.get('goals', 0),
                    body_data.get('assists', 0),
                    body_data.get('games_played', 0),
                    body_data.get('height'),
                    body_data.get('weight'),
                    body_data.get('birth_date'),
                    body_data.get('nationality'),
                    body_data.get('image'),
                    body_data.get('is_captain', False),
                    body_data.get('is_assistant', False)
                ))
                conn.commit()
                result = cur.fetchone()
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'player': result}, default=str),
                    'isBase64Encoded': False
                }
            
            elif path == 'matches':
                cur.execute('''
                    INSERT INTO matches (date, opponent, score, status, is_home)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING *
                ''', (
                    body_data.get('date'),
                    body_data.get('opponent'),
                    body_data.get('score', ''),
                    body_data.get('status', 'Скоро'),
                    body_data.get('is_home', True)
                ))
                conn.commit()
                result = cur.fetchone()
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'match': result}, default=str),
                    'isBase64Encoded': False
                }
            
            elif path == 'news':
                cur.execute('''
                    INSERT INTO news (title, date, image, excerpt, content)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING *
                ''', (
                    body_data.get('title'),
                    body_data.get('date'),
                    body_data.get('image'),
                    body_data.get('excerpt'),
                    body_data.get('content', '')
                ))
                conn.commit()
                result = cur.fetchone()
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'news': result}, default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            parts = path.split('/')
            
            if len(parts) == 2:
                entity_type = parts[0]
                entity_id = parts[1]
                
                if entity_type == 'players':
                    cur.execute('''
                        UPDATE players 
                        SET name=%s, number=%s, position=%s, goals=%s, assists=%s, 
                            games_played=%s, height=%s, weight=%s, birth_date=%s, 
                            nationality=%s, image=%s, is_captain=%s, is_assistant=%s
                        WHERE id=%s
                        RETURNING *
                    ''', (
                        body_data.get('name'),
                        body_data.get('number'),
                        body_data.get('position'),
                        body_data.get('goals', 0),
                        body_data.get('assists', 0),
                        body_data.get('games_played', 0),
                        body_data.get('height'),
                        body_data.get('weight'),
                        body_data.get('birth_date'),
                        body_data.get('nationality'),
                        body_data.get('image'),
                        body_data.get('is_captain', False),
                        body_data.get('is_assistant', False),
                        entity_id
                    ))
                    conn.commit()
                    result = cur.fetchone()
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'player': result}, default=str),
                        'isBase64Encoded': False
                    }
                
                elif entity_type == 'matches':
                    cur.execute('''
                        UPDATE matches 
                        SET date=%s, opponent=%s, score=%s, status=%s, is_home=%s
                        WHERE id=%s
                        RETURNING *
                    ''', (
                        body_data.get('date'),
                        body_data.get('opponent'),
                        body_data.get('score'),
                        body_data.get('status'),
                        body_data.get('is_home'),
                        entity_id
                    ))
                    conn.commit()
                    result = cur.fetchone()
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'match': result}, default=str),
                        'isBase64Encoded': False
                    }
                
                elif entity_type == 'news':
                    cur.execute('''
                        UPDATE news 
                        SET title=%s, date=%s, image=%s, excerpt=%s, content=%s
                        WHERE id=%s
                        RETURNING *
                    ''', (
                        body_data.get('title'),
                        body_data.get('date'),
                        body_data.get('image'),
                        body_data.get('excerpt'),
                        body_data.get('content'),
                        entity_id
                    ))
                    conn.commit()
                    result = cur.fetchone()
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'news': result}, default=str),
                        'isBase64Encoded': False
                    }
        
        elif method == 'DELETE':
            parts = path.split('/')
            
            if len(parts) == 2:
                entity_type = parts[0]
                entity_id = parts[1]
                
                if entity_type == 'players':
                    cur.execute('DELETE FROM players WHERE id=%s', (entity_id,))
                elif entity_type == 'matches':
                    cur.execute('DELETE FROM matches WHERE id=%s', (entity_id,))
                elif entity_type == 'news':
                    cur.execute('DELETE FROM news WHERE id=%s', (entity_id,))
                
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Not found'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
