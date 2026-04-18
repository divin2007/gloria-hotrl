import React, { createContext, useContext, useState } from 'react';

export const HotelContext = createContext();

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

import { useEffect } from 'react';

const getInitialData = (key, fallback) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
};

export const HotelProvider = ({ children }) => {
  const [user, setUser] = useState(() => getInitialData('gloria_user', null));
  const [reservations, setReservations] = useState(() => getInitialData('gloria_reservations', [
    { id: 1, name: "Michael Henderson", roomType: "Deluxe Kigali Suite", status: "Settled", price: "$2,450.00", dates: "Oct 12 - Oct 15", guest: "Michael Henderson", room: "Deluxe Kigali Suite", amount: 2450.00, date: "2024-10-12" },
    { id: 2, name: "Lara Zhukov", roomType: "Garden View Single", status: "Pending", price: "$420.00", dates: "Oct 13 - Oct 14", guest: "Lara Zhukov", room: "Garden View Single", amount: 420.00, date: "2024-10-13" },
    { id: 3, name: "James Kagame", roomType: "Superior Double", status: "Settled", price: "$1,180.00", dates: "Oct 14 - Oct 17", guest: "James Kagame", room: "Superior Double", amount: 1180.00, date: "2024-10-14" },
    { id: 4, name: "Amandine Umutoni", roomType: "Executive Savannah Suite", status: "Pending", price: "$450.00", dates: "Oct 16 - Oct 19", guest: "Amandine Umutoni", room: "Executive Savannah Suite", amount: 450.00, checkIn: "Oct 16", checkOut: "Oct 19" },
    { id: 6, name: "Kwame Mensah", roomType: "Standard King Room", status: "Pending", price: "$280.00", dates: "Oct 20 - Oct 21", guest: "Kwame Mensah", room: "Standard King Room", amount: 280.00, checkIn: "Oct 20", checkOut: "Oct 21" }
  ]));

  const [diningReservations, setDiningReservations] = useState(() => getInitialData('gloria_dining', [
    { id: 5, name: "David O'Connor", venue: "The Terrace Grill", status: "Pending", guests: 4, time: "20:30", guest: "David O'Connor", room: "The Terrace Grill", type: "Dining" }
  ]));

  const [eventInquiries, setEventInquiries] = useState(() => getInitialData('gloria_events', [
    { id: 7, name: "Tech Summit Corp", type: "Corporate Conference", guests: 500, status: "Pending" }
  ]));

  const [tasks, setTasks] = useState(() => getInitialData('gloria_tasks', [
    { id: 1, title: "Room 402 - Plumbing Leak", category: "Maintenance", priority: "Emergency", status: "In Progress", reporter: "Sarah Omondi", time: "08:15 AM", icon: "priority_high", assignedTo: "Jean Bosco" },
    { id: 2, title: "Suite 505 - Deep Clean", category: "Housekeeping", priority: "Standard", status: "Assigned", time: "09:00 AM", icon: "cleaning_services", assignedTo: "Aisha Keza" },
    { id: 3, title: "Gym - HVAC Filter", category: "Maintenance", priority: "Standard", status: "Assigned", time: "10:30 AM", icon: "ac_unit", assignedTo: "Jean Bosco" },
    { id: 4, title: "Lobby - Accent Lighting", category: "Maintenance", priority: "Low Priority", status: "Scheduled", time: "02:00 PM", icon: "lightbulb", assignedTo: "Jean Bosco" }
  ]));

  const [staff, setStaff] = useState(() => getInitialData('gloria_staff', [
    { id: 1, name: "Sarah Omondi", role: "Concierge", performance: 98.2, status: "Active", level: 3 },
    { id: 2, name: "Jean Bosco", role: "Maintenance", performance: 85.0, status: "Active", level: 2 },
    { id: 3, name: "Aisha Keza", role: "Housekeeping", performance: 92.5, status: "Active", level: 3 },
    { id: 4, name: "Marco G.", role: "Concierge", performance: 98.2, status: "Active", level: 2 },
    { id: 5, name: "Sarah L.", role: "Reception", performance: 96.5, status: "Active", level: 2 }
  ]));

  const [staffRequests, setStaffRequests] = useState(() => getInitialData('gloria_staff_requests', [
    { id: 1, staffId: 3, name: "Aisha Keza", role: "Housekeeper • LVL 3", request: "Requesting overtime shift for Presidential Suite turnover preparation.", status: "Pending" },
    { id: 2, staffId: 5, name: "Sarah L.", role: "Receptionist • LVL 2", request: "Requesting leave for Saturday morning shift (Family emergency).", status: "Pending" }
  ]));

  // Inventory Catalogs
  const [catalogRooms, setCatalogRooms] = useState(() => getInitialData('gloria_cat_rooms', [
    { id: 1, name: "Standard King", description: "A serene escape featuring artisanal textures and a signature King-sized mattress.", price: 180, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFrpyURkjBqTpsTRQpX2-9-zX-hrs3IWU3r3dX6GOIJMRp3e2kY9L5f1Pay5fGDWzf1XhGNIL-pBuoW7-_77M1hhNgAy3ob_6T3zIqm-9SWKitblQ8JmBh82y87PDNXSNT5lq2rK2NCRelYpTOJU2BdgV7-7GH-X8sr490Vco2vg3ZFBvju7WEnsS3P6wlFngfuyc4zlc1N6ByO0LT8ViXD6I2eyFzh9LlWp8gdtkQefzKhWFbJhZRUgUeTA7vNdvMvRxrjB3UqYze", popular: true },
    { id: 2, name: "Deluxe Suite", description: "Extended living spaces with panoramic views of the Kigali hills. Includes a private bar.", price: 320, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGD8oZOP6zoeRii_iKG8cj-JldLoCoz_MZM0R6pFI7kUBEk9wSmgdhkyLX2I7lhAf16zYaytzY1CSeHgRpVfhPESii4CCrFlqbhGp5Wi9BdXFToNvL1WV_NTxBConRxM3aWiiHlcvqZEkoHBJJvoTIfiivIcuY9tteks8_bn_dxA8N6Gnf22XcxVRDRB5v0WnGYTV7jd5SmdMi64BT-DOODRCaS915r-J5Fy0ZRlbdDU3NjB4LiQkjT2YsoCWUn19UAYB815ZSuWd5" },
    { id: 3, name: "Executive Penthouse", description: "The ultimate expression of luxury. A two-story residence with a private terrace.", price: 1200, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWPfF7IR_DRXEuineYUYowxsJuAn6BAnxQb0vc5MmRMlMK4UaozSp1Gt2hm3FH9bcyyJcRZtQ4h6I5gBoPmofbB4figYECbyFZZ8mAkBO9wxdIfvRh5gH54U4dpM9SqAWXOrLaZHiLIAe0t_OK5l2L1_dSRqqIyPFys116B6TPJtrmPqBimQrLiFAB7df-D9NuVXo6g_EgVHT5Axil1CU5jKVShZlg9hdwYXM5tK4OOTyGp9v_6C2KGuOl0240bQNexZkwyqbSEQ6p", topTier: true }
  ]));

  const [catalogEvents, setCatalogEvents] = useState(() => getInitialData('gloria_cat_events', [
    { id: 1, name: "The Virunga Ballroom", description: "Spacious contemporary hotel ballroom with wooden accents.", capacity: 500, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiF2tF8H3VepaVqJ28vg2_1zGplP2Q78r5d2ENONNxOqgKSgOHjtYx3nJ8RFqm5WvfOE8-flossu2Brz1y5DYG2-ikT3wbtadDvx-PGGnf-kCYdGdavIJylgRxVWbNs6baHomgNn_-qifLBQTLsTH9DL-AV8DUmRCiogMf7hps7Ie-i1ejQF-AiG_9M9v6UIh0E0ioEKLm7twebloBB-O-QzAllxG6d3e64-zU4vSP9zx3m0-ZB8qc3nPM6KorVUeOJU_mcgCNYv69" },
    { id: 2, name: "The Skyline Terrace", description: "Open-air elegance for cocktail receptions and evening celebrations.", capacity: 150, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1kfqXw-qY06yFCxjo-et-ciQr3teyZj6Umkc_uOruw5bxHlfLLXzOP3UGoorOBNOaEbmoFlNzLG8IFjYoKRE0g7s_YxfZ3nmFOZ6oh555fVJR8I7T0oncYTnMYh2T2Z99wum4YMkO69pIBAecPTjZDqYPTXTXNwetQE0VeaWutY4RWK1QYz-cMJlK3qQmLdTbRjILF6K1Fw3fte_Ehd2IqhOPSQlf4ifhASU3PDwMP-y4-iCWKxMuOaCKpjX_KCNgspz0umScQAk-" },
    { id: 3, name: "The Kigali Suite", description: "A high-tech executive environment designed for focused collaboration.", capacity: 25, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7V53_pVDNLi76yYfYhhmOAb-RiavzmbbIgcF7gtd-1BVpWp3WGYi0WvOYrDu-dZdYgVgFIbqfNBVTypben2HKwiyT58tbZaKJMvMaOcDdCbUYARabKwWL8fZY1bvzhJYrCwImrtZbF5EKqw2NexSD0L0MyehfgQhWfv1DPTY-AUm76NNha4HzJSPxjdEyki9HpCD4hjy1dq56T-j8cH4U9f3JNvo1bq5m1owaNQHvZpHKyqTylarpu3yu6F475kuz-Y-pD73trsq0" }
  ]));

  const [catalogDining, setCatalogDining] = useState(() => getInitialData('gloria_cat_dining', [
    { id: 1, name: "The Umurage Room", description: "Our flagship restaurant offering a sophisticated atmosphere.", hours: "06:30 AM — 11:00 PM", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu9S8A2cR6MUK0t-LsP5_w6FQLSwjZbDhbLaMIBwN9n6K1Nwb8Mu0JjvpKyg78CixqNRXJHDKeKpM4ycMlirSPm3Bb5UMU6fgpbumwl7Z5y6xu3rZ0FeGboQGjq2UdED9696rNsNrC3MAnxBGGedXDRtcKjfOSO7DLdE32nbVMRxdoIEm7Ni58fq7PMaBQFdd24Peu4VbYzRitdb3Ewe6y7inoUFYQ6iHqjPiUzBul_qksRuxKZBbCFZidC7eb4YGHsltHADwMwddN" }
  ]));

  const [catalogMenu, setCatalogMenu] = useState(() => getInitialData('gloria_cat_menu', [
    { id: 1, category: "Food", name: "Isombe Modernist", description: "Cassava leaves velouté, bone marrow emulsion, sourdough crumbles.", price: "12k RWF", subcategory: "Starters", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEHkrDss2l38B4-Wv8vw_5VwA2UD7r1nfTjZbFo2Le4rMy_-D07brhVpbZj9iS1d0MlKNF1jzjDjMpda4InKv6q75A1_xjN88NFlfLLR9N0nfSPKJwgbJWzfGaJjJZOeGVLSmmDZOIQaxeSrm3WJFurfEse0c0BCgrohmwEx2lxNl_7547KCF1-q2Z12vIhR-1kyd1TO2t3xVO4csDnvD9ZCYIxcL8v-RaIC2m0aj4Rcxi4z7AVzR0x1k9fDrKe9m_vksKYaM6V1nd" },
    { id: 2, category: "Food", name: "Kigali Garden Salad", description: "Micro-greens, passion fruit vinaigrette, macadamia, goat cheese.", price: "9k RWF", subcategory: "Starters", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFrpyURkjBqTpsTRQpX2-9-zX-hrs3IWU3r3dX6GOIJMRp3e2kY9L5f1Pay5fGDWzf1XhGNIL-pBuoW7-_77M1hhNgAy3ob_6T3zIqm-9SWKitblQ8JmBh82y87PDNXSNT5lq2rK2NCRelYpTOJU2BdgV7-7GH-X8sr490Vco2vg3ZFBvju7WEnsS3P6wlFngfuyc4zlc1N6ByO0LT8ViXD6I2eyFzh9LlWp8gdtkQefzKhWFbJhZRUgUeTA7vNdvMvRxrjB3UqYze" },
    { id: 3, category: "Food", name: "Lake Kivu Sambaza", description: "Pan-seared silverfish, volcanic potato purée, saffron broth.", price: "24k RWF", subcategory: "Signature Mains", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi4EaQ9-THOcp0NZU08V7qT4c_kVb-NNyRQQPJMjnJx95L3kJjb9F73giMX7bDvKb3uvJl3gRri0-S3tBMsg6CiNnkp_f-H-faJfWwY8iUFmJp219k2_i7b0LDRYM3LGp7z27bNzxwJuApiYggG2UgRzh2Gm5JW69gX32IMu2oERwE2WDYybcJBgP0G8E6XclZPxHkZw5HnfYKUNPUBPNdp6dYMxXYjeV_k7MJnmqOVMTPvCfShZNtdAaf4FZkCbpP8dN2IeqwuvpK" },
    { id: 4, category: "Food", name: "Slow-Roasted Akabenz", description: "Twice-cooked pork belly, honey-ginger glaze, plantain pavé.", price: "28k RWF", subcategory: "Signature Mains", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ3t_lbFvwggJ4h_f6jYXnlfbH0Cz6JCjC0CIwEFfEpec30as6vrDqW9azqEC-U8pYwUqdpQA3kEiYNdNlGDaNYHUPCPDVP0TvsNepwkuW2AjCQSaf-FEG4LjS22jxOVKX6EH1x5csjRLdZUszQmQTsxX71lsbMCTbbGAqRfdhXMDSr9cxZ6-qoWT3DmZdG9pjYiZ0wJfWO7zZujfXbz6NhKxKjcN7cW58gXCgkyFxLpxTQyR0LVRuKM9Pmr1igxGxguD6Oxfa1E2T" },
    { id: 5, category: "Food", name: "Rubavu Coffee Tart", description: "Single-origin espresso ganache, salted caramel, hazelnut praline.", price: "10k RWF", subcategory: "Confections", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL8d_ngibW6yrtlFn0ZWyRAw5gUUaW7xAC-Geo403qS13OuddQx2gmSycWTCJoGlBMmyFVMW9RTlyFM-dLkFEmfxDG3CrPZgXdasMveA6SjMSm9U9LfyRMWs1xEJ7iScU1_1-2NMKC2c0N02qj16F_vpajkqcC2ffI3S1KFcgHTsY2NU9PzzSbTOrW08np2IHJp8x7Ym61pTalWcPkjzyHTXYYBGCPRJHbfSbj9l73b7lqGJ7a1Ep7W_O0vu2BEKjpd5RsCxGIMdg0" },
    { id: 6, category: "Food", name: "Wild Hibiscus Sorbet", description: "Local botanicals, fresh honeycomb, mint oil.", price: "8k RWF", subcategory: "Confections", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8c-IN2J2LdmBx_9o_bE9ves6tCnN05uk8CmKp6TxDHNDaA7f04DfK7_8TfX8X53m0n4ogkAvqqT-5WlPID3fDgSWzN43ZXiVEYG5TmO14CJXWsEVMRi-mVBT5L_QQoOD9B-eophfrJl9k3y3PNp45n6eKKLqXE82Luvnx9W5RFsGc3GmGxjCmQV9bTZJzyfxBE0dpF5AX0yjUTNAS5CLdM9ZTGpbWVuyGcAp-VY4pRvXrnrN9KNBpwDJsCEyncW-2S9qXUWcsGs_-" },
    { id: 7, category: "Drink", name: "Ginger Infusion", description: "Fresh local ginger, honey, lemon.", price: "4k RWF", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNmML1are6mdjF-v958rkhDZ7ywsu5OxAsQgof1vq8mBQjEmKbVl1M_AIiy3jTl4Z084b7s6fsnfTtHhXcgbn8BdaAalqfNvB1H66CDW9O6kWRW1jwKaiZugio5kLQBlhfcpXgx0pkf8AY6Ku-3ikav-2GTEIeUU00ZWBxfQuwlQFjFIlnIj1UUuWnOJaTsxrUTjPJjhJ6AaRdrn5FlsA8_xTQ0bvhnIrNJ6Wd737grEGm-diWuf_HXR0Hj1D7CypXbp5PSvBd8maP" },
    { id: 8, category: "Alcohol", name: "Akagera Twilight", description: "Rwandan gin, hibiscus reduction, sparkling water.", price: "12k RWF", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL8d_ngibW6yrtlFn0ZWyRAw5gUUaW7xAC-Geo403qS13OuddQx2gmSycWTCJoGlBMmyFVMW9RTlyFM-dLkFEmfxDG3CrPZgXdasMveA6SjMSm9U9LfyRMWs1xEJ7iScU1_1-2NMKC2c0N02qj16F_vpajkqcC2ffI3S1KFcgHTsY2NU9PzzSbTOrW08np2IHJp8x7Ym61pTalWcPkjzyHTXYYBGCPRJHbfSbj9l73b7lqGJ7a1Ep7W_O0vu2BEKjpd5RsCxGIMdg0" },
    { id: 9, category: "Special", name: "Chef's Garden Tasting", description: "A 5-course journey through the hotel's private harvest.", price: "45k RWF", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEHkrDss2l38B4-Wv8vw_5VwA2UD7r1nfTjZbFo2Le4rMy_-D07brhVpbZj9iS1d0MlKNF1jzjDjMpda4InKv6q75A1_xjN88NFlfLLR9N0nfSPKJwgbJWzfGaJjJZOeGVLSmmDZOIQaxeSrm3WJFurfEse0c0BCgrohmwEx2lxNl_7547KCF1-q2Z12vIhR-1kyd1TO2t3xVO4csDnvD9ZCYIxcL8v-RaIC2m0aj4Rcxi4z7AVzR0x1k9fDrKe9m_vksKYaM6V1nd" }
  ]));

  useEffect(() => {
    localStorage.setItem('gloria_user', JSON.stringify(user));
    localStorage.setItem('gloria_reservations', JSON.stringify(reservations));
    localStorage.setItem('gloria_dining', JSON.stringify(diningReservations));
    localStorage.setItem('gloria_events', JSON.stringify(eventInquiries));
    localStorage.setItem('gloria_tasks', JSON.stringify(tasks));
    localStorage.setItem('gloria_staff', JSON.stringify(staff));
    localStorage.setItem('gloria_staff_requests', JSON.stringify(staffRequests));
    localStorage.setItem('gloria_cat_rooms', JSON.stringify(catalogRooms));
    localStorage.setItem('gloria_cat_events', JSON.stringify(catalogEvents));
    localStorage.setItem('gloria_cat_dining', JSON.stringify(catalogDining));
    localStorage.setItem('gloria_cat_menu', JSON.stringify(catalogMenu));
  }, [user, reservations, diningReservations, eventInquiries, tasks, staff, staffRequests, catalogRooms, catalogEvents, catalogDining, catalogMenu]);

  const addReservation = (reservation) => {
    const newRes = {
      ...reservation,
      id: reservations.length + diningReservations.length + eventInquiries.length + 1,
      status: "Pending",
      name: reservation.guest || "Unknown",
      roomType: reservation.room || "Room",
      price: reservation.amount ? `$${reservation.amount.toLocaleString()}` : "TBD",
      dates: reservation.checkIn ? `${reservation.checkIn} - ${reservation.checkOut}` : "TBD"
    };
    if (reservation.type === 'Dining') {
      setDiningReservations(prev => [...prev, { ...newRes, venue: reservation.room || "The Summit" }]);
    } else if (reservation.type === 'Event Inquiry') {
      setEventInquiries(prev => [...prev, newRes]);
    } else {
      setReservations(prev => [...prev, newRes]);
    }
  };

  const updateReservationStatus = (id, status) => {
    setReservations(prev => prev.map(res => res.id === id ? { ...res, status } : res));
    setDiningReservations(prev => prev.map(res => res.id === id ? { ...res, status } : res));
    setEventInquiries(prev => prev.map(res => res.id === id ? { ...res, status } : res));
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: tasks.length + 1,
      status: task.status || "Assigned",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTaskStatus = (id, status) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, status } : task));
  };

  const approveStaffRequest = (id) => {
    setStaffRequests(prev => prev.map(req => req.id === id ? { ...req, status: "Approved" } : req));
  };

  const denyStaffRequest = (id) => {
    setStaffRequests(prev => prev.map(req => req.id === id ? { ...req, status: "Denied" } : req));
  };

  const addCatalogItem = (category, item) => {
    const newItem = { ...item, id: Date.now() };
    if (category === 'Rooms') setCatalogRooms(prev => [...prev, newItem]);
    if (category === 'Events') setCatalogEvents(prev => [...prev, newItem]);
    if (category === 'Dining') setCatalogDining(prev => [...prev, newItem]);
    if (category === 'Menu') setCatalogMenu(prev => [...prev, newItem]);
  };

  const login = (email, password) => {
    // Simulate role-based auth
    if (email.includes('admin')) {
      setUser({ email, role: 'admin' });
    } else if (email.includes('manager')) {
      setUser({ email, role: 'manager' });
    } else if (email.includes('receptionist')) {
      setUser({ email, role: 'receptionist' });
    } else if (email.includes('staff')) {
      setUser({ email, role: 'staff' });
    } else {
      setUser({ email, role: 'guest' });
    }
  };

  const logout = () => setUser(null);

  return (
    <HotelContext.Provider value={{
      user,
      login,
      logout,
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
      addReservation,
      updateReservationStatus,
      addTask,
      updateTaskStatus,
      approveStaffRequest,
      denyStaffRequest,
      addCatalogItem
    }}>
      {children}
    </HotelContext.Provider>
  );
};
