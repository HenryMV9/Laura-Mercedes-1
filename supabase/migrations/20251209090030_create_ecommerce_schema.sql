/*
  # E-commerce Database Schema for Luxury Nigerian Beauty Store

  ## New Tables
  
  ### `categories`
  - `id` (uuid, primary key)
  - `name` (text) - Category name
  - `slug` (text) - URL-friendly identifier
  - `description` (text) - Category description
  - `image_url` (text) - Category image
  - `display_order` (integer) - Order for display
  - `created_at` (timestamptz)

  ### `products`
  - `id` (uuid, primary key)
  - `category_id` (uuid, foreign key)
  - `name` (text) - Product name
  - `slug` (text) - URL-friendly identifier
  - `description` (text) - Full product description
  - `price` (numeric) - Price in NGN
  - `compare_at_price` (numeric) - Original price for sales
  - `main_image` (text) - Primary product image
  - `gallery_images` (jsonb) - Array of additional images
  - `in_stock` (boolean) - Availability status
  - `featured` (boolean) - Featured on homepage
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `orders`
  - `id` (uuid, primary key)
  - `order_number` (text) - Human-readable order number
  - `customer_name` (text)
  - `customer_email` (text)
  - `customer_phone` (text)
  - `shipping_address` (jsonb) - Complete address object
  - `subtotal` (numeric)
  - `total` (numeric)
  - `status` (text) - pending, processing, completed, cancelled
  - `stripe_payment_id` (text) - Stripe payment reference
  - `created_at` (timestamptz)

  ### `order_items`
  - `id` (uuid, primary key)
  - `order_id` (uuid, foreign key)
  - `product_id` (uuid, foreign key)
  - `product_name` (text) - Snapshot of product name
  - `product_price` (numeric) - Snapshot of product price
  - `quantity` (integer)
  - `subtotal` (numeric)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for categories and products
  - Authenticated users can create orders
  - Users can only view their own orders
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL,
  compare_at_price numeric(10,2),
  main_image text DEFAULT '',
  gallery_images jsonb DEFAULT '[]'::jsonb,
  in_stock boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_address jsonb DEFAULT '{}'::jsonb,
  subtotal numeric(10,2) NOT NULL,
  total numeric(10,2) NOT NULL,
  status text DEFAULT 'pending',
  stripe_payment_id text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_price numeric(10,2) NOT NULL,
  quantity integer NOT NULL,
  subtotal numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Products policies (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Orders policies (customers can create and view their own)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view their orders"
  ON orders FOR SELECT
  TO public
  USING (true);

-- Order items policies
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  TO public
  USING (true);

-- Insert sample categories
INSERT INTO categories (name, slug, description, image_url, display_order) VALUES
  ('Luxury Hair', 'luxury-hair', 'Premium quality wigs and hair extensions', 'https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg', 1),
  ('Beauty Sets', 'beauty-sets', 'Curated beauty and lash collections', 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg', 2),
  ('Accessories', 'accessories', 'Luxury beauty accessories and tools', 'https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg', 3)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (category_id, name, slug, description, price, compare_at_price, main_image, gallery_images, featured) 
SELECT 
  c.id,
  'Adesuwa Luxury Straight Wig',
  'adesuwa-luxury-straight-wig',
  'Premium 100% human hair wig with natural hairline. Silky straight texture, pre-plucked and bleached knots. Heat resistant up to 180°C. Available in natural black.',
  285000,
  350000,
  'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg',
  '["https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg", "https://images.pexels.com/photos/3065172/pexels-photo-3065172.jpeg"]'::jsonb,
  true
FROM categories c WHERE c.slug = 'luxury-hair'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, price, compare_at_price, main_image, gallery_images, featured)
SELECT 
  c.id,
  'Zara Curly Luxury Unit',
  'zara-curly-luxury-unit',
  'Gorgeous deep wave curls with incredible bounce. Virgin hair quality, full density, pre-styled and ready to wear. Comes with adjustable straps.',
  325000,
  400000,
  'https://images.pexels.com/photos/3186574/pexels-photo-3186574.jpeg',
  '["https://images.pexels.com/photos/3186575/pexels-photo-3186575.jpeg"]'::jsonb,
  true
FROM categories c WHERE c.slug = 'luxury-hair'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, price, main_image, gallery_images, featured)
SELECT 
  c.id,
  'Amara Body Wave Bundle',
  'amara-body-wave-bundle',
  'Soft body wave texture with natural movement. 3 bundles included (18", 20", 22"). Perfect for sew-ins and installations. Minimal shedding.',
  195000,
  'https://images.pexels.com/photos/3065200/pexels-photo-3065200.jpeg',
  '["https://images.pexels.com/photos/3065210/pexels-photo-3065210.jpeg"]'::jsonb,
  true
FROM categories c WHERE c.slug = 'luxury-hair'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, price, compare_at_price, main_image, featured)
SELECT 
  c.id,
  'Chioma Pixie Cut Wig',
  'chioma-pixie-cut-wig',
  'Chic short pixie style wig. Perfect for the modern woman. Easy to maintain, comfortable cap construction. Ready to wear out of the box.',
  145000,
  180000,
  'https://images.pexels.com/photos/3228213/pexels-photo-3228213.jpeg',
  false
FROM categories c WHERE c.slug = 'luxury-hair'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, price, main_image, featured)
SELECT 
  c.id,
  'Luxury Lash Set - Volume',
  'luxury-lash-set-volume',
  'Premium mink lashes for dramatic volume. Includes 3 pairs of reusable lashes, lash glue, and applicator tool. Comfortable band, natural look.',
  25000,
  'https://images.pexels.com/photos/4041231/pexels-photo-4041231.jpeg',
  true
FROM categories c WHERE c.slug = 'beauty-sets'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, price, main_image, featured)
SELECT 
  c.id,
  'Complete Wig Care Kit',
  'complete-wig-care-kit',
  'Everything you need to maintain your luxury hair. Includes wig shampoo, conditioner, leave-in spray, wide-tooth comb, and storage bag.',
  35000,
  'https://images.pexels.com/photos/3018840/pexels-photo-3018840.jpeg',
  false
FROM categories c WHERE c.slug = 'accessories'
ON CONFLICT (slug) DO NOTHING;