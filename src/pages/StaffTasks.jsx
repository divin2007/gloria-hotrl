import React from 'react';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const StaffTasks = () => {
  const { tasks, updateTaskStatus } = useHotel();

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 flex-1 h-screen overflow-y-auto flex flex-col">
        <header className="p-8 lg:p-12 flex justify-between items-end bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/20">
          <div>
            <span className="text-secondary font-label text-[10px] uppercase tracking-widest mb-2 block font-bold">Priority Objectives</span>
            <h1 className="text-4xl text-primary font-semibold font-headline">Task Distribution</h1>
            <p className="text-on-surface-variant mt-2 font-medium max-w-md text-sm">Real-time oversight of floor-level maintenance and service requests.</p>
          </div>
          <div className="flex gap-6">
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex flex-col items-center min-w-[120px] shadow-sm">
              <span className="text-secondary text-2xl font-semibold">{tasks.length}</span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">Total Active</span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex flex-col items-center min-w-[120px] shadow-sm">
              <span className="text-primary text-2xl font-semibold">
                {tasks.filter(t => t.status === 'In Progress').length}
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">Working</span>
            </div>
          </div>
        </header>

        <div className="px-8 lg:px-12 py-10">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-editorial">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/30 border-b border-outline-variant/15">
                <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                  <th className="px-8 py-4">Task Detail</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Priority</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {tasks.map((task) => (
                  <tr key={task.id} className={`hover:bg-surface-container-low/20 transition-colors ${task.status === 'Completed' ? 'opacity-40' : ''}`}>
                    <td className="px-8 py-6">
                      <div className="font-bold text-primary text-sm">{task.title}</div>
                      <div className="text-[10px] text-on-surface-variant uppercase font-bold opacity-40 mt-1">{task.time}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-medium text-on-surface-variant">{task.category}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${
                        task.priority === 'Emergency' ? 'bg-error/10 text-error' : 'bg-secondary/10 text-secondary'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${task.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                         <span className="text-xs font-bold text-on-surface uppercase tracking-tighter">{task.status}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {task.status !== 'Completed' ? (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'Completed')}
                          className="text-secondary hover:text-amber-700 font-bold text-[10px] uppercase tracking-widest border border-secondary/20 px-4 py-2 rounded-lg transition-all"
                        >
                          Resolve
                        </button>
                      ) : (
                        <span className="material-symbols-outlined text-emerald-600">verified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffTasks;
