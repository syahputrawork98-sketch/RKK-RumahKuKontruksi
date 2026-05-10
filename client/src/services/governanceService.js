import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getAuditLogs = async (params = {}) => {
  const response = await axios.get(`${API_URL}/audit-logs`, { params });
  return response.data;
};

export const getProfileChangeRequests = async (params = {}) => {
  const response = await axios.get(`${API_URL}/profile-change-requests`, { params });
  return response.data;
};

export const createProfileChangeRequest = async (data) => {
  const response = await axios.post(`${API_URL}/profile-change-requests`, { ...data });
  return response.data;
};

export const reviewProfileChangeRequest = async (id, data) => {
  const response = await axios.patch(`${API_URL}/profile-change-requests/${id}/review`, { ...data });
  return response.data;
};
