import prisma from '../../config/prisma.js';

export const create = async (data) => {
  return await prisma.profileChangeRequest.create({
    data
  });
};

export const findAll = async (params = {}) => {
  const { status, targetRole } = params;
  const where = {};
  
  if (status) where.status = status;
  if (targetRole) where.targetRole = targetRole;

  return await prisma.profileChangeRequest.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });
};

export const findById = async (id) => {
  return await prisma.profileChangeRequest.findUnique({
    where: { id }
  });
};

export const update = async (id, data) => {
  return await prisma.profileChangeRequest.update({
    where: { id },
    data
  });
};
