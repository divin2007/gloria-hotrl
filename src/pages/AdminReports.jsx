import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminReports = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-primary">
      <Sidebar active="reports" />
      <main className="flex-1 ml-64 overflow-y-auto p-10">
        <header className="mb-12">
          <h1 className="font-headline text-4xl text-secondary-fixed mb-2">Business Analytics</h1>
          <p className="text-on-primary-container font-body tracking-wide opacity-80">Strategic performance reports and financial summaries.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-headline text-xl text-surface-bright">Revenue Trends</h3>
              <select className="bg-primary border-none text-xs font-bold text-secondary uppercase tracking-widest rounded px-4 py-2">
                <option>Last 30 Days</option>
                <option>Quarterly</option>
                <option>Annual</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {[45, 62, 58, 75, 90, 82, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-primary-container rounded-t-sm relative group">
                  <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-40 transition-opacity" style={{ height: `${h}%` }}></div>
                  <div className="w-full bg-slate-800 absolute bottom-0" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 text-[10px] text-slate-500 font-bold uppercase">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
              <h3 className="font-headline text-xl text-surface-bright mb-6">Occupancy Forecast</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                    <span>Deluxe Suites</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                    <span>Standard Rooms</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-secondary/60 h-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                    <span>Event Venues</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-container p-8 rounded-xl border border-secondary/20">
              <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Export Data</h4>
              <p className="text-sm text-on-primary-container mb-6">Generate full financial audit logs and operational summaries for stakeholder review.</p>
              <div className="flex gap-4">
                <button className="flex-1 bg-slate-950 text-white py-3 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors">CSV Export</button>
                <button className="flex-1 bg-secondary text-on-secondary py-3 rounded text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-colors">PDF Report</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminReports;
