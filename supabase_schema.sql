-- ====================================================================
-- INDIAS KESAR CUSTOM STOREFRONT DATABASE SCHEMA
-- Copy and paste this directly into your Supabase Dashboard -> SQL Editor
-- Click "Run" to establish the database structures!
-- ====================================================================

-- 1. Create Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  weight VARCHAR(50) NOT NULL,          -- e.g. "1 Gram", "5 Gram"
  original_price NUMERIC NOT NULL,      -- Strikethrough price (e.g., 1750)
  price NUMERIC NOT NULL,               -- Selling price (e.g., 1000)
  benefits TEXT[] NOT NULL,             -- List of benefits for checkout
  images TEXT[] NOT NULL,               -- Array of image URLs/placeholders
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  razorpay_order_id VARCHAR(255) UNIQUE NOT NULL,
  razorpay_payment_id VARCHAR(255),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  shipping_address TEXT NOT NULL,
  product_details VARCHAR(500) NOT NULL, -- Description of purchase contents
  amount_paid NUMERIC NOT NULL,
  status VARCHAR(50) DEFAULT 'paid',     -- 'paid', 'shipped', 'delivered'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
