-- Create tickets table for seat booking
CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  match_id INTEGER NOT NULL,
  seat_number VARCHAR(10) NOT NULL,
  buyer_name VARCHAR(255) NOT NULL,
  buyer_phone VARCHAR(50) NOT NULL,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  price DECIMAL(10, 2) NOT NULL,
  UNIQUE(match_id, seat_number)
);

-- Create budget_transactions table for tracking all purchases
CREATE TABLE IF NOT EXISTS budget_transactions (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create shop_items table for merchandise
CREATE TABLE IF NOT EXISTS shop_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT,
  description TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial shop items
INSERT INTO shop_items (name, price, image, description) VALUES
('Майка домашняя', 2500.00, 'https://cdn.poehali.dev/files/5eafa8e1-7cd4-4959-927d-702849e9a9e9.jpg', 'Официальная домашняя майка команды'),
('Шарф болельщика', 800.00, 'https://cdn.poehali.dev/files/5eafa8e1-7cd4-4959-927d-702849e9a9e9.jpg', 'Шарф с логотипом команды'),
('Кепка', 1200.00, 'https://cdn.poehali.dev/files/5eafa8e1-7cd4-4959-927d-702849e9a9e9.jpg', 'Бейсболка с вышивкой');

-- Create streams table for match broadcasts
CREATE TABLE IF NOT EXISTS streams (
  id SERIAL PRIMARY KEY,
  match_id INTEGER,
  title VARCHAR(255) NOT NULL,
  stream_url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  scheduled_time TIMESTAMP NOT NULL,
  thumbnail TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
