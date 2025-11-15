-- Add category and features columns to services table if they don't exist
ALTER TABLE public.services
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Business Management',
ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- Update RLS policy for services to still show active services
DROP POLICY IF EXISTS "Services are viewable by everyone" ON public.services;

CREATE POLICY "Services are viewable by everyone" ON public.services
  FOR SELECT USING (active = true OR active IS NULL);

-- Add policies for authenticated users to manage services (admin via role-based access in app)
CREATE POLICY "Services can be inserted" ON public.services
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Services can be updated" ON public.services
  FOR UPDATE USING (true);

CREATE POLICY "Services can be deleted" ON public.services
  FOR DELETE USING (true);
