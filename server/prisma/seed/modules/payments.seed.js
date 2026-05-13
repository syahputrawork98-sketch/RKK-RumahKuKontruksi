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

  // --- Customer Payment Schedule for Active Project 2 (Rumah Tipe 36 Depok) ---
  const payTipe36Dp = await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-2024-0201',
      projectId: 'project-active-002',
      customerId: 'customer-004',
      type: 'CUSTOMER_PAYMENT',
      amount: 50000000,
      status: 'verified',
      dueDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
      paidAt: new Date(Date.now() - 53 * 24 * 60 * 60 * 1000),
      verifiedAt: new Date(Date.now() - 52 * 24 * 60 * 60 * 1000),
      verifiedByRole: 'admin',
      verifiedById: 'admin-002',
      note: 'Termin 1 / DP Pembangunan Rumah Tipe 36 Depok'
    }
  });

  const payTipe36Termin2 = await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-2024-0202',
      projectId: 'project-active-002',
      customerId: 'customer-004',
      type: 'CUSTOMER_PAYMENT',
      amount: 40000000,
      status: 'scheduled',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      note: 'Termin 2 Rumah Tipe 36 - dijadwalkan saat progres struktur dan dinding awal tervalidasi'
    }
  });

  const payTipe36Termin3 = await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-2024-0203',
      projectId: 'project-active-002',
      customerId: 'customer-004',
      type: 'CUSTOMER_PAYMENT',
      amount: 30000000,
      status: 'scheduled',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      note: 'Termin 3 Rumah Tipe 36 - dijadwalkan menjelang pekerjaan atap, plafon, dan lantai'
    }
  });

  const payTipe36Final = await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-2024-0204',
      projectId: 'project-active-002',
      customerId: 'customer-004',
      type: 'CUSTOMER_PAYMENT',
      amount: 19985000,
      status: 'scheduled',
      dueDate: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000),
      note: 'Termin final Rumah Tipe 36 - pelunasan setelah finishing dan serah terima lokal'
    }
  });

  // Simulated internal foreman payment seed for operational cost tracking.
  // This is not a dedicated RAP table and intentionally stays below RAB when combined with staged internal costs.
  const payForemanTipe36 = await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-FRM-0201',
      projectId: 'project-active-002',
      foremanId: 'foreman-002',
      type: 'FOREMAN_PAYMENT',
      amount: 12000000,
      status: 'verified',
      dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      paidAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      verifiedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      verifiedByRole: 'admin',
      verifiedById: 'admin-002',
      note: 'Pembayaran operasional Mandor Hasan Basri untuk pekerjaan pondasi dan struktur awal Rumah Tipe 36'
    }
  });

  ctx.paymentRecords = {
    pay1,
    pay2,
    pay3,
    payForeman1,
    payTipe36Dp,
    payTipe36Termin2,
    payTipe36Termin3,
    payTipe36Final,
    payForemanTipe36
  };
  console.log('Payment Records seeded successfully.');
};
