import prisma from '../../config/prisma.js';

export const findAllByProjectId = async (projectId) => {
  return await prisma.projectStage.findMany({
    where: { projectId },
    orderBy: { order: 'asc' },
  });
};

export const findById = async (id) => {
  return await prisma.projectStage.findUnique({
    where: { id },
  });
};

export const create = async (data) => {
  return await prisma.projectStage.create({
    data,
  });
};

export const update = async (id, data) => {
  return await prisma.projectStage.update({
    where: { id },
    data,
  });
};

export const remove = async (id) => {
  return await prisma.projectStage.delete({
    where: { id },
  });
};
