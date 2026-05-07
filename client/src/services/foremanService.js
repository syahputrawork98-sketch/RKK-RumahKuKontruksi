import apiClient from './apiClient';

const foremanService = {
  // Foremen
  getAllForemen() {
    return apiClient.get('/foremen');
  },

  getForemanById(id) {
    return apiClient.get(`/foremen/${id}`);
  },

  createForeman(data) {
    return apiClient.post('/foremen', data);
  },

  updateForeman(id, data) {
    return apiClient.patch(`/foremen/${id}`, data);
  },

  deleteForeman(id) {
    return apiClient.delete(`/foremen/${id}`);
  },

  // Certificates
  getCertificates(foremanId) {
    return apiClient.get(`/foremen/${foremanId}/certificates`);
  },

  createCertificate(foremanId, data) {
    return apiClient.post(`/foremen/${foremanId}/certificates`, data);
  },

  updateCertificate(certificateId, data) {
    return apiClient.patch(`/foremen/certificates/${certificateId}`, data);
  },

  deleteCertificate(certificateId) {
    return apiClient.delete(`/foremen/certificates/${certificateId}`);
  },

  // Experiences
  getExperiences(foremanId) {
    return apiClient.get(`/foremen/${foremanId}/experiences`);
  },

  createExperience(foremanId, data) {
    return apiClient.post(`/foremen/${foremanId}/experiences`, data);
  },

  updateExperience(experienceId, data) {
    return apiClient.patch(`/foremen/experiences/${experienceId}`, data);
  },

  deleteExperience(experienceId) {
    return apiClient.delete(`/foremen/experiences/${experienceId}`);
  },

  // Projects
  getForemanProjects(foremanId) {
    return apiClient.get(`/foremen/${foremanId}/projects`);
  }
};

export default foremanService;
