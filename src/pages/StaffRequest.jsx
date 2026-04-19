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
            <div className="bg-emerald-50 border border-emerald-200 p-16 rounded-3xl text-center shadow-2xl animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-emerald-600 text-4xl animate-pulse">send_time_extension</span>
              </div>
              <h2 className="text-emerald-900 text-3xl font-serif mb-3">Request Transmitted</h2>
              <p className="text-emerald-700 text-sm leading-relaxed max-w-sm mx-auto opacity-80">Your request has been securely encrypted and sent to the Management Portal. You will be notified via the operational briefing board.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-3xl p-10 border border-outline-variant/20 shadow-2xl space-y-10">
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block opacity-60">Engagement Type</label>
                  <select
                    className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 rounded-xl px-5 py-4 text-on-surface text-sm transition-all font-medium"
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
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block opacity-60">Proposed Date</label>
                    <input
                      required
                      type="date"
                      className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 rounded-xl px-5 py-4 text-on-surface text-sm transition-all font-medium"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block opacity-60">Estimated Span</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 4 hours"
                      className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 rounded-xl px-5 py-4 text-on-surface text-sm transition-all font-medium"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block opacity-60">Professional Justification</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Provide professional details for management review..."
                    className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 rounded-xl px-5 py-4 text-on-surface text-sm transition-all font-medium leading-relaxed"
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-secondary text-on-secondary py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all shadow-xl hover:shadow-secondary/20"
              >
                Submit Professional Request
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default StaffRequest;
