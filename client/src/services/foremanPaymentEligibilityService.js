import axios from 'axios';

const API_URL = 'http://localhost:3001/api/foreman-payment-eligibility';

const foremanPaymentEligibilityService = {
    getAll: async (params = {}) => {
        return await axios.get(API_URL, { params });
    },

    getById: async (id) => {
        return await axios.get(`${API_URL}/${id}`);
    },

    initializeFromJournal: async (data) => {
        return await axios.post(`${API_URL}/initialize`, data);
    },

    updateStatus: async (id, data) => {
        return await axios.patch(`${API_URL}/${id}/status`, data);
    },

    updateItemStatus: async (itemId, data) => {
        return await axios.patch(`${API_URL}/items/${itemId}/status`, data);
    }
};

export default foremanPaymentEligibilityService;
