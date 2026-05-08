import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return await prisma.architect.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
  });
};

export const findById = async (id) => {
  return await prisma.architect.findUnique({
    where: { id, deletedAt: null },
    include: {
      certificates: { where: { deletedAt: null } },
      experiences: { where: { deletedAt: null } }
    }
  });
};

export const create = async (data) => {
  return await prisma.architect.create({ data });
};

export const update = async (id, data) => {
  return await prisma.architect.update({
    where: { id },
    data
  });
};

export const softDelete = async (id) => {
  return await prisma.architect.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: 'inactive'
    }
  });
};

// Certificates
export const findCertificatesByArchitectId = async (architectId) => {
  return await prisma.architectCertificate.findMany({
    where: { architectId, deletedAt: null },
    orderBy: { issuedAt: 'desc' }
  });
};

export const createCertificate = async (data) => {
  return await prisma.architectCertificate.create({ data });
};

export const updateCertificate = async (id, data) => {
  return await prisma.architectCertificate.update({
    where: { id },
    data
  });
};

export const softDeleteCertificate = async (id) => {
  return await prisma.architectCertificate.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
};

// Experiences
export const findExperiencesByArchitectId = async (architectId) => {
  return await prisma.architectExperience.findMany({
    where: { architectId, deletedAt: null },
    orderBy: { startYear: 'desc' }
  });
};

export const createExperience = async (data) => {
  return await prisma.architectExperience.create({ data });
};

export const updateExperience = async (id, data) => {
  return await prisma.architectExperience.update({
    where: { id },
    data
  });
};

export const softDeleteExperience = async (id) => {
  return await prisma.architectExperience.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
};

export const getStats = async (id) => {
  // Since DesignRequest model is not yet implemented in the schema,
  // we return 0 for operational counts but fetch the real capacity.
  const architect = await prisma.architect.findUnique({
    where: { id, deletedAt: null },
    select: { maxDesignCapacity: true }
  });

  return {
    newRequests: 0,
    activeDesigns: 0,
    waitingReview: 0,
    revisionRequested: 0,
    maxDesignCapacity: architect?.maxDesignCapacity || 0
  };
};
