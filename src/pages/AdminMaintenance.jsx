import React, { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const AdminMaintenance = () => {
  const { tasks, loading } = useContext(HotelContext);
  const maintenanceTasks = tasks.filter(t => t.category === 'Maintenance' || t.category === 'Engineering');

  const critical = maintenanceTasks.filter(t => t.priority === 'Emergency' || t.priority === 'High Priority').length;
  const active = maintenanceTasks.filter(t => t.status !== 'Completed').length;
  const preventative = maintenanceTasks.filter(t => t.priority === 'Low Priority').length;

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 lg:p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-headline text-4xl text-primary mb-2">Facility Maintenance</h1>
            <p className="text-on-surface-variant font-body tracking-wide opacity-80 uppercase text-[10px] font-bold">Engineering and infrastructure upkeep logs.</p>
          </div>
          <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-primary/10 hover:brightness-110 transition-all">
            Log New Issue
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-editorial border-t-4 border-t-error">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">Critical Issues</p>
            <span className="text-3xl font-headline text-primary font-bold">{critical < 10 ? `0${critical}` : critical}</span>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-editorial border-t-4 border-t-secondary">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">Active Repairs</p>
            <span className="text-3xl font-headline text-primary font-bold">{active < 10 ? `0${active}` : active}</span>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-editorial border-t-4 border-t-surface-container-high">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">Preventative</p>
            <span className="text-3xl font-headline text-primary font-bold">{preventative < 10 ? `0${preventative}` : preventative}</span>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-editorial border-t-4 border-t-blue-400">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">System Status</p>
            <span className="text-3xl font-headline text-primary font-bold">{active === 0 ? 'Optimal' : 'Active'}</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-editorial">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low/30 border-b border-outline-variant/15">
              <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                <th className="px-8 py-4">System / Asset</th>
                <th className="px-8 py-4">Issue Detail</th>
                <th className="px-8 py-4">Priority</th>
                <th className="px-8 py-4">Technician</th>
                <th className="px-8 py-4 text-right">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading ? (
                <tr><td colSpan="5" className="px-8 py-10 text-center italic opacity-60">Syncing with operations...</td></tr>
              ) : maintenanceTasks.length === 0 ? (
                <tr><td colSpan="5" className="px-8 py-10 text-center text-xs text-on-surface-variant opacity-60 italic">No facility issues currently logged</td></tr>
              ) : maintenanceTasks.map((task) => (
                <tr key={task.id} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="px-8 py-5 text-sm text-on-surface font-bold">{task.roomNumber || 'Facility'}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{task.title}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${
                      task.priority === 'Emergency' ? 'bg-error/10 text-error' : 'bg-secondary/10 text-secondary'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{task.assignedTo || 'Unassigned'}</td>
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

export default AdminMaintenance;
