import api from './apiClient.js';

const dailyTaskService = {
  getAllTasks: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.projectId) params.append('projectId', filters.projectId);
    if (filters.foremanId) params.append('foremanId', filters.foremanId);
    if (filters.status) params.append('status', filters.status);
    
    const response = await api.get(`/daily-tasks?${params.toString()}`);
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await api.get(`/daily-tasks/${id}`);
    return response.data;
  },

  createTask: async (data) => {
    const response = await api.post('/daily-tasks', data);
    return response.data;
  },

  updateTaskStatus: async (id, status, notes) => {
    const response = await api.patch(`/daily-tasks/${id}/status`, { status, notes });
    return response.data;
  }
};

export default dailyTaskService;
