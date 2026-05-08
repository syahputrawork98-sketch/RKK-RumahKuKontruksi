import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkAdmins() {
  const admins = await prisma.admin.findMany({
    include: {
      _count: {
        select: { projects: true }
      }
    }
  });
  console.log('Admins:', JSON.stringify(admins, null, 2));
  await prisma.$disconnect();
}

checkAdmins();
