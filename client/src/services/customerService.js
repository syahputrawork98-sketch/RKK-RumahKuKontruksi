// client/src/services/customerService.js
import apiClient from './apiClient';

/**
 * Service to handle customer-related API calls
 */
const customerService = {
  /**
   * Get all customers
   * @returns {Promise<Object>}
   */
  async getAllCustomers() {
    return apiClient.get('/customers');
  },

  /**
   * Get customers with params
   * @param {Object} params 
   * @returns {Promise<Object>}
   */
  async getCustomers(params = {}) {
    const queryParams = new URLSearchParams(params);
    const endpoint = `/customers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get(endpoint);
  },

  /**
   * Get customer by ID
   * @param {string} id 
   * @returns {Promise<Object>}
   */
  async getCustomerById(id) {
    return apiClient.get(`/customers/${id}`);
  },

  /**
   * Create new customer
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async createCustomer(data) {
    return apiClient.post('/customers', data);
  },

  /**
   * Update existing customer
   * @param {string} id 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async updateCustomer(id, data) {
    return apiClient.patch(`/customers/${id}`, data);
  },

  /**
   * Delete customer
   * @param {string} id 
   * @returns {Promise<Object>}
   */
  async deleteCustomer(id) {
    return apiClient.delete(`/customers/${id}`);
  }
};

export default customerService;
