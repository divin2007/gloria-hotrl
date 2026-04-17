import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const NewBooking = () => {
  const { addReservation } = useHotel();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    guest: '',
    room: 'Standard King',
    checkIn: '',
    checkOut: '',
    amount: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addReservation({
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      type: 'Room'
    });
    navigate('/admin/reservations');
  };

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-10 max-w-5xl">
        <header className="mb-10">
          <h1 className="font-headline text-3xl text-secondary-fixed mb-2">Create New Reservation</h1>
          <p className="text-on-primary-container font-body text-sm opacity-80">Manual booking entry for walk-ins and phone reservations.</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-slate-900 rounded-2xl p-10 border border-slate-800 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Guest Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Michael Henderson"
                className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                value={formData.guest}
                onChange={(e) => setFormData({...formData, guest: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Room Category</label>
              <select
                className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
              >
                <option>Standard King</option>
                <option>Deluxe Suite</option>
                <option>Executive Penthouse</option>
                <option>Savannah Suite</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Check-In Date</label>
              <input
                required
                type="date"
                className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                value={formData.checkIn}
                onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Check-Out Date</label>
              <input
                required
                type="date"
                className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                value={formData.checkOut}
                onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Total Rate (USD)</label>
              <input
                required
                type="number"
                placeholder="0.00"
                className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Email Address</label>
              <input
                type="email"
                placeholder="guest@example.com"
                className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Special Requests & Notes</label>
            <textarea
              rows="4"
              placeholder="Allergies, late arrival, extra towels..."
              className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-secondary text-on-secondary py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
            >
              Confirm Reservation
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-10 bg-transparent border border-outline/30 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewBooking;
