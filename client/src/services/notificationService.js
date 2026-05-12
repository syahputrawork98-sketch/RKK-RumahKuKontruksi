import apiClient from './apiClient';

const notificationService = {
  getNotifications: async (role, id, unreadOnly = false) => {
    return await apiClient.get('/notifications', { 
      params: { role, id, unreadOnly } 
    });
  },

  getUnreadCount: async (role, id) => {
    return await apiClient.get('/notifications/unread-count', { 
      params: { role, id } 
    });
  },

  markAsRead: async (id) => {
    return await apiClient.patch(`/notifications/${id}/read`);
  },

  markAllAsRead: async (role, id) => {
    return await apiClient.patch('/notifications/read-all', { role, id });
  }
};

export default notificationService;
