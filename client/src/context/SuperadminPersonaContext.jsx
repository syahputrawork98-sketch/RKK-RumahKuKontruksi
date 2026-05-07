import React, { createContext, useContext, useState, useEffect } from 'react';
import superadminService from '../services/superadminService';

const SuperadminPersonaContext = createContext();

export const SuperadminPersonaProvider = ({ children }) => {
  const [superadmins, setSuperadmins] = useState([]);
  const [selectedSuperadminId, setSelectedSuperadminId] = useState(
    localStorage.getItem('rkk.dev.selectedSuperadminId') || ''
  );
  const [selectedSuperadmin, setSelectedSuperadmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuperadmins = async () => {
      try {
        setLoading(true);
        const response = await superadminService.getSuperadmins();
        if (response.success) {
          const list = response.data.map(sa => ({
            ...sa,
            photo: sa.avatar || `https://i.pravatar.cc/150?u=${sa.id}`,
            role: 'Superadmin'
          }));
          setSuperadmins(list);

          const savedId = localStorage.getItem('rkk.dev.selectedSuperadminId');
          const found = list.find(a => a.id === savedId);
          
          if (found) {
            setSelectedSuperadmin(found);
            setSelectedSuperadminId(found.id);
          } else if (list.length > 0) {
            setSelectedSuperadmin(list[0]);
            setSelectedSuperadminId(list[0].id);
            localStorage.setItem('rkk.dev.selectedSuperadminId', list[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch superadmins:', err);
        setError('Belum ada data Superadmin. Jalankan seed terlebih dahulu.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuperadmins();
  }, []);

  useEffect(() => {
    if (superadmins.length > 0) {
      const found = superadmins.find(a => a.id === selectedSuperadminId);
      if (found) {
        setSelectedSuperadmin(found);
        localStorage.setItem('rkk.dev.selectedSuperadminId', selectedSuperadminId);
      }
    }
  }, [selectedSuperadminId, superadmins]);

  const selectSuperadmin = (id) => {
    setSelectedSuperadminId(id);
  };

  const value = {
    superadmins,
    selectedSuperadmin,
    selectedSuperadminId,
    selectSuperadmin,
    loading,
    error
  };

  return (
    <SuperadminPersonaContext.Provider value={value}>
      {children}
    </SuperadminPersonaContext.Provider>
  );
};

export const useSuperadminPersona = () => {
  const context = useContext(SuperadminPersonaContext);
  if (context === undefined) {
    throw new Error('useSuperadminPersona must be used within a SuperadminPersonaProvider');
  }
  return context;
};
