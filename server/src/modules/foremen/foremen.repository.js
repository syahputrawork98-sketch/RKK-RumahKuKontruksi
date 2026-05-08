import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return await prisma.foreman.findMany({
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
  return await prisma.foreman.findUnique({
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
  return await prisma.foreman.create({ data });
};

export const update = async (id, data) => {
  return await prisma.foreman.update({
    where: { id },
    data
  });
};

export const softDelete = async (id) => {
  return await prisma.foreman.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: 'inactive'
    }
  });
};

// Certificates
export const findCertificatesByForemanId = async (foremanId) => {
  return await prisma.foremanCertificate.findMany({
    where: { foremanId, deletedAt: null },
    orderBy: { issuedAt: 'desc' }
  });
};

export const createCertificate = async (data) => {
  return await prisma.foremanCertificate.create({ data });
};

export const updateCertificate = async (id, data) => {
  return await prisma.foremanCertificate.update({
    where: { id },
    data
  });
};

export const softDeleteCertificate = async (id) => {
  return await prisma.foremanCertificate.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
};

// Experiences
export const findExperiencesByForemanId = async (foremanId) => {
  return await prisma.foremanExperience.findMany({
    where: { foremanId, deletedAt: null },
    orderBy: { startYear: 'desc' }
  });
};

export const createExperience = async (data) => {
  return await prisma.foremanExperience.create({ data });
};

export const updateExperience = async (id, data) => {
  return await prisma.foremanExperience.update({
    where: { id },
    data
  });
};

export const softDeleteExperience = async (id) => {
  return await prisma.foremanExperience.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
};

// Helper for projects
export const findProjectsByForemanId = async (foremanId) => {
  return await prisma.project.findMany({
    where: { foremanId },
    include: {
      customer: {
        select: { name: true }
      }
    }
  });
};

export const getStats = async (foremanId) => {
  const [projectsCount, journals, materialRequests] = await Promise.all([
    prisma.project.count({
      where: { foremanId, status: 'active' }
    }),
    prisma.weeklyJournal.groupBy({
      by: ['status'],
      where: { foremanId },
      _count: { _all: true }
    }),
    prisma.materialRequest.groupBy({
      by: ['status'],
      where: { foremanId },
      _count: { _all: true }
    })
  ]);

  return {
    activeProjects: projectsCount,
    journals,
    materialRequests
  };
};
