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
  return await prisma.$transaction(async (tx) => {
    const milestone = await tx.customerPaymentMilestone.findUnique({
      where: { id: milestoneId },
      include: {
        plan: {
          include: {
            project: true
          }
        }
      }
    });

    const updatedMilestone = await tx.customerPaymentMilestone.update({
      where: { id: milestoneId },
      data: { 
        status,
        paidAt: status === 'paid_simulated' ? (paidAt || new Date()) : undefined
      }
    });

    // Create PaymentRecord foundation if status is paid_simulated
    if (status === 'paid_simulated' && milestone) {
      const count = await tx.paymentRecord.count();
      const paymentCode = `PAY-CUST-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
      
      await tx.paymentRecord.create({
        data: {
          paymentCode,
          projectId: milestone.projectId,
          customerId: milestone.plan.project.customerId,
          type: 'CUSTOMER_PAYMENT',
          amount: milestone.amount,
          status: 'paid', // Initial status is paid, waiting for admin verification
          milestoneId: milestone.id,
          note: `Simulated payment for milestone: ${milestone.label}`,
          paidAt: updatedMilestone.paidAt
        }
      });
    }

    return updatedMilestone;
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
