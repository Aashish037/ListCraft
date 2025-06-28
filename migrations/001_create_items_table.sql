-- Create items table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on name for faster searches
CREATE INDEX idx_items_name ON items(name);

-- Create an index on quantity for low stock queries
CREATE INDEX idx_items_quantity ON items(quantity);

-- Insert some sample data
INSERT INTO items (name, quantity, unit) VALUES
  ('Item A', 5, 'kg'),
  ('Item B', 2, 'dozen'),
  ('Item C', 10, 'pcs'),
  ('Item D', 1, 'liter'),
  ('Item E', 15, 'units');
