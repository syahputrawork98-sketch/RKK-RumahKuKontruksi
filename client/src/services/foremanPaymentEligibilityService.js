import apiClient from './apiClient';

const foremanPaymentEligibilityService = {
    getAll: async (params = {}) => {
        return await apiClient.get('/foreman-payment-eligibility', { params });
    },

    getById: async (id) => {
        return await apiClient.get(`/foreman-payment-eligibility/${id}`);
    },

    initializeFromJournal: async (data) => {
        return await apiClient.post('/foreman-payment-eligibility/initialize', data);
    },

    updateStatus: async (id, data) => {
        return await apiClient.patch(`/foreman-payment-eligibility/${id}/status`, data);
    },

    updateItemStatus: async (itemId, data) => {
        return await apiClient.patch(`/foreman-payment-eligibility/items/${itemId}/status`, data);
    }
};

export default foremanPaymentEligibilityService;
