import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { name: 'Reservations', path: '/admin/reservations', icon: 'calendar_month' },
    { name: 'Front Desk', path: '/admin/front-desk', icon: 'concierge' },
    { name: 'Housekeeping', path: '/admin/housekeeping', icon: 'cleaning_services' },
    { name: 'Maintenance', path: '/admin/maintenance', icon: 'handyman' },
    { name: 'Reports', path: '/admin/reports', icon: 'analytics' },
  ];

  const roleLinks = [
    { name: 'Manager View', path: '/dashboard/manager', icon: 'manage_accounts' },
    { name: 'Receptionist View', path: '/dashboard/receptionist', icon: 'badge' },
    { name: 'Staff View', path: '/dashboard/staff', icon: 'engineering' },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-950 dark:bg-slate-900 shadow-xl shadow-black/20 flex flex-col p-6 space-y-2 z-50">
      <div className="mb-8">
        <h1 className="font-serif text-xl text-amber-500">Gloria Management</h1>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Admin Portal</p>
      </div>

      <div className="flex flex-col space-y-1 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 ml-4">Main</div>
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === link.path
                ? 'bg-slate-900 text-amber-500 border-r-4 border-amber-500'
                : 'text-slate-400 hover:bg-slate-900/50 hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{link.icon}</span>
            <span className="font-sans text-xs font-medium uppercase tracking-wider">{link.name}</span>
          </Link>
        ))}

        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-6 mb-2 ml-4">Role Dashboards</div>
        {roleLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === link.path
                ? 'bg-slate-900 text-amber-500 border-r-4 border-amber-500'
                : 'text-slate-400 hover:bg-slate-900/50 hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{link.icon}</span>
            <span className="font-sans text-xs font-medium uppercase tracking-wider">{link.name}</span>
          </Link>
        ))}
      </div>

      <Link
        to="/admin/new-booking"
        className="mt-4 bg-secondary text-on-primary py-3 px-4 rounded-lg font-bold flex items-center justify-center space-x-2 transition-transform active:scale-95 shadow-lg"
      >
        <span className="material-symbols-outlined">add</span>
        <span className="font-sans text-xs font-medium uppercase tracking-wider">New Booking</span>
      </Link>

      <div className="pt-6 mt-6 border-t border-slate-800 space-y-1">
        <Link
          to="/admin/settings"
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
            location.pathname === '/admin/settings'
              ? 'bg-slate-900 text-amber-500 border-r-4 border-amber-500'
              : 'text-slate-400 hover:bg-slate-900/50'
          }`}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-sans text-xs font-medium uppercase tracking-wider">Settings</span>
        </Link>
        <Link to="/" className="flex items-center space-x-3 px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-900/50">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-sans text-xs font-medium uppercase tracking-wider">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
