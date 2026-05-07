import React, { createContext, useContext, useState, useEffect } from 'react';
import supervisorService from '../services/supervisorService';

const SupervisorPersonaContext = createContext();

export const SupervisorPersonaProvider = ({ children }) => {
  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState(
    localStorage.getItem('rkk.dev.selectedSupervisorId') || ''
  );
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSupervisors = async () => {
    try {
      setIsLoading(true);
      const response = await supervisorService.getAllSupervisors();
      if (response.success) {
        setSupervisors(response.data);
        
        // Default to first supervisor if none selected or selected one doesn't exist
        if (!selectedSupervisorId || !response.data.find(s => s.id === selectedSupervisorId)) {
          const defaultId = response.data[0]?.id || '';
          setSelectedSupervisorId(defaultId);
          localStorage.setItem('rkk.dev.selectedSupervisorId', defaultId);
        }
      }
    } catch (err) {
      console.error('Failed to fetch supervisors:', err);
      setError('Gagal mengambil data pengawas dari database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  useEffect(() => {
    if (selectedSupervisorId && supervisors.length > 0) {
      const found = supervisors.find(s => s.id === selectedSupervisorId);
      setSelectedSupervisor(found || null);
      localStorage.setItem('rkk.dev.selectedSupervisorId', selectedSupervisorId);
    } else {
      setSelectedSupervisor(null);
    }
  }, [selectedSupervisorId, supervisors]);

  const value = {
    supervisors,
    selectedSupervisor,
    selectedSupervisorId,
    setSelectedSupervisorId,
    isLoading,
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
