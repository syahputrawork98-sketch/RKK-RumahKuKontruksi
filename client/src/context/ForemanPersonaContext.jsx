import React, { createContext, useContext, useState, useEffect } from 'react';
import foremanService from '../services/foremanService';

const ForemanPersonaContext = createContext();

export const ForemanPersonaProvider = ({ children }) => {
  const [foremen, setForemen] = useState([]);
  const [selectedForemanId, setSelectedForemanId] = useState(
    localStorage.getItem('rkk_selected_foreman_id') || ''
  );
  const [selectedForeman, setSelectedForeman] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchForemen = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await foremanService.getAllForemen();
      if (response.success) {
        setForemen(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch foremen:', err);
      setError('Gagal mengambil data mandor dari database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForemen();
  }, []);

  useEffect(() => {
    if (selectedForemanId && foremen.length > 0) {
      const found = foremen.find(f => f.id === selectedForemanId);
      if (found) {
        setSelectedForeman(found);
        localStorage.setItem('rkk_selected_foreman_id', selectedForemanId);
      } else {
        // If selected ID no longer exists in current list
        setSelectedForeman(null);
        setSelectedForemanId('');
        localStorage.removeItem('rkk_selected_foreman_id');
      }
    } else {
      setSelectedForeman(null);
    }
  }, [selectedForemanId, foremen]);

  const selectForeman = (id) => {
    setSelectedForemanId(id);
    localStorage.setItem('rkk_selected_foreman_id', id);
  };

  const clearForeman = () => {
    setSelectedForemanId('');
    setSelectedForeman(null);
    localStorage.removeItem('rkk_selected_foreman_id');
  };

  const value = {
    foremen,
    selectedForeman,
    selectedForemanId,
    loading,
    error,
    selectForeman,
    setSelectedForemanId,
    clearForeman,
    refreshForemen: fetchForemen
  };

  return (
    <ForemanPersonaContext.Provider value={value}>
      {children}
    </ForemanPersonaContext.Provider>
  );
};

export const useForemanPersona = () => {
  const context = useContext(ForemanPersonaContext);
  if (context === undefined) {
    throw new Error('useForemanPersona must be used within a ForemanPersonaProvider');
  }
  return context;
};
