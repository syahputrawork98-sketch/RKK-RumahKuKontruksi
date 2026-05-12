/**
 * Customers Seed Module
 * Seeds initial customer data.
 */

export const seedCustomers = async (prisma, ctx) => {
  console.log('Seeding Customers...');

  const customer1 = await prisma.customer.create({
    data: {
      id: 'customer-001',
      name: 'Iwan Setiawan',
      email: 'iwan@gmail.com',
      phone: '081222220001',
      customerType: 'individual',
      address: 'Jl. Melati No. 5, Jakarta Selatan',
      identityNumber: '3174010101800001',
      occupation: 'Karyawan Swasta',
      notes: 'Persona demo konsumen individu untuk alur desain baru dan proyek planning.',
      avatar: 'https://i.pravatar.cc/150?u=customer-001'
    }
  });

  const customer2 = await prisma.customer.create({
    data: {
      id: 'customer-002',
      name: 'Sari Kartika',
      email: 'sari@gmail.com',
      phone: '081222220002',
      customerType: 'individual',
      address: 'BSD City, Tangerang Selatan',
      identityNumber: '3674014502870002',
      occupation: 'Pemilik Usaha Kuliner',
      notes: 'Persona demo konsumen individu dengan proyek konstruksi aktif untuk monitoring timeline.',
      avatar: 'https://i.pravatar.cc/150?u=customer-002'
    }
  });

  const customer3 = await prisma.customer.create({
    data: {
      id: 'customer-003',
      name: 'PT Maju Jaya',
      email: 'admin@majujaya.co.id',
      phone: '021-55566677',
      customerType: 'company',
      companyName: 'PT Maju Jaya Properti',
      picName: 'Hendra',
      picPosition: 'Project Owner Representative',
      address: 'Kuningan, Jakarta Pusat',
      taxNumber: '01.234.567.8-901.000',
      businessField: 'Properti dan Manajemen Gedung',
      notes: 'Persona demo konsumen perusahaan untuk design-to-project bridge dan proyek draft.',
      avatar: 'https://i.pravatar.cc/150?u=customer-003'
    }
  });

  const customer4 = await prisma.customer.create({
    data: {
      id: 'customer-004',
      name: 'Reno Aditya',
      email: 'reno.aditya@gmail.com',
      phone: '081222220004',
      customerType: 'individual',
      address: 'Jl. Bunga Raya No. 12, Depok',
      identityNumber: '3276011201900004',
      occupation: 'Konsultan IT',
      notes: 'Persona demo konsumen dengan proyek renovasi aktif kedua untuk dashboard dan monitoring multi-project.',
      avatar: 'https://i.pravatar.cc/150?u=customer-004'
    }
  });

  const customer5 = await prisma.customer.create({
    data: {
      id: 'customer-005',
      name: 'CV Sinar Kosan',
      email: 'owner@sinarkosan.local',
      phone: '021-77889900',
      customerType: 'company',
      companyName: 'CV Sinar Kosan Mandiri',
      picName: 'Wulan Prameswari',
      picPosition: 'Owner',
      address: 'Margonda, Depok',
      taxNumber: '02.345.678.9-012.000',
      businessField: 'Properti Kos dan Kontrakan',
      notes: 'Persona demo perusahaan kecil untuk proyek selesai dan histori konstruksi.',
      avatar: 'https://i.pravatar.cc/150?u=customer-005'
    }
  });

  ctx.customers = { customer1, customer2, customer3, customer4, customer5 };

  console.log('Customers seeded successfully.');
};
