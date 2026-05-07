import React, { createContext, useContext, useState, useEffect } from 'react';
import supervisorService from '../services/supervisorService';

const SupervisorPersonaContext = createContext();

export const SupervisorPersonaProvider = ({ children }) => {
  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState(
    localStorage.getItem('rkk.dev.selectedSupervisorId') || ''
  );
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSupervisors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supervisorService.getAllSupervisors();
      if (response.success) {
        setSupervisors(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch supervisors:', err);
      setError('Gagal mengambil data pengawas dari database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  useEffect(() => {
    if (selectedSupervisorId && supervisors.length > 0) {
      const found = supervisors.find(s => s.id === selectedSupervisorId);
      if (found) {
        setSelectedSupervisor(found);
        localStorage.setItem('rkk.dev.selectedSupervisorId', selectedSupervisorId);
      } else {
        setSelectedSupervisor(null);
        setSelectedSupervisorId('');
        localStorage.removeItem('rkk.dev.selectedSupervisorId');
      }
    } else {
      setSelectedSupervisor(null);
    }
  }, [selectedSupervisorId, supervisors]);

  const selectSupervisor = (id) => {
    setSelectedSupervisorId(id);
    localStorage.setItem('rkk.dev.selectedSupervisorId', id);
  };

  const clearSupervisor = () => {
    setSelectedSupervisorId('');
    setSelectedSupervisor(null);
    localStorage.removeItem('rkk.dev.selectedSupervisorId');
  };

  const value = {
    supervisors,
    selectedSupervisor,
    selectedSupervisorId,
    selectSupervisor,
    setSelectedSupervisorId,
    clearSupervisor,
    loading,
    error,
    refreshSupervisors: fetchSupervisors
  };

  return (
    <SupervisorPersonaContext.Provider value={value}>
      {children}
    </SupervisorPersonaContext.Provider>
  );
};

export const useSupervisorPersona = () => {
  const context = useContext(SupervisorPersonaContext);
  if (context === undefined) {
    throw new Error('useSupervisorPersona must be used within a SupervisorPersonaProvider');
  }
  return context;
};
