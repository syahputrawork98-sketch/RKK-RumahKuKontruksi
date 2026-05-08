import apiClient from './apiClient';

/**
 * Service to handle project stage-related API calls
 */
const projectStageService = {
  /**
   * Get all stages for a project
   * @param {string} projectId 
   * @returns {Promise<Object>}
   */
  async getStagesByProject(projectId) {
    return apiClient.get(`/project-stages/project/${projectId}`);
  },
  
  /**
   * Get stage by ID
   * @param {string} stageId 
   * @returns {Promise<Object>}
   */
  async getStageById(stageId) {
    return apiClient.get(`/project-stages/${stageId}`);
  },

  /**
   * Create a new stage for a project
   * @param {string} projectId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async createStage(projectId, data) {
    return apiClient.post(`/project-stages/project/${projectId}`, data);
  },

  /**
   * Update an existing stage
   * @param {string} stageId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async updateStage(stageId, data) {
    return apiClient.patch(`/project-stages/${stageId}`, data);
  },

  /**
   * Delete a stage
   * @param {string} stageId 
   * @returns {Promise<Object>}
   */
  async deleteStage(stageId) {
    return apiClient.delete(`/project-stages/${stageId}`);
  }
};

export default projectStageService;
