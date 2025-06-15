
-- Create only the missing storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('project-images', 'project-images', true),
  ('article-images', 'article-images', true),
  ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Policies for project-images bucket
CREATE POLICY "Anyone can view project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'project-images' AND 
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can update project images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'project-images' AND 
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can delete project images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'project-images' AND 
    auth.uid() IS NOT NULL
  );

-- Policies for article-images bucket
CREATE POLICY "Anyone can view article images" ON storage.objects
  FOR SELECT USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload article images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'article-images' AND 
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can update article images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'article-images' AND 
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can delete article images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'article-images' AND 
    auth.uid() IS NOT NULL
  );

-- Policies for documents bucket (private)
CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload their own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
