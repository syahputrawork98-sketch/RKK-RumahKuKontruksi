import * as Repository from './notifications.repository.js';

export const getNotifications = async (filters) => {
  return await Repository.findAll(filters);
};

export const getUnreadCount = async (role, id) => {
  return await Repository.countUnread(role, id);
};

export const markRead = async (id) => {
  return await Repository.markAsRead(id);
};

export const markAllRead = async (role, id) => {
  return await Repository.markAllAsRead(role, id);
};

/**
 * Internal helper to create notifications from other modules
 */
export const createNotification = async (data) => {
  try {
    return await Repository.create(data);
  } catch (error) {
    console.error('Failed to create notification:', error);
    // Don't throw error to prevent breaking the main workflow
    return null;
  }
};
