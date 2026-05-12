/**
 * Payments Seed Module
 * Handles creation of PaymentRecord entities.
 */

export const seedPayments = async (prisma, ctx) => {
  console.log('Seeding Payment Records...');

  // Note: Using hardcoded IDs where they were used in the original seed.js
  const pay1 = await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-2024-0001',
      projectId: 'project-active-001',
      customerId: 'customer-002',
      type: 'CUSTOMER_PAYMENT',
      amount: 250000000,
      status: 'verified',
      dueDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
      paidAt: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000),
      verifiedAt: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000),
      verifiedByRole: 'admin',
      verifiedById: 'admin-001',
      note: 'DP 1 / Termin 1 Pembangunan BSD Mewah'
    }
  });

  const pay2 = await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-2024-0002',
      projectId: 'project-active-001',
      customerId: 'customer-002',
      type: 'CUSTOMER_PAYMENT',
      amount: 250000000,
      status: 'verified',
      dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      verifiedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      verifiedByRole: 'admin',
      verifiedById: 'admin-001',
      note: 'Termin 2 Pembangunan BSD Mewah'
    }
  });

  const pay3 = await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-2024-0003',
      projectId: 'project-active-001',
      customerId: 'customer-002',
      type: 'CUSTOMER_PAYMENT',
      amount: 500000000,
      status: 'pending',
      dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      note: 'Termin 3 - Menunggu progres 50%'
    }
  });

  const payForeman1 = await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-FRM-0001',
      projectId: 'project-active-001',
      foremanId: 'foreman-001',
      type: 'FOREMAN_PAYMENT',
      amount: 15000000,
      status: 'verified',
      dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      paidAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      verifiedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
      verifiedByRole: 'admin',
      verifiedById: 'admin-001',
      note: 'Pembayaran Mingguan Mandor - Minggu 1'
    }
  });

  ctx.paymentRecords = { pay1, pay2, pay3, payForeman1 };
  console.log('Payment Records seeded successfully.');
};
