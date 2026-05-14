import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTasks = async (filters) => {
  const { projectId, foremanId, status } = filters;
  const where = {};
  if (projectId) where.projectId = projectId;
  if (foremanId) where.foremanId = foremanId;
  if (status) where.status = status;

  return prisma.dailyTask.findMany({
    where,
    include: {
      project: { select: { id: true, name: true, projectCode: true } },
      stage: { select: { id: true, title: true } },
      rabItem: { select: { id: true, description: true } }
    },
    orderBy: { targetDate: 'asc' }
  });
};

export const getTaskById = async (id) => {
  return prisma.dailyTask.findUnique({
    where: { id },
    include: {
      project: { select: { id: true, name: true, projectCode: true } },
      stage: { select: { id: true, title: true } },
      rabItem: { select: { id: true, description: true } }
    }
  });
};

export const createTask = async (data) => {
  return prisma.dailyTask.create({
    data: {
      projectId: data.projectId,
      foremanId: data.foremanId,
      stageId: data.stageId,
      rabItemId: data.rabItemId,
      title: data.title,
      description: data.description,
      targetDate: new Date(data.targetDate),
      status: data.status || 'todo',
      priority: data.priority || 'medium'
    }
  });
};

export const updateTaskStatus = async (id, status, notes) => {
  return prisma.dailyTask.update({
    where: { id },
    data: { 
      status,
      ...(notes && { notes })
    }
  });
};
