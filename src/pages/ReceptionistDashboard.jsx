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
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 lg:p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline text-4xl text-surface-bright mb-2">Front Desk Operations</h2>
            <p className="font-body text-on-primary-container tracking-wide uppercase text-xs font-semibold">Monday, October 14, 2024 • Kigali, Rwanda</p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/admin/new-booking" className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all">
              New Booking
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-surface-bright font-semibold text-sm">Jean-Luc H.</p>
                <p className="text-on-primary-container text-xs">Duty Receptionist</p>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/30 bg-slate-800 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
          {/* Pending Reservations Column */}
          <section className="col-span-12 lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-xl text-secondary-fixed">Arrivals Requiring Approval</h3>
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                {allPending.length} Pending
              </span>
            </div>

            <div className="space-y-4">
              {allPending.length > 0 ? allPending.map((res) => (
                <div key={`${res.type || 'Room'}-${res.id}`} className="bg-slate-900/40 backdrop-blur-md rounded-xl p-6 border-l-4 border-secondary flex items-start gap-6 shadow-xl shadow-black/10 transition-all hover:bg-slate-900/60">
                  <div className="w-24 h-24 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                    {res.type === 'Dining' ? (
                      <span className="material-symbols-outlined text-4xl text-amber-700">restaurant</span>
                    ) : (
                      <span className="material-symbols-outlined text-4xl text-secondary">bed</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-headline text-lg text-surface-bright">{res.guest}</h4>
                      <span className="text-secondary font-bold text-sm">
                        {res.amount ? `$${res.amount.toLocaleString()}` : res.guests ? `${res.guests} Guests` : 'TBD'}
                      </span>
                    </div>
                    <p className="text-on-primary-container text-sm font-body mb-4">
                      {res.room || res.venue} • {res.checkIn ? `${res.checkIn} - ${res.checkOut}` : res.time ? `Tonight, ${res.time}` : 'Date Pending'}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateReservationStatus(res.id, 'Settled')}
                        className="bg-secondary px-6 py-2 rounded text-on-secondary text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateReservationStatus(res.id, 'Declined')}
                        className="bg-transparent border border-outline/30 px-6 py-2 rounded text-surface-bright text-xs font-bold uppercase tracking-widest hover:bg-surface-bright/5 transition-all"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center bg-slate-900/20 rounded-xl border-2 border-dashed border-slate-800 text-slate-500">
                  No pending arrivals at this moment.
                </div>
              )}
            </div>
          </section>

          {/* Daily Flow Column */}
          <section className="col-span-12 lg:col-span-4 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-container p-6 rounded-xl border border-outline-variant/10 shadow-lg">
                <span className="material-symbols-outlined text-secondary mb-2">login</span>
                <p className="text-on-primary-container text-xs uppercase font-bold tracking-widest">Check-Ins</p>
                <p className="text-3xl font-headline text-surface-bright">14</p>
              </div>
              <div className="bg-primary-container p-6 rounded-xl border border-outline-variant/10 shadow-lg">
                <span className="material-symbols-outlined text-secondary mb-2">logout</span>
                <p className="text-on-primary-container text-xs uppercase font-bold tracking-widest">Check-Outs</p>
                <p className="text-3xl font-headline text-surface-bright">09</p>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl overflow-hidden border border-outline-variant/5">
              <div className="p-6 border-b border-outline-variant/10 bg-slate-900/80">
                <h3 className="font-headline text-lg text-surface-bright">Upcoming Schedule</h3>
              </div>
              <div className="divide-y divide-outline-variant/5">
                {[
                  { name: "Elena Rodriguez", detail: "Room 402 • Check-out", time: "11:00 AM" },
                  { name: "VIP: Chen Wei", detail: "Presidential • Check-in", time: "02:00 PM", vip: true },
                  { name: "Marcus Thorne", detail: "Room 205 • Check-in", time: "03:30 PM" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 hover:bg-surface-bright/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded flex items-center justify-center ${item.vip ? 'bg-amber-500/10 text-amber-500' : 'bg-secondary/10 text-secondary'}`}>
                        <span className="material-symbols-outlined">{item.vip ? 'star' : 'person'}</span>
                      </div>
                      <div>
                        <p className="text-surface-bright font-medium text-sm">{item.name}</p>
                        <p className="text-on-primary-container text-xs">{item.detail}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-on-primary-container bg-primary px-2 py-1 rounded uppercase">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-container/20 p-8 rounded-xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">support_agent</span>
              <h4 className="font-headline text-surface-bright mb-2">Concierge Support</h4>
              <p className="text-xs text-on-primary-container mb-4">Direct line to housekeeping and maintenance teams.</p>
              <Link to="/staff/tasks" className="text-secondary text-[10px] font-bold uppercase tracking-widest border-b border-secondary hover:border-b-2 transition-all">Relay Request</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ReceptionistDashboard;
