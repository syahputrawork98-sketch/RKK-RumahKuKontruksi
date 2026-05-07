import prisma from '../../config/prisma.js';

export const findReports = async (filters = {}) => {
  const where = {};
  if (filters.projectId) where.projectId = filters.projectId;
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

  return await prisma.supervisorWeeklyReport.findMany({
    where,
    include: {
      project: {
        select: {
          name: true,
          projectCode: true
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

export const findReportById = async (id) => {
  return await prisma.supervisorWeeklyReport.findUnique({
    where: { id },
    include: {
      project: true,
      supervisor: true,
      journals: {
        include: {
          weeklyJournal: {
            include: {
              foreman: {
                select: {
                  name: true,
                  avatar: true
                }
              },
              activities: true
            }
          }
        }
      },
      notes: {
        orderBy: { createdAt: 'asc' }
      },
      reviewLogs: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });
};

export const createReport = async (data) => {
  const { journalIds, notes, ...reportData } = data;
  
  return await prisma.$transaction(async (tx) => {
    const report = await tx.supervisorWeeklyReport.create({
      data: {
        ...reportData,
        journals: journalIds ? {
          create: journalIds.map(id => ({
            weeklyJournalId: id
          }))
        } : undefined,
        notes: notes ? {
          create: notes
        } : undefined
      }
    });
    
    return report;
  });
};

export const updateReport = async (id, data) => {
  const { journalIds, notes, ...reportData } = data;
  
  return await prisma.$transaction(async (tx) => {
    // Replace journals if provided
    if (journalIds) {
      await tx.supervisorWeeklyReportJournal.deleteMany({
        where: { reportId: id }
      });
    }
    
    // Replace notes if provided
    if (notes) {
      await tx.supervisorWeeklyReportNote.deleteMany({
        where: { reportId: id }
      });
    }
    
    return await tx.supervisorWeeklyReport.update({
      where: { id },
      data: {
        ...reportData,
        journals: journalIds ? {
          create: journalIds.map(jid => ({
            weeklyJournalId: jid
          }))
        } : undefined,
        notes: notes ? {
          create: notes
        } : undefined
      }
    });
  });
};

export const updateReportStatus = async (id, data) => {
  const { status, actorId, action, note, adminNote, customerSummaryDraft, oldStatus } = data;
  
  return await prisma.$transaction(async (tx) => {
    const updateData = { status };
    
    if (status === 'submitted') updateData.submittedAt = new Date();
    
    if (['approved', 'reviewed', 'rejected', 'revision_requested', 'under_admin_review'].includes(status)) {
      updateData.reviewedAt = new Date();
      if (actorId) updateData.reviewedByAdminId = actorId;
      if (adminNote) updateData.adminNote = adminNote;
      if (customerSummaryDraft) updateData.customerSummaryDraft = customerSummaryDraft;
      // Also allow 'note' from the old logic as fallback for adminNote
      if (note && !adminNote) updateData.adminNote = note;
    }

    if (status === 'published') {
      // Locking or other publish logic could go here
    }

    if (status === 'locked') updateData.lockedAt = new Date();

    const report = await tx.supervisorWeeklyReport.update({
      where: { id },
      data: updateData
    });

    await tx.supervisorWeeklyReportReviewLog.create({
      data: {
        reportId: id,
        actorRole: data.actorRole,
        actorId: data.actorId,
        action,
        oldStatus,
        newStatus: status,
        note
      }
    });

    return report;
  });
};

export const findApprovedJournalsForContext = async ({ projectId, supervisorId, weekStartDate, weekEndDate }) => {
  // Use dates to filter if provided
  const where = {
    projectId,
    supervisorId,
    status: 'approved'
  };

  if (weekStartDate && weekEndDate) {
    where.weekStartDate = { gte: new Date(weekStartDate) };
    where.weekEndDate = { lte: new Date(weekEndDate) };
  }

  return await prisma.weeklyJournal.findMany({
    where,
    include: {
      foreman: {
        select: {
          name: true
        }
      }
    }
  });
};

export const findProjectForContext = async (projectId) => {
  return await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      name: true,
      verifiedProgress: true,
      verifiedProgressUpdatedAt: true,
      supervisorId: true
    }
  });
};

export const findByPeriod = async (projectId, supervisorId, weekStartDate, weekEndDate) => {
  return await prisma.supervisorWeeklyReport.findFirst({
    where: {
      projectId,
      supervisorId,
      weekStartDate: new Date(weekStartDate),
      weekEndDate: new Date(weekEndDate)
    }
  });
};
