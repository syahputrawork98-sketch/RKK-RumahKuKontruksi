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
      experiences: { where: { deletedAt: null } },
      _count: {
        select: { designRequests: true }
      }
    }
  });
};

export const findByEmail = async (email) => {
  return await prisma.architect.findFirst({
    where: { email, deletedAt: null }
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
  const architect = await prisma.architect.findUnique({
    where: { id, deletedAt: null },
    select: { maxDesignCapacity: true }
  });

  const [newRequests, activeDesigns, waitingReview, revisionRequested] = await Promise.all([
    // New Requests (Open Tenders that this architect hasn't bid on yet)
    prisma.designTender.count({
      where: {
        status: 'open',
        deletedAt: null,
        bids: {
          none: { architectId: id }
        }
      }
    }),
    // Active Designs (DesignRequests assigned to this architect)
    prisma.designRequest.count({
      where: {
        architectId: id,
        status: 'approved',
        deletedAt: null
      }
    }),
    // Waiting Review (Bids that are submitted but not yet awarded)
    prisma.designTenderBid.count({
      where: {
        architectId: id,
        status: 'submitted',
        designTender: {
          status: 'open'
        }
      }
    }),
    // Revision Requested (Placeholder as we don't have revision model yet, but we can check a specific status if available)
    prisma.designRequest.count({
      where: {
        architectId: id,
        status: 'revision_requested',
        deletedAt: null
      }
    })
  ]);

  return {
    newRequests,
    activeDesigns,
    waitingReview,
    revisionRequested,
    maxDesignCapacity: architect?.maxDesignCapacity || 0
  };
};
