import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminReports = () => {
  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar active="reports" />
      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="font-headline text-4xl text-primary mb-2">Business Analytics</h1>
          <p className="text-on-surface-variant font-body tracking-wide opacity-80 uppercase text-[10px] font-bold">Strategic performance reports and financial summaries.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 shadow-editorial">
            <div className="flex justify-between items-center mb-12">
              <h3 className="font-headline text-xl text-primary">Revenue Trends</h3>
              <select className="bg-surface-container-low border-none text-[10px] font-bold text-secondary uppercase tracking-widest rounded px-4 py-2">
                <option>Last 30 Days</option>
                <option>Quarterly</option>
                <option>Annual</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {[45, 62, 58, 75, 90, 82, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-surface-container-high rounded-t-sm relative group transition-all">
                  <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-40 transition-opacity" style={{ height: `${h}%` }}></div>
                  <div className="w-full bg-secondary/20 absolute bottom-0" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-8 text-[10px] text-on-surface-variant font-bold uppercase opacity-40">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 shadow-editorial">
              <h3 className="font-headline text-xl text-primary mb-8">Occupancy Forecast</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[10px] text-on-surface-variant mb-3 font-bold uppercase tracking-widest">
                    <span>Deluxe Suites</span>
                    <span className="text-secondary">94%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="bg-secondary h-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-on-surface-variant mb-3 font-bold uppercase tracking-widest">
                    <span>Standard Rooms</span>
                    <span className="text-secondary">88%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="bg-secondary/60 h-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-on-surface-variant mb-3 font-bold uppercase tracking-widest">
                    <span>Event Venues</span>
                    <span className="text-blue-500">72%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary rounded-xl p-8 text-on-primary shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-[10px] font-bold text-secondary-fixed uppercase tracking-widest mb-4">Export Strategic Data</h4>
                <p className="text-sm text-on-primary/70 mb-8 leading-relaxed">Generate full financial audit logs and operational summaries for board review.</p>
                <div className="flex gap-4">
                  <button className="flex-1 bg-white/10 text-white py-3 rounded text-[9px] font-bold uppercase tracking-widest hover:bg-white/20 transition-colors border border-white/10">CSV Manifest</button>
                  <button className="flex-1 bg-secondary text-on-secondary py-3 rounded text-[9px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">PDF Executive Summary</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminReports;
