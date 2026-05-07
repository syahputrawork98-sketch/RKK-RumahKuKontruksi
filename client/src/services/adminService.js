import apiClient from './apiClient';

export const adminService = {
  getAdmins: async (params) => {
    return apiClient.get('/admins', { params });
  },

  getAdminById: async (id) => {
    return apiClient.get(`/admins/${id}`);
  },

  createAdmin: async (payload) => {
    return apiClient.post('/admins', payload);
  },

  updateAdmin: async (id, payload) => {
    return apiClient.patch(`/admins/${id}`, payload);
  },

  deleteAdmin: async (id) => {
    return apiClient.delete(`/admins/${id}`);
  },
  
  getDashboardStats: async () => {
    return apiClient.get('/admins/dashboard-stats');
  }
};

export default adminService;
