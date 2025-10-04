-- Create media_assets table to store all site media
-- Run this in Supabase SQL Editor

create table if not exists public.media_assets (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  url text not null,
  alt_text text,
  type text not null check (type in ('logo', 'avatar', 'icon', 'slideshow', 'og_image', 'screenshot')),
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.media_assets enable row level security;

-- Allow public read access to media assets
create policy "Media assets are publicly readable"
  on public.media_assets for select
  using (true);

-- Allow authenticated users to manage media assets
create policy "Authenticated users can manage media assets"
  on public.media_assets for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create indexes
create index if not exists media_assets_key_idx on public.media_assets(key);
create index if not exists media_assets_type_idx on public.media_assets(type);

-- Insert initial media assets
insert into public.media_assets (key, url, alt_text, type, metadata) values
  ('logo_main', '/lovable-uploads/91d89c08-ff38-450a-b2a5-543fb578f2d3.png', 'Gfibion Genesis - Venturing half future life', 'logo', '{"usage": "main_logo"}'),
  ('icon_pwa', '/lovable-uploads/8b735fe1-3282-48d6-9daa-a0e5ecb43911.png', 'Gfibion Joseph Mutua', 'icon', '{"usage": "pwa_icon"}'),
  ('avatar_profile', '/lovable-uploads/e3e47c12-8857-4731-b46f-75afe5159159.png', 'Gfibion Joseph Mutua', 'avatar', '{"usage": "profile_header"}'),
  ('slideshow_1', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'Strategic Business Management', 'slideshow', '{"title": "Strategic Business Management", "description": "Fresh perspective on modern business solutions and strategic thinking", "order": 1}'),
  ('slideshow_2', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'Technology Integration', 'slideshow', '{"title": "Technology Integration", "description": "Bridging traditional business with cutting-edge technology solutions", "order": 2}'),
  ('slideshow_3', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'Digital Innovation', 'slideshow', '{"title": "Digital Innovation", "description": "Leveraging emerging technologies for business transformation", "order": 3}'),
  ('slideshow_4', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'Professional Development', 'slideshow', '{"title": "Professional Development", "description": "Continuous learning and adaptation in the evolving business landscape", "order": 4}')
on conflict (key) do nothing;
