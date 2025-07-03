-- Fix RLS policies to allow admins to view all profiles and user roles
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "user_roles_select_own" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_select_admin" ON public.user_roles;

-- Create new policies for profiles that allow admins to see all users
CREATE POLICY "profiles_select_own_or_admin" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id OR has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update any profile
CREATE POLICY "profiles_update_own_or_admin" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id OR has_role(auth.uid(), 'admin'::app_role));

-- Create comprehensive user_roles policies
CREATE POLICY "user_roles_select_own_or_admin" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "user_roles_insert_admin" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "user_roles_update_admin" 
ON public.user_roles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "user_roles_delete_admin" 
ON public.user_roles 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to manage content tables
CREATE POLICY "projects_insert_admin" 
ON public.projects 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "projects_update_admin" 
ON public.projects 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "projects_delete_admin" 
ON public.projects 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "services_insert_admin" 
ON public.services 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "services_update_admin" 
ON public.services 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "services_delete_admin" 
ON public.services 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "skills_insert_admin" 
ON public.skills 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "skills_update_admin" 
ON public.skills 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "skills_delete_admin" 
ON public.skills 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "education_insert_admin" 
ON public.education 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "education_update_admin" 
ON public.education 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "education_delete_admin" 
ON public.education 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to view and manage contact messages
CREATE POLICY "contact_messages_select_admin" 
ON public.contact_messages 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "contact_messages_update_admin" 
ON public.contact_messages 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "contact_messages_delete_admin" 
ON public.contact_messages 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));