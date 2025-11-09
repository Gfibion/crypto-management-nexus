-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company TEXT,
  role TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policies for testimonials
CREATE POLICY "testimonials_select_approved"
  ON public.testimonials
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "testimonials_insert_authenticated"
  ON public.testimonials
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "testimonials_update_own"
  ON public.testimonials
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "testimonials_select_admin"
  ON public.testimonials
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "testimonials_update_admin"
  ON public.testimonials
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "testimonials_delete_admin"
  ON public.testimonials
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));