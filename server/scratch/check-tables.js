import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  try {
    const admins = await prisma.admin.findMany();
    const superadmins = await prisma.superadmin.findMany();
    console.log('--- DB CHECK ---');
    console.log('Admins count:', admins.length);
    console.log('Superadmins count:', superadmins.length);
    console.log('Sample Admin:', admins[0]?.name);
    console.log('--- SUCCESS ---');
  } catch (error) {
    console.error('--- ERROR ---');
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
