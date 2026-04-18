import React from 'react';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const FrontDesk = () => {
  const { reservations, diningReservations, updateReservationStatus, loading } = useHotel();

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
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-primary font-bold text-sm">Jean-Luc Habimana</p>
              <p className="text-on-surface-variant text-[10px] font-bold uppercase opacity-60">Duty Manager</p>
            </div>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/20 bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Pending Reservations Column */}
          <section className="col-span-12 lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-xl text-primary">Pending Approval</h3>
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {allPending.length} Requests
              </span>
            </div>

            {loading ? <SkeletonTable rows={3} /> : allPending.map((res) => (
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
                      {res.amount ? `$${res.amount.toLocaleString()}` : res.guests ? `${res.guests} Guests` : ''}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm font-medium mb-4">
                    {res.room || res.venue} • {res.checkIn ? `${res.checkIn} - ${res.checkOut}` : res.time ? `Tonight, ${res.time}` : 'TBD'}
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
            ))}
          </section>

          {/* Daily Flow Column */}
          <section className="col-span-12 lg:col-span-5 space-y-6">
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
                <h3 className="font-headline text-lg text-primary">Daily Schedule</h3>
              </div>
              <div className="divide-y divide-outline-variant/10">
                {[
                  { name: "Elena Rodriguez", detail: "Room 402 • Check-out", time: "11:00 AM" },
                  { name: "VIP: Chen Wei", detail: "Presidential • Check-in", time: "02:00 PM", vip: true },
                  { name: "Marcus Thorne", detail: "Room 205 • Check-in", time: "03:30 PM" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-surface-container-low/30 transition-colors">
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
              <div className="p-4 bg-surface-container-low/20 text-center">
                <button className="text-secondary font-bold text-[10px] uppercase tracking-widest hover:underline">View Full Manifest</button>
              </div>
            </div>

            <div className="relative h-48 rounded-xl overflow-hidden group shadow-editorial border border-outline-variant/30">
              <img className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCznsh_XJvUKo0GFvWil-EjOpOPxlqG7D2nKfUhbJI7tdtPgT1fvg8_YgPKQljl9tGgVW0gLK5LXXsFY9QraZrNQk3cqbVOISUK-Fsa4dFemeWlBOlyax6ruB80-a-YcsA2J-2vBNzfrkGHZIiruK0SoGuZZTjDsfu8BrbL00lQw2neE1hbOQjU9S__PG8SbpkIVan6VmkugFR8ADjKZoXXoXqBo9pQW_2iLWTjMDa4PyQy--07BrM0zbJGuGOeA-sE0c1Xvv6bhCLm"/>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mb-1 opacity-70">Housekeeping Status</p>
                <h4 className="text-primary font-headline text-xl">82% Rooms Ready</h4>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FrontDesk;
