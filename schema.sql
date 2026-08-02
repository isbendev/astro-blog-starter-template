-- Cloudflare D1 Database Schema for Sabor y Sazón Spanish Recipes Blog

CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  prep_time TEXT NOT NULL,
  cook_time TEXT NOT NULL,
  servings INTEGER DEFAULT 4,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  ingredients TEXT NOT NULL, -- JSON array string
  instructions TEXT NOT NULL, -- JSON array string
  featured INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipe_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'approved', -- 'approved', 'pending'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Initial site configuration
INSERT OR REPLACE INTO site_settings (key, value) VALUES 
('site_title', 'Sabor y Sazón | Recetas Españolas Tradicionales'),
('site_description', 'Descubre las mejores recetas de la cocina española tradicional: paella, tortilla de patatas, tapas, postres y secretos culinarios.'),
('adsense_pub_id', 'ca-pub-1234567890123456'),
('adsense_enabled', 'true');
