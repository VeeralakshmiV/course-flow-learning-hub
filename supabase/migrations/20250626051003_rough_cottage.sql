/*
  # Update RLS policies for admin-only user creation

  1. Security Changes
    - Remove user self-registration policy
    - Add admin-only user creation policy
    - Keep existing read/update policies for users
    - Add admin full access policy

  2. Changes
    - Only admins can create new user profiles
    - Users can still read and update their own profiles
    - Admins have full access to all profiles
*/

-- Drop existing INSERT policy for self-registration
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create policy for admin-only user creation
CREATE POLICY "Admins can create user profiles"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Add policy for admins to have full access to all profiles
CREATE POLICY "Admins can manage all profiles"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;