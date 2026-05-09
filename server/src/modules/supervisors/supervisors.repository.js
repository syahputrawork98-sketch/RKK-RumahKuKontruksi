import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return await prisma.supervisor.findMany({
    where: { deletedAt: null },
    include: {
      _count: {
        select: { projects: true }
      }
    },
    orderBy: { name: 'asc' },
  });
};

export const findById = async (id) => {
  return await prisma.supervisor.findUnique({
    where: { id, deletedAt: null },
    include: {
      certificates: { where: { deletedAt: null } },
      experiences: { where: { deletedAt: null } },
      _count: {
        select: { projects: true }
      }
    }
  });
};

export const create = async (data) => {
  return await prisma.supervisor.create({ data });
};

export const update = async (id, data) => {
  return await prisma.supervisor.update({
    where: { id },
    data
  });
};

export const softDelete = async (id) => {
  return await prisma.supervisor.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: 'inactive'
    }
  });
};

// Certificates
export const findCertificatesBySupervisorId = async (supervisorId) => {
  return await prisma.supervisorCertificate.findMany({
    where: { supervisorId, deletedAt: null },
    orderBy: { issuedAt: 'desc' }
  });
};

export const createCertificate = async (data) => {
  return await prisma.supervisorCertificate.create({ data });
};

export const updateCertificate = async (id, data) => {
  return await prisma.supervisorCertificate.update({
    where: { id },
    data
  });
};

export const softDeleteCertificate = async (id) => {
  return await prisma.supervisorCertificate.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
};

// Experiences
export const findExperiencesBySupervisorId = async (supervisorId) => {
  return await prisma.supervisorExperience.findMany({
    where: { supervisorId, deletedAt: null },
    orderBy: { startYear: 'desc' }
  });
};

export const createExperience = async (data) => {
  return await prisma.supervisorExperience.create({ data });
};

export const updateExperience = async (id, data) => {
  return await prisma.supervisorExperience.update({
    where: { id },
    data
  });
};

export const softDeleteExperience = async (id) => {
  return await prisma.supervisorExperience.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
};

export const getStats = async (supervisorId) => {
  const [activeProjects, finishedProjects, journals, materialRequests, weeklyReports, projects, activitiesCount] = await Promise.all([
    prisma.project.count({
      where: { supervisorId, status: 'active' }
    }),
    prisma.project.count({
      where: { supervisorId, status: 'completed' }
    }),
    prisma.weeklyJournal.groupBy({
      by: ['status'],
      where: { supervisorId },
      _count: { _all: true }
    }),
    prisma.materialRequest.groupBy({
      by: ['status'],
      where: { supervisorId },
      _count: { _all: true }
    }),
    prisma.supervisorWeeklyReport.groupBy({
      by: ['status'],
      where: { supervisorId },
      _count: { _all: true }
    }),
    prisma.project.findMany({
      where: { supervisorId, status: 'active' },
      select: { verifiedProgress: true }
    }),
    prisma.weeklyJournalActivity.count({
      where: { weeklyJournal: { supervisorId } }
    })
  ]);

  const totalVerifiedProgress = projects.reduce((acc, p) => acc + (p.verifiedProgress || 0), 0);
  const avgProgress = projects.length > 0 ? totalVerifiedProgress / projects.length : 0;

  return {
    activeProjects,
    finishedProjects,
    journals,
    materialRequests,
    weeklyReports,
    avgProgress,
    activitiesCount
  };
};
