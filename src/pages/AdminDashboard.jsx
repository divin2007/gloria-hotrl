import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { SkeletonLine, SkeletonCard } from '../components/LoadingSkeleton';

const AdminDashboard = () => {
  const { reservations, staff, loading, inviteStaff, catalogRooms } = useHotel();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('staff');
  const [inviteMsg, setInviteMsg] = useState('');

  const handleInvite = async (e) => {
    e.preventDefault();
    const { error } = await inviteStaff(inviteEmail, inviteRole);
    if (error) {
      setInviteMsg(`Error: ${error.message}`);
    } else {
      setInviteMsg(`Successfully invited ${inviteEmail} as ${inviteRole}`);
      setInviteEmail('');
    }
  };

  // Real data calculations
  const totalRevenue = reservations.reduce((sum, res) => sum + (parseFloat(res.amount) || 0), 0);
  const roomsRevenue = totalRevenue * 0.7; // Estimated breakdown
  const diningRevenue = totalRevenue * 0.2;
  const eventsRevenue = totalRevenue * 0.1;

  const today = new Date().toISOString().split('T')[0];
  const newReservationsToday = reservations.filter(r => r.created_at?.startsWith(today)).length;

  // Occupancy calculation
  const totalRooms = catalogRooms.length || 100;
  const occupiedRooms = reservations.filter(r => {
    const start = new Date(r.check_in);
    const end = new Date(r.check_out);
    const now = new Date();
    return now >= start && now <= end;
  }).length;
  const occupancyRate = ((occupiedRooms / totalRooms) * 100).toFixed(1);

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 lg:p-12 text-on-surface">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="font-headline text-4xl text-primary mb-2">Executive Overview</h1>
            <p className="text-on-surface-variant font-body tracking-wide opacity-80 text-[10px] font-bold uppercase">Gloria Hotel Kigali • General Management</p>
          </div>
          <div className="flex space-x-6 items-center">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Current Occupancy</span>
              <span className="text-2xl font-serif text-primary">{occupancyRate}%</span>
            </div>
            <div className="h-10 w-px bg-outline-variant/30"></div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">System Status</span>
              <span className="text-sm font-bold text-blue-600 flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                Synchronized
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-12 md:col-span-8 bg-primary rounded-xl p-10 flex justify-between items-center relative overflow-hidden group shadow-2xl text-on-primary">
            <div className="relative z-10">
              <span className="text-secondary-fixed text-[10px] font-bold uppercase tracking-widest mb-4 block">Total Revenue (Cumulative)</span>
              <div className="flex items-baseline space-x-4">
                <h2 className="font-headline text-5xl">${totalRevenue.toLocaleString()}</h2>
                <span className="text-emerald-400 text-sm flex items-center font-bold">
                  <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                  Real-time
                </span>
              </div>
              <div className="mt-10 flex space-x-12">
                <div>
                  <p className="text-[10px] text-on-primary/60 mb-1 uppercase tracking-widest font-bold">Rooms</p>
                  <p className="text-xl font-serif">${Math.round(roomsRevenue).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-primary/60 mb-1 uppercase tracking-widest font-bold">Dining</p>
                  <p className="text-xl font-serif">${Math.round(diningRevenue).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-primary/60 mb-1 uppercase tracking-widest font-bold">Events</p>
                  <p className="text-xl font-serif">${Math.round(eventsRevenue).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-5 flex items-end justify-around px-8 pb-4">
               {[20, 45, 30, 65, 50, 75].map((h, i) => (
                 <div key={i} className="w-4 bg-secondary rounded-t-sm" style={{ height: `${h}%` }}></div>
               ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 flex flex-col justify-between shadow-editorial">
            <div>
              <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-4 block">New Reservations</span>
              <div className="text-4xl font-serif text-primary">{newReservationsToday} <span className="text-sm font-sans text-on-surface-variant font-normal">Today</span></div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium">Direct Website</span>
                <span className="font-bold text-primary">62%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[62%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-12 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-editorial mb-8">
            <h3 className="font-headline text-2xl text-primary mb-6">Staff Invitations</h3>
            <p className="text-on-surface-variant text-sm mb-6">Pre-authorize emails to sign up with administrative roles. Only Admin can perform this action.</p>
            <form onSubmit={handleInvite} className="flex flex-wrap gap-4 items-end">
              <div className="flex-grow min-w-[200px] space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg"
                  placeholder="staff@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="w-48 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Assign Role</label>
                <select
                  className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                >
                  <option value="staff">Staff</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <button type="submit" className="bg-secondary text-on-secondary px-8 py-3.5 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:brightness-110 transition-all shadow-lg">
                Invite Staff
              </button>
            </form>
            {inviteMsg && <p className="mt-4 text-xs font-bold text-secondary">{inviteMsg}</p>}
          </div>

          <div className="col-span-12 md:col-span-8 bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-editorial">
            <div className="px-8 py-6 border-b border-outline-variant/15 flex justify-between items-center bg-surface-container-low/30">
              <h3 className="font-serif text-lg text-primary">Recent Transactions</h3>
              <Link to="/admin/reservations" className="text-[10px] uppercase tracking-widest text-secondary hover:text-amber-700 transition-colors font-bold">View Manifest</Link>
            </div>
            <div className="overflow-x-auto">
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
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="px-8 py-4"><SkeletonLine className="h-20 w-full" /></td>
                    </tr>
                  ) : reservations.slice(0, 3).map((res) => (
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
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-editorial">
            <h3 className="font-serif text-lg text-primary mb-6 flex justify-between items-center">
              Team Overview
              <span className="material-symbols-outlined text-on-surface-variant opacity-30">more_vert</span>
            </h3>
            <div className="space-y-8">
              {loading ? <SkeletonCard /> : staff.slice(0, 3).map((s) => (
                <div key={s.id} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-semibold text-on-surface">{s.name}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold opacity-60">{s.role} • Active</p>
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
