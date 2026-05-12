import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPaymentRecords = async (filters = {}) => {
  const { projectId, customerId, foremanId, type, status } = filters;

  const where = {};
  if (projectId) where.projectId = projectId;
  if (customerId) where.customerId = customerId;
  if (foremanId) where.foremanId = foremanId;
  if (type) where.type = type;
  if (status) where.status = status;

  const payments = await prisma.paymentRecord.findMany({
    where,
    include: {
      project: {
        select: {
          id: true,
          projectCode: true,
          name: true
        }
      },
      customer: {
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
      proofDocument: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return payments;
};

export const getPaymentRecordById = async (id) => {
  return await prisma.paymentRecord.findUnique({
    where: { id },
    include: {
      project: true,
      customer: true,
      foreman: true,
      proofDocument: true
    }
  });
};

export const createPaymentRecord = async (data) => {
  const count = await prisma.paymentRecord.count();
  const paymentCode = `PAY-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
  
  return await prisma.paymentRecord.create({
    data: {
      ...data,
      paymentCode
    }
  });
};

export const updatePaymentStatus = async (id, statusData) => {
  const { status, verifiedByRole, verifiedById, note } = statusData;
  
  const updateData = { status };
  if (status === 'verified') {
    updateData.verifiedAt = new Date();
    updateData.verifiedByRole = verifiedByRole;
    updateData.verifiedById = verifiedById;
  }
  if (note) updateData.note = note;

  return await prisma.paymentRecord.update({
    where: { id },
    data: updateData
  });
};
