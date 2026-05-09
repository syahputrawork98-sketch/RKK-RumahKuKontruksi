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
  const journal = await prisma.weeklyJournal.findUnique({
    where: { id },
    include: {
      project: true,
      foreman: true,
      supervisor: true,
      activities: true, // Fetch activities but without relation includes that don't exist in schema
      photos: true,
      reviewLogs: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!journal) return null;

  // Manual Enrichment for Activities Context
  if (journal.activities && journal.activities.length > 0) {
    const stageIds = [...new Set(journal.activities.map(a => a.projectStageId).filter(Boolean))];
    const rabItemIds = [...new Set(journal.activities.map(a => a.rabItemId).filter(Boolean))];

    const [stages, rabItems] = await Promise.all([
      stageIds.length > 0 ? prisma.projectStage.findMany({ where: { id: { in: stageIds } } }) : [],
      rabItemIds.length > 0 ? prisma.rabItem.findMany({ 
        where: { id: { in: rabItemIds } },
        include: { category: true }
      }) : []
    ]);

    const stageMap = Object.fromEntries(stages.map(s => [s.id, s]));
    const rabItemMap = Object.fromEntries(rabItems.map(r => [r.id, r]));

    journal.activities = journal.activities.map(activity => ({
      ...activity,
      projectStage: activity.projectStageId ? stageMap[activity.projectStageId] || null : null,
      rabItem: activity.rabItemId ? rabItemMap[activity.rabItemId] || null : null
    }));
  }

  return journal;
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
