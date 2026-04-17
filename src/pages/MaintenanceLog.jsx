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

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      title: `${formData.location} - ${formData.issue}`,
      priority: formData.priority,
      category: formData.category,
      time: new RegExp('AM|PM').test(new Date().toLocaleTimeString()) ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
      icon: formData.category === 'Maintenance' ? 'handyman' : 'cleaning_services'
    });
    navigate('/staff/tasks');
  };

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-10 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <header className="mb-10">
            <h1 className="font-headline text-3xl text-secondary-fixed mb-2">Facility Issue Report</h1>
            <p className="text-on-primary-container font-body text-sm opacity-80">Log maintenance or housekeeping requirements for immediate assignment.</p>
          </header>

          <form onSubmit={handleSubmit} className="bg-slate-900 rounded-2xl p-10 border border-slate-800 shadow-2xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Location</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Room 402 or Lobby"
                  className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Category</label>
                <select
                  className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Maintenance</option>
                  <option>Housekeeping</option>
                  <option>IT Support</option>
                  <option>Security</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Priority Level</label>
                <select
                  className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option>Standard</option>
                  <option>Emergency</option>
                  <option>Low Priority</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Issue Description</label>
              <textarea
                required
                rows="4"
                placeholder="Describe the problem in detail..."
                className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                value={formData.issue}
                onChange={(e) => setFormData({...formData, issue: e.target.value})}
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-secondary text-on-secondary py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
              >
                Log and Assign
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 bg-transparent border border-outline/30 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
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
