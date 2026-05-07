import React, { createContext, useContext, useState, useEffect } from 'react';
import architectService from '../services/architectService';

const ArchitectPersonaContext = createContext();

export const ArchitectPersonaProvider = ({ children }) => {
  const [architects, setArchitects] = useState([]);
  const [selectedArchitectId, setSelectedArchitectId] = useState(
    localStorage.getItem('rkk_selected_architect_id') || ''
  );
  const [selectedArchitect, setSelectedArchitect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArchitects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await architectService.getAllArchitects();
      if (response.success) {
        setArchitects(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch architects:', err);
      setError('Gagal mengambil data arsitek dari database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchitects();
  }, []);

  useEffect(() => {
    if (selectedArchitectId && architects.length > 0) {
      const found = architects.find(a => a.id === selectedArchitectId);
      if (found) {
        setSelectedArchitect(found);
        localStorage.setItem('rkk_selected_architect_id', selectedArchitectId);
      } else {
        // If selected ID no longer exists in current list
        setSelectedArchitect(null);
        setSelectedArchitectId('');
        localStorage.removeItem('rkk_selected_architect_id');
      }
    } else {
      setSelectedArchitect(null);
    }
  }, [selectedArchitectId, architects]);

  const selectArchitect = (id) => {
    setSelectedArchitectId(id);
    localStorage.setItem('rkk_selected_architect_id', id);
  };

  const clearArchitect = () => {
    setSelectedArchitectId('');
    setSelectedArchitect(null);
    localStorage.removeItem('rkk_selected_architect_id');
  };

  const value = {
    architects,
    selectedArchitect,
    selectedArchitectId,
    loading,
    error,
    selectArchitect,
    setSelectedArchitectId,
    clearArchitect,
    refreshArchitects: fetchArchitects
  };

  return (
    <ArchitectPersonaContext.Provider value={value}>
      {children}
    </ArchitectPersonaContext.Provider>
  );
};

export const useArchitectPersona = () => {
  const context = useContext(ArchitectPersonaContext);
  if (context === undefined) {
    throw new Error('useArchitectPersona must be used within an ArchitectPersonaProvider');
  }
  return context;
};
