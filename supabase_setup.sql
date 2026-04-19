-- ==========================================
-- SUPABASE RESCUE & INITIALIZATION SCRIPT (V3)
-- ==========================================
-- This version is designed to be extremely resilient.

-- 1. CLEANUP
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. ENUM SETUP
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('guest', 'staff', 'receptionist', 'manager', 'admin');
    END IF;
EXCEPTION WHEN OTHERS THEN
    NULL;
END $$;

-- 3. CORE TABLES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  role user_role DEFAULT 'guest',
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SIMPLIFIED TRIGGER (Fail-Safe)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', 'Guest'), 'guest');
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- If this fails, the frontend will handle profile creation on first login
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RE-BIND
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. PERMISSIVE POLICIES (Ensures frontend can self-repair)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all select" ON public.profiles;
CREATE POLICY "Allow all select" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow user insert" ON public.profiles;
CREATE POLICY "Allow user insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Allow user update" ON public.profiles;
CREATE POLICY "Allow user update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 7. RE-INSERT INITIAL ROOMS (Example)
INSERT INTO public.rooms (name, description, price, image_url, is_popular)
VALUES ('Standard King', 'A serene escape featuring artisanal textures.', 180, 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800', true)
ON CONFLICT DO NOTHING;
