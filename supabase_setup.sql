-- PASTE THIS INTO SUPABASE SQL EDITOR --

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create roles enum
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('guest', 'staff', 'receptionist', 'manager', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  role user_role DEFAULT 'guest',
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Invites table (For Admin to pre-authorize roles)
CREATE TABLE IF NOT EXISTS staff_invites (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rooms catalog
CREATE TABLE IF NOT EXISTS rooms (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  image_url TEXT,
  is_popular BOOLEAN DEFAULT FALSE,
  is_top_tier BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Room Reservations
CREATE TABLE IF NOT EXISTS reservations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  guest_name TEXT,
  room_id BIGINT REFERENCES rooms ON DELETE SET NULL,
  room_name TEXT,
  status TEXT DEFAULT 'Pending',
  total_amount DECIMAL,
  check_in DATE,
  check_out DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dining Venues
CREATE TABLE IF NOT EXISTS dining_venues (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  hours TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dining Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category TEXT,
  subcategory TEXT,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dining Reservations
CREATE TABLE IF NOT EXISTS dining_reservations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  guest_name TEXT,
  venue_id BIGINT REFERENCES dining_venues ON DELETE SET NULL,
  venue_name TEXT,
  guests_count INTEGER,
  reservation_time TEXT,
  status TEXT DEFAULT 'Pending',
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Venues
CREATE TABLE IF NOT EXISTS event_venues (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Inquiries
CREATE TABLE IF NOT EXISTS event_inquiries (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  guest_name TEXT,
  event_type TEXT,
  guests_count INTEGER,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Tasks
CREATE TABLE IF NOT EXISTS tasks (
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

-- Staff Requests
CREATE TABLE IF NOT EXISTS staff_requests (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  staff_id UUID REFERENCES auth.users,
  staff_name TEXT,
  staff_role TEXT,
  request_text TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --- SECURITY: ROW LEVEL SECURITY (RLS) ---

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE dining_venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE dining_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_requests ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles viewable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Staff Invites Policies
CREATE POLICY "Admins manage invites" ON staff_invites FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Rooms/Venues/Menu Policies
CREATE POLICY "Public view rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Managers manage rooms" ON rooms FOR ALL USING (public.get_user_role(auth.uid()) IN ('manager', 'admin'));

CREATE POLICY "Public view dining" ON dining_venues FOR SELECT USING (true);
CREATE POLICY "Managers manage dining" ON dining_venues FOR ALL USING (public.get_user_role(auth.uid()) IN ('manager', 'admin'));

CREATE POLICY "Public view menu" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Managers manage menu" ON menu_items FOR ALL USING (public.get_user_role(auth.uid()) IN ('manager', 'admin'));

CREATE POLICY "Public view events" ON event_venues FOR SELECT USING (true);
CREATE POLICY "Managers manage events" ON event_venues FOR ALL USING (public.get_user_role(auth.uid()) IN ('manager', 'admin'));

-- Reservations Policies
CREATE POLICY "View managed reservations" ON reservations FOR SELECT USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) IN ('receptionist', 'manager', 'admin'));
CREATE POLICY "Create reservations" ON reservations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update reservations" ON reservations FOR UPDATE USING (public.get_user_role(auth.uid()) IN ('receptionist', 'manager', 'admin'));

-- Trigger to create profile on signup (FIXED AND UPDATED FOR INVITES)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  assigned_role user_role;
BEGIN
  -- Check if user is in staff_invites
  SELECT role INTO assigned_role FROM public.staff_invites WHERE email = new.email;

  -- If not invited, default to guest
  IF assigned_role IS NULL THEN
    assigned_role := 'guest';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Guest'),
    assigned_role
  );

  -- Delete the invite if it existed
  DELETE FROM public.staff_invites WHERE email = new.email;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Seeding
INSERT INTO rooms (name, description, price, image_url, is_popular, is_top_tier) VALUES
('Standard King', 'A serene escape featuring artisanal textures.', 180, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFrpyURkjBqTpsTRQpX2-9-zX-hrs3IWU3r3dX6GOIJMRp3e2kY9L5f1Pay5fGDWzf1XhGNIL-pBuoW7-_77M1hhNgAy3ob_6T3zIqm-9SWKitblQ8JmBh82y87PDNXSNT5lq2rK2NCRelYpTOJU2BdgV7-7GH-X8sr490Vco2vg3ZFBvju7WEnsS3P6wlFngfuyc4zlc1N6ByO0LT8ViXD6I2eyFzh9LlWp8gdtkQefzKhWFbJhZRUgUeTA7vNdvMvRxrjB3UqYze', true, false),
('Deluxe Suite', 'Extended living spaces with panoramic views.', 320, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGD8oZOP6zoeRii_iKG8cj-JldLoCoz_MZM0R6pFI7kUBEk9wSmgdhkyLX2I7lhAf16zYaytzY1CSeHgRpVfhPESii4CCrFlqbhGp5Wi9BdXFToNvL1WV_NTxBConRxM3aWiiHlcvqZEkoHBJJvoTIfiivIcuY9tteks8_bn_dxA8N6Gnf22XcxVRDRB5v0WnGYTV7jd5SmdMi64BT-DOODRCaS915r-J5Fy0ZRlbdDU3NjB4LiQkjT2YsoCWUn19UAYB815ZSuWd5', false, false);
