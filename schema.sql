-- =========================================================
-- MYPORTOFOLIO DATABASE SCHEMA MIGRATION SCRIPT
-- Kompatibel 100% untuk PostgreSQL (pgAdmin) & Supabase
-- =========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL ADMIN USERS (Kredensial Admin Dashboard)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Default Admin (username: admin, password: admin)
INSERT INTO public.admin_users (username, password, email)
VALUES ('admin', 'admin', 'admin@example.com')
ON CONFLICT (username) DO NOTHING;

-- 3. TABEL CATEGORIES (Kategori Proyek)
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY DEFAULT ('c_' || extract(epoch from now())::bigint::text),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABEL PROJECTS (Proyek Portofolio)
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY DEFAULT ('p_' || extract(epoch from now())::bigint::text),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    full_description TEXT,
    category TEXT,
    tech JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    live_link TEXT DEFAULT '',
    github_link TEXT DEFAULT '',
    cover_image TEXT DEFAULT '',
    images JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABEL SKILLS (Keahlian Teknis)
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY DEFAULT ('s_' || extract(epoch from now())::bigint::text),
    name TEXT NOT NULL,
    logo_url TEXT DEFAULT '',
    category TEXT DEFAULT 'Skills',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABEL EXPERIENCES (Pengalaman Kerja)
CREATE TABLE IF NOT EXISTS public.experiences (
    id TEXT PRIMARY KEY DEFAULT ('exp_' || extract(epoch from now())::bigint::text),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT DEFAULT '',
    period TEXT NOT NULL,
    start_date TEXT DEFAULT '',
    end_date TEXT DEFAULT '',
    is_present BOOLEAN DEFAULT false,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    tech JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. SET ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid duplicate errors on re-run
DROP POLICY IF EXISTS "Allow public select on admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow public all on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public all on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow public all on skills" ON public.skills;
DROP POLICY IF EXISTS "Allow public all on experiences" ON public.experiences;

-- Kebijakan Akses Publik (Select, Insert, Update, Delete)
CREATE POLICY "Allow public select on admin_users" ON public.admin_users FOR SELECT USING (true);
CREATE POLICY "Allow public all on categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on experiences" ON public.experiences FOR ALL USING (true) WITH CHECK (true);

-- 8. GRANT PRIVILEGES (Standar PostgreSQL pgAdmin & Supabase)
GRANT ALL ON public.admin_users TO PUBLIC;
GRANT ALL ON public.categories TO PUBLIC;
GRANT ALL ON public.projects TO PUBLIC;
GRANT ALL ON public.skills TO PUBLIC;
GRANT ALL ON public.experiences TO PUBLIC;

-- Safe Grant Khusus Supabase Role (Hanya dieksekusi jika role 'authenticated' ada di database)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
        EXECUTE 'GRANT ALL ON public.admin_users TO anon, authenticated, service_role';
        EXECUTE 'GRANT ALL ON public.categories TO anon, authenticated, service_role';
        EXECUTE 'GRANT ALL ON public.projects TO anon, authenticated, service_role';
        EXECUTE 'GRANT ALL ON public.skills TO anon, authenticated, service_role';
        EXECUTE 'GRANT ALL ON public.experiences TO anon, authenticated, service_role';
    END IF;
END $$;
