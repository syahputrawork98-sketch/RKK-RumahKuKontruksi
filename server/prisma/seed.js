import { PrismaClient } from '@prisma/client';
import { cleanupDatabase } from './seed/cleanup.js';
import { createSeedContext } from './seed/context.js';
import { seedPersonas } from './seed/modules/personas.seed.js';
import { seedCustomers } from './seed/modules/customers.seed.js';
import { seedProjects } from './seed/modules/projects.seed.js';
import { seedRab } from './seed/modules/rab.seed.js';
import { seedStagesAndProgress } from './seed/modules/stages-progress.seed.js';
import { seedMaterialRequests } from './seed/modules/material-requests.seed.js';
import { seedFieldIssues } from './seed/modules/field-issues.seed.js';
import { seedDailyOperations } from './seed/modules/daily-operations.seed.js';
import { seedProjectDocuments } from './seed/modules/project-documents.seed.js';
import { seedPayments } from './seed/modules/payments.seed.js';
import { seedHelperDocuments } from './seed/modules/helper-documents.seed.js';
import { seedNotifications } from './seed/modules/notifications.seed.js';
import { seedDesignFlow } from './seed/modules/design-flow.seed.js';
import { seedWeeklyJournals } from './seed/modules/weekly-journals.seed.js';
import { seedSupervisorWeeklyReports } from './seed/modules/supervisor-weekly-reports.seed.js';
import { seedAuditLogs } from './seed/modules/audit-logs.seed.js';


const prisma = new PrismaClient();

async function main() {
  // 0. CLEANUP & CONTEXT INITIALIZATION
  await cleanupDatabase(prisma);
  const context = createSeedContext();

  // 1. MASTER ROLES
  await seedPersonas(prisma, context);

  // 2. CUSTOMERS
  await seedCustomers(prisma, context);

  // 3. DESIGN FLOW (Modularized)
  await seedDesignFlow(prisma, context);

  // 4. PROJECTS, RAB, STAGES (Modularized)
  await seedProjects(prisma, context);
  await seedRab(prisma, context);
  await seedStagesAndProgress(prisma, context);

  // 30D-1: MATERIAL REQUESTS (Modularized)
  await seedMaterialRequests(prisma, context);

  // 30D-2: FIELD ISSUES & DAILY OPERATIONS (Modularized)
  await seedFieldIssues(prisma, context);
  await seedDailyOperations(prisma, context);

  // 30D-3: DOCUMENTS, PAYMENTS, HELPERS & NOTIFICATIONS (Modularized)
  await seedProjectDocuments(prisma, context);
  await seedPayments(prisma, context);
  await seedHelperDocuments(prisma, context);
  
  // 30D-4: JOURNALS & REPORTS (New Batch 87)
  await seedWeeklyJournals(prisma, context);
  await seedSupervisorWeeklyReports(prisma, context);
  
  // 30D-5: GOVERNANCE & LOGS (New Batch 87)
  await seedAuditLogs(prisma, context);
  await seedNotifications(prisma, context);

  // Destructure variables needed for downstream feature seeds
  // Note: These are kept for architectural consistency even if currently unused in this file
  const { activeProject1: activeProject, activeProject2, finishedProject1: finishedProject } = context.projects;
  const { itemSemen1: item1, itemBesi1: item2 } = context.rabItems;
  const { stageActive1_1: stage1, stageActive1_2: stage2, stageFinished1: finishedStage } = context.stages;

  console.log('--- CURATED SEED DATA CLEANUP FINISHED ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
