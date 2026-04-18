import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const AuthGuard = ({ children, requiredRole }) => {
  const { user, profile, loading } = useHotel();
  const location = useLocation();

  if (loading) return null; // Or a loader

  if (!user) {
    // Redirect to login but save the current location
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (requiredRole && profile?.role !== requiredRole && profile?.role !== 'admin') {
    // If user doesn't have the required role (and isn't a super admin)
    // Redirect to their appropriate home
    const redirectPath = profile?.role === 'guest' ? '/' : `/dashboard/${profile?.role || 'guest'}`;
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default AuthGuard;
