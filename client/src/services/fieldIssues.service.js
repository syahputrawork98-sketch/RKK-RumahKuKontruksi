import apiClient from './apiClient.js';

const fieldIssueService = {
  getFieldIssues: async (filters = {}) => {
    return apiClient.get('/field-issues', { params: filters });
  },

  getFieldIssueById: async (id) => {
    return apiClient.get(`/field-issues/${id}`);
  },

  createFieldIssue: async (data) => {
    return apiClient.post('/field-issues', data);
  },

  updateFieldIssueStatus: async (id, data) => {
    return apiClient.patch(`/field-issues/${id}/status`, data);
  }
};

export default fieldIssueService;
