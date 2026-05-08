import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return await prisma.admin.findMany({
    where: { deletedAt: null },
    include: {
      _count: {
        select: { projects: true }
      }
    },
    orderBy: { name: 'asc' },
  });
};

export const findById = async (id, filters = {}) => {
  const where = { id, deletedAt: null };
  const projectWhere = { status: { notIn: ['Selesai', 'Cancelled'] } };

  if (filters.status) projectWhere.status = filters.status;
  if (filters.adminId) {
    projectWhere.adminId = filters.adminId;
  }

  return await prisma.admin.findUnique({
    where,
    include: {
      projects: {
        where: projectWhere
      },
      _count: {
        select: { projects: true }
      }
    }
  });
};

export const findByEmail = async (email) => {
  return await prisma.admin.findFirst({
    where: { email, deletedAt: null }
  });
};

export const create = async (data) => {
  return await prisma.admin.create({ data });
};

export const update = async (id, data) => {
  return await prisma.admin.update({
    where: { id },
    data
  });
};

export const softDelete = async (id) => {
  return await prisma.admin.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: 'inactive'
    }
  });
};

export const countActiveProjects = async (adminId) => {
  return await prisma.project.count({
    where: {
      adminId,
      status: { notIn: ['Selesai', 'Cancelled'] }
    }
  });
};

export const getStats = async (adminId = null) => {
  const where = adminId ? { adminId } : {};

  const [
    projectStats, 
    customerCount, 
    projectFinancials, 
    latestProjects,
    reportStats,
    materialRequestStats
  ] = await Promise.all([
    prisma.project.groupBy({
      by: ['status'],
      where,
      _count: { _all: true }
    }),
    adminId 
      ? prisma.customer.count({ where: { projects: { some: { adminId } } } })
      : prisma.customer.count(),
    prisma.project.aggregate({
      where,
      _sum: {
        budgetTotal: true,
        paidAmount: true,
        remainingAmount: true
      }
    }),
    prisma.project.findMany({
      where,
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: {
          select: { name: true }
        }
      }
    }),
    prisma.supervisorWeeklyReport.groupBy({
      by: ['status'],
      where: adminId ? { project: { adminId } } : {},
      _count: { _all: true }
    }),
    prisma.materialRequest.groupBy({
      by: ['status'],
      where: adminId ? { project: { adminId } } : {},
      _count: { _all: true }
    })
  ]);

  return {
    projects: projectStats,
    customers: customerCount,
    financials: projectFinancials._sum,
    recentProjects: latestProjects,
    reports: reportStats,
    materialRequests: materialRequestStats
  };
};
