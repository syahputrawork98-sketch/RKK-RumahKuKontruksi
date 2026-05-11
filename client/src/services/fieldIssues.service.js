import api from './api';

export const getFieldIssues = async (filters = {}) => {
  const response = await api.get('/field-issues', { params: filters });
  return response.data;
};

export const getFieldIssueById = async (id) => {
  const response = await api.get(`/field-issues/${id}`);
  return response.data;
};

export const createFieldIssue = async (data) => {
  const response = await api.post('/field-issues', data);
  return response.data;
};

export const updateFieldIssueStatus = async (id, data) => {
  const response = await api.patch(`/field-issues/${id}/status`, data);
  return response.data;
};
