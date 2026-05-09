import prisma from '../../config/prisma.js';

export const findByStageId = async (stageId) => {
  return await prisma.projectStagePublicComment.findMany({
    where: {
      stageId,
      status: 'published',
      parentId: null, // Get only parent comments first
      deletedAt: null
    },
    include: {
      replies: {
        where: {
          status: 'published',
          deletedAt: null
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
};

export const findById = async (id) => {
  return await prisma.projectStagePublicComment.findFirst({
    where: {
      id,
      deletedAt: null,
      status: 'published'
    }
  });
};

export const create = async (data) => {
  return await prisma.projectStagePublicComment.create({
    data,
    include: {
      replies: true
    }
  });
};

export const update = async (id, data) => {
  return await prisma.projectStagePublicComment.update({
    where: { id },
    data
  });
};

export const softDelete = async (id) => {
  return await prisma.projectStagePublicComment.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: 'hidden'
    }
  });
};
