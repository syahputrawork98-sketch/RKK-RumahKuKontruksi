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
        orderBy: { order: 'asc' },
        include: {
          _count: {
            select: {
              journalActivities: true,
              reportNotes: true
            }
          }
        }
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
      },
      designRequests: {
        select: {
          id: true,
          title: true,
          status: true
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

export const findStageById = async (id) => {
  return await prisma.projectStage.findUnique({
    where: { id }
  });
};

export const updateStage = async (id, data) => {
  return await prisma.projectStage.update({
    where: { id },
    data
  });
};

export const findRabByProjectId = async (projectId) => {
  // First try to find approved RAB
  let rab = await prisma.rabPlan.findFirst({
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

  // Fallback to latest RAB if no approved one exists (useful for local development/planning)
  if (!rab) {
    rab = await prisma.rabPlan.findFirst({
      where: { projectId },
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
    });
  }

  return rab;
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

export const recalculateProjectVerifiedProgress = async (projectId, tx = prisma) => {
  const stages = await tx.projectStage.findMany({
    where: { projectId },
    select: { progress: true }
  });

  if (stages.length === 0) return 0;

  const totalProgress = stages.reduce((sum, stage) => sum + (stage.progress || 0), 0);
  const averageProgress = totalProgress / stages.length;

  const updatedProject = await tx.project.update({
    where: { id: projectId },
    data: {
      verifiedProgress: averageProgress,
      verifiedProgressUpdatedAt: new Date()
    }
  });

  return updatedProject.verifiedProgress;
};

export const hasActiveMaterialRequests = async (projectId) => {
  const activeRequests = await prisma.materialRequest.findMany({
    where: {
      projectId,
      status: {
        notIn: ['received', 'completed', 'rejected', 'cancelled']
      }
    }
  });
  return activeRequests.length > 0;
};
