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
  const request = await prisma.materialRequest.findUnique({
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

  if (!request) return null;

  // Enhance items with remaining RAB info
  const enhancedItems = await Promise.all(request.items.map(async (item) => {
    if (!item.rabItemId) return { ...item, remainingRabQty: 0, totalApprovedQty: 0 };

    const approvedItems = await prisma.materialRequestItem.findMany({
      where: {
        rabItemId: item.rabItemId,
        materialRequest: {
          id: { not: request.id },
          status: { in: ['approved_by_supervisor', 'approved_by_admin', 'processing', 'delivered', 'received', 'completed'] }
        }
      },
      select: { requestedQty: true }
    });

    const totalApprovedQty = approvedItems.reduce((sum, i) => sum + parseFloat(i.requestedQty), 0);
    const rabQty = parseFloat(item.rabItem.volume);
    const remainingRabQty = Math.max(0, rabQty - totalApprovedQty);

    return {
      ...item,
      totalApprovedQty,
      remainingRabQty
    };
  }));

  return {
    ...request,
    items: enhancedItems
  };
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

  // Validation
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { status: true, foremanId: true, supervisorId: true }
  });

  if (!project) {
    throw new Error('Project not found');
  }

  // Only allow material requests for active/ongoing projects
  const allowedStatuses = ['active', 'ongoing', 'Berjalan'];
  if (!allowedStatuses.includes(project.status)) {
    throw new Error('Material request hanya diperbolehkan untuk proyek yang sudah aktif/berjalan.');
  }

  // Ensure persona assignment matches
  if (project.foremanId !== foremanId) {
    throw new Error('Mandor ini tidak ditugaskan pada proyek ini.');
  }

  if (project.supervisorId !== supervisorId) {
    throw new Error('Pengawas ini tidak ditugaskan pada proyek ini.');
  }

  // Validate Stage belongs to Project
  if (stageId) {
    const stage = await prisma.projectStage.findFirst({
      where: { id: stageId, projectId }
    });
    if (!stage) {
      throw new Error('Tahap pekerjaan (Stage) tidak ditemukan atau tidak sesuai dengan proyek ini.');
    }
  }

  // Validate items
  if (items && items.length > 0) {
    for (const item of items) {
      if (item.rabItemId) {
        const rabItem = await prisma.rabItem.findFirst({
          where: { id: item.rabItemId, projectId }
        });
        if (!rabItem) {
          throw new Error(`Item RAB "${item.materialName}" tidak ditemukan atau tidak sesuai dengan proyek ini.`);
        }
      } else {
        // Manual request validation
        if (!item.note && !item.additionalReason) {
          throw new Error(`Material "${item.materialName}" adalah item manual/tambahan, mohon berikan alasan atau catatan yang jelas.`);
        }
      }
    }
  }

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
          note: item.note || item.additionalReason, // Consolidate note
          isAdditionalMaterial: !item.rabItemId,
          additionalReason: item.additionalReason || null,
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

export const getRabUsageByProject = async (projectId) => {
  const rabItems = await prisma.rabItem.findMany({
    where: { projectId },
    include: {
      category: true
    }
  });

  const usage = await Promise.all(rabItems.map(async (item) => {
    const approvedItems = await prisma.materialRequestItem.findMany({
      where: {
        rabItemId: item.id,
        materialRequest: {
          status: { in: ['approved_by_supervisor', 'approved_by_admin', 'processing', 'delivered', 'received', 'completed'] }
        }
      },
      select: { requestedQty: true }
    });

    const totalApprovedQty = approvedItems.reduce((sum, i) => sum + parseFloat(i.requestedQty), 0);
    const rabQty = parseFloat(item.volume);
    const remainingRabQty = Math.max(0, rabQty - totalApprovedQty);

    return {
      rabItemId: item.id,
      description: item.description,
      unit: item.unit,
      totalRabQty: rabQty,
      totalApprovedQty,
      remainingRabQty,
      categoryName: item.category?.name
    };
  }));

  return usage;
};

export const updateRequestStatus = async (id, data) => {
  const { status, actorId, actorRole, note, adminId, ...otherData } = data;
  
  const currentRequest = await getRequestById(id);
  if (!currentRequest) throw new Error('Request not found');

  // Logic validation for status transition
  const finalStatuses = ['rejected', 'cancelled', 'completed'];
  if (finalStatuses.includes(currentRequest.status)) {
    throw new Error(`Permintaan ini sudah dalam status final (${currentRequest.status}) dan tidak dapat diubah lagi.`);
  }

  // Logic validation for APPROVAL
  const isApproving = ['approved_by_supervisor', 'approved_by_admin'].includes(status);
  
  return await prisma.$transaction(async (tx) => {
    if (isApproving) {
      // 1. Project Status Check
      const allowedStatuses = ['active', 'ongoing', 'Berjalan'];
      if (!allowedStatuses.includes(currentRequest.project.status)) {
        throw new Error(`Approval gagal: Proyek "${currentRequest.project.name}" sedang dalam status ${currentRequest.project.status}. Hanya proyek aktif (Berjalan) yang bisa diproses logistiknya.`);
      }

      // 2. RAB Quantity Check
      for (const item of currentRequest.items) {
        if (item.rabItemId) {
          const requestedQty = parseFloat(item.requestedQty);
          
          // RE-CALCULATE inside transaction to ensure accuracy
          const approvedItems = await tx.materialRequestItem.findMany({
            where: {
              rabItemId: item.rabItemId,
              materialRequest: {
                id: { not: id },
                status: { in: ['approved_by_supervisor', 'approved_by_admin', 'processing', 'delivered', 'received', 'completed'] }
              }
            },
            select: { requestedQty: true }
          });

          const totalApprovedQty = approvedItems.reduce((sum, i) => sum + parseFloat(i.requestedQty), 0);
          const rabQty = parseFloat(item.rabItem.volume);
          const remainingRabQty = Math.max(0, rabQty - totalApprovedQty);
          
          if (requestedQty > remainingRabQty) {
            throw new Error(`Alokasi RAB tidak mencukupi untuk ${item.materialName}. Diminta: ${requestedQty} ${item.unit}, Tersedia: ${remainingRabQty} ${item.unit}. (Total RAB: ${rabQty})`);
          }
        }
      }
    }

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
