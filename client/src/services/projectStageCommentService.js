import apiClient from './apiClient';

const projectStageCommentService = {
  getCommentsByStage: async (stageId) => {
    try {
      const response = await apiClient.get(`/project-stage-comments/stage/${stageId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for stage ${stageId}:`, error);
      throw error;
    }
  },

  createComment: async (stageId, payload) => {
    try {
      const response = await apiClient.post(`/project-stage-comments/stage/${stageId}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error creating comment for stage ${stageId}:`, error);
      throw error;
    }
  },

  updateComment: async (commentId, payload) => {
    try {
      const response = await apiClient.patch(`/project-stage-comments/${commentId}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating comment ${commentId}:`, error);
      throw error;
    }
  },

  deleteComment: async (commentId) => {
    try {
      const response = await apiClient.delete(`/project-stage-comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting comment ${commentId}:`, error);
      throw error;
    }
  }
};

export default projectStageCommentService;
