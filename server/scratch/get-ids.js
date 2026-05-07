import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst({
    where: { foremanId: { not: null }, supervisorId: { not: null } }
  });
  
  if (!project) {
    console.log("No project with foreman and supervisor found.");
    return;
  }
  
  console.log(JSON.stringify({
    projectId: project.id,
    foremanId: project.foremanId,
    supervisorId: project.supervisorId
  }, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
