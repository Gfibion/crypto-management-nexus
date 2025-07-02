-- Assign admin role to the user with email gfibiongenesis@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role 
FROM auth.users 
WHERE email = 'gfibiongenesis@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin'::app_role;