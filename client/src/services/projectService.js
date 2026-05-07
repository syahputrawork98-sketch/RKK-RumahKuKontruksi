import apiClient from './apiClient';

/**
 * Service to handle project-related API calls
 */
const projectService = {
  /**
   * Get list of projects
   * @returns {Promise<Object>}
   */
  async getProjects() {
    return apiClient.get('/projects');
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
  }
};

export default projectService;
