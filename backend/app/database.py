import psycopg2
from psycopg2.extras import RealDictCursor

def get_connection():
    """Создание подключения к базе данных"""
    return psycopg2.connect(
        dbname="bank_system",
        user="user",
        password="password",
        host="localhost",
        port=5432,
        cursor_factory=RealDictCursor,
    )
