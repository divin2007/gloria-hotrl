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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.guest) newErrors.guest = "Guest name is required";
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    if (formData.checkIn && formData.checkOut && new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      newErrors.checkOut = "Check-out must be after check-in";
    }
    if (!formData.amount || formData.amount <= 0) newErrors.amount = "Invalid amount";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    addReservation({
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      type: 'Room'
    }).then(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => navigate('/admin/reservations'), 2000);
    }).catch(err => {
      setIsSubmitting(false);
      alert('Error creating booking: ' + err.message);
    });
  };

  if (success) {
    return (
      <div className="flex bg-background min-h-screen font-body items-center justify-center">
        <div className="text-center p-12 bg-white rounded-2xl shadow-editorial border border-outline-variant/30 max-w-md mx-auto">
          <span className="material-symbols-outlined text-emerald-500 text-6xl mb-4 animate-bounce">check_circle</span>
          <h2 className="font-headline text-3xl text-primary mb-2">Booking Created</h2>
          <p className="text-on-surface-variant mb-6">Reservation for {formData.guest} has been successfully added to the manifest.</p>
          <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">Redirecting to reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 flex-1 p-10 max-w-5xl">
        <header className="mb-10">
          <h1 className="font-headline text-3xl text-primary mb-2">Create New Reservation</h1>
          <p className="text-on-surface-variant font-body text-sm opacity-80 uppercase text-[10px] font-bold">Manual booking entry for walk-ins and phone reservations.</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-2xl p-10 border border-outline-variant/30 shadow-editorial space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Guest Full Name</label>
              <input
                type="text"
                placeholder="Michael Henderson"
                className={`w-full bg-surface-container-low border-none border-b-2 ${errors.guest ? 'border-error' : 'border-transparent'} focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm transition-all`}
                value={formData.guest}
                onChange={(e) => {
                  setFormData({...formData, guest: e.target.value});
                  if (errors.guest) setErrors({...errors, guest: null});
                }}
              />
              {errors.guest && <p className="text-[10px] text-error font-bold">{errors.guest}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Room Category</label>
              <select
                className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm"
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
                type="date"
                className={`w-full bg-surface-container-low border-none border-b-2 ${errors.checkIn ? 'border-error' : 'border-transparent'} focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm`}
                value={formData.checkIn}
                onChange={(e) => {
                  setFormData({...formData, checkIn: e.target.value});
                  if (errors.checkIn) setErrors({...errors, checkIn: null});
                }}
              />
              {errors.checkIn && <p className="text-[10px] text-error font-bold">{errors.checkIn}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Check-Out Date</label>
              <input
                type="date"
                className={`w-full bg-surface-container-low border-none border-b-2 ${errors.checkOut ? 'border-error' : 'border-transparent'} focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm`}
                value={formData.checkOut}
                onChange={(e) => {
                  setFormData({...formData, checkOut: e.target.value});
                  if (errors.checkOut) setErrors({...errors, checkOut: null});
                }}
              />
              {errors.checkOut && <p className="text-[10px] text-error font-bold">{errors.checkOut}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Total Rate (USD)</label>
              <input
                type="number"
                placeholder="0.00"
                className={`w-full bg-surface-container-low border-none border-b-2 ${errors.amount ? 'border-error' : 'border-transparent'} focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm`}
                value={formData.amount}
                onChange={(e) => {
                  setFormData({...formData, amount: e.target.value});
                  if (errors.amount) setErrors({...errors, amount: null});
                }}
              />
              {errors.amount && <p className="text-[10px] text-error font-bold">{errors.amount}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Email Address</label>
              <input
                type="email"
                placeholder="guest@example.com"
                className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-outline-variant/15">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-12 bg-white border border-outline-variant text-on-surface-variant py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-surface-container-low transition-all"
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
