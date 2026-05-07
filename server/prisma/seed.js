// server/prisma/seed.js
import { PrismaClient } from '@prisma/client';
import { mockCustomers } from '../../client/src/data/mock/customers.js';
import { mockProjects } from '../../client/src/data/mock/projects.js';
import { mockProjectStages } from '../../client/src/data/mock/projectStages.js';
import { mockRabPlans } from '../../client/src/data/mock/rabPlans.js';
import { mockRabCategories } from '../../client/src/data/mock/rabCategories.js';
import { mockRabItems } from '../../client/src/data/mock/rabItems.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Customers
  console.log('Seeding customers...');
  for (const c of mockCustomers) {
    await prisma.customer.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        userId: c.userId,
        customerType: c.customerType,
        name: c.name,
        email: c.email,
        phone: c.phone,
        avatar: c.avatar,
        address: c.address,
        identityNumber: c.identityNumber,
        occupation: c.occupation,
        companyName: c.companyName,
        picName: c.picName,
        picPosition: c.picPosition,
        logo: c.logo,
        taxNumber: c.taxNumber,
        businessField: c.businessField,
        notes: c.notes,
      },
    });
  }

  // 2. Projects
  console.log('Seeding projects...');
  for (const p of mockProjects) {
    await prisma.project.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        projectCode: p.projectCode,
        name: p.name,
        type: p.type,
        status: p.status,
        progress: p.progress,
        customerId: p.customerId,
        location: p.location,
        startDate: p.startDate ? new Date(p.startDate) : null,
        estimatedEndDate: p.estimatedEndDate ? new Date(p.estimatedEndDate) : null,
        budgetTotal: p.budgetTotal,
        paidAmount: p.paidAmount,
        remainingAmount: p.remainingAmount,
        heroImage: p.heroImage,
        sourceDesignRequestId: p.sourceDesignRequestId,
        adminId: p.adminId,
        supervisorId: p.supervisorId,
        foremanId: p.foremanId,
      },
    });
  }

  // 3. RabPlans
  console.log('Seeding RAB plans...');
  for (const r of mockRabPlans) {
    await prisma.rabPlan.upsert({
      where: { id: r.id },
      update: {},
      create: {
        id: r.id,
        projectId: r.projectId,
        title: r.title,
        type: r.type,
        version: r.version,
        status: r.status,
        totalAmount: r.totalAmount,
        notes: r.notes,
        sourceDesignRequestId: r.sourceDesignRequestId,
        createdAt: r.createdAt ? new Date(r.createdAt) : new Date(),
        approvedAt: r.approvedAt ? new Date(r.approvedAt) : null,
      },
    });
  }

  // 4. ProjectStages
  console.log('Seeding project stages...');
  for (const s of mockProjectStages) {
    await prisma.projectStage.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        projectId: s.projectId,
        rabPlanId: s.rabPlanId,
        categoryId: s.categoryId,
        code: s.code,
        title: s.title,
        description: s.description,
        week: s.week,
        status: s.status,
        progress: s.progress,
        startDate: s.startDate ? new Date(s.startDate) : null,
        endDate: s.endDate ? new Date(s.endDate) : null,
        durationDays: s.durationDays,
        order: s.order,
        note: s.note,
        isVerified: s.verification?.isVerified || false,
        verifiedBy: s.verification?.verifiedBy,
        verifiedAt: s.verification?.verifiedAt ? new Date(s.verification.verifiedAt) : null,
      },
    });
  }

  // 5. RabCategories
  console.log('Seeding RAB categories...');
  for (const cat of mockRabCategories) {
    await prisma.rabCategory.upsert({
      where: { id: cat.id },
      update: {},
      create: {
        id: cat.id,
        rabPlanId: cat.rabPlanId,
        projectId: cat.projectId,
        code: cat.code,
        name: cat.name,
        description: cat.description,
        order: cat.order,
        subtotal: cat.subtotal,
      },
    });
  }

  // 6. RabItems
  console.log('Seeding RAB items...');
  for (const item of mockRabItems) {
    await prisma.rabItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        rabPlanId: item.rabPlanId,
        categoryId: item.categoryId,
        projectId: item.projectId,
        description: item.description,
        location: item.location,
        volume: item.volume,
        unit: item.unit,
        unitPrice: item.unitPrice,
        total: item.total,
        progress: item.progress,
        completedValue: item.completedValue,
        status: item.status,
        notes: item.notes,
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
