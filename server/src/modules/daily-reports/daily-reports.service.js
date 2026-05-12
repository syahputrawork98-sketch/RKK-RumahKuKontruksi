import { PrismaClient } from '@prisma/client';
import { createNotification } from '../notifications/notifications.service.js';

const prisma = new PrismaClient();

export const getAllReports = async (filters) => {
  const { projectId, foremanId, status } = filters;
  const where = {};
  if (projectId) where.projectId = projectId;
  if (foremanId) where.foremanId = foremanId;
  if (status) where.status = status;

  return prisma.dailyReport.findMany({
    where,
    include: {
      task: { select: { id: true, title: true } },
      foreman: { select: { id: true, name: true } },
      supervisor: { select: { id: true, name: true } }
    },
    orderBy: { date: 'desc' }
  });
};

export const getReportById = async (id) => {
  return prisma.dailyReport.findUnique({
    where: { id },
    include: {
      task: { select: { id: true, title: true } },
      foreman: { select: { id: true, name: true } },
      supervisor: { select: { id: true, name: true } },
      stage: { select: { id: true, title: true } }
    }
  });
};

export const createReport = async (data) => {
  // Generate report code
  const count = await prisma.dailyReport.count();
  const reportCode = `DR-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

  return prisma.dailyReport.create({
    data: {
      reportCode,
      projectId: data.projectId,
      foremanId: data.foremanId,
      date: new Date(data.date),
      status: 'draft',
      weatherSummary: data.weatherSummary,
      workerCount: data.workerCount ? parseInt(data.workerCount) : null,
      activitySummary: data.activitySummary,
      blockerSummary: data.blockerSummary,
      taskId: data.taskId,
      stageId: data.stageId,
      fieldIssueId: data.fieldIssueId
    }
  });
};

export const updateReport = async (id, data) => {
  return prisma.dailyReport.update({
    where: { id },
    data: {
      weatherSummary: data.weatherSummary,
      workerCount: data.workerCount ? parseInt(data.workerCount) : null,
      activitySummary: data.activitySummary,
      blockerSummary: data.blockerSummary,
      taskId: data.taskId,
      stageId: data.stageId,
      fieldIssueId: data.fieldIssueId
    }
  });
};

export const submitReport = async (id) => {
  const report = await prisma.dailyReport.update({
    where: { id },
    data: { 
      status: 'submitted',
      submittedAt: new Date()
    },
    include: {
      project: { select: { name: true, adminId: true } },
      supervisor: { select: { id: true, name: true } }
    }
  });

  // Trigger Notification to Admin
  if (report.project?.adminId) {
    try {
      await createNotification({
        recipientRole: 'admin',
        recipientId: report.project.adminId,
        actorRole: 'supervisor',
        actorId: report.supervisorId,
        eventType: 'DAILY_REPORT_SUBMITTED',
        entityType: 'DailyReport',
        entityId: report.id,
        title: 'Laporan Mingguan Masuk',
        message: `Pengawas ${report.supervisor?.name || ''} telah mensubmit laporan untuk proyek ${report.project.name}`,
        linkPath: '/admin/laporan-mingguan-pengawas'
      });
    } catch (err) {
      console.error('DailyReport Notification Error:', err);
    }
  }

  return report;

};

export const reviewReport = async (id, supervisorId, status, note) => {
  return prisma.dailyReport.update({
    where: { id },
    data: {
      status,
      supervisorId,
      supervisorNote: note,
      reviewedAt: new Date()
    }
  });
};
