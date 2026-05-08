import prisma from '../../config/prisma.js';

export const findAll = async (filters = {}) => {
  const where = {};
  if (filters.supervisorId) {
    where.supervisorId = filters.supervisorId;
  }
  if (filters.foremanId) {
    where.foremanId = filters.foremanId;
  }
  if (filters.adminId) {
    where.adminId = filters.adminId;
  }
  if (filters.customerId) {
    where.customerId = filters.customerId;
  }

  return await prisma.project.findMany({
    where,
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          avatar: true,
        }
      },
      admin: {
        select: {
          id: true,
          name: true
        }
      },
      supervisor: {
        select: {
          id: true,
          name: true
        }
      },
      foreman: {
        select: {
          id: true,
          name: true
        }
      },
      rabPlans: {
        select: {
          id: true,
          status: true,
          totalAmount: true
        },
        orderBy: { createdAt: 'desc' },
        take: 1
      },
      _count: {
        select: {
          rabPlans: true,
          stages: true
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
      _count: {
        select: {
          stages: true,
          rabPlans: true,
        }
      },
      stages: {
        orderBy: { order: 'asc' }
      },
      rabPlans: {
        orderBy: { createdAt: 'desc' },
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
      },
      supervisor: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      foreman: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      admin: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    },
  });
};

export const findByCode = async (projectCode) => {
  return await prisma.project.findUnique({
    where: { projectCode },
  });
};

export const create = async (data) => {
  return await prisma.project.create({
    data,
  });
};

export const update = async (id, data) => {
  return await prisma.project.update({
    where: { id },
    data,
  });
};

export const remove = async (id) => {
  return await prisma.project.delete({
    where: { id },
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

export const createProgressLog = async (data) => {
  return await prisma.progressVerificationLog.create({
    data,
    include: {
      supervisor: {
        select: {
          name: true,
          avatar: true
        }
      }
    }
  });
};

export const findProgressHistoryByProjectId = async (projectId) => {
  return await prisma.progressVerificationLog.findMany({
    where: { projectId },
    include: {
      supervisor: {
        select: {
          name: true,
          avatar: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};
