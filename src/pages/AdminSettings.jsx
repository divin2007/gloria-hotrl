import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminSettings = () => {
  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar active="settings" />
      <main className="flex-1 ml-64 p-8 lg:p-12">
        <header className="mb-12">
          <h1 className="font-headline text-4xl text-primary mb-2">Portal Configuration</h1>
          <p className="text-on-surface-variant font-body tracking-wide opacity-80 uppercase text-[10px] font-bold">System preferences and account security settings.</p>
        </header>

        <div className="max-w-4xl space-y-10">
          <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 shadow-editorial">
            <h3 className="font-headline text-xl text-primary mb-6">Staff Profile</h3>
            <div className="flex items-center gap-8">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center border-2 border-secondary/20 overflow-hidden">
                  <span className="material-symbols-outlined text-4xl text-secondary">person</span>
                </div>
                <div className="absolute inset-0 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
                </div>
              </div>
              <div className="flex-grow space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Full Name</label>
                    <input type="text" defaultValue="Alexandre Kwizera" className="w-full bg-surface-container-low border-none rounded px-4 py-2 text-sm text-primary font-medium focus:ring-1 focus:ring-secondary/30" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Staff ID</label>
                    <input type="text" readOnly value="GH-9920-KGL" className="w-full bg-surface-container-low border-none rounded px-4 py-2 text-sm text-on-surface-variant opacity-60 cursor-not-allowed" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 shadow-editorial">
            <h3 className="font-headline text-xl text-primary mb-6">Security & Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Two-Factor Authentication</h4>
                  <p className="text-xs text-on-surface-variant opacity-60">Add an extra layer of security to your portal access.</p>
                </div>
                <div className="w-12 h-6 bg-secondary rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Activity Logs</h4>
                  <p className="text-xs text-on-surface-variant opacity-60">Record all your administrative actions for audit purposes.</p>
                </div>
                <div className="w-12 h-6 bg-surface-container-high rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">Save Changes</button>
                <button className="bg-white border border-outline-variant text-on-surface-variant px-8 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-surface-container-low transition-all">Reset Password</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
