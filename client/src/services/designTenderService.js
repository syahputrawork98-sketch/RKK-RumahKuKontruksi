import apiClient from './apiClient';

const designTenderService = {
  getDesignTenders: async (params) => {
    return apiClient.get('/design-tenders', { params });
  },

  getOpenDesignTenders: async () => {
    return apiClient.get('/design-tenders/open');
  },

  getDesignTenderById: async (id) => {
    return apiClient.get(`/design-tenders/${id}`);
  },

  getDesignTenderBids: async (id) => {
    return apiClient.get(`/design-tenders/${id}/bids`);
  },

  publishTender: async (payload) => {
    return apiClient.post('/design-tenders/publish', payload);
  },

  submitBid: async (tenderId, payload) => {
    return apiClient.post(`/design-tenders/${tenderId}/bids`, payload);
  },

  awardBid: async (tenderId, bidId) => {
    return apiClient.post(`/design-tenders/${tenderId}/award/${bidId}`);
  }
};

export default designTenderService;
