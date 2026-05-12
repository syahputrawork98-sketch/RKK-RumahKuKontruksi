import prisma from '../../config/prisma.js';

export const findAll = async (filters = {}) => {
  const where = { deletedAt: null };
  
  if (filters.customerId) where.customerId = filters.customerId;
  if (filters.architectId) where.architectId = filters.architectId;
  if (filters.status && filters.status !== 'all') where.status = filters.status;

  return await prisma.designRequest.findMany({
    where,
    include: {
      customer: {
        select: { id: true, name: true, email: true, companyName: true, customerType: true }
      },
      architect: {
        select: { id: true, name: true, specialization: true }
      },
      project: {
        select: { id: true, name: true, projectCode: true }
      },
      _count: {
        select: { history: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const findById = async (id) => {
  return await prisma.designRequest.findUnique({
    where: { id },
    include: {
      customer: true,
      architect: true,
      project: true,
      history: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });
};

export const createHistory = async (data) => {
  return await prisma.designRequestHistory.create({
    data
  });
};

export const updateRevisionCount = async (id, type) => {
  const field = type === 'major' ? 'majorRevisionCount' : 'minorRevisionCount';
  return await prisma.designRequest.update({
    where: { id },
    data: {
      [field]: { increment: 1 }
    }
  });
};

export const create = async (data) => {
  return await prisma.designRequest.create({
    data,
    include: {
      customer: true,
      architect: true
    }
  });
};

export const update = async (id, data) => {
  return await prisma.designRequest.update({
    where: { id },
    data,
    include: {
      customer: true,
      architect: true
    }
  });
};

export const softDelete = async (id) => {
  return await prisma.designRequest.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
};

export const assignArchitect = async (id, architectId) => {
  return await prisma.designRequest.update({
    where: { id },
    data: { 
      architectId,
      status: 'assigned'
    },
    include: {
      architect: true
    }
  });
};

export const convertToProject = async (id, projectData) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Create the project
    const project = await tx.project.create({
      data: {
        ...projectData,
        sourceDesignRequestId: id,
        status: 'planning' // or 'Persiapan' based on repo
      }
    });

    // 2. Link DesignRequest to Project
    const updatedRequest = await tx.designRequest.update({
      where: { id },
      data: { 
        projectId: project.id,
        status: 'project_created'
      },
      include: {
        project: true
      }
    });

    return { project, updatedRequest };
  });
};
