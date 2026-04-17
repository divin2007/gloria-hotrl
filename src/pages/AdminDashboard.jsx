import React from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const { reservations, staff } = useHotel();

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 text-on-primary">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="font-headline text-4xl text-secondary-fixed mb-2">Executive Overview</h1>
            <p className="text-on-primary-container font-body tracking-wide opacity-80">Gloria Hotel Kigali • General Management Dashboard</p>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Current Occupancy</span>
              <span className="text-2xl font-serif">94.2%</span>
            </div>
            <div className="h-10 w-px bg-slate-800"></div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">System Status</span>
              <span className="text-sm font-medium text-blue-400 flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></span>
                Synchronized
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6 mb-8">
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
          </div>

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
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
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
                  {reservations.slice(0, 3).map((res) => (
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
          </div>

          <div className="col-span-12 md:col-span-4 bg-slate-950 border border-slate-800/50 rounded-xl p-6">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
