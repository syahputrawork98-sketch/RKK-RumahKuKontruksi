import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDevAuth } from '../../context/DevAuthContext';

/**
 * Guard component to protect internal routes during local development.
 * This handles redirection to /sign-in and role mismatch.
 */
const DevRouteGuard = ({ children, allowedRolePrefix }) => {
  const { isSignedIn, role, getDashboardPath } = useDevAuth();
  const location = useLocation();

  // Public paths that don't need guard
  const publicPaths = [
    '/',
    '/layanan',
    '/cara-kerja',
    '/proyek',
    '/about',
    '/tentang',
    '/contact',
    '/kontak',
    '/sign-in'
  ];

  // If the path is public, just render
  if (publicPaths.includes(location.pathname)) {
    return children || <Outlet />;
  }

  // If not signed in, redirect to sign-in
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // If signed in but role doesn't match the prefix (e.g. Mandor trying to access /admin)
  if (allowedRolePrefix && !location.pathname.startsWith(allowedRolePrefix)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  return children || <Outlet />;
};

export default DevRouteGuard;
