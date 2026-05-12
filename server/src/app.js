import express from 'express';
import cors from 'cors';
import customerRoutes from './modules/customers/customers.routes.js';
import projectRoutes from './modules/projects/projects.routes.js';
import supervisorRoutes from './modules/supervisors/supervisors.routes.js';
import foremanRoutes from './modules/foremen/foremen.routes.js';
import architectRoutes from './modules/architects/architects.routes.js';
import adminRoutes from './modules/admins/admins.routes.js';
import superadminRoutes from './modules/superadmins/superadmins.routes.js';
import materialRequestRoutes from './modules/material-requests/material-requests.routes.js';
import weeklyJournalRoutes from './modules/weekly-journals/weekly-journals.routes.js';
import supervisorWeeklyReportRoutes from './modules/supervisor-weekly-reports/supervisor-weekly-reports.routes.js';
import projectStageRoutes from './modules/project-stages/project-stages.routes.js';
import rabRoutes from './modules/rab/rab.routes.js';
import designRequestRoutes from './modules/design-requests/design-requests.routes.js';
import designTenderRoutes from './modules/design-tenders/design-tenders.routes.js';
import projectStageCommentRoutes from './modules/project-stage-public-comments/project-stage-public-comments.routes.js';
import auditLogRoutes from './modules/audit-logs/audit-logs.routes.js';
import profileChangeRequestRoutes from './modules/profile-change-requests/profile-change-requests.routes.js';
import customerPaymentPlanRoutes from './modules/customer-payment-plans/customer-payment-plans.routes.js';
import foremanPaymentEligibilityRoutes from './modules/foreman-payment-eligibility/foreman-payment-eligibility.routes.js';
import fieldIssueRoutes from './modules/field-issues/field-issues.routes.js';
import dailyTaskRoutes from './modules/daily-tasks/daily-tasks.routes.js';
import dailyReportRoutes from './modules/daily-reports/daily-reports.routes.js';
import projectDocumentRoutes from './modules/project-documents/project-documents.routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'RKK Data Service is running' });
});

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/foremen', foremanRoutes);
app.use('/api/architects', architectRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/superadmins', superadminRoutes);
app.use('/api/material-requests', materialRequestRoutes);
app.use('/api/weekly-journals', weeklyJournalRoutes);
app.use('/api/supervisor-weekly-reports', supervisorWeeklyReportRoutes);
app.use('/api/project-stages', projectStageRoutes);
app.use('/api/rab', rabRoutes);
app.use('/api/design-requests', designRequestRoutes);
app.use('/api/design-tenders', designTenderRoutes);
app.use('/api/project-stage-comments', projectStageCommentRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/profile-change-requests', profileChangeRequestRoutes);
app.use('/api/customer-payment-plans', customerPaymentPlanRoutes);
app.use('/api/foreman-payment-eligibility', foremanPaymentEligibilityRoutes);
app.use('/api/field-issues', fieldIssueRoutes);
app.use('/api/daily-tasks', dailyTaskRoutes);
app.use('/api/daily-reports', dailyReportRoutes);
app.use('/api/project-documents', projectDocumentRoutes);

// Error Handler
app.use(errorHandler);

export default app;
