import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllRequests = async (filters = {}) => {
  const { projectId, foremanId, supervisorId, status } = filters;
  
  return await prisma.materialRequest.findMany({
    where: {
      ...(projectId && { projectId }),
      ...(foremanId && { foremanId }),
      ...(supervisorId && { supervisorId }),
      ...(status && { status }),
      ...(filters.adminId && { project: { adminId: filters.adminId } }),
    },
    include: {
      project: { select: { name: true, projectCode: true } },
      foreman: { select: { name: true } },
      supervisor: { select: { name: true } },
      items: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getRequestById = async (id) => {
  return await prisma.materialRequest.findUnique({
    where: { id },
    include: {
      project: true,
      stage: true,
      foreman: true,
      supervisor: true,
      items: {
        include: {
          rabItem: true,
        }
      },
      history: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });
};

export const createRequest = async (data) => {
  const { 
    projectId, 
    stageId, 
    foremanId, 
    supervisorId, 
    priority, 
    neededDate, 
    reason, 
    items 
  } = data;

  // Generate request code: REQ-YYYYMMDD-XXXX
  const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const count = await prisma.materialRequest.count({
    where: {
      requestCode: {
        startsWith: `REQ-${dateStr}`,
      }
    }
  });
  const requestCode = `REQ-${dateStr}-${(count + 1).toString().padStart(4, '0')}`;

  return await prisma.$transaction(async (tx) => {
    const request = await tx.materialRequest.create({
      data: {
        requestCode,
        projectId,
        stageId,
        foremanId,
        supervisorId,
        priority: priority || 'medium',
        neededDate: neededDate ? new Date(neededDate) : null,
        reason,
        status: 'submitted',
        submittedAt: new Date(),
      },
    });

    if (items && items.length > 0) {
      await tx.materialRequestItem.createMany({
        data: items.map(item => ({
          materialRequestId: request.id,
          rabItemId: item.rabItemId || null,
          materialName: item.materialName,
          requestedQty: item.requestedQty,
          unit: item.unit,
          note: item.note,
          isAdditionalMaterial: item.isAdditionalMaterial || false,
          additionalReason: item.additionalReason || null,
          // In real implementation, we would calculate estimations here
          estimatedQtyFromRab: item.estimatedQtyFromRab || 0,
        })),
      });
    }

    // Add initial history
    await tx.materialRequestHistory.create({
      data: {
        materialRequestId: request.id,
        action: 'SUBMITTED',
        newStatus: 'submitted',
        actorId: foremanId,
        actorRole: 'FOREMAN',
        note: 'Request created and submitted for verification',
      }
    });

    return request;
  });
};

export const updateRequestStatus = async (id, data) => {
  const { status, actorId, actorRole, note, adminId, ...otherData } = data;
  
  const currentRequest = await prisma.materialRequest.findUnique({ where: { id } });
  if (!currentRequest) throw new Error('Request not found');

  const updateData = { 
    status,
    ...(adminId && { adminId }),
    ...otherData
  };

  // Set timestamps based on status
  if (status === 'approved_by_supervisor') updateData.supervisorReviewedAt = new Date();
  if (status === 'approved_by_admin') updateData.adminReviewedAt = new Date();
  if (status === 'processing') updateData.processedAt = new Date();
  if (status === 'delivered') updateData.deliveredAt = new Date();
  if (status === 'received') updateData.receivedAt = new Date();
  if (status === 'completed') updateData.completedAt = new Date();
  if (status === 'cancelled') updateData.cancelledAt = new Date();

  return await prisma.$transaction(async (tx) => {
    const updated = await tx.materialRequest.update({
      where: { id },
      data: updateData,
    });

    await tx.materialRequestHistory.create({
      data: {
        materialRequestId: id,
        action: status.toUpperCase(),
        oldStatus: currentRequest.status,
        newStatus: status,
        actorId,
        actorRole,
        note,
      }
    });

    return updated;
  });
};
