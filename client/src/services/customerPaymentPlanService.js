import apiClient from './apiClient';

const customerPaymentPlanService = {
  getPaymentPlan: async (projectId) => {
    return apiClient.get(`/customer-payment-plans/${projectId}`);
  },

  getInitializationData: async (projectId) => {
    return apiClient.get(`/customer-payment-plans/${projectId}/init`);
  },

  setupPaymentPlan: async (payload) => {
    // payload: { projectId, type, milestones, actorRole }
    return apiClient.post('/customer-payment-plans/setup', payload);
  },

  updateMilestoneStatus: async (milestoneId, payload) => {
    // payload: { status, actorRole }
    return apiClient.patch(`/customer-payment-plans/milestones/${milestoneId}/status`, payload);
  }
};

export default customerPaymentPlanService;
