import apiClient from './apiClient';

const administrativeHelperDocumentService = {
  getDocuments: async (params = {}) => {
    return await apiClient.get('/administrative-helper-documents', { params });
  },

  getDocumentById: async (id) => {
    return await apiClient.get(`/administrative-helper-documents/${id}`);
  },

  createDraft: async (data) => {
    return await apiClient.post('/administrative-helper-documents', data);
  },

  updateStatus: async (id, status) => {
    return await apiClient.patch(`/administrative-helper-documents/${id}/status`, { status });
  }
};

export default administrativeHelperDocumentService;
