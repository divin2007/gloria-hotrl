import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const AuthGuard = ({ children, requiredRole }) => {
  const { user, profile, loading } = useHotel();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If we have a user but no profile yet, wait for it
  if (!profile && user) {
     return (
      <div className="min-h-screen bg-primary flex items-center justify-center flex-col gap-6 px-8">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center max-w-sm">
          <p className="text-secondary font-label text-xs uppercase tracking-widest mb-2">Synchronizing Profile...</p>
          <p className="text-on-primary-container text-xs opacity-70 leading-relaxed">
            We're finalizing your account setup. This usually takes a few seconds.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => window.location.reload()}
            className="bg-secondary text-on-secondary py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
          >
            Retry Synchronization
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="text-slate-400 text-xs text-center hover:text-white transition-colors font-medium"
          >
            Cancel and Return Home
          </button>
        </div>

        <div className="mt-8 p-4 bg-primary-container/30 rounded-lg border border-white/5 text-center">
          <p className="text-[10px] text-on-primary-container uppercase font-bold mb-2">Technical Note</p>
          <p className="text-[10px] text-on-primary-container opacity-60">
            If you stay on this screen, please ensure you have executed the <b>supabase_setup.sql</b> script in your Supabase SQL Editor to enable profile synchronization.
          </p>
        </div>
      </div>
    );
  }

  if (requiredRole && profile?.role !== requiredRole && profile?.role !== 'admin') {
    // Prevent redirect loops: if we are already at the destination, don't redirect
    const targetPath = profile?.role === 'guest' ? '/' : `/dashboard/${profile?.role || 'guest'}`;
    if (location.pathname === targetPath) return children;

    return <Navigate to={targetPath} replace />;
  }

  return children;
};

export default AuthGuard;
