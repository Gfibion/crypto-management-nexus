
-- Fix user registration issues by ensuring proper constraints and updating the trigger function

-- First, check if constraints exist and add them if they don't
DO $$ 
BEGIN
    -- Add primary key constraint to profiles if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'profiles' 
        AND constraint_type = 'PRIMARY KEY'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
    END IF;
    
    -- Add unique constraint to user_roles if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'user_roles' 
        AND constraint_name = 'user_roles_user_id_unique'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_unique UNIQUE (user_id);
    END IF;
END $$;

-- Update the handle_new_user function to handle conflicts properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles with proper conflict handling
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = now();
  
  -- Insert into user_roles with proper conflict handling  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user'::app_role)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN new;
END;
$$;

-- Recreate the trigger to ensure it's working properly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
