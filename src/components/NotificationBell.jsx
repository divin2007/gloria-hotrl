import React, { useState, useRef, useEffect } from 'react';
import { useHotel } from '../context/HotelContext';

const NotificationBell = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useHotel();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMin = Math.floor(diffInMs / 60000);
    if (diffInMin < 1) return 'Just now';
    if (diffInMin < 60) return `${diffInMin}m ago`;
    if (diffInMin < 1440) return `${Math.floor(diffInMin / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant group"
      >
        <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-secondary text-on-secondary text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-outline-variant/30 z-[70] overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="px-5 py-4 border-b border-outline-variant/15 flex justify-between items-center bg-surface-container-lowest">
            <h3 className="font-headline text-sm text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-[400px] overflow-y-auto staff-scroll">
            {notifications.length === 0 ? (
              <div className="py-12 text-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-20 block mb-2">notifications_off</span>
                <p className="text-xs text-on-surface-variant font-medium">Your sanctuary is quiet.</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`px-5 py-4 border-b border-outline-variant/5 cursor-pointer transition-colors hover:bg-surface-container-low flex gap-4 ${!n.is_read ? 'bg-secondary/5' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    n.type === 'task' ? 'bg-blue-50 text-blue-600' :
                    n.type === 'booking' ? 'bg-emerald-50 text-emerald-600' :
                    n.type === 'maintenance' ? 'bg-amber-50 text-amber-600' : 'bg-primary/5 text-primary'
                  }`}>
                    <span className="material-symbols-outlined text-xl">
                        {n.type === 'task' ? 'assignment' : n.type === 'booking' ? 'calendar_today' : n.type === 'maintenance' ? 'handyman' : 'notifications'}
                    </span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className={`text-xs font-bold text-primary truncate ${!n.is_read ? '' : 'opacity-60'}`}>{n.title}</p>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-[9px] text-on-surface-variant/40 font-bold uppercase mt-2 tracking-tighter">{formatTime(n.created_at)}</p>
                  </div>
                  {!n.is_read && (
                    <div className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-1"></div>
                  )}
                </div>
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <div className="p-3 bg-surface-container-low text-center">
               <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-40">End of Activity</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
