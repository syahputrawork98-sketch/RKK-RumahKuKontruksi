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
