import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminSettings = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-primary">
      <Sidebar active="settings" />
      <main className="flex-1 ml-64 overflow-y-auto p-10">
        <header className="mb-12">
          <h1 className="font-headline text-4xl text-secondary-fixed mb-2">System Settings</h1>
          <p className="text-on-primary-container font-body tracking-wide opacity-80">Configure platform preferences and security protocols.</p>
        </header>

        <div className="max-w-4xl space-y-10">
          <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
            <h2 className="font-headline text-2xl text-surface-bright mb-8">Profile Configuration</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Full Name</label>
                <input className="w-full bg-primary border-none text-slate-200 rounded px-4 py-3 font-body focus:ring-1 focus:ring-secondary" type="text" defaultValue="Gloria Management Admin" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Email Address</label>
                <input className="w-full bg-primary border-none text-slate-200 rounded px-4 py-3 font-body focus:ring-1 focus:ring-secondary" type="email" defaultValue="admin@gloriakigali.com" />
              </div>
            </div>
          </section>

          <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
            <h2 className="font-headline text-2xl text-surface-bright mb-8">Notifications</h2>
            <div className="space-y-6">
              {[
                { label: 'Booking Alerts', desc: 'Receive real-time notifications for new room reservations.' },
                { label: 'Incident Reports', desc: 'Notify duty manager of maintenance and safety issues.' },
                { label: 'System Updates', desc: 'Alert staff of scheduled maintenance and software upgrades.' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-slate-800 last:border-0">
                  <div>
                    <h4 className="text-slate-200 font-medium">{item.label}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <div className="w-12 h-6 bg-secondary rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
            <h2 className="font-headline text-2xl text-surface-bright mb-8">Security</h2>
            <div className="space-y-6">
              <button className="text-secondary font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">lock</span>
                Change Admin Password
              </button>
              <button className="text-secondary font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">security</span>
                Enable Two-Factor Authentication
              </button>
            </div>
          </section>

          <div className="flex justify-end gap-4">
            <button className="px-8 py-3 bg-slate-800 text-slate-300 rounded font-bold text-xs uppercase tracking-widest hover:bg-slate-700 transition-colors">Discard Changes</button>
            <button className="px-8 py-3 bg-secondary text-on-secondary rounded font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-colors">Save Preferences</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
