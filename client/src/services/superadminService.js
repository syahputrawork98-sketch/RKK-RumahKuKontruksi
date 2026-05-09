import apiClient from './apiClient';

export const superadminService = {
  getSuperadmins: async (params) => {
    return apiClient.get('/superadmins', { params });
  },

  getSuperadminById: async (id) => {
    return apiClient.get(`/superadmins/${id}`);
  },

  createSuperadmin: async (payload) => {
    return apiClient.post('/superadmins', payload);
  },

  updateSuperadmin: async (id, payload) => {
    return apiClient.patch(`/superadmins/${id}`, payload);
  },

  deleteSuperadmin: async (id) => {
    return apiClient.delete(`/superadmins/${id}`);
  },
  getGlobalStats: async () => {
    return apiClient.get('/superadmins/stats/global');
  }
};

export default superadminService;
