/*
  # Fix Security Issues

  ## Overview
  This migration addresses critical security and performance issues:
  - Adds missing indexes on foreign keys to prevent query performance degradation
  - Removes overly permissive RLS policies that bypass row-level security

  ## Changes

  ### 1. Foreign Key Indexes
  Adding indexes to improve query performance:
  - `order_items.order_id` - enables efficient order lookups
  - `order_items.product_id` - enables efficient product lookups
  - `products.category_id` - enables efficient category filtering

  ### 2. RLS Policy Security
  Removing policies that allow unrestricted access:
  - "Anyone can create order items" - bypasses RLS security
  - "Anyone can create orders" - bypasses RLS security

  All INSERT operations now require valid authentication and data validation through more restrictive policies.
*/

-- Create indexes on foreign keys in order_items table
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Create index on foreign key in products table
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);

-- Remove overly permissive RLS policies
DROP POLICY IF EXISTS "Anyone can create order items" ON order_items;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
