import React, { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const AdminHousekeeping = () => {
  const { tasks } = useContext(HotelContext);
  const housekeepingTasks = tasks.filter(t => t.icon === 'cleaning_services' || t.title.includes('Clean'));

  return (
    <div className="flex h-screen overflow-hidden bg-primary">
      <Sidebar active="housekeeping" />
      <main className="flex-1 ml-64 overflow-y-auto p-10">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-headline text-4xl text-secondary-fixed mb-2">Housekeeping Portal</h1>
            <p className="text-on-primary-container font-body tracking-wide opacity-80">Room readiness and turndown service management.</p>
          </div>
          <div className="bg-primary-container p-4 rounded-xl border border-white/5 text-center min-w-[150px]">
            <span className="text-secondary text-2xl font-semibold">82%</span>
            <span className="block text-[10px] uppercase tracking-tighter text-on-primary-container">Total Inventory Ready</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-secondary">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Dirty / Pending</p>
            <span className="text-3xl font-headline text-surface-bright">18 Rooms</span>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-blue-400">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">In Progress</p>
            <span className="text-3xl font-headline text-surface-bright">06 Rooms</span>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-emerald-400">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Clean / Inspected</p>
            <span className="text-3xl font-headline text-surface-bright">74 Rooms</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-950 border-b border-slate-800">
              <tr className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                <th className="px-8 py-4">Room / Suite</th>
                <th className="px-8 py-4">Assignment</th>
                <th className="px-8 py-4">Staff Assigned</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Last Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {housekeepingTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-4 text-sm text-slate-300 font-medium">{task.title.split(' - ')[0]}</td>
                  <td className="px-8 py-4 text-sm text-slate-400">{task.title.split(' - ')[1]}</td>
                  <td className="px-8 py-4 text-sm text-slate-400">Team {String.fromCharCode(65 + (task.id % 3))}</td>
                  <td className="px-8 py-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-blue-900/40 text-blue-300">
                      In Progress
                    </span>
                  </td>
                  <td className="px-8 py-4 text-[10px] text-slate-500 text-right uppercase">{task.time}</td>
                </tr>
              ))}
              {/* Additional Mock Data for full list */}
              {[101, 204, 312, 405].map(room => (
                <tr key={room} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-4 text-sm text-slate-300 font-medium">Room {room}</td>
                  <td className="px-8 py-4 text-sm text-slate-400">Turndown Service</td>
                  <td className="px-8 py-4 text-sm text-slate-400">Aisha K.</td>
                  <td className="px-8 py-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-slate-800 text-slate-400">
                      Pending
                    </span>
                  </td>
                  <td className="px-8 py-4 text-[10px] text-slate-500 text-right uppercase">Scheduled</td>
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
