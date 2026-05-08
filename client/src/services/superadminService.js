import apiClient from './apiClient';

export const superadminService = {
  getSuperadmins: async (params) => {
    const response = await apiClient.get('/superadmins', { params });
    return response.data;
  },

  getSuperadminById: async (id) => {
    const response = await apiClient.get(`/superadmins/${id}`);
    return response.data;
  },

  createSuperadmin: async (payload) => {
    const response = await apiClient.post('/superadmins', payload);
    return response.data;
  },

  updateSuperadmin: async (id, payload) => {
    const response = await apiClient.patch(`/superadmins/${id}`, payload);
    return response.data;
  },

  deleteSuperadmin: async (id) => {
    const response = await apiClient.delete(`/superadmins/${id}`);
    return response.data;
  },
  getGlobalStats: async () => {
    const response = await apiClient.get('/superadmins/stats/global');
    return response.data;
  }
};

export default superadminService;
