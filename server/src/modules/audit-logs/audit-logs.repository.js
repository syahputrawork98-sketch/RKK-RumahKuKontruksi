import prisma from '../../config/prisma.js';

export const create = async (data) => {
  return await prisma.auditLog.create({
    data
  });
};

export const findAll = async (params = {}) => {
  const { search, actorRole, entityType, limit = 50 } = params;
  
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
    take: limit
  });
};
