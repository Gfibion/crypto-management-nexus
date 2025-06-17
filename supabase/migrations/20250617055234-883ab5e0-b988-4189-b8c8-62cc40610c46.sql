
-- Fix missing RLS policies and constraints (with proper handling of existing policies)

-- Drop existing policies if they exist and recreate them properly
DROP POLICY IF EXISTS "Users can view article likes" ON public.article_likes;
DROP POLICY IF EXISTS "Users can create their own article likes" ON public.article_likes;
DROP POLICY IF EXISTS "Users can delete their own article likes" ON public.article_likes;

CREATE POLICY "Users can view article likes" ON public.article_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own article likes" ON public.article_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own article likes" ON public.article_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Handle comment_likes policies
DROP POLICY IF EXISTS "Users can view comment likes" ON public.comment_likes;
DROP POLICY IF EXISTS "Users can create their own comment likes" ON public.comment_likes;
DROP POLICY IF EXISTS "Users can delete their own comment likes" ON public.comment_likes;

CREATE POLICY "Users can view comment likes" ON public.comment_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own comment likes" ON public.comment_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comment likes" ON public.comment_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Handle comments policies
DROP POLICY IF EXISTS "Users can view comments" ON public.comments;
DROP POLICY IF EXISTS "Users can create their own comments" ON public.comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;

CREATE POLICY "Users can view comments" ON public.comments
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own comments" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

-- Add missing foreign key constraints (only if they don't exist)
DO $$ 
BEGIN
    -- Add article_likes foreign key
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'article_likes_article_id_fkey') THEN
        ALTER TABLE public.article_likes 
        ADD CONSTRAINT article_likes_article_id_fkey 
        FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;
    END IF;

    -- Add comment_likes foreign key
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'comment_likes_comment_id_fkey') THEN
        ALTER TABLE public.comment_likes 
        ADD CONSTRAINT comment_likes_comment_id_fkey 
        FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE;
    END IF;

    -- Add comments article foreign key
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'comments_article_id_fkey') THEN
        ALTER TABLE public.comments 
        ADD CONSTRAINT comments_article_id_fkey 
        FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;
    END IF;

    -- Add comments parent foreign key
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'comments_parent_id_fkey') THEN
        ALTER TABLE public.comments 
        ADD CONSTRAINT comments_parent_id_fkey 
        FOREIGN KEY (parent_id) REFERENCES public.comments(id) ON DELETE CASCADE;
    END IF;

    -- Add chat_messages foreign key
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'chat_messages_conversation_id_fkey') THEN
        ALTER TABLE public.chat_messages 
        ADD CONSTRAINT chat_messages_conversation_id_fkey 
        FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_article_likes_user_id ON public.article_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_article_likes_article_id ON public.article_likes(article_id);
CREATE INDEX IF NOT EXISTS idx_comment_likes_user_id ON public.comment_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_comment_likes_comment_id ON public.comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON public.comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON public.chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON public.conversations(user_id);

-- Add unique constraints where needed (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'unique_user_article_like') THEN
        ALTER TABLE public.article_likes 
        ADD CONSTRAINT unique_user_article_like 
        UNIQUE (user_id, article_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'unique_user_comment_like') THEN
        ALTER TABLE public.comment_likes 
        ADD CONSTRAINT unique_user_comment_like 
        UNIQUE (user_id, comment_id);
    END IF;
END $$;

-- Fix any missing NOT NULL constraints and defaults
ALTER TABLE public.skills 
ALTER COLUMN proficiency_level SET NOT NULL,
ALTER COLUMN proficiency_level SET DEFAULT 0;

-- Add check constraints for data validation (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'check_proficiency_level') THEN
        ALTER TABLE public.skills 
        ADD CONSTRAINT check_proficiency_level 
        CHECK (proficiency_level >= 0 AND proficiency_level <= 100);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'check_years_experience') THEN
        ALTER TABLE public.skills 
        ADD CONSTRAINT check_years_experience 
        CHECK (years_experience >= 0);
    END IF;
END $$;

-- Fix storage bucket setup
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO NOTHING;
