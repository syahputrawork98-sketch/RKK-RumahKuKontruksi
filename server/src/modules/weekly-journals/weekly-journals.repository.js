import prisma from '../../config/prisma.js';

export const findWeeklyJournals = async (filters = {}) => {
  const where = {};
  if (filters.projectId) where.projectId = filters.projectId;
  if (filters.foremanId) where.foremanId = filters.foremanId;
  if (filters.supervisorId) where.supervisorId = filters.supervisorId;
  if (filters.status) where.status = filters.status;
  
  if (filters.weekStartDate) {
    where.weekStartDate = {
      gte: new Date(filters.weekStartDate)
    };
  }
  
  if (filters.weekEndDate) {
    where.weekEndDate = {
      lte: new Date(filters.weekEndDate)
    };
  }

  return await prisma.weeklyJournal.findMany({
    where,
    include: {
      project: {
        select: {
          name: true,
          projectCode: true
        }
      },
      foreman: {
        select: {
          name: true,
          avatar: true
        }
      },
      supervisor: {
        select: {
          name: true,
          avatar: true
        }
      }
    },
    orderBy: { weekStartDate: 'desc' }
  });
};

export const findWeeklyJournalById = async (id) => {
  return await prisma.weeklyJournal.findUnique({
    where: { id },
    include: {
      project: true,
      foreman: true,
      supervisor: true,
      activities: {
        include: {
          projectStage: true,
          rabItem: {
            include: {
              category: true
            }
          }
        }
      },
      photos: true,
      reviewLogs: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });
};

export const createWeeklyJournal = async (data) => {
  const { activities, photos, ...journalData } = data;
  
  return await prisma.$transaction(async (tx) => {
    const journal = await tx.weeklyJournal.create({
      data: {
        ...journalData,
        activities: activities ? {
          create: activities
        } : undefined,
        photos: photos ? {
          create: photos
        } : undefined
      }
    });
    
    return journal;
  });
};

export const updateWeeklyJournal = async (id, data) => {
  const { activities, photos, ...journalData } = data;
  
  return await prisma.$transaction(async (tx) => {
    // Replace activities if provided
    if (activities) {
      await tx.weeklyJournalActivity.deleteMany({
        where: { weeklyJournalId: id }
      });
    }
    
    // Replace photos if provided
    if (photos) {
      await tx.weeklyJournalPhoto.deleteMany({
        where: { weeklyJournalId: id }
      });
    }
    
    return await tx.weeklyJournal.update({
      where: { id },
      data: {
        ...journalData,
        activities: activities ? {
          create: activities
        } : undefined,
        photos: photos ? {
          create: photos
        } : undefined
      }
    });
  });
};

export const createReviewLog = async (data) => {
  return await prisma.weeklyJournalReviewLog.create({
    data
  });
};

export const updateStatus = async (id, status, reviewLogData = null) => {
  return await prisma.$transaction(async (tx) => {
    const updateData = { status };
    
    if (status === 'submitted') updateData.submittedAt = new Date();
    if (status === 'approved' || status === 'rejected' || status === 'revision_requested') {
      updateData.reviewedAt = new Date();
      if (reviewLogData?.actorId) updateData.reviewedById = reviewLogData.actorId;
    }
    if (status === 'locked') updateData.lockedAt = new Date();

    const journal = await tx.weeklyJournal.update({
      where: { id },
      data: updateData
    });

    if (reviewLogData) {
      await tx.weeklyJournalReviewLog.create({
        data: {
          weeklyJournalId: id,
          ...reviewLogData
        }
      });
    }

    return journal;
  });
};

export const findByPeriod = async (projectId, foremanId, weekStartDate, weekEndDate) => {
  return await prisma.weeklyJournal.findFirst({
    where: {
      projectId,
      foremanId,
      weekStartDate: new Date(weekStartDate),
      weekEndDate: new Date(weekEndDate)
    }
  });
};
