import React, { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const AdminHousekeeping = () => {
  const { tasks } = useContext(HotelContext);
  const housekeepingTasks = tasks.filter(t => t.icon === 'cleaning_services' || t.title.includes('Clean'));

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 lg:p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-headline text-4xl text-primary mb-2">Housekeeping Portal</h1>
            <p className="text-on-surface-variant font-body tracking-wide opacity-80 uppercase text-[10px] font-bold">Room readiness and turndown service management.</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 text-center min-w-[150px] shadow-sm">
            <span className="text-secondary text-2xl font-bold">82%</span>
            <span className="block text-[9px] uppercase tracking-widest text-on-surface-variant font-bold opacity-60">Inventory Ready</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-editorial border-l-4 border-l-secondary">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">Dirty / Pending</p>
            <span className="text-3xl font-headline text-primary font-bold">18 Rooms</span>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-editorial border-l-4 border-l-blue-400">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">In Progress</p>
            <span className="text-3xl font-headline text-primary font-bold">06 Rooms</span>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-editorial border-l-4 border-l-emerald-400">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">Clean / Inspected</p>
            <span className="text-3xl font-headline text-primary font-bold">74 Rooms</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-editorial">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low/30 border-b border-outline-variant/15">
              <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                <th className="px-8 py-4">Room / Suite</th>
                <th className="px-8 py-4">Assignment</th>
                <th className="px-8 py-4">Staff Assigned</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Last Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {housekeepingTasks.map((task) => (
                <tr key={task.id} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="px-8 py-5 text-sm text-on-surface font-bold">{task.title.split(' - ')[0]}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{task.title.split(' - ')[1]}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">Team {String.fromCharCode(65 + (task.id % 3))}</td>
                  <td className="px-8 py-5">
                    <span className="inline-flex px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-blue-50 text-blue-700">
                      In Progress
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[10px] text-on-surface-variant text-right uppercase font-bold opacity-40">{task.time}</td>
                </tr>
              ))}
              {[101, 204, 312, 405].map(room => (
                <tr key={room} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="px-8 py-5 text-sm text-on-surface font-bold">Room {room}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">Turndown Service</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">Aisha K.</td>
                  <td className="px-8 py-5">
                    <span className="inline-flex px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-surface-container-high text-on-surface-variant">
                      Pending
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[10px] text-on-surface-variant text-right uppercase font-bold opacity-40">Scheduled</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminHousekeeping;
