import axios from 'axios';

const API_URL = 'http://localhost:4000/api/supervisor-weekly-reports';

const supervisorWeeklyReportService = {
    /**
     * Get report context (project info, verified progress, approved journals)
     * @param {Object} params - { projectId, weekStartDate, weekEndDate, actorRole, actorId }
     */
    getReportContext: async (params) => {
        try {
            const response = await axios.get(`${API_URL}/context`, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get list of reports
     * @param {Object} params - { projectId, supervisorId, status, weekStartDate, weekEndDate, actorRole, actorId }
     */
    getSupervisorWeeklyReports: async (params) => {
        try {
            const response = await axios.get(API_URL, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get report detail by ID
     * @param {string} id 
     * @param {Object} actor - { actorRole, actorId }
     */
    getSupervisorWeeklyReportById: async (id, actor) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`, { params: actor });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Create a new draft report
     * @param {Object} payload 
     */
    createSupervisorWeeklyReport: async (payload) => {
        try {
            const response = await axios.post(API_URL, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Update an existing report (draft/revision requested)
     * @param {string} id 
     * @param {Object} payload 
     */
    updateSupervisorWeeklyReport: async (id, payload) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Submit report to Admin
     * @param {string} id 
     * @param {Object} actor - { actorRole, actorId }
     */
    submitSupervisorWeeklyReport: async (id, actor) => {
        try {
            const response = await axios.post(`${API_URL}/${id}/submit`, actor);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Review report (Admin action: approve, revision, reject)
     * @param {string} id 
     * @param {Object} payload - { actorRole, actorId, action, note }
     */
    reviewSupervisorWeeklyReport: async (id, payload) => {
        try {
            const response = await axios.post(`${API_URL}/${id}/review`, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default supervisorWeeklyReportService;
