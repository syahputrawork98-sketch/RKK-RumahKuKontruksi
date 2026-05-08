import apiClient from './apiClient';

const supervisorService = {
  // Supervisors
  getAllSupervisors() {
    return apiClient.get('/supervisors');
  },

  getSupervisors(params) {
    return apiClient.get('/supervisors', { params });
  },

  getSupervisorById(id) {
    return apiClient.get(`/supervisors/${id}`);
  },
  
  getSupervisorStats(id) {
    return apiClient.get(`/supervisors/${id}/stats`);
  },

  createSupervisor(data) {
    return apiClient.post('/supervisors', data);
  },

  updateSupervisor(id, data) {
    return apiClient.patch(`/supervisors/${id}`, data);
  },

  deleteSupervisor(id) {
    return apiClient.delete(`/supervisors/${id}`);
  },

  // Certificates
  getCertificates(supervisorId) {
    return apiClient.get(`/supervisors/${supervisorId}/certificates`);
  },

  createCertificate(supervisorId, data) {
    return apiClient.post(`/supervisors/${supervisorId}/certificates`, data);
  },

  updateCertificate(certificateId, data) {
    return apiClient.patch(`/supervisors/certificates/${certificateId}`, data);
  },

  deleteCertificate(certificateId) {
    return apiClient.delete(`/supervisors/certificates/${certificateId}`);
  },

  // Experiences
  getExperiences(supervisorId) {
    return apiClient.get(`/supervisors/${supervisorId}/experiences`);
  },

  createExperience(supervisorId, data) {
    return apiClient.post(`/supervisors/${supervisorId}/experiences`, data);
  },

  updateExperience(experienceId, data) {
    return apiClient.patch(`/supervisors/experiences/${experienceId}`, data);
  },

  deleteExperience(experienceId) {
    return apiClient.delete(`/supervisors/experiences/${experienceId}`);
  },
};

export default supervisorService;
