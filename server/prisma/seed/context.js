/**
 * Seed Context Module
 * Provides a shared context for tracking created entities during the seed process.
 * This helps in maintaining relationships between different domain seeds.
 */

export const createSeedContext = () => {
  return {
    admins: {},
    superadmins: {},
    architects: {},
    foremen: {},
    supervisors: {},
    customers: {},
    projects: {},
    designRequests: {},
    designTenders: {},
    designTenderBids: {},
    rabPlans: {},
    rabCategories: {},
    rabItems: {},
    stages: {},
    progressLogs: {},
    comments: {},
    materialRequests: {},
    fieldIssues: {},
    dailyTasks: {},
    dailyReports: {},
    projectDocuments: {},
    paymentRecords: {},
    helperDocuments: {},
    notifications: {},
  };
};

