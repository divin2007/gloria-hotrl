import React from 'react';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const StaffDashboard = () => {
  const { tasks, updateTaskStatus } = useHotel();

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 h-screen overflow-y-auto bg-[#000e24] flex flex-col">
        <header className="p-8 flex justify-between items-end bg-primary/80 backdrop-blur-md sticky top-0 z-40 border-b border-white/5">
          <div>
            <span className="text-secondary font-label text-xs uppercase tracking-widest mb-2 block">Current Shift: Morning (06:00 - 14:00)</span>
            <h1 className="text-4xl text-on-primary font-semibold font-headline">Operations Board</h1>
            <p className="text-on-primary-container mt-2 font-body max-w-md">Your active maintenance and housekeeping objectives for today.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary-container p-6 rounded-xl border border-white/5 flex flex-col items-center min-w-[120px]">
              <span className="text-secondary text-2xl font-semibold">{tasks.length}</span>
              <span className="text-[10px] uppercase tracking-tighter text-on-primary-container">Daily Tasks</span>
            </div>
            <div className="bg-primary-container p-6 rounded-xl border border-white/5 flex flex-col items-center min-w-[120px]">
              <span className="text-on-primary text-2xl font-semibold">
                {tasks.filter(t => t.status !== 'Completed').length}
              </span>
              <span className="text-[10px] uppercase tracking-tighter text-on-primary-container">Remaining</span>
            </div>
          </div>
        </header>

        <div className="px-8 py-8 flex-grow grid grid-cols-12 gap-6">
          <section className="col-span-12 xl:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-headline text-xl text-secondary-fixed">Assigned Queue</h3>
              <Link to="/admin/maintenance-log" className="text-xs text-secondary font-bold uppercase tracking-widest hover:underline">Log New Issue</Link>
            </div>
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-primary-container/40 backdrop-blur-sm rounded-xl p-6 border-l-4 ${
                  task.priority === 'Emergency' ? 'border-error' : 'border-secondary'
                } flex items-center justify-between group hover:bg-primary-container/60 transition-all ${
                  task.status === 'Completed' ? 'opacity-40 grayscale-[0.5]' : ''
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
                      {task.category} • {task.time} • Status: <span className="font-bold">{task.status}</span>
                    </p>
                  </div>
                </div>
                {task.status !== 'Completed' ? (
                  <button
                    onClick={() => updateTaskStatus(task.id, 'Completed')}
                    className="bg-secondary text-on-secondary px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center space-x-2"
                  >
                    <span>Finish Task</span>
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                  </button>
                ) : (
                  <span className="text-emerald-500 font-bold text-[10px] uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Completed
                  </span>
                )}
              </div>
            ))}
          </section>

          <aside className="col-span-12 xl:col-span-4 space-y-6">
            <div className="bg-secondary-container rounded-xl p-8 relative overflow-hidden shadow-2xl">
              <h4 className="text-on-secondary-container font-label text-xs uppercase tracking-widest mb-4">Personal Efficiency</h4>
              <div className="flex items-end space-x-2 mb-4">
                <span className="text-5xl font-serif font-bold text-on-secondary-container">84%</span>
                <span className="text-xs text-on-secondary-container mb-2 font-bold">+5% vs yesterday</span>
              </div>
              <div className="w-full bg-on-secondary/30 h-2 rounded-full overflow-hidden">
                <div className="bg-on-secondary-container h-full w-[84%]" style={{ width: '84%' }}></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h4 className="text-secondary font-label text-xs uppercase tracking-widest mb-6 flex items-center">
                <span className="material-symbols-outlined text-sm mr-2">campaign</span>
                Staff Briefing
              </h4>
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-on-primary-container uppercase block mb-1">General Manager</span>
                  <p className="text-sm text-slate-300 italic leading-relaxed">"VIP Arrival at 14:00. Please ensure all corridors on floor 5 are cleared of utility carts by 13:30."</p>
                </div>
                <div>
                  <span className="text-[10px] text-on-primary-container uppercase block mb-1">Duty Receptionist</span>
                  <p className="text-sm text-slate-300 leading-relaxed">"Late checkout in Suite 505 (13:00). Prioritize turnover as next guest arrives at 15:30."</p>
                </div>
              </div>
            </div>

            <div className="bg-primary-container/20 p-8 rounded-xl border border-white/5 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">pending_actions</span>
              <h4 className="font-headline text-surface-bright mb-2">Request Assistance</h4>
              <p className="text-xs text-on-primary-container mb-6 leading-relaxed">Need help with a task or requesting shift changes?</p>
              <Link to="/staff/request" className="w-full bg-slate-800 text-white py-3 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors">Submit Request</Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
