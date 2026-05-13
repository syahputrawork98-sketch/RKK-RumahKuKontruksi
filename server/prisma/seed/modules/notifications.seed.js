/**
 * App Notifications Seed Module
 * Handles creation of AppNotification entities.
 */

export const seedNotifications = async (prisma, ctx) => {
  console.log('Seeding App Notifications...');

  await prisma.appNotification.createMany({
    data: [
      {
        recipientRole: 'admin',
        recipientId: 'admin-001',
        actorRole: 'foreman',
        actorId: 'foreman-001',
        eventType: 'FIELD_ISSUE_CREATED',
        entityType: 'FieldIssue',
        title: 'Kendala Lapangan Baru',
        message: 'Mandor Mulyadi melaporkan kendala cuaca ekstrem di proyek BSD.',
        linkPath: '/admin/monitoring/kendala',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        recipientRole: 'supervisor',
        recipientId: 'supervisor-001',
        actorRole: 'foreman',
        actorId: 'foreman-001',
        eventType: 'FIELD_ISSUE_CREATED',
        entityType: 'FieldIssue',
        title: 'Kendala Baru Perlu Verifikasi',
        message: 'Ada laporan kendala teknis dari Mandor Mulyadi.',
        linkPath: '/pengawas/kendala',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
      },
      {
        recipientRole: 'customer',
        recipientId: 'customer-002',
        actorRole: 'admin',
        actorId: 'admin-001',
        eventType: 'DOCUMENT_RELEASED',
        entityType: 'AdministrativeHelperDocument',
        title: 'Dokumen Baru Dirilis',
        message: 'Admin telah merilis draft BAST untuk Anda tinjau.',
        linkPath: '/konsumen/dokumen',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        recipientRole: 'architect',
        recipientId: 'arch-001',
        actorRole: 'customer',
        actorId: 'customer-001',
        eventType: 'DESIGN_REVISION_REQUESTED',
        entityType: 'DesignRequest',
        title: 'Revisi Desain Diminta',
        message: 'Konsumen Budi meminta revisi pada desain Rumah Tebet.',
        linkPath: '/arsitek/permintaan-desain/dr-revision-requested-001',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
      },
      {
        recipientRole: 'foreman',
        recipientId: 'foreman-002',
        actorRole: 'admin',
        actorId: 'admin-002',
        eventType: 'MATERIAL_REQUEST_REJECTED',
        entityType: 'MaterialRequest',
        title: 'Request Material Ditolak',
        message: 'Permintaan keramik premium Anda ditolak oleh Admin Operasional.',
        linkPath: '/mandor/request-material',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        recipientRole: 'admin',
        recipientId: 'admin-001',
        actorRole: 'supervisor',
        actorId: 'supervisor-001',
        eventType: 'WEEKLY_REPORT_SUBMITTED',
        entityType: 'SupervisorWeeklyReport',
        title: 'Laporan Mingguan Baru',
        message: 'Pengawas Andi telah mengirimkan laporan mingguan untuk proyek BSD.',
        linkPath: '/admin/laporan-mingguan-pengawas',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
      }
    ]
  });

  console.log('App Notifications seeded successfully.');
};
