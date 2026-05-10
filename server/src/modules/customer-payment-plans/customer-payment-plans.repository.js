import prisma from '../../config/prisma.js';

export const findByProjectId = async (projectId) => {
  return await prisma.customerPaymentPlan.findUnique({
    where: { projectId },
    include: {
      milestones: {
        orderBy: { dueOrder: 'asc' },
        include: {
          category: {
            select: {
              name: true,
              code: true
            }
          }
        }
      }
    }
  });
};

export const createPlan = async (data) => {
  const { milestones, ...planData } = data;
  return await prisma.customerPaymentPlan.create({
    data: {
      ...planData,
      milestones: {
        create: milestones
      }
    },
    include: {
      milestones: true
    }
  });
};

export const updatePlan = async (id, data) => {
  const { milestones, ...planData } = data;
  
  return await prisma.$transaction(async (tx) => {
    // If milestones are provided, delete old ones and create new ones
    if (milestones) {
      await tx.customerPaymentMilestone.deleteMany({
        where: { paymentPlanId: id }
      });
    }

    return await tx.customerPaymentPlan.update({
      where: { id },
      data: {
        ...planData,
        milestones: milestones ? {
          create: milestones
        } : undefined
      },
      include: {
        milestones: true
      }
    });
  });
};

export const updateMilestoneStatus = async (milestoneId, status, paidAt = null) => {
  return await prisma.customerPaymentMilestone.update({
    where: { id: milestoneId },
    data: { 
      status,
      paidAt: status === 'paid_simulated' ? (paidAt || new Date()) : undefined
    }
  });
};

export const getProjectRabDetails = async (projectId) => {
  return await prisma.rabPlan.findFirst({
    where: { projectId, status: 'approved' },
    include: {
      categories: {
        orderBy: { order: 'asc' }
      }
    }
  });
};
