import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const MaintenanceLog = () => {
  const { addTask } = useHotel();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    issue: '',
    priority: 'Standard',
    category: 'Maintenance'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask({
      title: formData.issue,
      roomNumber: formData.location,
      priority: formData.priority,
      category: formData.category,
      assignedTo: 'Unassigned'
    });
    navigate('/staff/tasks');
  };

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 flex-1 p-10 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <header className="mb-10 text-center">
            <h1 className="font-headline text-3xl text-primary mb-2">Facility Issue Report</h1>
            <p className="text-on-surface-variant font-body text-sm opacity-80 uppercase text-[10px] font-bold">Log maintenance or housekeeping requirements for immediate assignment.</p>
          </header>

          <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-2xl p-10 border border-outline-variant/30 shadow-editorial space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Location</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Room 402 or Lobby"
                  className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm transition-all"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Category</label>
                <select
                  className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm transition-all"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Maintenance</option>
                  <option>Housekeeping</option>
                  <option>IT Support</option>
                  <option>Security</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Priority Level</label>
                <select
                  className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm transition-all"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option>Standard</option>
                  <option>Emergency</option>
                  <option>Low Priority</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Issue Description</label>
              <textarea
                required
                rows="4"
                placeholder="Describe the problem in detail..."
                className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm transition-all"
                value={formData.issue}
                onChange={(e) => setFormData({...formData, issue: e.target.value})}
              ></textarea>
            </div>

            <div className="flex gap-4 pt-6 border-t border-outline-variant/15">
              <button
                type="submit"
                className="flex-1 bg-secondary text-on-secondary py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all shadow-lg"
              >
                Log and Assign
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-10 bg-white border border-outline-variant text-on-surface-variant py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-surface-container-low transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MaintenanceLog;
