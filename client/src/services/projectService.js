import apiClient from './apiClient';

/**
 * Service to handle project-related API calls
 */
const projectService = {
  /**
   * Get list of projects
   * @returns {Promise<Object>}
   */
  async getProjects(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.supervisorId) queryParams.append('supervisorId', params.supervisorId);
    if (params.foremanId) queryParams.append('foremanId', params.foremanId);
    if (params.adminId) queryParams.append('adminId', params.adminId);
    if (params.customerId) queryParams.append('customerId', params.customerId);
    if (params.status) queryParams.append('status', params.status);
    
    const queryString = queryParams.toString();
    const endpoint = `/projects${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get(endpoint);
  },

  /**
   * Get project detail by ID
   * @param {string} id 
   * @returns {Promise<Object>}
   */
  async getProjectById(id) {
    return apiClient.get(`/projects/${id}`);
  },

  /**
   * Get project stages by project ID
   * @param {string} id 
   * @returns {Promise<Object>}
   */
  async getProjectStages(id) {
    return apiClient.get(`/projects/${id}/stages`);
  },

  /**
   * Get project RAB by project ID
   * @param {string} id 
   * @returns {Promise<Object>}
   */
  async getProjectRab(id) {
    return apiClient.get(`/projects/${id}/rab`);
  },

  /**
   * Create new project
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async createProject(data) {
    return apiClient.post('/projects', data);
  },

  /**
   * Update existing project
   * @param {string} id 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async updateProject(id, data) {
    return apiClient.patch(`/projects/${id}`, data);
  },

  /**
   * Update project assignment (Admin/Supervisor/Foreman)
   * @param {string} id 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async updateProjectAssignment(id, data) {
    return apiClient.patch(`/projects/${id}`, data);
  },

  /**
   * Delete project (Soft delete usually)
   * @param {string} id 
   * @returns {Promise<Object>}
   */
  async deleteProject(id) {
    return apiClient.delete(`/projects/${id}`);
  },

  /**
   * Verify project progress (Supervisor only)
   * @param {string} projectId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async verifyProjectProgress(projectId, data) {
    return apiClient.patch(`/projects/${projectId}/verify-progress`, data);
  },

  /**
   * Get project progress verification history
   * @param {string} projectId 
   * @param {Object} actor 
   * @returns {Promise<Object>}
   */
  async getProjectProgressHistory(projectId, actor = {}) {
    const queryParams = new URLSearchParams();
    if (actor.actorRole) queryParams.append('actorRole', actor.actorRole);
    if (actor.actorId) queryParams.append('actorId', actor.actorId);
    
    const queryString = queryParams.toString();
    const endpoint = `/projects/${projectId}/progress-history${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get(endpoint);
  },

  /**
   * Activate project (Admin only)
   * @param {string} id 
   * @param {Object} data - { adminId }
   * @returns {Promise<Object>}
   */
  async activateProject(id, data) {
    return apiClient.patch(`/projects/${id}/activate`, data);
  },

  /**
   * Get material requests for a specific project
   * @param {string} projectId 
   * @returns {Promise<Object>}
   */
  async getProjectMaterialRequests(projectId) {
    return apiClient.get(`/material-requests?projectId=${projectId}`);
  },

  /**
   * Update project stage (Supervisor local completion)
   * @param {string} projectId 
   * @param {string} stageId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async updateProjectStage(projectId, stageId, data) {
    return apiClient.patch(`/projects/${projectId}/stages/${stageId}`, data);
  }
};

export default projectService;
