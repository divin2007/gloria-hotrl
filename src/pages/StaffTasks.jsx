import React from 'react';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const StaffTasks = () => {
  const { tasks, updateTaskStatus } = useHotel();

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 h-screen overflow-y-auto bg-[#000e24] flex flex-col">
        <header className="p-8 flex justify-between items-end">
          <div>
            <span className="text-secondary font-label text-xs uppercase tracking-widest mb-2 block">Current Shift: Morning</span>
            <h1 className="text-4xl text-on-primary font-semibold font-headline">Assigned Tasks</h1>
            <p className="text-on-primary-container mt-2 font-body max-w-md">Overview of your priority maintenance and housekeeping objectives for floor 4 and 5.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary-container p-6 rounded-xl border border-white/5 flex flex-col items-center min-w-[120px]">
              <span className="text-secondary text-2xl font-semibold">{tasks.length}</span>
              <span className="text-[10px] uppercase tracking-tighter text-on-primary-container">Total Tasks</span>
            </div>
            <div className="bg-primary-container p-6 rounded-xl border border-white/5 flex flex-col items-center min-w-[120px]">
              <span className="text-on-primary text-2xl font-semibold">
                {tasks.filter(t => t.status === 'In Progress' || t.status === 'Assigned').length}
              </span>
              <span className="text-[10px] uppercase tracking-tighter text-on-primary-container">Pending</span>
            </div>
          </div>
        </header>

        <div className="px-8 pb-12 flex-grow grid grid-cols-12 gap-6">
          <section className="col-span-12 xl:col-span-8 space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-primary-container/40 backdrop-blur-sm rounded-xl p-6 border-l-4 ${
                  task.priority === 'Emergency' ? 'border-error' : 'border-secondary'
                } flex items-center justify-between group hover:bg-primary-container/60 transition-all ${
                  task.status === 'Completed' ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center space-x-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    task.priority === 'Emergency' ? 'bg-error/10 text-error' : 'bg-secondary/10 text-secondary'
                  }`}>
                    <span className="material-symbols-outlined">
                      {task.category === 'Maintenance' ? 'handyman' : 'cleaning_services'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg text-white font-serif">{task.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-label uppercase tracking-wider ${
                        task.priority === 'Emergency' ? 'bg-error/20 text-error' : 'bg-secondary/20 text-secondary'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-on-primary-container">
                      Status: {task.status} • {task.time}
                    </p>
                  </div>
                </div>
                {task.status !== 'Completed' && (
                  <button
                    onClick={() => updateTaskStatus(task.id, 'Completed')}
                    className="bg-secondary text-on-secondary px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-on-secondary-container transition-colors flex items-center space-x-2"
                  >
                    <span>Complete</span>
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                  </button>
                )}
              </div>
            ))}
          </section>

          <aside className="col-span-12 xl:col-span-4 space-y-6">
            <div className="bg-secondary-container rounded-xl p-6 relative overflow-hidden">
              <h4 className="text-on-secondary-container font-label text-xs uppercase tracking-widest mb-4">Shift Efficiency</h4>
              <div className="flex items-end space-x-2 mb-2">
                <span className="text-4xl font-serif font-bold text-on-secondary-container">84%</span>
              </div>
              <div className="w-full bg-on-secondary/30 h-1.5 rounded-full overflow-hidden">
                <div className="bg-on-secondary-container h-full w-[84%]"></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h4 className="text-secondary font-label text-xs uppercase tracking-widest mb-4 flex items-center">
                <span className="material-symbols-outlined text-sm mr-2">campaign</span>
                Staff Briefing
              </h4>
              <p className="text-sm text-slate-300 italic">"VIP Arrival at 14:00. Please ensure all corridors on floor 5 are cleared of utility carts by 13:30."</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default StaffTasks;
