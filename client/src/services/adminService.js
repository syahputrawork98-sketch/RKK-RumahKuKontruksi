import apiClient from './apiClient';

export const adminService = {
  getAdmins: async (params) => {
    const response = await apiClient.get('/admins', { params });
    return response.data;
  },

  getAdminById: async (id) => {
    const response = await apiClient.get(`/admins/${id}`);
    return response.data;
  },

  createAdmin: async (payload) => {
    const response = await apiClient.post('/admins', payload);
    return response.data;
  },

  updateAdmin: async (id, payload) => {
    const response = await apiClient.patch(`/admins/${id}`, payload);
    return response.data;
  },

  deleteAdmin: async (id) => {
    const response = await apiClient.delete(`/admins/${id}`);
    return response.data;
  }
};

export default adminService;
