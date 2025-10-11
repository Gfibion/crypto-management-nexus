-- Add featured_image column to articles table
-- Run this SQL in your Supabase SQL Editor (Cloud tab -> SQL Editor)

ALTER TABLE articles ADD COLUMN IF NOT EXISTS featured_image TEXT;

COMMENT ON COLUMN articles.featured_image IS 'URL to the featured image for the article (uploaded or external URL)';
