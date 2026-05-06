// client/src/data/mock/supervisorCertificates.js

export const mockSupervisorCertificates = [
  // Certificates for supervisor-001 (Ahmad Fauzi)
  {
    id: "cert-supervisor-001-001",
    supervisorId: "supervisor-001",
    title: "Sertifikat Pengawas Lapangan Konstruksi",
    issuer: "BNSP",
    certificateNumber: "BNSP-PWS-2024-001",
    issuedAt: "2024-02-15",
    expiredAt: "2027-02-15",
    fileUrl: "/mock/certificates/pengawas/supervisor-001-pengawas-lapangan.pdf",
    fileType: "pdf",
    status: "valid"
  },
  {
    id: "cert-supervisor-001-002",
    supervisorId: "supervisor-001",
    title: "Sertifikat K3 Konstruksi",
    issuer: "Kemnaker",
    certificateNumber: "K3-PWS-2024-055",
    issuedAt: "2024-03-20",
    expiredAt: "2027-03-20",
    fileUrl: "/mock/certificates/pengawas/supervisor-001-k3.pdf",
    fileType: "pdf",
    status: "valid"
  },
  {
    id: "cert-supervisor-001-003",
    supervisorId: "supervisor-001",
    title: "Sertifikat Quality Control Bangunan",
    issuer: "LPJK",
    certificateNumber: "LPJK-QC-2023-012",
    issuedAt: "2023-11-10",
    expiredAt: "2026-11-10",
    fileUrl: "/mock/certificates/pengawas/supervisor-001-qc.pdf",
    fileType: "pdf",
    status: "valid"
  },

  // Certificates for supervisor-002 (Bambang Wijaya)
  {
    id: "cert-supervisor-002-001",
    supervisorId: "supervisor-002",
    title: "Sertifikat Pengawasan Arsitektur & Finishing",
    issuer: "BNSP",
    certificateNumber: "BNSP-ARS-2023-099",
    issuedAt: "2023-08-01",
    expiredAt: "2026-08-01",
    fileUrl: "/mock/certificates/pengawas/supervisor-002-ars.pdf",
    fileType: "pdf",
    status: "valid"
  },
  {
    id: "cert-supervisor-002-002",
    supervisorId: "supervisor-002",
    title: "Sertifikat K3 Konstruksi",
    issuer: "Kemnaker",
    certificateNumber: "K3-PWS-2023-110",
    issuedAt: "2023-09-01",
    expiredAt: "2026-09-01",
    fileUrl: "/mock/certificates/pengawas/supervisor-002-k3.pdf",
    fileType: "pdf",
    status: "valid"
  },

  // Certificates for supervisor-003 (Eko Prasetyo)
  {
    id: "cert-supervisor-003-001",
    supervisorId: "supervisor-003",
    title: "Sertifikat Manajemen Mutu Konstruksi",
    issuer: "RKK Internal",
    certificateNumber: "RKK-QM-2024-01",
    issuedAt: "2024-01-20",
    expiredAt: "2029-01-20",
    fileUrl: "/mock/certificates/pengawas/supervisor-003-qm.pdf",
    fileType: "pdf",
    status: "pending"
  },

  // Certificates for supervisor-004 (Lukman Hakim)
  {
    id: "cert-supervisor-004-001",
    supervisorId: "supervisor-004",
    title: "Sertifikat Pengawasan Struktur Beton",
    issuer: "BNSP",
    certificateNumber: "BNSP-STR-2020-001",
    issuedAt: "2020-01-15",
    expiredAt: "2023-01-15",
    fileUrl: "/mock/certificates/pengawas/supervisor-004-expired.pdf",
    fileType: "pdf",
    status: "expired"
  }
];

// Helper to get certificates by supervisor ID
export const getCertificatesBySupervisor = (supervisorId) => 
  mockSupervisorCertificates.filter(c => c.supervisorId === supervisorId);
