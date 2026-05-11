import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllIssues = async (filters) => {
  const where = {};
  if (filters.projectId) where.projectId = filters.projectId;
  if (filters.foremanId) where.foremanId = filters.foremanId;
  if (filters.status) where.status = filters.status;

  return prisma.fieldIssue.findMany({
    where,
    include: {
      project: { select: { name: true, projectCode: true } },
      foreman: { select: { name: true } },
      supervisor: { select: { name: true } },
      admin: { select: { name: true } },
      stage: { select: { title: true, code: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const getIssueById = async (id) => {
  return prisma.fieldIssue.findUnique({
    where: { id },
    include: {
      project: { select: { name: true, projectCode: true } },
      foreman: { select: { name: true } },
      supervisor: { select: { name: true } },
      admin: { select: { name: true } },
      stage: { select: { title: true, code: true } },
      rabItem: { select: { description: true } }
    }
  });
};

export const createIssue = async (data) => {
  const { projectId, foremanId, title, description, category, priority, stageId, rabItemId } = data;
  
  if (!projectId || !foremanId || !title || !description || !category) {
    throw new Error('Missing required fields');
  }

  // Generate issue code
  const count = await prisma.fieldIssue.count({
    where: { projectId }
  });
  const issueCode = `ISSUE-${projectId.substring(0,4).toUpperCase()}-${(count + 1).toString().padStart(4, '0')}`;

  return prisma.fieldIssue.create({
    data: {
      issueCode,
      projectId,
      foremanId,
      title,
      description,
      category,
      priority: priority || 'medium',
      status: 'open',
      stageId,
      rabItemId
    }
  });
};

export const updateStatus = async (id, status, actorId, resolutionNote) => {
  const data = { status };
  if (resolutionNote) {
    data.resolutionNote = resolutionNote;
  }
  if (status === 'resolved' || status === 'closed') {
    data.resolvedAt = new Date();
  }
  // Optional: add actor log or set actor if needed
  
  return prisma.fieldIssue.update({
    where: { id },
    data,
    include: {
      project: true
    }
  });
};
