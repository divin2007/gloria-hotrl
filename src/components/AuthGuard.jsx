import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const AuthGuard = ({ children, requiredRole }) => {
  const { user } = useHotel();
  const location = useLocation();

  if (!user) {
    // Redirect to login but save the current location
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    // If user doesn't have the required role (and isn't a super admin)
    // Redirect to their appropriate home
    const redirectPath = user.role === 'guest' ? '/' : `/dashboard/${user.role}`;
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default AuthGuard;
