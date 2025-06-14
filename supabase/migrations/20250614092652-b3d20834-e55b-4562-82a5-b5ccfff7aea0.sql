
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create articles table for blog posts
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  slug TEXT UNIQUE NOT NULL,
  read_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  price_range TEXT,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency_level INTEGER CHECK (proficiency_level >= 0 AND proficiency_level <= 100),
  years_experience INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create projects table for portfolio
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[],
  project_url TEXT,
  github_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'completed',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create education table
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_year INTEGER,
  end_year INTEGER,
  description TEXT,
  grade TEXT,
  achievements TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  replied BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create articles policies (public read, authenticated write)
CREATE POLICY "Published articles are viewable by everyone" ON public.articles
  FOR SELECT USING (published = true OR auth.uid() = author_id);

CREATE POLICY "Authenticated users can create articles" ON public.articles
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own articles" ON public.articles
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own articles" ON public.articles
  FOR DELETE USING (auth.uid() = author_id);

-- Create public read policies for other tables
CREATE POLICY "Services are viewable by everyone" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "Skills are viewable by everyone" ON public.skills
  FOR SELECT USING (true);

CREATE POLICY "Projects are viewable by everyone" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Education is viewable by everyone" ON public.education
  FOR SELECT USING (true);

-- Contact messages policy (only authenticated users can create)
CREATE POLICY "Anyone can create contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert some sample data for services
INSERT INTO public.services (title, description, icon, featured, active) VALUES
('Business Consulting', 'Strategic business planning and operational optimization for modern enterprises', 'briefcase', true, true),
('Crypto Advisory', 'Expert guidance on cryptocurrency investments and blockchain technology integration', 'bitcoin', true, true),
('Tech Solutions', 'Custom technology solutions and digital transformation consulting', 'laptop', true, true),
('Web3 Integration', 'Seamless integration of Web3 technologies into traditional business models', 'globe', false, true);

-- Insert sample skills data
INSERT INTO public.skills (name, category, proficiency_level, years_experience) VALUES
('Business Strategy', 'Management', 95, 8),
('Project Management', 'Management', 90, 7),
('Team Leadership', 'Management', 88, 6),
('JavaScript', 'ICT', 85, 5),
('Python', 'ICT', 80, 4),
('React', 'ICT', 85, 3),
('Node.js', 'ICT', 75, 3),
('Blockchain Development', 'Blockchain', 90, 4),
('Smart Contracts', 'Blockchain', 85, 3),
('DeFi Protocols', 'Blockchain', 80, 2),
('Cryptocurrency Trading', 'Blockchain', 88, 5);

-- Insert sample education data
INSERT INTO public.education (institution, degree, field_of_study, start_year, end_year, description) VALUES
('University of Technology', 'Master of Business Administration', 'Business Management', 2018, 2020, 'Specialized in strategic management and digital transformation'),
('Tech Institute', 'Bachelor of Science', 'Computer Science', 2014, 2018, 'Focus on software development and information systems'),
('Blockchain Academy', 'Professional Certificate', 'Blockchain Technology', 2021, 2021, 'Comprehensive training in blockchain development and cryptocurrency');
