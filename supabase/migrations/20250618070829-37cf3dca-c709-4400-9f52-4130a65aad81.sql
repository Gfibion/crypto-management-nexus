
-- Step 1: Clean up policies and functions only (avoid table locks)

-- Drop all existing RLS policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

DROP POLICY IF EXISTS "Published articles are viewable by everyone" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users can create articles" ON public.articles;
DROP POLICY IF EXISTS "Users can update their own articles" ON public.articles;
DROP POLICY IF EXISTS "Users can delete their own articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can insert articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can update all articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can delete articles" ON public.articles;
DROP POLICY IF EXISTS "articles_select_published" ON public.articles;
DROP POLICY IF EXISTS "articles_insert_authenticated" ON public.articles;
DROP POLICY IF EXISTS "articles_update_own_or_admin" ON public.articles;
DROP POLICY IF EXISTS "articles_delete_own_or_admin" ON public.articles;

DROP POLICY IF EXISTS "Users can view their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can create their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Admins can update any conversation" ON public.conversations;
DROP POLICY IF EXISTS "conversations_select_own_or_admin" ON public.conversations;
DROP POLICY IF EXISTS "conversations_insert_own" ON public.conversations;
DROP POLICY IF EXISTS "conversations_update_own" ON public.conversations;
DROP POLICY IF EXISTS "conversations_update_admin" ON public.conversations;

DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "chat_messages_select_conversation_member" ON public.chat_messages;
DROP POLICY IF EXISTS "chat_messages_insert_user" ON public.chat_messages;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_select_own" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_select_admin" ON public.user_roles;

DROP POLICY IF EXISTS "Services are viewable by everyone" ON public.services;
DROP POLICY IF EXISTS "services_select_all" ON public.services;

DROP POLICY IF EXISTS "Skills are viewable by everyone" ON public.skills;
DROP POLICY IF EXISTS "skills_select_all" ON public.skills;

DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
DROP POLICY IF EXISTS "projects_select_all" ON public.projects;

DROP POLICY IF EXISTS "Education is viewable by everyone" ON public.education;
DROP POLICY IF EXISTS "education_select_all" ON public.education;

DROP POLICY IF EXISTS "Anyone can create contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "contact_messages_insert_all" ON public.contact_messages;

DROP POLICY IF EXISTS "Users can view article likes" ON public.article_likes;
DROP POLICY IF EXISTS "Users can create their own article likes" ON public.article_likes;
DROP POLICY IF EXISTS "Users can delete their own article likes" ON public.article_likes;
DROP POLICY IF EXISTS "Anyone can view article likes" ON public.article_likes;
DROP POLICY IF EXISTS "Authenticated users can manage their article likes" ON public.article_likes;
DROP POLICY IF EXISTS "article_likes_select_all" ON public.article_likes;
DROP POLICY IF EXISTS "article_likes_insert_authenticated" ON public.article_likes;
DROP POLICY IF EXISTS "article_likes_update_own" ON public.article_likes;
DROP POLICY IF EXISTS "article_likes_delete_own" ON public.article_likes;

DROP POLICY IF EXISTS "Users can view comments" ON public.comments;
DROP POLICY IF EXISTS "Users can create their own comments" ON public.comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can view comments" ON public.comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.comments;
DROP POLICY IF EXISTS "comments_select_all" ON public.comments;
DROP POLICY IF EXISTS "comments_insert_authenticated" ON public.comments;
DROP POLICY IF EXISTS "comments_update_own" ON public.comments;
DROP POLICY IF EXISTS "comments_delete_own" ON public.comments;

DROP POLICY IF EXISTS "Users can view comment likes" ON public.comment_likes;
DROP POLICY IF EXISTS "Users can create their own comment likes" ON public.comment_likes;
DROP POLICY IF EXISTS "Users can delete their own comment likes" ON public.comment_likes;
DROP POLICY IF EXISTS "Anyone can view comment likes" ON public.comment_likes;
DROP POLICY IF EXISTS "Authenticated users can manage their comment likes" ON public.comment_likes;
DROP POLICY IF EXISTS "comment_likes_select_all" ON public.comment_likes;
DROP POLICY IF EXISTS "comment_likes_insert_authenticated" ON public.comment_likes;
DROP POLICY IF EXISTS "comment_likes_update_own" ON public.comment_likes;
DROP POLICY IF EXISTS "comment_likes_delete_own" ON public.comment_likes;

-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_conversation_last_message_trigger ON public.chat_messages;

DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.update_conversation_last_message() CASCADE;
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP FUNCTION IF EXISTS public.get_user_role(uuid) CASCADE;

-- Create security definer functions
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1;
$$;

-- Create user handling function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user')
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN new;
END;
$$;

-- Create conversation update function
CREATE OR REPLACE FUNCTION public.update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations 
  SET last_message_at = NEW.created_at,
      updated_at = now()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_conversation_last_message_trigger
  AFTER INSERT ON public.chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_last_message();

-- Create RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for articles
CREATE POLICY "articles_select_published" ON public.articles
  FOR SELECT USING (published = true OR auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "articles_insert_authenticated" ON public.articles
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "articles_update_own_or_admin" ON public.articles
  FOR UPDATE USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "articles_delete_own_or_admin" ON public.articles
  FOR DELETE USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for conversations
CREATE POLICY "conversations_select_own_or_admin" ON public.conversations
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "conversations_insert_own" ON public.conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "conversations_update_own" ON public.conversations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "conversations_update_admin" ON public.conversations
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for chat_messages
CREATE POLICY "chat_messages_select_conversation_member" ON public.chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations 
      WHERE conversations.id = chat_messages.conversation_id 
      AND (conversations.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "chat_messages_insert_user" ON public.chat_messages
  FOR INSERT WITH CHECK (
    (message_type = 'user' AND EXISTS (
      SELECT 1 FROM public.conversations 
      WHERE conversations.id = chat_messages.conversation_id 
      AND conversations.user_id = auth.uid()
    ))
    OR
    (message_type = 'admin' AND public.has_role(auth.uid(), 'admin'))
    OR
    (message_type = 'ai')
  );

-- Create RLS policies for user_roles
CREATE POLICY "user_roles_select_own" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_roles_select_admin" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for public tables
CREATE POLICY "services_select_all" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "skills_select_all" ON public.skills
  FOR SELECT USING (true);

CREATE POLICY "projects_select_all" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "education_select_all" ON public.education
  FOR SELECT USING (true);

CREATE POLICY "contact_messages_insert_all" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for article_likes
CREATE POLICY "article_likes_select_all" ON public.article_likes
  FOR SELECT USING (true);

CREATE POLICY "article_likes_insert_authenticated" ON public.article_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "article_likes_update_own" ON public.article_likes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "article_likes_delete_own" ON public.article_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for comments
CREATE POLICY "comments_select_all" ON public.comments
  FOR SELECT USING (true);

CREATE POLICY "comments_insert_authenticated" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "comments_update_own" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "comments_delete_own" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for comment_likes
CREATE POLICY "comment_likes_select_all" ON public.comment_likes
  FOR SELECT USING (true);

CREATE POLICY "comment_likes_insert_authenticated" ON public.comment_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "comment_likes_update_own" ON public.comment_likes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "comment_likes_delete_own" ON public.comment_likes
  FOR DELETE USING (auth.uid() = user_id);
