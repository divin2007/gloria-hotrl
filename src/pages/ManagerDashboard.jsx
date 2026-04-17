import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';
import { SkeletonCard, SkeletonTable } from '../components/LoadingSkeleton';
import SEO from '../components/SEO';

const ManagerDashboard = () => {
  const { reservations, staff } = useHotel();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <SEO title="Manager Dashboard" noindex />
      <Sidebar />
      <main className="ml-64 flex-1 p-8 lg:p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="font-headline text-4xl text-primary mb-2">Executive Overview</h1>
            <p className="text-on-surface-variant font-body tracking-wide opacity-80 uppercase text-[10px] font-bold">Gloria Hotel Kigali • Management Dashboard</p>
          </div>
          <div className="flex space-x-6 items-center">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Current Occupancy</p>
              <p className="text-2xl font-serif text-primary">94.2%</p>
            </div>
            <div className="h-10 w-px bg-outline-variant/30"></div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Duty Manager</p>
                <p className="font-headline text-lg text-primary">Alexandre K.</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-secondary/20 bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Performance Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {loading ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />) : (
            <>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial border-l-4 border-l-secondary">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Guest Satisfaction</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-headline text-3xl text-primary">94%</span>
                  <span className="text-secondary text-xs font-bold">+2.4%</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Task Efficiency</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-headline text-3xl text-primary">88%</span>
                  <div className="w-20 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Staff On-Duty</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-headline text-3xl text-primary">42</span>
                  <span className="text-on-surface-variant text-xs font-bold">8 Pending</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Revenue (Daily)</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-headline text-3xl text-primary">$4.2k</span>
                  <span className="text-secondary text-xs font-bold uppercase tracking-widest">Optimal</span>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Main Grid Metrics */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-12 md:col-span-8 bg-primary rounded-xl p-10 text-on-primary flex justify-between items-center relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <span className="text-secondary-fixed text-[10px] font-bold uppercase tracking-widest mb-4 block">Total Revenue (Monthly)</span>
              <div className="flex items-baseline space-x-4">
                <h2 className="font-headline text-5xl">$142,850</h2>
                <span className="text-secondary-fixed-dim text-sm flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                  +12.4% vs prev
                </span>
              </div>
              <div className="mt-10 flex space-x-12">
                <div>
                  <p className="text-[10px] text-on-primary/60 mb-1 uppercase tracking-tighter">Rooms</p>
                  <p className="text-xl font-serif">$98,400</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-primary/60 mb-1 uppercase tracking-tighter">Dining</p>
                  <p className="text-xl font-serif">$32,150</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-primary/60 mb-1 uppercase tracking-tighter">Events</p>
                  <p className="text-xl font-serif">$12,300</p>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-5 flex items-end justify-around px-8 pb-4">
               {[40, 65, 50, 85, 70, 95].map((h, i) => (
                 <div key={i} className="w-4 bg-secondary rounded-t-sm" style={{ height: `${h}%` }}></div>
               ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 flex flex-col justify-between shadow-editorial">
            {loading ? <SkeletonCard /> : (
              <>
                <div>
                  <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-4 block">New Reservations</span>
                  <div className="text-4xl font-serif text-primary">48 <span className="text-sm font-sans text-on-surface-variant font-normal">Today</span></div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">Direct Website</span>
                    <span className="font-bold text-primary">62%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-[62%]"></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">OTA Channels</span>
                    <span className="font-bold text-primary">38%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="bg-secondary/30 h-full w-[38%]"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-editorial">
            <div className="px-8 py-6 border-b border-outline-variant/15 flex justify-between items-center bg-surface-container-low/30">
              <h3 className="font-serif text-lg text-primary">Recent Transactions</h3>
              <Link to="/admin/reservations" className="text-[10px] uppercase tracking-widest text-secondary hover:text-amber-700 transition-colors font-bold">View Audit Log</Link>
            </div>
            <div className="overflow-x-auto">
              {loading ? <SkeletonTable rows={4} /> : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/15 font-bold">
                      <th className="px-8 py-4">Guest</th>
                      <th className="px-8 py-4">Room / Suite</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {reservations.slice(0, 4).map((res) => (
                      <tr key={res.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-[10px] text-secondary mr-3 font-serif font-bold">
                              {res.guest.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-medium text-on-surface">{res.guest}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm text-on-surface-variant">{res.room}</td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            res.status === 'Settled' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {res.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-sm font-serif text-on-surface text-right font-bold">${res.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          <section className="lg:col-span-1 space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-editorial">
              <h3 className="font-serif text-lg text-primary mb-6 flex justify-between items-center">
                Staff Activity
                <span className="material-symbols-outlined text-on-surface-variant opacity-30">more_vert</span>
              </h3>
              <div className="space-y-6">
                {loading ? [...Array(3)].map((_, i) => <SkeletonLine key={i} className="h-10" />) : staff.slice(0, 3).map((s) => (
                  <div key={s.id} className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-on-surface">{s.name}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter font-bold">{s.role}</p>
                    </div>
                    <span className="text-[8px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Online</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/5 p-8 rounded-xl border-2 border-dashed border-secondary/20 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm">
                <span className="material-symbols-outlined">assignment_add</span>
              </div>
              <div className="text-center">
                <h4 className="font-headline text-lg text-primary">Task Assignment</h4>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">Operations Workflow</p>
              </div>
              <Link to="/staff/tasks" className="w-full text-center py-3 bg-secondary text-on-secondary font-bold text-[10px] uppercase tracking-widest rounded-lg hover:brightness-110 transition-all">Open Task Manager</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
