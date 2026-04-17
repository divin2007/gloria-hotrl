import React, { useState, useEffect } from 'react';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { SkeletonLine } from '../components/LoadingSkeleton';
import Modal from '../components/Modal';

const StaffDashboard = () => {
  const { tasks, updateTaskStatus } = useHotel();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const confirmComplete = () => {
    updateTaskStatus(selectedTask.id, 'Completed');
    setModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 flex-1 h-screen overflow-y-auto flex flex-col">
        <header className="p-8 lg:p-12 flex justify-between items-end bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/20">
          <div>
            <span className="text-secondary font-label text-[10px] uppercase tracking-widest mb-2 block font-bold">Shift: Morning (06:00 - 14:00)</span>
            <h1 className="text-4xl text-primary font-semibold font-headline">Operations Board</h1>
            <p className="text-on-surface-variant mt-2 font-medium max-w-md text-sm">Active maintenance and housekeeping objectives for today.</p>
          </div>
          <div className="flex gap-6">
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex flex-col items-center min-w-[120px] shadow-sm">
              <span className="text-secondary text-2xl font-semibold">{tasks.length}</span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">Daily Tasks</span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex flex-col items-center min-w-[120px] shadow-sm">
              <span className="text-primary text-2xl font-semibold">
                {tasks.filter(t => t.status !== 'Completed').length}
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">Remaining</span>
            </div>
          </div>
        </header>

        <div className="px-8 lg:px-12 py-10 flex-grow grid grid-cols-12 gap-8">
          <section className="col-span-12 xl:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline text-2xl text-primary">Assigned Queue</h3>
              <Link to="/admin/maintenance-log" className="text-[10px] text-secondary font-bold uppercase tracking-widest hover:underline border border-secondary/20 px-3 py-1 rounded-full">Log New Issue</Link>
            </div>
            <div className="space-y-4">
              {loading ? [...Array(4)].map((_, i) => (
                <div key={i} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 shadow-editorial">
                  <SkeletonLine className="h-10 w-full" />
                </div>
              )) : tasks.length > 0 ? tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 flex items-center justify-between group hover:bg-surface-container-low/20 transition-all shadow-editorial ${
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
                        <h3 className="text-lg text-primary font-headline">{task.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${
                          task.priority === 'Emergency' ? 'bg-error/10 text-error' : 'bg-secondary/10 text-secondary'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-medium">
                        {task.category} • {task.time} • Status: <span className="font-bold uppercase tracking-tighter">{task.status}</span>
                      </p>
                    </div>
                  </div>
                  {task.status !== 'Completed' ? (
                    <button
                      onClick={() => handleComplete(task)}
                      className="bg-secondary text-on-secondary px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg shadow-secondary/10"
                    >
                      <span>Complete</span>
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                    </button>
                  ) : (
                    <span className="text-emerald-600 font-bold text-[9px] uppercase flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      Finished
                    </span>
                  )}
                </div>
              )) : (
                <div className="p-16 text-center bg-surface-container-low/20 rounded-xl border-2 border-dashed border-outline-variant/40">
                  <p className="text-on-surface-variant font-medium uppercase tracking-widest text-sm">No tasks assigned.</p>
                </div>
              )}
            </div>
          </section>

          <aside className="col-span-12 xl:col-span-4 space-y-6">
            <div className="bg-secondary-container rounded-xl p-8 relative overflow-hidden shadow-xl">
              <h4 className="text-on-secondary-container font-label text-[10px] uppercase tracking-widest mb-4 font-bold">Personal Efficiency</h4>
              <div className="flex items-end space-x-2 mb-4">
                <span className="text-5xl font-serif font-bold text-on-secondary-container">84%</span>
                <span className="text-[10px] text-on-secondary-container/80 mb-2 font-bold">+5% Since Mon</span>
              </div>
              <div className="w-full bg-on-secondary/30 h-2 rounded-full overflow-hidden">
                <div className="bg-on-secondary-container h-full w-[84%]" style={{ width: '84%' }}></div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-editorial">
              <h4 className="text-secondary font-label text-[10px] uppercase tracking-widest mb-8 flex items-center font-bold">
                <span className="material-symbols-outlined text-sm mr-2">campaign</span>
                Staff Briefing
              </h4>
              <div className="space-y-8">
                <div className="border-b border-outline-variant/10 pb-6">
                  <span className="text-[8px] text-on-surface-variant font-bold uppercase block mb-2 opacity-60">General Manager</span>
                  <p className="text-sm text-on-surface italic leading-relaxed">"VIP Arrival at 14:00. Please ensure all corridors on floor 5 are cleared of utility carts by 13:30."</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 p-8 rounded-xl border border-secondary/10 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">pending_actions</span>
              <h4 className="font-headline text-primary mb-2">Internal Request</h4>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">Need help with a task or requesting shift changes?</p>
              <Link to="/staff/request" className="w-full bg-white text-secondary border border-secondary/20 py-3 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-secondary/5 transition-colors shadow-sm">Submit Form</Link>
            </div>
          </aside>
        </div>
      </main>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Task Completion"
        actions={
          <>
            <button onClick={confirmComplete} className="flex-1 bg-secondary text-on-secondary py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest">Mark Finished</button>
            <button onClick={() => setModalOpen(false)} className="flex-1 bg-surface-container-high text-on-surface-variant py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest">Cancel</button>
          </>
        }
      >
        Have you finished working on <strong>{selectedTask?.title}</strong>? This action will notify the duty manager.
      </Modal>
    </div>
  );
};

export default StaffDashboard;
