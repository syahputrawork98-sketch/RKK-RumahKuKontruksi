import apiClient from './apiClient';

const architectService = {
  // Architects
  getArchitects(params) {
    return apiClient.get('/architects', { params });
  },

  getAllArchitects() {
    return apiClient.get('/architects');
  },

  getArchitectById(id) {
    return apiClient.get(`/architects/${id}`);
  },

  createArchitect(data) {
    return apiClient.post('/architects', data);
  },

  updateArchitect(id, data) {
    return apiClient.patch(`/architects/${id}`, data);
  },

  deleteArchitect(id) {
    return apiClient.delete(`/architects/${id}`);
  },

  // Certificates
  getCertificates(architectId) {
    return apiClient.get(`/architects/${architectId}/certificates`);
  },

  createCertificate(architectId, data) {
    return apiClient.post(`/architects/${architectId}/certificates`, data);
  },

  updateCertificate(certificateId, data) {
    return apiClient.patch(`/architects/certificates/${certificateId}`, data);
  },

  deleteCertificate(certificateId) {
    return apiClient.delete(`/architects/certificates/${certificateId}`);
  },

  // Experiences
  getExperiences(architectId) {
    return apiClient.get(`/architects/${architectId}/experiences`);
  },

  createExperience(architectId, data) {
    return apiClient.post(`/architects/${architectId}/experiences`, data);
  },

  updateExperience(experienceId, data) {
    return apiClient.patch(`/architects/experiences/${experienceId}`, data);
  },

  deleteExperience(experienceId) {
    return apiClient.delete(`/architects/experiences/${experienceId}`);
  },
};

export default architectService;
