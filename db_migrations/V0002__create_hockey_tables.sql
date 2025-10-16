-- Создание таблиц для хоккейного клуба

-- Таблица игроков
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number INTEGER NOT NULL,
    position VARCHAR(100) NOT NULL,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    height VARCHAR(50),
    weight VARCHAR(50),
    birth_date VARCHAR(50),
    nationality VARCHAR(100),
    image TEXT,
    is_captain BOOLEAN DEFAULT FALSE,
    is_assistant BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица матчей
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    date VARCHAR(50) NOT NULL,
    opponent VARCHAR(255) NOT NULL,
    score VARCHAR(20),
    status VARCHAR(100) DEFAULT 'Скоро',
    is_home BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица новостей
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    date VARCHAR(50) NOT NULL,
    image TEXT,
    excerpt TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных данных для игроков
INSERT INTO players (name, number, position, goals, assists, games_played, height, weight, birth_date, nationality, image, is_captain, is_assistant) VALUES
('Иванов Алексей', 7, 'Нападающий', 12, 8, 15, '185 см', '82 кг', '15.03.1998', 'Россия', 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400', TRUE, FALSE),
('Петров Дмитрий', 24, 'Защитник', 3, 10, 15, '188 см', '90 кг', '22.07.1995', 'Россия', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400', FALSE, TRUE),
('Сидоров Михаил', 91, 'Нападающий', 8, 6, 14, '180 см', '78 кг', '10.11.2000', 'Россия', 'https://images.unsplash.com/photo-1599190874213-0c6a0fc7e14f?w=400', FALSE, FALSE),
('Козлов Сергей', 1, 'Вратарь', 0, 1, 15, '183 см', '85 кг', '05.01.1997', 'Россия', 'https://images.unsplash.com/photo-1559947514-8a4c6e51aeb8?w=400', FALSE, TRUE);

-- Вставка начальных данных для матчей
INSERT INTO matches (date, opponent, score, status, is_home) VALUES
('16.10', 'Металлург', '5:3', 'Завершен', TRUE),
('18.10', 'Салават Юлаев', '', 'Скоро', FALSE),
('22.10', 'Ак Барс', '', 'Скоро', TRUE),
('25.10', 'Авангард', '2:4', 'Завершен', FALSE);

-- Вставка начальных данных для новостей
INSERT INTO news (title, date, image, excerpt, content) VALUES
('Победа над Металлургом!', '16 октября 2024', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=800', 'Наша команда одержала уверенную победу со счетом 5:3', 'Яркий матч завершился победой Сибирских Снайперов. Алексей Иванов оформил хет-трик, а вратарь Сергей Козлов отразил 28 бросков.'),
('Подготовка к выездному матчу', '14 октября 2024', 'https://images.unsplash.com/photo-1574607563950-540359d3c04e?w=800', 'Команда готовится к важной выездной игре против Салават Юлаев', 'Интенсивные тренировки и тактические разборы помогут команде показать лучший результат в предстоящем матче.'),
('Новое пополнение в составе', '10 октября 2024', 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800', 'К команде присоединился молодой талантливый защитник', 'Руководство клуба объявило о подписании контракта с перспективным игроком из молодежной лиги.');
