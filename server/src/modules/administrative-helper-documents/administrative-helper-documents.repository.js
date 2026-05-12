import prisma from '../../config/prisma.js';

export const findAll = async (filters = {}) => {
  const { projectId, type, status } = filters;
  return await prisma.administrativeHelperDocument.findMany({
    where: {
      ...(projectId && { projectId }),
      ...(type && { type }),
      ...(status && { status })
    },
    include: {
      project: true,
      customer: true,
      paymentRecord: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const findById = async (id) => {
  return await prisma.administrativeHelperDocument.findUnique({
    where: { id },
    include: {
      project: true,
      customer: true,
      paymentRecord: true
    }
  });
};

export const create = async (data) => {
  return await prisma.administrativeHelperDocument.create({
    data
  });
};

export const updateStatus = async (id, status, releasedAt = null) => {
  return await prisma.administrativeHelperDocument.update({
    where: { id },
    data: {
      status,
      ...(status === 'released' && { releasedAt: releasedAt || new Date() })
    }
  });
};
