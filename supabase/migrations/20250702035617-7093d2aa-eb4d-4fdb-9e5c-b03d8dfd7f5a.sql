-- First, let's see existing users and then manually assign admin role
-- You'll need to replace 'your-email@example.com' with your actual email

-- This will assign admin role to the first user (you'll need to signup first, then run this)
-- Replace with your actual email after you signup
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role 
FROM auth.users 
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin'::app_role;