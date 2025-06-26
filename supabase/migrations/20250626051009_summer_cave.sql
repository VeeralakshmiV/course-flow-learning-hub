/*
  # Create default admin user

  1. New Data
    - Creates a default admin user for initial system access
    - Email: admin@system.com
    - Password: admin123 (should be changed after first login)
    - Role: admin

  Note: This is for initial setup only. In production, create admin through secure process.
*/

-- Insert default admin user (this will need to be done through Supabase Auth admin API)
-- This migration creates the profile entry, but the auth user needs to be created separately

-- First, we'll create a function to handle admin creation
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert admin profile with a known UUID
  -- In practice, you'll need to create the auth user first and use their actual UUID
  INSERT INTO profiles (id, email, name, role)
  VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'admin@system.com',
    'System Administrator',
    'admin'
  )
  ON CONFLICT (id) DO NOTHING;
END;
$$;

-- Note: You'll need to manually create the auth user through Supabase dashboard or admin API
-- with email: admin@system.com and password: admin123
-- Then update the profile ID above to match the actual auth user ID