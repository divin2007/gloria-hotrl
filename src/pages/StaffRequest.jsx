import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useHotel } from '../context/HotelContext';

const StaffRequest = () => {
  const navigate = useNavigate();
  const { addStaffRequest } = useHotel();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Overtime',
    reason: '',
    date: '',
    duration: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await addStaffRequest(formData);
    if (!error) {
      setSubmitted(true);
      setTimeout(() => navigate('/dashboard/staff'), 3000);
    }
  };

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 flex-1 p-10 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full">
          <header className="mb-10 text-center">
            <h1 className="font-headline text-3xl text-primary mb-2">Staff Request Portal</h1>
            <p className="text-on-surface-variant font-body text-sm opacity-80 uppercase text-[10px] font-bold">Submit shift changes, leave, or overtime for management approval.</p>
          </header>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-12 rounded-2xl text-center shadow-editorial animate-pulse">
              <span className="material-symbols-outlined text-emerald-600 text-6xl mb-4">send_time_extension</span>
              <h2 className="text-emerald-900 text-2xl font-serif mb-2">Request Transmitted</h2>
              <p className="text-emerald-700 text-sm">Your request has been sent to the Management Portal. You will be notified via the operational briefing board.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-2xl p-10 border border-outline-variant/30 shadow-editorial space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Request Type</label>
                  <select
                    className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm transition-all"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option>Overtime Shift</option>
                    <option>Leave Request (Emergency)</option>
                    <option>Leave Request (Planned)</option>
                    <option>Shift Swap</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Target Date</label>
                    <input
                      required
                      type="date"
                      className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm transition-all"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Duration / Hours</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 4 hours"
                      className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm transition-all"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Reasoning / Justification</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Provide details for management review..."
                    className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-on-surface text-sm transition-all"
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all shadow-lg"
              >
                Submit for Approval
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default StaffRequest;
