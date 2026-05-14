import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return await prisma.superadmin.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
  });
};

export const findById = async (id) => {
  return await prisma.superadmin.findUnique({
    where: { id, deletedAt: null }
  });
};

export const findByEmail = async (email) => {
  return await prisma.superadmin.findFirst({
    where: { email, deletedAt: null }
  });
};

export const create = async (data) => {
  return await prisma.superadmin.create({ data });
};

export const update = async (id, data) => {
  return await prisma.superadmin.update({
    where: { id },
    data
  });
};

export const softDelete = async (id) => {
  return await prisma.superadmin.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: 'inactive'
    }
  });
};

export const getStats = async () => {
  const [
    adminCount,
    supervisorCount,
    foremanCount,
    architectCount,
    customerCount,
    projectRunningCount,
    projectFinishedCount,
    auditLogCount,
    pendingProfileChangeCount,
    dailyReportCount,
    fieldIssueStats
  ] = await Promise.all([
    prisma.admin.count({ where: { deletedAt: null } }),
    prisma.supervisor.count({ where: { deletedAt: null } }),
    prisma.foreman.count({ where: { deletedAt: null } }),
    prisma.architect.count({ where: { deletedAt: null } }),
    prisma.customer.count(),
    prisma.project.count({ 
      where: { 
        status: { 
          in: ['active', 'ongoing', 'berjalan', 'Active', 'Ongoing', 'Berjalan'] 
        } 
      } 
    }),
    prisma.project.count({ 
      where: { 
        status: { 
          in: ['finish', 'selesai', 'Finished', 'Selesai'] 
        } 
      } 
    }),
    prisma.auditLog.count(),
    prisma.profileChangeRequest.count({ where: { status: 'pending' } }),
    prisma.dailyReport.count(),
    prisma.fieldIssue.groupBy({
      by: ['status'],
      _count: { _all: true }
    })
  ]);

  return {
    admins: adminCount,
    supervisors: supervisorCount,
    foremen: foremanCount,
    architects: architectCount,
    customers: customerCount,
    projectsRunning: projectRunningCount,
    projectsFinished: projectFinishedCount,
    totalAuditLogs: auditLogCount,
    pendingProfileChanges: pendingProfileChangeCount,
    totalDailyReports: dailyReportCount,
    fieldIssueStats: fieldIssueStats
  };
};
