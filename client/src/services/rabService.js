import apiClient from './apiClient';

/**
 * Service to handle RAB-related API calls
 */
const rabService = {
  /**
   * Get RAB details for a project
   * @param {string} projectId 
   * @returns {Promise<Object>}
   */
  async getRabByProject(projectId) {
    return apiClient.get(`/rab/project/${projectId}`);
  },

  /**
   * Create a new RAB plan for a project
   * @param {string} projectId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async createRabPlan(projectId, data) {
    return apiClient.post(`/rab/project/${projectId}/plans`, data);
  },

  /**
   * Update an existing RAB plan
   * @param {string} rabPlanId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async updateRabPlan(rabPlanId, data) {
    return apiClient.patch(`/rab/plans/${rabPlanId}`, data);
  },

  /**
   * Create a new category in a RAB plan
   * @param {string} rabPlanId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async createRabCategory(rabPlanId, data) {
    return apiClient.post(`/rab/plans/${rabPlanId}/categories`, data);
  },

  /**
   * Update an existing category
   * @param {string} categoryId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async updateRabCategory(categoryId, data) {
    return apiClient.patch(`/rab/categories/${categoryId}`, data);
  },

  /**
   * Delete a category
   * @param {string} categoryId 
   * @returns {Promise<Object>}
   */
  async deleteRabCategory(categoryId) {
    return apiClient.delete(`/rab/categories/${categoryId}`);
  },

  /**
   * Create a new item in a category
   * @param {string} categoryId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async createRabItem(categoryId, data) {
    return apiClient.post(`/rab/categories/${categoryId}/items`, data);
  },

  /**
   * Update an existing item
   * @param {string} itemId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async updateRabItem(itemId, data) {
    return apiClient.patch(`/rab/items/${itemId}`, data);
  },

  /**
   * Delete an item
   * @param {string} itemId 
   * @returns {Promise<Object>}
   */
  async deleteRabItem(itemId) {
    return apiClient.delete(`/rab/items/${itemId}`);
  }
};

export default rabService;
