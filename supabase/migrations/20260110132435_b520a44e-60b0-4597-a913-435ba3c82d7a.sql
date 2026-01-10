-- Create donations table to track all successful donations
CREATE TABLE public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  donor_name text,
  amount numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'KES',
  reference text UNIQUE NOT NULL,
  channel text,
  status text NOT NULL DEFAULT 'success',
  paid_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Admins can view all donations
CREATE POLICY "donations_select_admin" ON public.donations
FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow edge functions to insert donations (service role)
CREATE POLICY "donations_insert_service" ON public.donations
FOR INSERT WITH CHECK (true);

-- Admins can update donations
CREATE POLICY "donations_update_admin" ON public.donations
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete donations
CREATE POLICY "donations_delete_admin" ON public.donations
FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster lookups
CREATE INDEX idx_donations_reference ON public.donations(reference);
CREATE INDEX idx_donations_email ON public.donations(email);
CREATE INDEX idx_donations_created_at ON public.donations(created_at DESC);