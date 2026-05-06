import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return await prisma.project.findMany({
    include: {
      customer: {
        select: {
          name: true,
          avatar: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const findById = async (id) => {
  return await prisma.project.findUnique({
    where: { id },
    include: {
      customer: true,
      stages: {
        orderBy: { order: 'asc' }
      },
      rabPlans: {
        where: { status: 'approved' },
        include: {
          categories: {
            orderBy: { order: 'asc' },
            include: {
              items: {
                orderBy: { id: 'asc' }
              }
            }
          }
        }
      }
    },
  });
};

export const findStagesByProjectId = async (projectId) => {
  return await prisma.projectStage.findMany({
    where: { projectId },
    orderBy: { order: 'asc' },
  });
};

export const findRabByProjectId = async (projectId) => {
  return await prisma.rabPlan.findFirst({
    where: { projectId, status: 'approved' },
    include: {
      categories: {
        orderBy: { order: 'asc' },
        include: {
          items: {
            orderBy: { id: 'asc' }
          }
        }
      }
    }
  });
};
