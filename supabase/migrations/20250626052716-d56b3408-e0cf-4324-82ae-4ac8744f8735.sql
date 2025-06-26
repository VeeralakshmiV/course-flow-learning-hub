
-- First, let's update the admin creation function to be more robust
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert admin profile only if it doesn't exist
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
