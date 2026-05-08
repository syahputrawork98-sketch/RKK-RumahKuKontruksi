import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createTestAdmin() {
  const admin = await prisma.admin.upsert({
    where: { id: 'admin-test' },
    update: {},
    create: {
      id: 'admin-test',
      name: 'Admin Tester',
      email: 'tester.admin@rkk.local',
      phone: '0899999999',
      status: 'active'
    }
  });
  console.log('Test Admin created:', admin.id);
  await prisma.$disconnect();
}

createTestAdmin();
