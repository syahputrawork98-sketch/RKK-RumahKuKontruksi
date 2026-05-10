import apiClient from './apiClient';

const designRequestService = {
  getAllDesignRequests: async (params) => {
    return apiClient.get('/design-requests', { params });
  },

  getDesignRequestById: async (id) => {
    return apiClient.get(`/design-requests/${id}`);
  },

  createDesignRequest: async (payload) => {
    return apiClient.post('/design-requests', payload);
  },

  updateDesignRequest: async (id, payload) => {
    return apiClient.patch(`/design-requests/${id}`, payload);
  },

  deleteDesignRequest: async (id) => {
    return apiClient.delete(`/design-requests/${id}`);
  },

  assignArchitect: async (id, architectId) => {
    return apiClient.patch(`/design-requests/${id}/assign`, { architectId });
  },
  
  convertToProject: async (id, payload) => {
    return apiClient.post(`/design-requests/${id}/convert-to-project`, payload);
  },

  // Helper for Architect to get their assigned requests
  getAssignedRequests: async (architectId) => {
    return apiClient.get('/design-requests', { params: { architectId } });
  },

  addHistory: async (id, payload) => {
    return apiClient.post(`/design-requests/${id}/history`, payload);
  },

  requestRevision: async (id, payload) => {
    return apiClient.post(`/design-requests/${id}/revision`, payload);
  }
};

export default designRequestService;
