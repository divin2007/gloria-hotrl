import React from 'react';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const ReceptionistDashboard = () => {
  const { reservations, diningReservations, updateReservationStatus } = useHotel();

  const pendingRooms = reservations.filter(res => res.status === 'Pending');
  const pendingDining = diningReservations.filter(res => res.status === 'Pending');

  const allPending = [...pendingRooms, ...pendingDining].sort((a, b) => a.id - b.id);

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 lg:p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline text-4xl text-primary mb-2">Front Desk Operations</h2>
            <p className="font-body text-on-surface-variant tracking-wide uppercase text-[10px] font-bold opacity-80">Monday, October 14, 2024 • Kigali, Rwanda</p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/admin/new-booking" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/10">
              New Booking
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-primary font-bold text-sm">Jean-Luc H.</p>
                <p className="text-on-surface-variant text-[10px] font-bold uppercase opacity-60">Duty Receptionist</p>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/20 bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
          {/* Pending Reservations Column */}
          <section className="col-span-12 lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-xl text-primary">Arrivals Requiring Approval</h3>
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {allPending.length} Pending
              </span>
            </div>

            <div className="space-y-4">
              {allPending.length > 0 ? allPending.map((res) => (
                <div key={`${res.type || 'Room'}-${res.id}`} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 flex items-start gap-6 shadow-editorial transition-all hover:bg-surface-container-low/20">
                  <div className="w-24 h-24 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 overflow-hidden text-secondary">
                    {res.type === 'Dining' ? (
                      <span className="material-symbols-outlined text-4xl">restaurant</span>
                    ) : (
                      <span className="material-symbols-outlined text-4xl">bed</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-headline text-lg text-primary">{res.guest}</h4>
                      <span className="text-secondary font-bold text-sm">
                        {res.amount ? `$${res.amount.toLocaleString()}` : res.guests ? `${res.guests} Guests` : 'TBD'}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm font-medium mb-4">
                      {res.room || res.venue} • {res.checkIn ? `${res.checkIn} - ${res.checkOut}` : res.time ? `Tonight, ${res.time}` : 'Date Pending'}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateReservationStatus(res.id, 'Settled')}
                        className="bg-secondary px-6 py-2 rounded text-on-secondary text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateReservationStatus(res.id, 'Declined')}
                        className="bg-transparent border border-outline/30 px-6 py-2 rounded text-on-surface-variant text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container-low transition-all"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-16 text-center bg-surface-container-low/20 rounded-xl border-2 border-dashed border-outline-variant/40 text-on-surface-variant opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-4 block">fact_check</span>
                  <p className="font-body text-sm font-medium uppercase tracking-widest">No pending arrivals at this moment.</p>
                </div>
              )}
            </div>
          </section>

          {/* Daily Flow Column */}
          <section className="col-span-12 lg:col-span-4 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial">
                <span className="material-symbols-outlined text-secondary mb-2">login</span>
                <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest opacity-60">Check-Ins</p>
                <p className="text-3xl font-headline text-primary">14</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial">
                <span className="material-symbols-outlined text-secondary mb-2">logout</span>
                <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest opacity-60">Check-Outs</p>
                <p className="text-3xl font-headline text-primary">09</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 shadow-editorial">
              <div className="p-6 border-b border-outline-variant/15 bg-surface-container-low/30">
                <h3 className="font-headline text-lg text-primary">Schedule Overview</h3>
              </div>
              <div className="divide-y divide-outline-variant/10">
                {[
                  { name: "Elena Rodriguez", detail: "Room 402 • Check-out", time: "11:00 AM" },
                  { name: "VIP: Chen Wei", detail: "Presidential • Check-in", time: "02:00 PM", vip: true },
                  { name: "Marcus Thorne", detail: "Room 205 • Check-in", time: "03:30 PM" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 hover:bg-surface-container-low/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded flex items-center justify-center ${item.vip ? 'bg-amber-50 text-amber-600' : 'bg-secondary/10 text-secondary'}`}>
                        <span className="material-symbols-outlined">{item.vip ? 'star' : 'person'}</span>
                      </div>
                      <div>
                        <p className="text-on-surface font-semibold text-sm">{item.name}</p>
                        <p className="text-on-surface-variant text-[10px] font-bold uppercase opacity-60">{item.detail}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-primary bg-surface-container-high px-2 py-1 rounded uppercase tracking-tighter">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/5 p-8 rounded-xl border-2 border-dashed border-secondary/20 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">support_agent</span>
              <h4 className="font-headline text-primary mb-2">Concierge Support</h4>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">Direct line to facility housekeeping and maintenance teams.</p>
              <Link to="/staff/tasks" className="text-secondary text-[10px] font-bold uppercase tracking-widest border-b border-secondary hover:border-b-2 transition-all">Relay Request</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ReceptionistDashboard;
