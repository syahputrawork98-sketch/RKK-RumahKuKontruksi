import apiClient from './apiClient';

export const getAuditLogs = async (params = {}) => {
  return apiClient.get('/audit-logs', { params });
};

export const getProfileChangeRequests = async (params = {}) => {
  return apiClient.get('/profile-change-requests', { params });
};

export const createProfileChangeRequest = async (data) => {
  return apiClient.post('/profile-change-requests', data);
};

export const reviewProfileChangeRequest = async (id, data) => {
  return apiClient.patch(`/profile-change-requests/${id}/review`, data);
};
