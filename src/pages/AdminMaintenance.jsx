import React, { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const AdminMaintenance = () => {
  const { tasks } = useContext(HotelContext);
  const maintenanceTasks = tasks.filter(t => t.icon !== 'cleaning_services' && !t.title.includes('Clean'));

  return (
    <div className="flex h-screen overflow-hidden bg-primary">
      <Sidebar active="maintenance" />
      <main className="flex-1 ml-64 overflow-y-auto p-10">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-headline text-4xl text-secondary-fixed mb-2">Facility Maintenance</h1>
            <p className="text-on-primary-container font-body tracking-wide opacity-80">Engineering and infrastructure upkeep logs.</p>
          </div>
          <button className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-black/20 hover:brightness-110 transition-all">
            Log New Issue
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-900 p-6 rounded-xl border-t-2 border-error">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Critical Issues</p>
            <span className="text-3xl font-headline text-surface-bright">02</span>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border-t-2 border-secondary">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Repairs</p>
            <span className="text-3xl font-headline text-surface-bright">05</span>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border-t-2 border-slate-700">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Preventative</p>
            <span className="text-3xl font-headline text-surface-bright">12</span>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border-t-2 border-blue-400">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg. Response</p>
            <span className="text-3xl font-headline text-surface-bright">18m</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-950 border-b border-slate-800">
              <tr className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                <th className="px-8 py-4">System / Asset</th>
                <th className="px-8 py-4">Issue Detail</th>
                <th className="px-8 py-4">Priority</th>
                <th className="px-8 py-4">Technician</th>
                <th className="px-8 py-4 text-right">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {maintenanceTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-4 text-sm text-slate-300 font-medium">{task.title.split(' - ')[0]}</td>
                  <td className="px-8 py-4 text-sm text-slate-400">{task.title.split(' - ')[1]}</td>
                  <td className="px-8 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                      task.id === 1 ? 'bg-error/20 text-error' : 'bg-secondary/20 text-secondary'
                    }`}>
                      {task.id === 1 ? 'Critical' : 'Standard'}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-400">David M.</td>
                  <td className="px-8 py-4 text-[10px] text-slate-500 text-right uppercase">{task.time}</td>
                </tr>
              ))}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-8 py-4 text-sm text-slate-300 font-medium">Pool Filtration</td>
                <td className="px-8 py-4 text-sm text-slate-400">Chlorine Level Calibration</td>
                <td className="px-8 py-4">
                  <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-slate-800 text-slate-400">
                    Low
                  </span>
                </td>
                <td className="px-8 py-4 text-sm text-slate-400">Unassigned</td>
                <td className="px-8 py-4 text-[10px] text-slate-500 text-right uppercase">2h ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminMaintenance;
