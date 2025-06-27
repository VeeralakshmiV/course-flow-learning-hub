
-- Fix the profiles table RLS policies to prevent infinite recursion
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Create proper RLS policies for profiles table
CREATE POLICY "Enable read access for users to their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Add RLS policies for courses table
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" 
ON public.courses FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Enable insert for authenticated users" 
ON public.courses FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" 
ON public.courses FOR UPDATE 
TO authenticated 
USING (true);

-- Add RLS policies for course_sections table
ALTER TABLE public.course_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" 
ON public.course_sections FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Enable insert for authenticated users" 
ON public.course_sections FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" 
ON public.course_sections FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Enable delete for authenticated users" 
ON public.course_sections FOR DELETE 
TO authenticated 
USING (true);

-- Add RLS policies for course_content table
ALTER TABLE public.course_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" 
ON public.course_content FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Enable insert for authenticated users" 
ON public.course_content FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" 
ON public.course_content FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Enable delete for authenticated users" 
ON public.course_content FOR DELETE 
TO authenticated 
USING (true);
