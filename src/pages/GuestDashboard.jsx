import React, { useState, useEffect } from 'react';
import { useHotel } from '../context/HotelContext';
import SEO from '../components/SEO';
import { SkeletonCard, SkeletonTable } from '../components/LoadingSkeleton';
import { Link } from 'react-router-dom';

const GuestDashboard = () => {
  const { user, profile, reservations, diningReservations, signOut, loading: hotelLoading } = useHotel();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hotelLoading) setLoading(false);
  }, [hotelLoading]);

  // Filtering logic: show bookings matching user email or anonymous web bookings for 'guest' role
  const guestReservations = reservations.filter(res =>
    res.guest === user?.email ||
    (user?.role === 'guest' && (res.guest === 'Website Lead' || res.guest === 'Guest from Web'))
  );
  const guestDining = diningReservations.filter(res =>
    res.guest === user?.email ||
    (user?.role === 'guest' && res.guest === 'Guest from Web')
  );

  return (
    <div className="min-h-screen bg-background font-body text-on-surface">
      <SEO title="My Sanctuary" description="Manage your stays and experiences at Gloria Hotel." />

      {/* Global Guest Navigation Header */}
      <nav className="bg-white border-b border-outline-variant/30 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link to="/" className="font-serif text-2xl text-primary font-bold tracking-tight">Gloria Hotel</Link>
            <div className="hidden md:flex gap-8">
              <Link to="/rooms" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">Rooms & Suites</Link>
              <Link to="/dining" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">Dining</Link>
              <Link to="/events" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">Events</Link>
              <Link to="/about" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">About</Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/rooms" className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/10">Book a Stay</Link>
            <button
              onClick={signOut}
              className="text-[10px] font-bold uppercase tracking-widest text-secondary border border-secondary/20 px-4 py-2 rounded-lg hover:bg-secondary/5 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="p-8 lg:p-12 max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-16">
          <div>
            <span className="text-secondary font-label text-[10px] uppercase tracking-widest mb-2 block font-bold">Personal Sanctuary</span>
            <h1 className="font-headline text-5xl text-primary mb-2 tracking-tight transition-all">Welcome, {profile?.full_name || user?.email?.split('@')[0] || 'Guest'}</h1>
            <p className="text-on-surface-variant text-sm font-medium opacity-70">Review and curate your upcoming experiences in Kigali.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Stays */}
          <section className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-4">
                <h2 className="font-headline text-2xl text-primary flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">bed</span>
                  Your Upcoming Stays
                </h2>
                <Link to="/rooms" className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline">New Booking</Link>
              </div>

              <div className="space-y-6">
                {loading ? <SkeletonCard /> : guestReservations.length > 0 ? guestReservations.map((res) => (
                  <div key={res.id} className="bg-white rounded-2xl p-10 border border-outline-variant/30 shadow-editorial flex flex-col md:row justify-between gap-8 transition-all hover:shadow-2xl border-l-4 border-l-secondary">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-headline text-2xl text-primary">{res.room}</h3>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                          res.status === 'Settled' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {res.status}
                        </span>
                      </div>
                      <p className="text-on-surface-variant font-medium text-sm mb-6">{res.dates || 'Dates to be confirmed by concierge'}</p>
                      <div className="flex gap-6 items-center">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-lg">qr_code</span>
                          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter opacity-40">GH-{res.id}88</span>
                        </div>
                        <div className="h-4 w-px bg-outline-variant/30"></div>
                        <p className="font-serif text-xl text-primary font-bold tracking-tight">{res.price || 'TBD'}</p>
                      </div>
                    </div>
                    <div className="flex items-end gap-4">
                      <button className="flex-1 bg-surface-container-low text-on-surface-variant py-3 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-surface-container-high transition-colors">Modify</button>
                      <button className="flex-1 border border-outline-variant/30 text-on-surface-variant py-3 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-surface-container-low transition-colors">Details</button>
                    </div>
                  </div>
                )) : (
                  <div className="bg-surface-container-low/20 rounded-2xl p-20 text-center border-2 border-dashed border-outline-variant/40">
                    <span className="material-symbols-outlined text-5xl text-outline-variant/40 mb-4">calendar_today</span>
                    <p className="text-on-surface-variant font-medium uppercase tracking-widest text-xs opacity-60">No active stays in your manifest.</p>
                    <Link to="/rooms" className="inline-block mt-6 text-secondary text-[10px] font-bold uppercase tracking-widest hover:underline">Explore Rooms →</Link>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-4">
                <h2 className="font-headline text-2xl text-primary flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">restaurant</span>
                  Dining & Events
                </h2>
                <Link to="/dining" className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline">Reserve Table</Link>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden border border-outline-variant/30 shadow-editorial">
                {loading ? <SkeletonTable rows={2} /> : guestDining.length > 0 ? (
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low/30 border-b border-outline-variant/15">
                      <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                        <th className="px-8 py-5">Experience</th>
                        <th className="px-8 py-5">Schedule</th>
                        <th className="px-8 py-5">Party</th>
                        <th className="px-8 py-5 text-right">Confirmation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {guestDining.map((res) => (
                        <tr key={res.id} className="hover:bg-surface-container-low/20 transition-colors">
                          <td className="px-8 py-6 text-sm text-primary font-bold">{res.venue}</td>
                          <td className="px-8 py-6 text-sm text-on-surface-variant font-medium">{res.time}</td>
                          <td className="px-8 py-6 text-sm text-on-surface-variant font-medium">{res.guests} Guests</td>
                          <td className="px-8 py-6 text-right">
                            <span className="inline-flex px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-amber-50 text-amber-600">{res.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-16 text-center text-on-surface-variant opacity-40 italic text-sm">
                    No culinary experiences scheduled at this time.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Column: Profile & Tools */}
          <aside className="space-y-8">
            <div className="bg-primary rounded-3xl p-10 text-on-primary shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                 <span className="text-secondary-fixed text-[9px] font-bold uppercase tracking-[0.2em] mb-4 block">24/7 Service</span>
                 <h3 className="font-headline text-2xl text-secondary-fixed mb-6">Bespoke Concierge</h3>
                 <p className="text-sm text-on-primary/70 mb-10 leading-relaxed font-medium">Need to modify your stay, arrange a private transport, or request a curated Kigali tour? Our elite team is at your disposal.</p>
                 <button className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all shadow-xl group-hover:-translate-y-1 duration-300">
                   Initiate Request
                 </button>
               </div>
               <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-[12rem] text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">support_agent</span>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-outline-variant/30 shadow-editorial">
              <h3 className="font-headline text-xl text-primary mb-8 border-b border-outline-variant/10 pb-4">Restorative Loyalty</h3>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                  <span className="material-symbols-outlined text-3xl">stars</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Silver Sanctuary Tier</p>
                  <p className="text-primary font-bold text-lg">Elite Guest</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="bg-secondary h-full shadow-[0_0_8px_rgba(119,90,25,0.4)]" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                   <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">6 nights to Gold</p>
                   <p className="text-[10px] text-secondary font-bold uppercase tracking-widest hover:underline cursor-pointer">Benefits →</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low/30 rounded-3xl p-10 border border-outline-variant/10">
               <h3 className="font-headline text-lg text-primary mb-6 italic">Editor's Note</h3>
               <p className="text-xs text-on-surface-variant leading-relaxed opacity-80">
                 "Our promise is not just a room, but a rhythmic return to oneself. Every stay in Kigali is a new chapter in your restorative legacy."
               </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default GuestDashboard;
