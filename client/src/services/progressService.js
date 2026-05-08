import apiClient from './apiClient';

const progressService = {
    /**
     * Get progress history for a specific project
     * @param {string} projectId 
     * @param {string} adminId - Optional admin persona ID
     * @returns {Promise<Object>}
     */
    getProjectProgressHistory: async (projectId, adminId) => {
        const query = adminId ? `?adminId=${adminId}` : '';
        return apiClient.get(`/projects/${projectId}/progress-history${query}`);
    }
};

export default progressService;
