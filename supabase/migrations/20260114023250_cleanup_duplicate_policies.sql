/*
  # Cleanup Duplicate RLS Policies

  ## Changes
  
  Remove duplicate policies that were created during migration attempts:
  
  ### Orders Table
  - Remove "Users can create orders with valid info" (duplicate of "Allow order creation with valid data")
  
  ### Order Items Table  
  - Remove "Allow order item creation for valid orders" (less restrictive than "Users can create order items for valid orders")
  - Keep the more restrictive policy that validates product_id, quantity, and subtotal
*/

-- Remove duplicate order policy
DROP POLICY IF EXISTS "Users can create orders with valid info" ON orders;

-- Remove less restrictive order items policy
DROP POLICY IF EXISTS "Allow order item creation for valid orders" ON order_items;
