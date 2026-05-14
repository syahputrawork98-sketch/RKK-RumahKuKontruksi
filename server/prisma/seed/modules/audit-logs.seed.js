/**
 * Audit Log Seed Module
 * Handles creation of AuditLog entities for governance simulation.
 */

export const seedAuditLogs = async (prisma, ctx) => {
  console.log('Seeding Audit Logs...');

  const { activeProject1, activeProject2 } = ctx.projects;

  await prisma.auditLog.createMany({
    data: [
      {
        actorRole: 'admin',
        actorId: 'admin-001',
        actorName: 'Admin Utama',
        action: 'PROJECT_ACTIVATION',
        entityType: 'Project',
        entityId: activeProject1.id,
        summary: 'Admin mengaktifkan proyek Rumah Mewah BSD setelah validasi pembayaran termin 1.',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        actorRole: 'supervisor',
        actorId: 'supervisor-002',
        actorName: 'Pengawas Hasan',
        action: 'PROGRESS_VERIFICATION',
        entityType: 'Project',
        entityId: activeProject2.id,
        summary: 'Verifikasi progres lapangan mencapai 58% pada tahap struktur dan dinding.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        actorRole: 'admin',
        actorId: 'admin-002',
        actorName: 'Admin Operasional',
        action: 'MATERIAL_APPROVAL',
        entityType: 'MaterialRequest',
        entityId: 'mr-tipe36-004',
        summary: 'Persetujuan pengadaan bata ringan untuk proyek Tipe 36 Depok.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        actorRole: 'superadmin',
        actorId: 'super-001',
        actorName: 'Super Admin',
        action: 'ROLE_ASSIGNMENT',
        entityType: 'Admin',
        entityId: 'admin-002',
        summary: 'Pembaruan kapasitas proyek untuk Admin Operasional.',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        actorRole: 'supervisor',
        actorId: 'supervisor-003',
        actorName: 'Pengawas Putu',
        action: 'PROGRESS_VERIFICATION',
        entityType: 'Project',
        entityId: 'project-active-003',
        summary: 'Verifikasi progres cor lantai 1 Jimbaran mencapai 45% total proyek.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ]
  });

  console.log('Audit Logs seeded successfully.');
};
