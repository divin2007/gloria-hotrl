import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const StaffRequest = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Overtime',
    reason: '',
    date: '',
    duration: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/staff/tasks'), 3000);
  };

  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-10 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full">
          <header className="mb-10 text-center">
            <h1 className="font-headline text-3xl text-secondary-fixed mb-2">Internal Staff Request</h1>
            <p className="text-on-primary-container font-body text-sm opacity-80">Submit shift changes, leave requests, or overtime for approval.</p>
          </header>

          {submitted ? (
            <div className="bg-slate-900 border border-secondary p-12 rounded-2xl text-center shadow-2xl animate-pulse">
              <span className="material-symbols-outlined text-secondary text-6xl mb-4">send_time_extension</span>
              <h2 className="text-white text-2xl font-serif mb-2">Request Transmitted</h2>
              <p className="text-slate-400">Your request has been sent to the Management Portal. You will be notified via the briefing board.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-900 rounded-2xl p-10 border border-slate-800 shadow-2xl space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Request Type</label>
                  <select
                    className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
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
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Target Date</label>
                    <input
                      required
                      type="date"
                      className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Duration / Hours</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 4 hours"
                      className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Reasoning / Justification</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Provide details for management review..."
                    className="w-full bg-primary border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 text-white text-sm"
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
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
