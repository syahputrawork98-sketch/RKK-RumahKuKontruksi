/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const DevAuthContext = createContext(null);

const STORAGE_KEY = 'rkk.devAuth';

const dashboardByRole = {
  admin: "/admin/dashboard",
  superadmin: "/superadmin/dashboard",
  pengawas: "/pengawas/dashboard",
  mandor: "/mandor/dashboard",
  arsitek: "/arsitek/dashboard",
  konsumen: "/konsumen/proyek",
};

const rolePrefixMap = {
  admin: "/admin",
  superadmin: "/superadmin",
  pengawas: "/pengawas",
  mandor: "/mandor",
  arsitek: "/arsitek",
  konsumen: "/konsumen",
};

export const DevAuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const signIn = (role, persona) => {
    const newSession = {
      role: role,
      personaId: persona.id,
      personaName: persona.name,
      personaEmail: persona.email || '',
    };
    setSession(newSession);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    
    // Compatibility with legacy persona switchers
    const legacyKeys = {
      admin: 'rkk.dev.selectedAdminId',
      superadmin: 'rkk.dev.selectedSuperadminId',
      pengawas: 'rkk.dev.selectedSupervisorId',
      mandor: 'rkk_selected_foreman_id',
      arsitek: 'rkk_selected_architect_id',
      konsumen: 'rkk_customer_id'
    };
    
    if (legacyKeys[role]) {
      localStorage.setItem(legacyKeys[role], persona.id);
    }
  };

  const signOut = () => {
    setSession(null);
    localStorage.removeItem(STORAGE_KEY);
    
    // Clear legacy keys too
    const legacyKeys = [
      'rkk.dev.selectedAdminId',
      'rkk.dev.selectedSuperadminId',
      'rkk.dev.selectedSupervisorId',
      'rkk_selected_foreman_id',
      'rkk_selected_architect_id',
      'rkk_customer_id'
    ];
    legacyKeys.forEach(key => localStorage.removeItem(key));
  };

  const getDashboardPath = (role) => dashboardByRole[role] || '/';

  const isRoleAllowedForPath = (pathname) => {
    if (!session) return false;
    const prefix = rolePrefixMap[session.role];
    return pathname.startsWith(prefix);
  };

  return (
    <DevAuthContext.Provider value={{
      session,
      isSignedIn: !!session,
      role: session?.role,
      persona: session,
      signIn,
      signOut,
      getDashboardPath,
      isRoleAllowedForPath,
    }}>
      {children}
    </DevAuthContext.Provider>
  );
};

export const useDevAuth = () => {
  const context = useContext(DevAuthContext);
  if (!context) {
    throw new Error('useDevAuth must be used within a DevAuthProvider');
  }
  return context;
};
