import React, { createContext, useContext, useState, useEffect } from 'react';
import adminService from '../services/adminService';

const AdminPersonaContext = createContext();

export const AdminPersonaProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState(
    localStorage.getItem('rkk.dev.selectedAdminId') || ''
  );
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const response = await adminService.getAdmins();
        if (response.success) {
          const adminList = response.data.map(admin => ({
            ...admin,
            // Ensure consistent display fields for topbar
            photo: admin.avatar || `https://i.pravatar.cc/150?u=${admin.id}`,
            role: 'Admin' // Strictly just "Admin" as requested
          }));
          setAdmins(adminList);

          // Restore selection from localStorage or pick first
          const savedId = localStorage.getItem('rkk.dev.selectedAdminId');
          const found = adminList.find(a => a.id === savedId);
          
          if (found) {
            setSelectedAdmin(found);
            setSelectedAdminId(found.id);
          } else if (adminList.length > 0) {
            setSelectedAdmin(adminList[0]);
            setSelectedAdminId(adminList[0].id);
            localStorage.setItem('rkk.dev.selectedAdminId', adminList[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch admins:', err);
        setError('Belum ada data Admin. Jalankan seed atau buat Admin terlebih dahulu.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    if (admins.length > 0) {
      const found = admins.find(a => a.id === selectedAdminId);
      if (found) {
        setSelectedAdmin(found);
        localStorage.setItem('rkk.dev.selectedAdminId', selectedAdminId);
      }
    }
  }, [selectedAdminId, admins]);

  const selectAdmin = (id) => {
    setSelectedAdminId(id);
  };

  const value = {
    admins,
    selectedAdmin,
    selectedAdminId,
    selectAdmin,
    loading,
    error
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
