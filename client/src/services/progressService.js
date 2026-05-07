import apiClient from './apiClient';

const progressService = {
    /**
     * Get progress history for a specific project
     * @param {string} projectId 
     * @returns {Promise<Object>}
     */
    getProjectProgressHistory: async (projectId) => {
        return apiClient.get(`/projects/${projectId}/progress-history`);
    }
};

export default progressService;
