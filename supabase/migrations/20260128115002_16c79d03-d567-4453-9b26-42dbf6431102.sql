-- Fix 1: Create a public view for profiles with only safe fields
-- This prevents exposure of bio, website, location to unauthenticated users

CREATE VIEW public.profiles_public
WITH (security_invoker = on) AS
SELECT 
  id,
  full_name,
  avatar_url
FROM public.profiles;

-- Drop the overly permissive policy that exposes all profile data
DROP POLICY IF EXISTS "profiles_select_public_info" ON public.profiles;

-- Create a more restrictive policy: users can see their own full profile,
-- admins can see all profiles, others see nothing (use view instead)
CREATE POLICY "profiles_select_own_or_admin"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id 
  OR has_role(auth.uid(), 'admin')
);

-- Fix 2: Create audit log table for tracking sensitive data access
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  details jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "audit_logs_select_admin"
ON public.audit_logs
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Allow system to insert audit logs (for edge functions with service role)
CREATE POLICY "audit_logs_insert_service"
ON public.audit_logs
FOR INSERT
WITH CHECK (true);

-- Create index for efficient querying
CREATE INDEX idx_audit_logs_table_name ON public.audit_logs(table_name);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- Add comment explaining the security model
COMMENT ON VIEW public.profiles_public IS 'Public-safe view of profiles exposing only id, full_name, and avatar_url';
COMMENT ON TABLE public.audit_logs IS 'Tracks access to sensitive data like donations for security auditing';