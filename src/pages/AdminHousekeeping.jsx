import React, { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const AdminHousekeeping = () => {
  const { tasks, loading, catalogRooms } = useContext(HotelContext);
  const housekeepingTasks = tasks.filter(t => t.category === 'Housekeeping' || t.title.includes('Clean'));

  const pending = housekeepingTasks.filter(t => t.status !== 'Completed').length;
  const inProgress = housekeepingTasks.filter(t => t.status === 'In Progress').length;
  const readyRooms = catalogRooms.length - pending;
  const readyPercent = Math.round((readyRooms / (catalogRooms.length || 1)) * 100);

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
            <span className="text-secondary text-2xl font-bold">{readyPercent}%</span>
            <span className="block text-[9px] uppercase tracking-widest text-on-surface-variant font-bold opacity-60">Inventory Ready</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-editorial border-l-4 border-l-secondary">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">Dirty / Pending</p>
            <span className="text-3xl font-headline text-primary font-bold">{pending} Rooms</span>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-editorial border-l-4 border-l-blue-400">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">In Progress</p>
            <span className="text-3xl font-headline text-primary font-bold">{inProgress} Rooms</span>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-editorial border-l-4 border-l-emerald-400">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">Clean / Inspected</p>
            <span className="text-3xl font-headline text-primary font-bold">{readyRooms} Rooms</span>
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
              {loading ? (
                <tr><td colSpan="5" className="px-8 py-10 text-center italic opacity-60">Syncing with operations...</td></tr>
              ) : housekeepingTasks.length === 0 ? (
                <tr><td colSpan="5" className="px-8 py-10 text-center text-xs text-on-surface-variant opacity-60 italic">No active housekeeping assignments</td></tr>
              ) : housekeepingTasks.map((task) => (
                <tr key={task.id} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="px-8 py-5 text-sm text-on-surface font-bold">{task.roomNumber || 'Room TBD'}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{task.title}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{task.assignedTo || 'Unassigned'}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      task.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[10px] text-on-surface-variant text-right uppercase font-bold opacity-40">{task.time}</td>
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
