import React, { createContext, useContext, useState } from 'react';

const HotelContext = createContext();

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

export const HotelProvider = ({ children }) => {
  const [reservations, setReservations] = useState([
    { id: 1, guest: "Michael Henderson", room: "Deluxe Kigali Suite", status: "Settled", amount: 2450.00, date: "2024-10-12" },
    { id: 2, guest: "Lara Zhukov", room: "Garden View Single", status: "Pending", amount: 420.00, date: "2024-10-13" },
    { id: 3, guest: "James Kagame", room: "Superior Double", status: "Settled", amount: 1180.00, date: "2024-10-14" },
    { id: 4, guest: "Amandine Umutoni", room: "Executive Savannah Suite", status: "Pending", amount: 450.00, checkIn: "Oct 16", checkOut: "Oct 19" },
    { id: 5, guest: "David O'Connor", room: "The Terrace Grill", status: "Pending", type: "Dining", guests: 4, time: "20:30" },
    { id: 6, guest: "Kwame Mensah", room: "Standard King Room", status: "Pending", amount: 280.00, checkIn: "Oct 20", checkOut: "Oct 21" }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Room 402 - Plumbing Leak", category: "Maintenance", priority: "Emergency", status: "In Progress", reporter: "Sarah Omondi", time: "08:15 AM" },
    { id: 2, title: "Suite 505 - Deep Clean", category: "Housekeeping", priority: "Standard", status: "Assigned", time: "09:00 AM" },
    { id: 3, title: "Gym - HVAC Filter", category: "Maintenance", priority: "Standard", status: "Assigned", time: "10:30 AM" },
    { id: 4, title: "Lobby - Accent Lighting", category: "Maintenance", priority: "Low Priority", status: "Scheduled", time: "02:00 PM" }
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: "Sarah Omondi", role: "Concierge", performance: 98.2, status: "Active" },
    { id: 2, name: "Jean Bosco", role: "Maintenance", performance: 85.0, status: "Active" },
    { id: 3, name: "Aisha Keza", role: "Housekeeping", performance: 92.5, status: "Active" },
    { id: 4, name: "Marco G.", role: "Concierge", performance: 98.2, status: "Active" },
    { id: 5, name: "Sarah L.", role: "Reception", performance: 96.5, status: "Active" }
  ]);

  const addReservation = (reservation) => {
    setReservations(prev => [...prev, { ...reservation, id: prev.length + 1, status: "Pending" }]);
  };

  const updateReservationStatus = (id, status) => {
    setReservations(prev => prev.map(res => res.id === id ? { ...res, status } : res));
  };

  const addTask = (task) => {
    setTasks(prev => [...prev, { ...task, id: prev.length + 1, status: "Assigned" }]);
  };

  const updateTaskStatus = (id, status) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, status } : task));
  };

  return (
    <HotelContext.Provider value={{
      reservations,
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
