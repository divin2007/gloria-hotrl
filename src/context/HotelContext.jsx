import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const HotelContext = createContext();

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

export const HotelProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [diningReservations, setDiningReservations] = useState([]);
  const [eventInquiries, setEventInquiries] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [staff, setStaff] = useState([]);
  const [staffRequests, setStaffRequests] = useState([]);
  const [catalogRooms, setCatalogRooms] = useState([]);
  const [catalogEvents, setCatalogEvents] = useState([]);
  const [catalogDining, setCatalogDining] = useState([]);
  const [catalogMenu, setCatalogMenu] = useState([]);
  const [roomReviews, setRoomReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Detect errors from email links in the URL hash
    const hash = window.location.hash;
    if (hash.includes('error_description')) {
      const params = new URLSearchParams(hash.substring(1));
      let errorMsg = params.get('error_description')?.replace(/\+/g, ' ');

      if (hash.includes('otp_expired')) {
        errorMsg = "Email link is invalid or has expired. This often happens if the website address in Supabase doesn't match your current URL. Please check your Supabase URL Configuration.";
      }

      setAuthError(errorMsg);
      // Clear hash to prevent repeated error messages
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        if (event === 'SIGNED_IN' && window.location.hash.includes('access_token')) {
          console.log("Session established via email confirmation link");
        }
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchCatalog();
    if (user) {
      fetchOperationalData();
    }
  }, [user]);

  const fetchProfile = async (userId, retryCount = 0) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // Use maybeSingle to avoid errors if not found

      if (!error && data) {
        setProfile(data);
      } else if (retryCount < 3) {
        // Profile might still be being created by the trigger
        setTimeout(() => fetchProfile(userId, retryCount + 1), 1500);
      } else {
        // Final attempt: Create profile if missing (fallback for trigger failure)
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser?.user) {
          const { data: newProfile, error: insertError } = await supabase.from('profiles').insert([{
            id: userId,
            email: authUser.user.email,
            full_name: authUser.user.user_metadata?.full_name || 'Guest',
            role: 'guest'
          }]).select().maybeSingle();

          if (newProfile) setProfile(newProfile);
          else if (insertError) console.error("Self-repair failed:", insertError.message);
        }
      }
    } catch (e) {
      console.error("Profile fetch exception:", e);
    }
  };

  const fetchCatalog = async () => {
    const [rooms, events, dining, menu] = await Promise.all([
      supabase.from('rooms').select('*'),
      supabase.from('event_venues').select('*'),
      supabase.from('dining_venues').select('*'),
      supabase.from('menu_items').select('*')
    ]);

    if (rooms.data) setCatalogRooms(rooms.data);
    if (events.data) setCatalogEvents(events.data);
    if (dining.data) setCatalogDining(dining.data);
    if (menu.data) setCatalogMenu(menu.data);
  };

  const fetchOperationalData = async () => {
    setLoading(true);
    const [res, dres, einq, tsk, stf, sreq, revs] = await Promise.all([
      supabase.from('reservations').select('*').order('created_at', { ascending: false }),
      supabase.from('dining_reservations').select('*').order('created_at', { ascending: false }),
      supabase.from('event_inquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('tasks').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').in('role', ['staff', 'receptionist', 'manager', 'admin']),
      supabase.from('staff_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('room_reviews').select('*').order('created_at', { ascending: false })
    ]);

    if (res.data) setReservations(res.data.map(r => ({
      ...r,
      name: r.guest_name,
      guest: r.guest_name,
      room: r.room_name,
      amount: r.total_amount,
      roomType: r.room_name,
      checkIn: r.check_in,
      checkOut: r.check_out,
      price: `$${r.total_amount?.toLocaleString()}`,
      dates: `${r.check_in} - ${r.check_out}`
    })));
    if (dres.data) setDiningReservations(dres.data.map(r => ({
      ...r,
      name: r.guest_name,
      guest: r.guest_name,
      room: r.venue_name,
      venue: r.venue_name,
      guests: r.guests_count,
      time: r.reservation_time
    })));
    if (einq.data) setEventInquiries(einq.data.map(r => ({
      ...r,
      name: r.guest_name,
      guest: r.guest_name,
      type: r.event_type,
      guests: r.guests_count
    })));
    if (tsk.data) setTasks(tsk.data.map(t => ({
      ...t,
      reporter: t.reporter_name,
      time: t.task_time,
      assignedTo: t.assigned_to_name,
      category: t.category,
      priority: t.priority,
      roomNumber: t.room_number
    })));
    if (stf.data) setStaff(stf.data.map(s => ({
      ...s,
      name: s.full_name,
      performance: 95.0, // Placeholder
      status: "Active"
    })));
    if (sreq.data) setStaffRequests(sreq.data.map(r => ({
      ...r,
      name: r.staff_name,
      role: r.staff_role,
      request: r.request_text
    })));
    if (revs.data) setRoomReviews(revs.data);

    // Auto-settle reservations if check-in date is today or past
    const todayStr = new Date().toISOString().split('T')[0];
    const pendingToSettle = res.data?.filter(r => r.status === 'Pending' && r.check_in <= todayStr);

    if (pendingToSettle && pendingToSettle.length > 0) {
      const ids = pendingToSettle.map(r => r.id);
      // We use a separate async call to not block the main fetch cycle
      supabase.from('reservations').update({ status: 'Settled' }).in('id', ids)
        .then(({ error }) => {
           if (!error) {
             // Silently refresh the local state to match the DB
             setReservations(prev => prev.map(r => ids.includes(r.id) ? { ...r, status: 'Settled' } : r));
           }
        });
    }

    setLoading(false);
  };

  const addReservation = async (reservation) => {
    if (reservation.type === 'Dining') {
      const { data, error } = await supabase.from('dining_reservations').insert([{
        user_id: user?.id || null,
        guest_name: reservation.guest,
        venue_name: reservation.room,
        guests_count: reservation.guests,
        reservation_time: reservation.time,
        special_requests: reservation.specialRequests
      }]).select();
      if (!error) fetchOperationalData();
      return { error };
    } else if (reservation.type === 'Event Inquiry') {
      const { data, error } = await supabase.from('event_inquiries').insert([{
        user_id: user?.id || null,
        guest_name: reservation.guest,
        event_type: reservation.eventType,
        guests_count: reservation.guests
      }]).select();
      if (!error) fetchOperationalData();
      return { error };
    } else {
      // 1. Date Availability Check
      // Check if any reservation exists for this room where dates overlap
      // Overlap formula: (start_a <= end_b) AND (end_a >= start_b)
      const { data: existing, error: checkError } = await supabase
        .from('reservations')
        .select('id')
        .eq('room_name', reservation.room)
        .eq('status', 'Settled') // Only count confirmed bookings
        .lte('check_in', reservation.checkOut)
        .gte('check_out', reservation.checkIn);

      if (checkError) return { error: checkError };
      if (existing && existing.length > 0) {
        return { error: { message: "This room is already occupied during the selected dates." } };
      }

      // 2. Insert if available
      const bookingData = {
        user_id: user?.id || null,
        guest_name: reservation.guest || "Guest",
        room_name: reservation.room || "Room",
        total_amount: parseFloat(reservation.amount) || 0,
        check_in: reservation.checkIn,
        check_out: reservation.checkOut,
        status: 'Pending'
      };

      const { data, error } = await supabase
        .from('reservations')
        .insert([bookingData])
        .select();

      if (error) {
        console.error("Booking failed:", error);
      } else {
        fetchOperationalData();
      }
      return { error };
    }
  };

  const updateReservationStatus = async (id, status) => {
    // Attempt update on all three tables since we don't know which one it is from the ID alone in this simplified logic
    await Promise.all([
      supabase.from('reservations').update({ status }).eq('id', id),
      supabase.from('dining_reservations').update({ status }).eq('id', id),
      supabase.from('event_inquiries').update({ status }).eq('id', id)
    ]);
    fetchOperationalData();
  };

  const addTask = async (task) => {
    const { error } = await supabase.from('tasks').insert([{
      title: task.title,
      category: task.category,
      priority: task.priority,
      status: "Assigned",
      reporter_id: user?.id || null,
      reporter_name: profile?.full_name || "Staff",
      assigned_to_name: task.assignedTo,
      room_number: task.roomNumber,
      task_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    if (!error) fetchOperationalData();
  };

  const updateTaskStatus = async (id, status) => {
    await supabase.from('tasks').update({ status }).eq('id', id);
    fetchOperationalData();
  };

  const approveStaffRequest = async (id) => {
    await supabase.from('staff_requests').update({ status: "Approved" }).eq('id', id);
    fetchOperationalData();
  };

  const denyStaffRequest = async (id) => {
    await supabase.from('staff_requests').update({ status: "Denied" }).eq('id', id);
    fetchOperationalData();
  };

  const addRoomReview = async (review) => {
    const { data, error } = await supabase.from('room_reviews').insert([{
        room_id: review.roomId,
        user_id: user?.id || null,
        guest_name: profile?.full_name || review.guestName || "Guest",
        rating: review.rating,
        comment: review.comment
    }]).select();
    if (!error) fetchOperationalData();
    return { data, error };
  };

  const addStaffRequest = async (requestData) => {
    const { error } = await supabase.from('staff_requests').insert([{
      staff_id: user?.id || null,
      staff_name: profile?.full_name || "Staff",
      staff_role: profile?.role || "Staff",
      request_text: requestData.reason,
      status: "Pending"
    }]);
    if (!error) fetchOperationalData();
    return { error };
  };

  const addCatalogItem = async (category, item) => {
    let table = '';
    let data = {};
    if (category === 'Rooms') {
      table = 'rooms';
      data = {
        name: item.name,
        description: item.description,
        price: item.price,
        image_url: item.image,
        is_popular: item.popular,
        is_top_tier: item.topTier,
        features: item.amenities || [],
        gallery: item.gallery || []
      };
    } else if (category === 'Events') {
      table = 'event_venues';
      data = { name: item.name, description: item.description, capacity: item.capacity, image_url: item.image };
    } else if (category === 'Dining') {
      table = 'dining_venues';
      data = { name: item.name, description: item.description, hours: item.hours, image_url: item.image };
    } else if (category === 'Menu') {
      table = 'menu_items';
      data = { category: item.category, subcategory: item.subcategory, name: item.name, description: item.description, price: item.price, image_url: item.image };
    }

    if (table) {
      const { error } = await supabase.from(table).insert([data]);
      if (error) {
        console.error(`Error adding to ${table}:`, error.message);
        alert(`Failed to add item to ${category}: ${error.message}`);
      } else {
        fetchCatalog();
      }
    }
  };

  const inviteStaff = async (email, role) => {
    const { error } = await supabase
      .from('staff_invites')
      .insert([{ email, role }]);
    return { error };
  };

  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        },
        emailRedirectTo: window.location.origin
      }
    });

    if (data?.user && data?.session) {
      setUser(data.user);
      fetchProfile(data.user.id);
    }

    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = () => supabase.auth.signOut();

  return (
    <HotelContext.Provider value={{
      user,
      profile,
      signIn,
      signUp,
      inviteStaff,
      signOut,
      authError,
      setAuthError,
      reservations,
      diningReservations,
      eventInquiries,
      tasks,
      staff,
      staffRequests,
      catalogRooms,
      catalogEvents,
      catalogDining,
      catalogMenu,
      roomReviews,
      addRoomReview,
      addReservation,
      updateReservationStatus,
      addTask,
      updateTaskStatus,
      approveStaffRequest,
      denyStaffRequest,
      addStaffRequest,
      addCatalogItem,
      loading
    }}>
      {children}
    </HotelContext.Provider>
  );
};
