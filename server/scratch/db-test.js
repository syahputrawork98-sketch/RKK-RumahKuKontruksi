import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.project.count();
    console.log('Project count:', count);
    const projects = await prisma.project.findMany({ take: 1 });
    console.log('Sample project:', JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Prisma Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
