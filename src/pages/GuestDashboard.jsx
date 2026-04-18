import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import SEO from '../components/SEO';
import { SkeletonCard, SkeletonTable } from '../components/LoadingSkeleton';

const GuestDashboard = () => {
  const { user, reservations, diningReservations, logout } = useHotel();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtering for current guest
  const guestReservations = reservations.filter(res =>
    res.guest === user?.email ||
    (user?.role === 'guest' && (res.guest === 'Website Lead' || res.guest === 'Guest from Web'))
  );
  const guestDining = diningReservations.filter(res => res.guest === user?.email);

  return (
    <div className="min-h-screen bg-background font-body text-on-surface">
      <SEO title="My Sanctuary" description="Manage your stays and experiences at Gloria Hotel." />

      {/* Dashboard Sub-Nav */}
      <nav className="bg-white border-b border-outline-variant/30 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-serif text-xl text-primary font-bold">Gloria Hotel</Link>
            <div className="hidden md:flex gap-6">
              <Link to="/rooms" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">Browse Rooms</Link>
              <Link to="/dining" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">Reserve Dining</Link>
              <Link to="/events" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">Events</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/rooms" className="bg-primary text-on-primary px-4 py-2 rounded text-[9px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-sm">New Booking</Link>
            <button
              onClick={logout}
              className="text-[9px] font-bold uppercase tracking-widest text-secondary border border-secondary/20 px-3 py-2 rounded hover:bg-secondary/5 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="p-8 lg:p-12">
        <header className="max-w-6xl mx-auto flex justify-between items-end mb-16">
          <div>
            <span className="text-secondary font-label text-[10px] uppercase tracking-widest mb-2 block font-bold">Guest Portal</span>
            <h1 className="font-headline text-4xl text-primary mb-2">Welcome Back, {user?.email?.split('@')[0]}</h1>
            <p className="text-on-surface-variant text-sm">Review your upcoming stays and curated experiences.</p>
          </div>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Stays */}
          <section className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-headline text-2xl text-primary mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">bed</span>
                Upcoming Stays
              </h2>

              <div className="space-y-4">
                {loading ? <SkeletonCard /> : guestReservations.length > 0 ? guestReservations.map((res) => (
                  <div key={res.id} className="bg-white rounded-2xl p-8 border border-outline-variant/30 shadow-editorial flex flex-col md:flex-row justify-between gap-6 transition-all hover:shadow-2xl">
                    <div>
                      <h3 className="font-headline text-xl text-primary mb-1">{res.room}</h3>
                      <p className="text-on-surface-variant text-sm mb-4">{res.dates || 'Dates to be confirmed'}</p>
                      <div className="flex gap-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                          res.status === 'Settled' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {res.status}
                        </span>
                        <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter self-center opacity-40">Booking ID: #GH-{res.id}88</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-between">
                      <p className="font-serif text-2xl text-primary font-bold">{res.price || 'TBD'}</p>
                      <button className="text-secondary text-[10px] font-bold uppercase tracking-widest hover:underline mt-4">View Details</button>
                    </div>
                  </div>
                )) : (
                  <div className="bg-surface-container-low/20 rounded-2xl p-16 text-center border-2 border-dashed border-outline-variant/40">
                    <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">calendar_today</span>
                    <p className="text-on-surface-variant font-medium uppercase tracking-widest text-xs">No upcoming reservations found.</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="font-headline text-2xl text-primary mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">restaurant</span>
                Dining Experiences
              </h2>
              <div className="bg-white rounded-2xl overflow-hidden border border-outline-variant/30 shadow-editorial">
                {loading ? <SkeletonTable rows={2} /> : guestDining.length > 0 ? (
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low/30 border-b border-outline-variant/15">
                      <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                        <th className="px-8 py-4">Venue</th>
                        <th className="px-8 py-4">Time</th>
                        <th className="px-8 py-4">Guests</th>
                        <th className="px-8 py-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {guestDining.map((res) => (
                        <tr key={res.id}>
                          <td className="px-8 py-5 text-sm text-primary font-bold">{res.venue}</td>
                          <td className="px-8 py-5 text-sm text-on-surface-variant">{res.time}</td>
                          <td className="px-8 py-5 text-sm text-on-surface-variant">{res.guests} Guests</td>
                          <td className="px-8 py-5 text-right">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600">{res.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-12 text-center text-on-surface-variant opacity-40 italic text-sm">
                    You have no dining reservations scheduled.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Column: Profile & Tools */}
          <aside className="space-y-8">
            <div className="bg-primary rounded-2xl p-8 text-on-primary shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="font-headline text-xl text-secondary-fixed mb-6">Concierge Support</h3>
                 <p className="text-sm text-on-primary/70 mb-8 leading-relaxed">Need to modify your stay or request a bespoke arrangement? Our elite team is at your service.</p>
                 <button className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all shadow-lg">
                   Message Concierge
                 </button>
               </div>
               <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/5 rotate-12">support_agent</span>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-outline-variant/30 shadow-editorial">
              <h3 className="font-headline text-xl text-primary mb-6">Membership Level</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">stars</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary">Silver Tier</p>
                  <p className="text-primary font-bold">Restorative Member</p>
                </div>
              </div>
              <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mb-2">
                <div className="bg-secondary h-full" style={{ width: '40%' }}></div>
              </div>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">6 more nights to Gold</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default GuestDashboard;
