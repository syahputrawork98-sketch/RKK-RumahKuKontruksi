import apiClient from './apiClient';

const materialRequestService = {
  getAllRequests: async (params = {}) => {
    try {
      const response = await apiClient.get('/material-requests', { params });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching material requests:', error);
      return { success: false, message: error.response?.data?.message || 'Gagal mengambil data pengajuan material.' };
    }
  },

  getRequestById: async (id) => {
    try {
      const response = await apiClient.get(`/material-requests/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching material request details:', error);
      return { success: false, message: error.response?.data?.message || 'Gagal mengambil detail pengajuan material.' };
    }
  },

  createRequest: async (data) => {
    try {
      const response = await apiClient.post('/material-requests', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creating material request:', error);
      return { success: false, message: error.response?.data?.message || 'Gagal membuat pengajuan material.' };
    }
  },

  updateStatus: async (id, data) => {
    try {
      const response = await apiClient.patch(`/material-requests/${id}/status`, data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating material request status:', error);
      return { success: false, message: error.response?.data?.message || 'Gagal memperbarui status pengajuan material.' };
    }
  }
};

export default materialRequestService;
