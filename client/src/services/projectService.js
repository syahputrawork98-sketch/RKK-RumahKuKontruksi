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
   * Delete project (Soft delete usually)
   * @param {string} id 
   * @returns {Promise<Object>}
   */
  async deleteProject(id) {
    return apiClient.delete(`/projects/${id}`);
  }
};

export default projectService;
