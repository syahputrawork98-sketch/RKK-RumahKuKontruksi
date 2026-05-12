import apiClient from './apiClient';

/**
 * Service for managing payment records (Local simulated payments)
 */
const paymentService = {
  /**
   * Get all payment records with filters
   * @param {Object} filters - Filter parameters (projectId, customerId, foremanId, type, status)
   */
  getPayments: async (filters = {}) => {
    return await apiClient.get('/payment-records', { params: filters });
  },

  /**
   * Get payment record details by ID
   * @param {string} id - Payment record ID
   */
  getPaymentById: async (id) => {
    return await apiClient.get(`/payment-records/${id}`);
  },

  /**
   * Create a new payment record (Local simulation)
   * @param {Object} paymentData - Payment data
   */
  createPayment: async (paymentData) => {
    return await apiClient.post('/payment-records', paymentData);
  },

  /**
   * Update payment status (Verify/Reject)
   * @param {string} id - Payment record ID
   * @param {Object} statusData - Status data (status, note, verifiedByRole, verifiedById)
   */
  updateStatus: async (id, statusData) => {
    return await apiClient.patch(`/payment-records/${id}/status`, statusData);
  }
};

export default paymentService;
