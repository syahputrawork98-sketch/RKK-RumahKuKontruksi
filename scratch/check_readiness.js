import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({
    include: {
      _count: {
        select: { stages: true, rabPlans: true }
      },
      rabPlans: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  });

  console.log("PROJECT READINESS CHECK:");
  projects.forEach(p => {
    const missing = [];
    if (!p.customerId) missing.push("Customer");
    if (!p.supervisorId) missing.push("Supervisor");
    if (!p.foremanId) missing.push("Foreman");
    if (p._count.stages === 0) missing.push("Stages");
    if (p._count.rabPlans === 0) missing.push("RAB");
    const totalAmount = p.rabPlans?.[0]?.totalAmount || 0;
    if (parseFloat(totalAmount) <= 0) missing.push("TotalAmount <= 0");
    if (!p.startDate) missing.push("StartDate");
    if (!p.estimatedEndDate) missing.push("EndDate");

    console.log(`- [${p.projectCode}] ${p.name} | Status: ${p.status} | Missing: ${missing.length ? missing.join(', ') : 'NONE'}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
