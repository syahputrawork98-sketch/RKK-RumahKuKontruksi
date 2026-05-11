import api from './apiClient.js';

const dailyReportService = {
  getAllReports: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.projectId) params.append('projectId', filters.projectId);
    if (filters.foremanId) params.append('foremanId', filters.foremanId);
    if (filters.status) params.append('status', filters.status);
    
    const response = await api.get(`/daily-reports?${params.toString()}`);
    return response.data;
  },

  getReportById: async (id) => {
    const response = await api.get(`/daily-reports/${id}`);
    return response.data;
  },

  createReport: async (data) => {
    const response = await api.post('/daily-reports', data);
    return response.data;
  },

  updateReport: async (id, data) => {
    const response = await api.put(`/daily-reports/${id}`, data);
    return response.data;
  },

  submitReport: async (id) => {
    const response = await api.patch(`/daily-reports/${id}/submit`);
    return response.data;
  },

  reviewReport: async (id, data) => {
    const response = await api.patch(`/daily-reports/${id}/review`, data);
    return response.data;
  }
};

export default dailyReportService;
