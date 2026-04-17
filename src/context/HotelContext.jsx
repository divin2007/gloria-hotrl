import React, { createContext, useContext, useState } from 'react';

export const HotelContext = createContext();

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

export const HotelProvider = ({ children }) => {
  const [reservations, setReservations] = useState([
    { id: 1, name: "Michael Henderson", roomType: "Deluxe Kigali Suite", status: "Settled", price: "$2,450.00", dates: "Oct 12 - Oct 15", guest: "Michael Henderson", room: "Deluxe Kigali Suite", amount: 2450.00, date: "2024-10-12" },
    { id: 2, name: "Lara Zhukov", roomType: "Garden View Single", status: "Pending", price: "$420.00", dates: "Oct 13 - Oct 14", guest: "Lara Zhukov", room: "Garden View Single", amount: 420.00, date: "2024-10-13" },
    { id: 3, name: "James Kagame", roomType: "Superior Double", status: "Settled", price: "$1,180.00", dates: "Oct 14 - Oct 17", guest: "James Kagame", room: "Superior Double", amount: 1180.00, date: "2024-10-14" },
    { id: 4, name: "Amandine Umutoni", roomType: "Executive Savannah Suite", status: "Pending", price: "$450.00", dates: "Oct 16 - Oct 19", guest: "Amandine Umutoni", room: "Executive Savannah Suite", amount: 450.00, checkIn: "Oct 16", checkOut: "Oct 19" },
    { id: 6, name: "Kwame Mensah", roomType: "Standard King Room", status: "Pending", price: "$280.00", dates: "Oct 20 - Oct 21", guest: "Kwame Mensah", room: "Standard King Room", amount: 280.00, checkIn: "Oct 20", checkOut: "Oct 21" }
  ]);

  const [diningReservations, setDiningReservations] = useState([
    { id: 5, name: "David O'Connor", venue: "The Terrace Grill", status: "Pending", guests: 4, time: "20:30", guest: "David O'Connor", room: "The Terrace Grill", type: "Dining" }
  ]);

  const [eventInquiries, setEventInquiries] = useState([
    { id: 7, name: "Tech Summit Corp", type: "Corporate Conference", guests: 500, status: "Pending" }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Room 402 - Plumbing Leak", category: "Maintenance", priority: "Emergency", status: "In Progress", reporter: "Sarah Omondi", time: "08:15 AM", icon: "priority_high" },
    { id: 2, title: "Suite 505 - Deep Clean", category: "Housekeeping", priority: "Standard", status: "Assigned", time: "09:00 AM", icon: "cleaning_services" },
    { id: 3, title: "Gym - HVAC Filter", category: "Maintenance", priority: "Standard", status: "Assigned", time: "10:30 AM", icon: "ac_unit" },
    { id: 4, title: "Lobby - Accent Lighting", category: "Maintenance", priority: "Low Priority", status: "Scheduled", time: "02:00 PM", icon: "lightbulb" }
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: "Sarah Omondi", role: "Concierge", performance: 98.2, status: "Active" },
    { id: 2, name: "Jean Bosco", role: "Maintenance", performance: 85.0, status: "Active" },
    { id: 3, name: "Aisha Keza", role: "Housekeeping", performance: 92.5, status: "Active" },
    { id: 4, name: "Marco G.", role: "Concierge", performance: 98.2, status: "Active" },
    { id: 5, name: "Sarah L.", role: "Reception", performance: 96.5, status: "Active" }
  ]);

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
    setTasks(prev => [...prev, { ...task, id: tasks.length + 1, status: "Assigned" }]);
  };

  const updateTaskStatus = (id, status) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, status } : task));
  };

  return (
    <HotelContext.Provider value={{
      reservations,
      diningReservations,
      eventInquiries,
      tasks,
      staff,
      addReservation,
      updateReservationStatus,
      addTask,
      updateTaskStatus
    }}>
      {children}
    </HotelContext.Provider>
  );
};
