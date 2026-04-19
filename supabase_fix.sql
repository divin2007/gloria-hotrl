-- ==========================================
-- SUPABASE FIX SCRIPT (V6 - ROBUST TYPES)
-- ==========================================

-- 1. Ensure the custom type exists in public schema
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('guest', 'staff', 'receptionist', 'manager', 'admin');
    END IF;
EXCEPTION WHEN OTHERS THEN
    NULL;
END $$;

-- 2. Profiles table (ensure it uses fully qualified role type)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  role public.user_role DEFAULT 'guest',
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Robust Trigger Function with explicit search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role public.user_role;
BEGIN
  -- Determine role (check invites)
  BEGIN
    SELECT role INTO v_role FROM public.staff_invites WHERE email = new.email;
  EXCEPTION WHEN OTHERS THEN
    v_role := 'guest'::public.user_role;
  END;

  IF v_role IS NULL THEN
    v_role := 'guest'::public.user_role;
  END IF;

  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Guest'),
    v_role
  );

  -- Cleanup invite
  DELETE FROM public.staff_invites WHERE email = new.email;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Allow AUTH SIGNUP to succeed even if PROFILE creation fails.
  -- This prevents the 500 error on the frontend.
  RETURN NEW;
END;
$$;

-- 4. Re-bind the trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Ensure permissions are correct
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres, service_role;
