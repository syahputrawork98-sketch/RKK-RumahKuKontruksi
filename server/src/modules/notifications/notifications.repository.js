import prisma from '../../config/prisma.js';

export const findAll = async (filters = {}) => {
  const { recipientRole, recipientId, unreadOnly } = filters;
  return await prisma.appNotification.findMany({
    where: {
      recipientRole,
      recipientId,
      ...(unreadOnly === 'true' && { readAt: null })
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 50 // Limit to last 50 for performance
  });
};

export const countUnread = async (recipientRole, recipientId) => {
  return await prisma.appNotification.count({
    where: {
      recipientRole,
      recipientId,
      readAt: null
    }
  });
};

export const markAsRead = async (id) => {
  return await prisma.appNotification.update({
    where: { id },
    data: { readAt: new Date() }
  });
};

export const markAllAsRead = async (recipientRole, recipientId) => {
  return await prisma.appNotification.updateMany({
    where: {
      recipientRole,
      recipientId,
      readAt: null
    },
    data: { readAt: new Date() }
  });
};

export const create = async (data) => {
  return await prisma.appNotification.create({
    data
  });
};
