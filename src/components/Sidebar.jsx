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
    <aside className="h-screen w-64 fixed left-0 top-0 bg-white border-r border-outline-variant/30 flex flex-col p-6 space-y-2 z-50">
      <div className="mb-8">
        <h1 className="font-serif text-xl text-secondary font-bold">Gloria Hotel</h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Management Portal</p>
      </div>

      <div className="flex flex-col space-y-1 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2 ml-4 opacity-50">Operations</div>
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === link.path
                ? 'bg-secondary/10 text-secondary border-r-4 border-secondary'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{link.icon}</span>
            <span className="font-sans text-xs font-medium uppercase tracking-wider">{link.name}</span>
          </Link>
        ))}

        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-6 mb-2 ml-4 opacity-50">Dashboards</div>
        {roleLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === link.path
                ? 'bg-secondary/10 text-secondary border-r-4 border-secondary'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{link.icon}</span>
            <span className="font-sans text-xs font-medium uppercase tracking-wider">{link.name}</span>
          </Link>
        ))}
      </div>

      <Link
        to="/admin/new-booking"
        className="mt-4 bg-primary text-on-primary py-3 px-4 rounded-lg font-bold flex items-center justify-center space-x-2 transition-transform active:scale-95 shadow-lg shadow-primary/10"
      >
        <span className="material-symbols-outlined">add</span>
        <span className="font-sans text-xs font-medium uppercase tracking-wider">New Booking</span>
      </Link>

      <div className="pt-6 mt-6 border-t border-outline-variant/30 space-y-1">
        <Link
          to="/admin/settings"
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
            location.pathname === '/admin/settings'
              ? 'bg-secondary/10 text-secondary'
              : 'text-on-surface-variant hover:bg-surface-container-low'
          }`}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-sans text-xs font-medium uppercase tracking-wider">Settings</span>
        </Link>
        <Link to="/" className="flex items-center space-x-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-sans text-xs font-medium uppercase tracking-wider">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
