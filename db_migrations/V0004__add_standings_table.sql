-- Create standings table for tournament table management
CREATE TABLE IF NOT EXISTS standings (
  id SERIAL PRIMARY KEY,
  place INTEGER NOT NULL,
  team VARCHAR(255) NOT NULL,
  games INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  logo TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial standings data
INSERT INTO standings (place, team, games, wins, losses, points) VALUES
(1, 'Сибирские Снайперы', 10, 8, 2, 24),
(2, 'Северные Волки', 10, 7, 3, 21),
(3, 'Уральские Медведи', 10, 6, 4, 18),
(4, 'Алтайские Орлы', 10, 5, 5, 15);
