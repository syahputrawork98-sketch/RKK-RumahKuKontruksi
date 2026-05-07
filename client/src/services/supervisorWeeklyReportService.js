import apiClient from './apiClient';

const supervisorWeeklyReportService = {
    /**
     * Get report context (project info, verified progress, approved journals)
     * @param {Object} params - { projectId, weekStartDate, weekEndDate, actorRole, actorId }
     */
    getReportContext: async (params) => {
        return apiClient.get('/supervisor-weekly-reports/context', { params });
    },

    /**
     * Get list of reports
     * @param {Object} params - { projectId, supervisorId, status, weekStartDate, weekEndDate, actorRole, actorId }
     */
    getSupervisorWeeklyReports: async (params) => {
        return apiClient.get('/supervisor-weekly-reports', { params });
    },

    /**
     * Get report detail by ID
     * @param {string} id 
     * @param {Object} actor - { actorRole, actorId }
     */
    getSupervisorWeeklyReportById: async (id, actor) => {
        return apiClient.get(`/supervisor-weekly-reports/${id}`, { params: actor });
    },

    /**
     * Create a new draft report
     * @param {Object} payload 
     */
    createSupervisorWeeklyReport: async (payload) => {
        return apiClient.post('/supervisor-weekly-reports', payload);
    },

    /**
     * Update an existing report (draft/revision requested)
     * @param {string} id 
     * @param {Object} payload 
     */
    updateSupervisorWeeklyReport: async (id, payload) => {
        return apiClient.patch(`/supervisor-weekly-reports/${id}`, payload);
    },

    /**
     * Submit report to Admin
     * @param {string} id 
     * @param {Object} actor - { actorRole, actorId }
     */
    submitSupervisorWeeklyReport: async (id, actor) => {
        return apiClient.post(`/supervisor-weekly-reports/${id}/submit`, actor);
    },

    /**
     * Review report (Admin action: start_admin_review, reviewed, request_revision, reject)
     * @param {string} id 
     * @param {Object} payload - { actorRole, actorId, action, note, adminNote, customerSummaryDraft }
     */
    reviewSupervisorWeeklyReport: async (id, payload) => {
        return apiClient.post(`/supervisor-weekly-reports/${id}/review`, payload);
    },

    /**
     * Publish report to Customer
     * @param {string} id 
     * @param {Object} actor - { actorRole, actorId }
     */
    publishSupervisorWeeklyReport: async (id, actor) => {
        return apiClient.post(`/supervisor-weekly-reports/${id}/publish`, actor);
    }
};

export default supervisorWeeklyReportService;
