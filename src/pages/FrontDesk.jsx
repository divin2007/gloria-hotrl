import React from 'react';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const FrontDesk = () => {
  const { reservations, diningReservations, updateReservationStatus } = useHotel();

  const pendingRooms = reservations.filter(res => res.status === 'Pending');
  const pendingDining = diningReservations.filter(res => res.status === 'Pending');

  const allPending = [...pendingRooms, ...pendingDining].sort((a, b) => a.id - b.id);

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar active="front-desk" />
      <main className="ml-64 flex-1 p-8 lg:p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline text-4xl text-surface-bright mb-2">Front Desk Operations</h2>
            <p className="font-body text-on-primary-container tracking-wide uppercase text-xs font-semibold">Monday, October 14, 2024 • Kigali, Rwanda</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-surface-bright font-semibold text-sm">Jean-Luc Habimana</p>
              <p className="text-on-primary-container text-xs">Duty Manager</p>
            </div>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/30 bg-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">person</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Pending Reservations Column */}
          <section className="col-span-12 lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-xl text-secondary-fixed">Pending Approval</h3>
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                {allPending.length} Requests
              </span>
            </div>

            {allPending.map((res) => (
              <div key={`${res.type || 'Room'}-${res.id}`} className="bg-slate-900/40 backdrop-blur-md rounded-xl p-6 border-l-4 border-secondary flex items-start gap-6 shadow-xl shadow-black/10">
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
                      {res.amount ? `$${res.amount.toLocaleString()}` : res.guests ? `${res.guests} Guests` : ''}
                    </span>
                  </div>
                  <p className="text-on-primary-container text-sm font-body mb-4">
                    {res.room || res.venue} • {res.checkIn ? `${res.checkIn} - ${res.checkOut}` : res.time ? `Tonight, ${res.time}` : 'TBD'}
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
            ))}
          </section>

          {/* Daily Flow Column */}
          <section className="col-span-12 lg:col-span-5 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-container p-6 rounded-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-secondary mb-2">login</span>
                <p className="text-on-primary-container text-xs uppercase font-bold tracking-widest">Check-Ins</p>
                <p className="text-3xl font-headline text-surface-bright">14</p>
              </div>
              <div className="bg-primary-container p-6 rounded-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-secondary mb-2">logout</span>
                <p className="text-on-primary-container text-xs uppercase font-bold tracking-widest">Check-Outs</p>
                <p className="text-3xl font-headline text-surface-bright">09</p>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl overflow-hidden border border-outline-variant/5">
              <div className="p-6 border-b border-outline-variant/10 bg-slate-900/80">
                <h3 className="font-headline text-lg text-surface-bright">Daily Schedule</h3>
              </div>
              <div className="divide-y divide-outline-variant/5">
                {[
                  { name: "Elena Rodriguez", detail: "Room 402 • Check-out", time: "11:00 AM" },
                  { name: "VIP: Chen Wei", detail: "Presidential • Check-in", time: "02:00 PM", vip: true },
                  { name: "Marcus Thorne", detail: "Room 205 • Check-in", time: "03:30 PM" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-surface-bright/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded flex items-center justify-center ${item.vip ? 'bg-amber-500/10 text-amber-500' : 'bg-secondary/10 text-secondary'}`}>
                        <span className="material-symbols-outlined">{item.vip ? 'star' : 'person'}</span>
                      </div>
                      <div>
                        <p className="text-surface-bright font-medium text-sm">{item.name}</p>
                        <p className="text-on-primary-container text-xs">{item.detail}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-on-primary-container bg-primary px-2 py-1 rounded">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-900/80 text-center">
                <button className="text-secondary font-bold text-xs uppercase tracking-widest hover:underline">View Full Manifest</button>
              </div>
            </div>

            <div className="relative h-48 rounded-xl overflow-hidden group">
              <img className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCznsh_XJvUKo0GFvWil-EjOpOPxlqG7D2nKfUhbJI7tdtPgT1fvg8_YgPKQljl9tGgVW0gLK5LXXsFY9QraZrNQk3cqbVOISUK-Fsa4dFemeWlBOlyax6ruB80-a-YcsA2J-2vBNzfrkGHZIiruK0SoGuZZTjDsfu8BrbL00lQw2neE1hbOQjU9S__PG8SbpkIVan6VmkugFR8ADjKZoXXoXqBo9pQW_2iLWTjMDa4PyQy--07BrM0zbJGuGOeA-sE0c1Xvv6bhCLm"/>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <p className="text-on-primary-container text-xs uppercase font-bold tracking-widest mb-1">Housekeeping Status</p>
                <h4 className="text-surface-bright font-headline text-xl">82% Rooms Ready</h4>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FrontDesk;
