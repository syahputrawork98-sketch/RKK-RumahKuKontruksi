import prisma from '../../config/prisma.js';

export const findAll = async (filters = {}) => {
  const where = { deletedAt: null };
  if (filters.status) where.status = filters.status;
  
  return await prisma.designTender.findMany({
    where,
    include: {
      designRequest: {
        include: {
          customer: {
            select: { name: true, companyName: true }
          }
        }
      },
      bids: {
        where: { deletedAt: null },
        include: {
          architect: {
            select: { name: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const findById = async (id) => {
  return await prisma.designTender.findUnique({
    where: { id },
    include: {
      designRequest: {
        include: {
          customer: true
        }
      },
      bids: {
        where: { deletedAt: null },
        include: {
          architect: true
        }
      }
    }
  });
};

export const create = async (data) => {
  return await prisma.designTender.create({
    data,
    include: {
      designRequest: true
    }
  });
};

export const update = async (id, data) => {
  return await prisma.designTender.update({
    where: { id },
    data
  });
};

export const softDelete = async (id) => {
  return await prisma.designTender.update({
    where: { id },
    data: { deletedAt: new Date(), status: 'cancelled' }
  });
};

export const findBidById = async (id) => {
  return await prisma.designTenderBid.findUnique({
    where: { id },
    include: {
      designTender: true
    }
  });
};

export const createBid = async (data) => {
  return await prisma.designTenderBid.create({
    data
  });
};

export const findBidByTenderAndArchitect = async (designTenderId, architectId) => {
  return await prisma.designTenderBid.findUnique({
    where: {
      designTenderId_architectId: {
        designTenderId,
        architectId
      }
    }
  });
};

export const awardBid = async (tenderId, bidId) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Get the bid and tender
    const bid = await tx.designTenderBid.findUnique({
      where: { id: bidId },
      include: { designTender: true }
    });

    if (!bid) throw new Error('Bid not found');

    // 2. Update the tender
    await tx.designTender.update({
      where: { id: tenderId },
      data: {
        status: 'awarded',
        awardedAt: new Date(),
        closedAt: new Date(),
        selectedBidId: bidId
      }
    });

    // 3. Update the selected bid
    await tx.designTenderBid.update({
      where: { id: bidId },
      data: { status: 'selected' }
    });

    // 4. Update other bids
    await tx.designTenderBid.updateMany({
      where: {
        designTenderId: tenderId,
        id: { not: bidId },
        deletedAt: null
      },
      data: { status: 'rejected' }
    });

    // 5. Update the DesignRequest
    await tx.designRequest.update({
      where: { id: bid.designTender.designRequestId },
      data: {
        architectId: bid.architectId,
        status: 'assigned'
      }
    });

    return bid;
  });
};
