-- Создание таблиц для хранения данных сайта

-- Таблица игроков
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number INTEGER NOT NULL,
    position VARCHAR(100) NOT NULL,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    image TEXT,
    is_captain BOOLEAN DEFAULT FALSE,
    is_assistant BOOLEAN DEFAULT FALSE,
    height VARCHAR(50),
    weight VARCHAR(50),
    birth_date VARCHAR(50),
    nationality VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица матчей
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    date VARCHAR(50) NOT NULL,
    opponent VARCHAR(255) NOT NULL,
    is_home BOOLEAN DEFAULT TRUE,
    score VARCHAR(50) DEFAULT '-:-',
    status VARCHAR(50) DEFAULT 'Скоро',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица новостей
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date VARCHAR(50) NOT NULL,
    image TEXT,
    excerpt TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица турнирной таблицы
CREATE TABLE IF NOT EXISTS standings (
    id SERIAL PRIMARY KEY,
    place INTEGER NOT NULL,
    team VARCHAR(255) NOT NULL,
    games INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица продуктов магазина
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image TEXT,
    category VARCHAR(100),
    sizes TEXT, -- JSON массив размеров
    customizable BOOLEAN DEFAULT FALSE,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица покупок (бюджет пользователей)
CREATE TABLE IF NOT EXISTS user_budgets (
    id SERIAL PRIMARY KEY,
    user_identifier VARCHAR(255) UNIQUE NOT NULL, -- IP или ID пользователя
    total_spent INTEGER DEFAULT 0,
    last_purchase TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица истории покупок
CREATE TABLE IF NOT EXISTS purchase_history (
    id SERIAL PRIMARY KEY,
    user_identifier VARCHAR(255) NOT NULL,
    purchase_type VARCHAR(50) NOT NULL, -- 'ticket' или 'product'
    items TEXT NOT NULL, -- JSON с деталями покупки
    total_amount INTEGER NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица настроек сайта
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных данных игроков
INSERT INTO players (name, number, position, goals, assists, games_played, image, is_captain, is_assistant) VALUES
('KRASOTKIN', 33, 'Универсальный', 12, 18, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/01cb72fd-059f-42fa-a829-f343c951ff95.jpg', TRUE, FALSE),
('Lyzenkov', 86, 'Универсальный', 8, 15, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d0dc5e7d-fcae-4293-a50d-60cd61778d9a.jpg', FALSE, TRUE),
('Zetka', 8, 'Универсальный', 15, 12, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/54b0bb6d-95e0-40b1-9b51-b4510ea9889d.jpg', FALSE, TRUE),
('Swafare', 91, 'Универсальный', 10, 14, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/5285a795-21e8-4500-b4ea-3ca0d2e51f68.jpg', FALSE, FALSE),
('Mylnikov Nonprime', 20, 'Вратарь', 0, 2, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/59f77c68-28c5-4974-a009-6a37500196d4.jpg', FALSE, FALSE),
('Bardakov', 26, 'Универсальный', 6, 9, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/b44d808e-dcb2-47f8-86ca-38f9234e1d87.jpg', FALSE, FALSE),
('Bobrovskiy', 88, 'Вратарь', 0, 1, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/c6acb1cf-21bd-44d2-aae0-49739fbf1c9a.jpg', FALSE, FALSE),
('Martyska', 16, 'Универсальный', 7, 11, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/21adbbc8-83a8-451f-85b8-1bdbc6849ede.jpg', FALSE, FALSE),
('Maksimka', 72, 'Универсальный', 9, 10, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/9c4d93b4-56cc-4742-a055-9d0fb82ab3e9.jpg', FALSE, FALSE),
('Mishurov', 1, 'Универсальный', 5, 8, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/099efe08-5f23-401d-b466-9b148166e3b9.jpg', FALSE, FALSE),
('kenzo', 10, 'Универсальный', 18, 20, 0, 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/100e1e18-a675-41af-b1c4-4ee35fefb9fc.jpg', FALSE, TRUE);

-- Вставка начальных данных матчей
INSERT INTO matches (date, opponent, is_home, score, status) VALUES
('16.10', 'Академия Михайлова', TRUE, '-:-', 'Скоро'),
('17.10', 'Динамо Шинник', TRUE, '-:-', 'Скоро'),
('19.10', 'Магнитка', FALSE, '-:-', 'Скоро');

-- Вставка начальных новостей
INSERT INTO news (title, date, image, excerpt) VALUES
('Сибирские Снайперы готовятся к новому сезону', '15.10.2025', 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg', 'Команда провела интенсивные тренировки перед стартом сезона'),
('Новые игроки в составе команды', '14.10.2025', 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg', 'Руководство клуба объявило о подписании контрактов с новыми хоккеистами'),
('Билеты на первый матч уже в продаже', '13.10.2025', 'https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg', 'Не упустите возможность поддержать команду на домашней арене');