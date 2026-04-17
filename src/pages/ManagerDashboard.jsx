import React from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const ManagerDashboard = () => {
  const { reservations, staff, tasks } = useHotel();

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 text-on-primary">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="font-headline text-4xl text-secondary-fixed mb-2">Executive Overview</h1>
            <p className="text-on-primary-container font-body tracking-wide opacity-80">Gloria Hotel Kigali • General Management Dashboard</p>
          </div>
          <div className="flex space-x-6 items-center">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Current Occupancy</p>
              <p className="text-2xl font-serif">94.2%</p>
            </div>
            <div className="h-10 w-px bg-slate-800"></div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duty Manager</p>
                <p className="font-headline text-lg text-surface-bright">Alexandre K.</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-secondary bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Performance Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-primary-container p-6 rounded-xl border-l-4 border-secondary shadow-ambient">
            <p className="text-xs font-bold text-on-primary-container uppercase tracking-widest">Guest Satisfaction</p>
            <div className="flex items-end justify-between mt-2">
              <span className="font-headline text-3xl text-surface-bright">94%</span>
              <span className="text-secondary text-xs font-bold">+2.4%</span>
            </div>
          </div>
          <div className="bg-primary-container p-6 rounded-xl shadow-ambient">
            <p className="text-xs font-bold text-on-primary-container uppercase tracking-widest">Task Efficiency</p>
            <div className="flex items-end justify-between mt-2">
              <span className="font-headline text-3xl text-surface-bright">88%</span>
              <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>
          <div className="bg-primary-container p-6 rounded-xl shadow-ambient">
            <p className="text-xs font-bold text-on-primary-container uppercase tracking-widest">Staff On-Duty</p>
            <div className="flex items-end justify-between mt-2">
              <span className="font-headline text-3xl text-surface-bright">42</span>
              <span className="text-on-primary-container text-xs font-bold">8 Pending</span>
            </div>
          </div>
          <div className="bg-primary-container p-6 rounded-xl shadow-ambient">
            <p className="text-xs font-bold text-on-primary-container uppercase tracking-widest">Revenue (Daily)</p>
            <div className="flex items-end justify-between mt-2">
              <span className="font-headline text-3xl text-surface-bright">$4.2k</span>
              <span className="text-secondary text-xs font-bold">Optimal</span>
            </div>
          </div>
        </section>

        {/* Main Grid Metrics */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="col-span-12 md:col-span-8 bg-primary-container rounded-xl p-8 signature-gradient shadow-ambient flex justify-between items-center relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-secondary-fixed text-xs font-bold uppercase tracking-widest mb-4 block">Total Revenue (Monthly)</span>
              <div className="flex items-baseline space-x-4">
                <h2 className="font-headline text-5xl">$142,850</h2>
                <span className="text-blue-400 text-sm flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                  +12.4% vs prev
                </span>
              </div>
              <div className="mt-8 flex space-x-12">
                <div>
                  <p className="text-xs text-on-primary-container mb-1 opacity-60 uppercase tracking-tighter">Rooms</p>
                  <p className="text-lg font-serif">$98,400</p>
                </div>
                <div>
                  <p className="text-xs text-on-primary-container mb-1 opacity-60 uppercase tracking-tighter">Dining</p>
                  <p className="text-lg font-serif">$32,150</p>
                </div>
                <div>
                  <p className="text-xs text-on-primary-container mb-1 opacity-60 uppercase tracking-tighter">Events</p>
                  <p className="text-lg font-serif">$12,300</p>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 group-hover:opacity-20 transition-opacity flex items-end justify-around px-8 pb-4">
               {[40, 65, 50, 85, 70, 95].map((h, i) => (
                 <div key={i} className="w-4 bg-secondary rounded-t-sm" style={{ height: `${h}%` }}></div>
               ))}
            </div>
          </div>

          {/* Booking Velocity */}
          <div className="col-span-12 md:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-secondary-fixed text-xs font-bold uppercase tracking-widest mb-4 block">New Reservations</span>
              <div className="text-4xl font-serif">48 <span className="text-sm font-sans text-slate-500">Today</span></div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Direct Website</span>
                <span className="font-medium">62%</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[62%]"></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">OTA Channels</span>
                <span className="font-medium">38%</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-secondary/40 h-full w-[38%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tables and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-ambient">
            <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-serif text-lg text-slate-200">Recent Transactions</h3>
              <Link to="/admin/reservations" className="text-xs uppercase tracking-widest text-secondary hover:text-amber-400 transition-colors font-bold">View Audit Log</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-800">
                    <th className="px-8 py-4 font-bold">Guest</th>
                    <th className="px-8 py-4 font-bold">Room / Suite</th>
                    <th className="px-8 py-4 font-bold">Payment Status</th>
                    <th className="px-8 py-4 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {reservations.slice(0, 4).map((res) => (
                    <tr key={res.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs text-secondary mr-3 font-serif">
                            {res.guest.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm text-slate-300">{res.guest}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-sm text-slate-400">{res.room}</td>
                      <td className="px-8 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          res.status === 'Settled' ? 'bg-blue-900/40 text-blue-300' : 'bg-amber-900/40 text-amber-300'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-sm text-slate-200 text-right font-serif">${res.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="lg:col-span-1 space-y-6">
            <div className="bg-slate-950 border border-slate-800/50 rounded-xl p-6">
              <h3 className="font-serif text-lg text-slate-200 mb-6 flex justify-between items-center">
                Staff Activity
                <span className="material-symbols-outlined text-slate-600">more_vert</span>
              </h3>
              <div className="space-y-6">
                {staff.slice(0, 3).map((s) => (
                  <div key={s.id} className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-400">person</span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-slate-200">{s.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{s.role} • Active</p>
                    </div>
                    <span className="text-[10px] text-slate-600">Active</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-container/20 p-8 rounded-xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">assignment_add</span>
              </div>
              <div className="text-center">
                <h4 className="font-headline text-lg text-surface-bright">Quick Task Assignment</h4>
                <p className="text-xs text-slate-400 font-light">Directly assign items to staff members</p>
              </div>
              <Link to="/staff/tasks" className="px-6 py-2 bg-secondary text-on-primary font-bold text-[10px] uppercase rounded-lg">Open Task Manager</Link>
            </div>
          </section>
        </div>

        {/* Department Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-amber-900/20 rounded-lg">
                <span className="material-symbols-outlined text-amber-500">restaurant</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded">Open</span>
            </div>
            <h4 className="font-serif text-lg mb-2">Dining & Bar</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Active Tables</span>
                <span className="text-slate-200">18 / 25</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[72%]"></div>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-blue-900/20 rounded-lg">
                <span className="material-symbols-outlined text-blue-400">pool</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded">Active</span>
            </div>
            <h4 className="font-serif text-lg mb-2">Wellness & Spa</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Bookings Today</span>
                <span className="text-slate-200">12 Appts</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full w-[48%]"></div>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-slate-800 rounded-lg">
                <span className="material-symbols-outlined text-slate-400">event</span>
              </div>
              <span className="text-[10px] bg-secondary/20 text-secondary px-2 py-1 rounded font-bold">Priority</span>
            </div>
            <h4 className="font-serif text-lg mb-2">Events & Ballroom</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Upcoming (48h)</span>
                <span className="text-slate-200">3 Major Events</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[90%]"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
