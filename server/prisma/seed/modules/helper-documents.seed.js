/**
 * Administrative Helper Documents Seed Module
 * Handles creation of AdministrativeHelperDocument entities.
 */

export const seedHelperDocuments = async (prisma, ctx) => {
  console.log('Seeding Administrative Helper Documents...');

  await prisma.administrativeHelperDocument.createMany({
    data: [
      {
        documentCode: 'INV-DRAFT-001',
        projectId: 'project-active-001',
        customerId: 'customer-002',
        type: 'INVOICE',
        title: 'Draft Invoice Progres 25%',
        status: 'draft',
        summaryData: 'Invoice penagihan progres pekerjaan 25% sesuai milestone.',
        contentJson: {
          items: [
            { desc: 'Pekerjaan Struktur', amount: 50000000 },
            { desc: 'Pekerjaan Dinding', amount: 25000000 }
          ],
          total: 75000000,
          bankInfo: 'BCA 1234567890 a/n RumahKu Konstruksi'
        },
        createdByRole: 'admin',
        createdById: 'admin-001'
      },
      {
        documentCode: 'BAST-DRAFT-001',
        projectId: 'project-active-001',
        customerId: 'customer-002',
        type: 'BAST',
        title: 'Draft BAST-1 (Serah Terima Tahap 1)',
        status: 'reviewed',
        summaryData: 'Draft berita acara serah terima pekerjaan tahap awal.',
        contentJson: {
          scope: 'Pondasi dan Struktur Utama',
          condition: 'Baik',
          notes: 'Beberapa catra kecil perlu finishing'
        },
        createdByRole: 'admin',
        createdById: 'admin-001'
      },
      {
        documentCode: 'LEGAL-HELP-001',
        projectId: 'project-active-001',
        customerId: 'customer-002',
        type: 'LEGAL_HELPER',
        title: 'Draft Addendum Perubahan Spesifikasi Keramik',
        status: 'released',
        summaryData: 'Dokumen pembantu untuk perubahan material dari keramik standar ke granit.',
        contentJson: {
          originalItem: 'Keramik 40x40 Putih',
          newItem: 'Granit 60x60 Cream',
          additionalCost: 15000000
        },
        createdByRole: 'admin',
        createdById: 'admin-001',
        releasedAt: new Date()
      },
      {
        documentCode: 'INV-JIMBARAN-001',
        projectId: 'project-active-003',
        customerId: 'customer-001',
        type: 'INVOICE',
        title: 'Invoice Termin 1 (Jimbaran)',
        status: 'released',
        summaryData: 'Penagihan termin pertama untuk mobilisasi dan persiapan Jimbaran.',
        contentJson: {
          items: [{ desc: 'Mobilisasi Bali', amount: 150000000 }],
          total: 150000000
        },
        createdByRole: 'admin',
        createdById: 'admin-001',
        releasedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000)
      },
      {
        documentCode: 'BAST-JIMBARAN-001',
        projectId: 'project-active-003',
        customerId: 'customer-001',
        type: 'BAST',
        title: 'Draft BAST Persiapan Lahan',
        status: 'draft',
        summaryData: 'Draft serah terima pekerjaan persiapan lahan dan pagar proyek Jimbaran.',
        contentJson: {
          area: 'Jimbaran Plot A',
          status: 'Clear'
        },
        createdByRole: 'admin',
        createdById: 'admin-001'
      }
    ]
  });

  console.log('Administrative Helper Documents seeded successfully.');
};
