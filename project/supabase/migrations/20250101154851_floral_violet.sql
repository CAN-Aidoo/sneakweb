/*
  # Initial Schema Setup for Sixteen Pro

  1. New Tables
    - brands: Store brand information
    - products: Main product information
    - product_variants: Size and color variants
    - product_images: Product image gallery
  
  2. Security
    - Enable RLS on all tables
    - Public read access for all tables
    - Write access for authenticated users with admin role
*/

-- Create user roles enum
CREATE TYPE user_role AS ENUM ('admin', 'user');

-- Add role column to auth.users
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'user';

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  discount_price decimal(10,2),
  brand_id uuid REFERENCES brands(id),
  category text NOT NULL,
  materials text[],
  care_instructions text[],
  rating decimal(2,1),
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  size text NOT NULL,
  color_name text NOT NULL,
  color_hex text NOT NULL,
  image_url text,
  stock_quantity integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product images table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  url text NOT NULL,
  alt_text text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on brands" ON brands
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on products" ON products
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on product_variants" ON product_variants
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on product_images" ON product_images
  FOR SELECT TO public USING (true);

-- Create policies for authenticated write access
CREATE POLICY "Allow authenticated write access on brands" ON brands
  FOR ALL TO authenticated USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Allow authenticated write access on products" ON products
  FOR ALL TO authenticated USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Allow authenticated write access on product_variants" ON product_variants
  FOR ALL TO authenticated USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Allow authenticated write access on product_images" ON product_images
  FOR ALL TO authenticated USING (
    auth.jwt() ->> 'role' = 'admin'
  );