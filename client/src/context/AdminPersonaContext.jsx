import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminPersonaContext = createContext();

const MOCK_ADMIN_PERSONAS = [
  { id: 'admin-utama', name: 'Admin Utama', role: 'Super Admin', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100' },
  { id: 'admin-proyek', name: 'Admin Proyek', role: 'Project Admin', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
  { id: 'admin-keuangan', name: 'Admin Keuangan', role: 'Finance Admin', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100' },
];

export const AdminPersonaProvider = ({ children }) => {
  const [selectedAdminId, setSelectedAdminId] = useState(
    localStorage.getItem('rkk.dev.selectedAdminId') || MOCK_ADMIN_PERSONAS[0].id
  );
  const [selectedAdmin, setSelectedAdmin] = useState(MOCK_ADMIN_PERSONAS[0]);

  useEffect(() => {
    const found = MOCK_ADMIN_PERSONAS.find(a => a.id === selectedAdminId);
    if (found) {
      setSelectedAdmin(found);
      localStorage.setItem('rkk.dev.selectedAdminId', selectedAdminId);
    } else {
      setSelectedAdmin(MOCK_ADMIN_PERSONAS[0]);
      setSelectedAdminId(MOCK_ADMIN_PERSONAS[0].id);
      localStorage.setItem('rkk.dev.selectedAdminId', MOCK_ADMIN_PERSONAS[0].id);
    }
  }, [selectedAdminId]);

  const selectAdmin = (id) => {
    setSelectedAdminId(id);
  };

  const value = {
    adminPersonas: MOCK_ADMIN_PERSONAS,
    selectedAdmin,
    selectedAdminId,
    selectAdmin,
  };

  return (
    <AdminPersonaContext.Provider value={value}>
      {children}
    </AdminPersonaContext.Provider>
  );
};

export const useAdminPersona = () => {
  const context = useContext(AdminPersonaContext);
  if (context === undefined) {
    throw new Error('useAdminPersona must be used within an AdminPersonaProvider');
  }
  return context;
};
