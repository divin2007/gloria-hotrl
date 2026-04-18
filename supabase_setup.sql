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
  category TEXT, -- Food, Drink, Alcohol, Special
  subcategory TEXT, -- Starters, Signature Mains, Confections, etc.
  name TEXT NOT NULL,
  description TEXT,
  price TEXT, -- e.g. "12k RWF"
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
  category TEXT, -- Maintenance, Housekeeping, Concierge
  priority TEXT, -- Low Priority, Standard, High, Emergency
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

CREATE POLICY "View managed dining" ON dining_reservations FOR SELECT USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) IN ('receptionist', 'manager', 'admin'));
CREATE POLICY "Create dining" ON dining_reservations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update dining" ON dining_reservations FOR UPDATE USING (public.get_user_role(auth.uid()) IN ('receptionist', 'manager', 'admin'));

CREATE POLICY "View managed events" ON event_inquiries FOR SELECT USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) IN ('manager', 'admin'));
CREATE POLICY "Create event inquiries" ON event_inquiries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update event inquiries" ON event_inquiries FOR UPDATE USING (public.get_user_role(auth.uid()) IN ('manager', 'admin'));

-- Tasks Policies
CREATE POLICY "Staff view assigned tasks" ON tasks FOR SELECT USING (auth.uid() = assigned_to_id OR public.get_user_role(auth.uid()) IN ('receptionist', 'manager', 'admin'));
CREATE POLICY "Managers manage tasks" ON tasks FOR ALL USING (public.get_user_role(auth.uid()) IN ('receptionist', 'manager', 'admin'));
CREATE POLICY "Staff update tasks" ON tasks FOR UPDATE USING (auth.uid() = assigned_to_id);

-- Staff Requests Policies
CREATE POLICY "Staff view own requests" ON staff_requests FOR SELECT USING (auth.uid() = staff_id OR public.get_user_role(auth.uid()) IN ('manager', 'admin'));
CREATE POLICY "Staff create requests" ON staff_requests FOR INSERT WITH CHECK (auth.uid() = staff_id);
CREATE POLICY "Managers update requests" ON staff_requests FOR UPDATE USING (public.get_user_role(auth.uid()) IN ('manager', 'admin'));

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', (new.raw_user_meta_data->>'role')::user_role);
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

INSERT INTO dining_venues (name, description, hours, image_url) VALUES
('The Umurage Room', 'Our flagship restaurant.', '06:30 AM — 11:00 PM', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu9S8A2cR6MUK0t-LsP5_w6FQLSwjZbDhbLaMIBwN9n6K1Nwb8Mu0JjvpKyg78CixqNRXJHDKeKpM4ycMlirSPm3Bb5UMU6fgpbumwl7Z5y6xu3rZ0FeGboQGjq2UdED9696rNsNrC3MAnxBGGedXDRtcKjfOSO7DLdE32nbVMRxdoIEm7Ni58fq7PMaBQFdd24Peu4VbYzRitdb3Ewe6y7inoUFYQ6iHqjPiUzBul_qksRuxKZBbCFZidC7eb4YGHsltHADwMwddN');

INSERT INTO menu_items (category, subcategory, name, description, price, image_url) VALUES
('Food', 'Starters', 'Isombe Modernist', 'Cassava leaves velouté, bone marrow emulsion.', '12k RWF', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEHkrDss2l38B4-Wv8vw_5VwA2UD7r1nfTjZbFo2Le4rMy_-D07brhVpbZj9iS1d0MlKNF1jzjDjMpda4InKv6q75A1_xjN88NFlfLLR9N0nfSPKJwgbJWzfGaJjJZOeGVLSmmDZOIQaxeSrm3WJFurfEse0c0BCgrohmwEx2lxNl_7547KCF1-q2Z12vIhR-1kyd1TO2t3xVO4csDnvD9ZCYIxcL8v-RaIC2m0aj4Rcxi4z7AVzR0x1k9fDrKe9m_vksKYaM6V1nd');
