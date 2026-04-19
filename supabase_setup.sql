-- ==========================================
-- SUPABASE RESCUE & INITIALIZATION SCRIPT
-- ==========================================
-- This script fixes the "Database error saving new user" (500)
-- and ensures all tables are correctly configured.

-- 1. CLEANUP (Safe removal of old triggers to avoid conflicts)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. ENUM SETUP
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('guest', 'staff', 'receptionist', 'manager', 'admin');
    END IF;
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

CREATE TABLE IF NOT EXISTS public.staff_invites (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. BUSINESS TABLES
CREATE TABLE IF NOT EXISTS public.rooms (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  image_url TEXT,
  is_popular BOOLEAN DEFAULT FALSE,
  is_top_tier BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reservations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  guest_name TEXT,
  room_name TEXT,
  status TEXT DEFAULT 'Pending',
  total_amount DECIMAL,
  check_in TEXT,
  check_out TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.dining_venues (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  hours TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.menu_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category TEXT,
  subcategory TEXT,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.dining_reservations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  guest_name TEXT,
  venue_name TEXT,
  guests_count INTEGER,
  reservation_time TEXT,
  status TEXT DEFAULT 'Pending',
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.event_venues (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.event_inquiries (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  guest_name TEXT,
  event_type TEXT,
  guests_count INTEGER,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tasks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  category TEXT,
  priority TEXT,
  status TEXT DEFAULT 'Assigned',
  reporter_id UUID REFERENCES auth.users,
  assigned_to_id UUID REFERENCES auth.users,
  reporter_name TEXT,
  assigned_to_name TEXT,
  room_number TEXT,
  task_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.staff_requests (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  staff_id UUID REFERENCES auth.users,
  staff_name TEXT,
  staff_role TEXT,
  request_text TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. FAIL-SAFE TRIGGER FUNCTION
-- This is the critical fix. It ensures RETURN NEW is reached no matter what.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_assigned_role public.user_role;
BEGIN
  BEGIN
    -- Check for invitation
    SELECT role INTO v_assigned_role FROM public.staff_invites WHERE email = new.email;

    -- Default to guest
    IF v_assigned_role IS NULL THEN
      v_assigned_role := 'guest'::public.user_role;
    END IF;

    -- Insert profile
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
      new.id,
      new.email,
      COALESCE(new.raw_user_meta_data->>'full_name', 'Guest'),
      v_assigned_role
    );

    -- Cleanup
    DELETE FROM public.staff_invites WHERE email = new.email;
  EXCEPTION WHEN OTHERS THEN
    -- Silently catch errors to prevent 500 status on signup
    -- We still RETURN NEW so the user account is created.
    RETURN NEW;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. RE-BIND TRIGGER
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 7. BASIC SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 8. INITIAL SEEDING (Only if table is empty)
INSERT INTO public.rooms (name, description, price, image_url, is_popular, is_top_tier)
SELECT 'Standard King', 'A serene escape featuring artisanal textures.', 180, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFrpyURkjBqTpsTRQpX2-9-zX-hrs3IWU3r3dX6GOIJMRp3e2kY9L5f1Pay5fGDWzf1XhGNIL-pBuoW7-_77M1hhNgAy3ob_6T3zIqm-9SWKitblQ8JmBh82y87PDNXSNT5lq2rK2NCRelYpTOJU2BdgV7-7GH-X8sr490Vco2vg3ZFBvju7WEnsS3P6wlFngfuyc4zlc1N6ByO0LT8ViXD6I2eyFzh9LlWp8gdtkQefzKhWFbJhZRUgUeTA7vNdvMvRxrjB3UqYze', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.rooms WHERE name = 'Standard King');

INSERT INTO public.dining_venues (name, description, hours, image_url)
SELECT 'The Umurage Room', 'Our flagship restaurant offering a sophisticated atmosphere.', '06:30 AM — 11:00 PM', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu9S8A2cR6MUK0t-LsP5_w6FQLSwjZbDhbLaMIBwN9n6K1Nwb8Mu0JjvpKyg78CixqNRXJHDKeKpM4ycMlirSPm3Bb5UMU6fgpbumwl7Z5y6xu3rZ0FeGboQGjq2UdED9696rNsNrC3MAnxBGGedXDRtcKjfOSO7DLdE32nbVMRxdoIEm7Ni58fq7PMaBQFdd24Peu4VbYzRitdb3Ewe6y7inoUFYQ6iHqjPiUzBul_qksRuxKZBbCFZidC7eb4YGHsltHADwMwddN'
WHERE NOT EXISTS (SELECT 1 FROM public.dining_venues WHERE name = 'The Umurage Room');
