import apiClient from './apiClient';

/**
 * Service to handle RAB-related API calls
 */
const rabService = {
  /**
   * Get RAB details for a project
   * @param {string} projectId 
   * @param {Object} params - { adminId }
   * @returns {Promise<Object>}
   */
  async getRabByProject(projectId, params = {}) {
    return apiClient.get(`/rab/project/${projectId}`, { params });
  },

  /**
   * Create a new RAB plan for a project
   * @param {string} projectId 
   * @param {Object} data 
   * @param {Object} params - { adminId }
   * @returns {Promise<Object>}
   */
  async createRabPlan(projectId, data, params = {}) {
    return apiClient.post(`/rab/project/${projectId}/plans`, { ...data, ...params });
  },

  /**
   * Update an existing RAB plan
   * @param {string} rabPlanId 
   * @param {Object} data 
   * @param {Object} params - { adminId }
   * @returns {Promise<Object>}
   */
  async updateRabPlan(rabPlanId, data, params = {}) {
    return apiClient.patch(`/rab/plans/${rabPlanId}`, { ...data, ...params });
  },

  /**
   * Create a new category in a RAB plan
   * @param {string} rabPlanId 
   * @param {Object} data 
   * @param {Object} params - { adminId }
   * @returns {Promise<Object>}
   */
  async createRabCategory(rabPlanId, data, params = {}) {
    return apiClient.post(`/rab/plans/${rabPlanId}/categories`, { ...data, ...params });
  },

  /**
   * Update an existing category
   * @param {string} categoryId 
   * @param {Object} data 
   * @param {Object} params - { adminId }
   * @returns {Promise<Object>}
   */
  async updateRabCategory(categoryId, data, params = {}) {
    return apiClient.patch(`/rab/categories/${categoryId}`, { ...data, ...params });
  },

  /**
   * Delete a category
   * @param {string} categoryId 
   * @param {Object} params - { adminId }
   * @returns {Promise<Object>}
   */
  async deleteRabCategory(categoryId, params = {}) {
    return apiClient.delete(`/rab/categories/${categoryId}`, { params });
  },

  /**
   * Create a new item in a category
   * @param {string} categoryId 
   * @param {Object} data 
   * @param {Object} params - { adminId }
   * @returns {Promise<Object>}
   */
  async createRabItem(categoryId, data, params = {}) {
    return apiClient.post(`/rab/categories/${categoryId}/items`, { ...data, ...params });
  },

  /**
   * Update an existing item
   * @param {string} itemId 
   * @param {Object} data 
   * @param {Object} params - { adminId }
   * @returns {Promise<Object>}
   */
  async updateRabItem(itemId, data, params = {}) {
    return apiClient.patch(`/rab/items/${itemId}`, { ...data, ...params });
  },

  /**
   * Delete an item
   * @param {string} itemId 
   * @param {Object} params - { adminId }
   * @returns {Promise<Object>}
   */
  async deleteRabItem(itemId, params = {}) {
    return apiClient.delete(`/rab/items/${itemId}`, { params });
  },

  /**
   * Import RAB items from array
   * @param {string} rabPlanId 
   * @param {Array} items 
   * @param {Object} params - { adminId }
   * @returns {Promise<Object>}
   */
  async importItems(rabPlanId, items, params = {}) {
    return apiClient.post(`/rab/plans/${rabPlanId}/import-items`, { items, ...params });
  }
};

export default rabService;
