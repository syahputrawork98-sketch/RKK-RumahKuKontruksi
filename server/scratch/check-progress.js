import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findUnique({
    where: { id: 'project-008' }
  });
  
  console.log(`Project: ${project.name}`);
  console.log(`Verified Progress: ${project.verifiedProgress}%`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
