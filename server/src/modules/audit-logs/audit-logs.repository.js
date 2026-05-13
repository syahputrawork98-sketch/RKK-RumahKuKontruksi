import prisma from '../../config/prisma.js';

export const create = async (data) => {
  return await prisma.auditLog.create({
    data
  });
};

export const findAll = async (params = {}) => {
  const { search, actorRole, entityType } = params;
  const limit = params.limit ? parseInt(params.limit, 10) : 50;

  const where = {};

  if (search) {
    where.OR = [
      { action: { contains: search, mode: 'insensitive' } },
      { summary: { contains: search, mode: 'insensitive' } },
      { actorName: { contains: search, mode: 'insensitive' } }
    ];
  }

  if (actorRole) where.actorRole = actorRole;
  if (entityType) where.entityType = entityType;

  return await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: isNaN(limit) ? 50 : limit
  });
};
