import prisma from '../../config/prisma.js';

export const findAllByProjectId = async (projectId) => {
  return await prisma.projectStage.findMany({
    where: { projectId },
    orderBy: { order: 'asc' },
  });
};

export const findById = async (id) => {
  const stage = await prisma.projectStage.findUnique({
    where: { id },
    include: {
      project: {
        include: {
          admin: { select: { name: true, avatar: true } },
          supervisor: { select: { name: true, avatar: true } },
          foreman: { select: { name: true, avatar: true } },
          customer: { select: { name: true, avatar: true } }
        }
      },
      publicComments: {
        where: { status: 'published' },
        orderBy: { createdAt: 'asc' }
      }
    },
  });

  if (!stage) return null;

  // Fetch RabItems for this stage's category
  let rabItems = [];
  if (stage.categoryId) {
    rabItems = await prisma.rabItem.findMany({
      where: { categoryId: stage.categoryId },
      orderBy: { createdAt: 'asc' }
    });
  }

  // Fetch WeeklyJournalActivities linked to this stage
  const activities = await prisma.weeklyJournalActivity.findMany({
    where: { 
      projectStageId: id,
      weeklyJournal: {
        status: { in: ['submitted', 'approved', 'reviewed', 'locked'] }
      }
    },
    include: {
      weeklyJournal: {
        include: {
          foreman: { select: { name: true, avatar: true } },
          supervisor: { select: { name: true, avatar: true } }
        }
      },
      photos: true
    },
    orderBy: { createdAt: 'desc' }
  });

  // Fetch SupervisorWeeklyReportNotes linked to this stage
  const reportNotes = await prisma.supervisorWeeklyReportNote.findMany({
    where: { 
      projectStageId: id,
      report: {
        status: { in: ['submitted', 'reviewed', 'published', 'locked'] }
      }
    },
    include: {
      report: {
        include: {
          supervisor: { select: { name: true, avatar: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return {
    ...stage,
    rabItems: rabItems.map(item => {
      // Find activities for this specific RabItem
      const itemActivities = activities.filter(a => a.rabItemId === item.id);
      // Find notes for this specific RabItem
      const itemNotes = reportNotes.filter(n => n.rabItemId === item.id);
      
      return {
        ...item,
        activities: itemActivities,
        notes: itemNotes
      };
    }),
    // Activities not linked to any RabItem but linked to this stage
    unlinkedActivities: activities.filter(a => !a.rabItemId),
    // Notes not linked to any RabItem but linked to this stage
    unlinkedNotes: reportNotes.filter(n => !n.rabItemId)
  };
};

export const create = async (data) => {
  return await prisma.projectStage.create({
    data,
  });
};

export const update = async (id, data) => {
  return await prisma.projectStage.update({
    where: { id },
    data,
  });
};

export const remove = async (id) => {
  return await prisma.projectStage.delete({
    where: { id },
  });
};
