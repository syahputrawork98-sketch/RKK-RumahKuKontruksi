// client/src/data/mock/foremanCertificates.js

export const mockForemanCertificates = [
  // Certificates for foreman-001 (Budi Santoso)
  {
    id: "cert-foreman-001-001",
    foremanId: "foreman-001",
    title: "Sertifikat Kompetensi Kerja Mandor Konstruksi",
    issuer: "BNSP",
    certificateNumber: "BNSP-MDR-2024-001",
    issuedAt: "2024-01-20",
    expiredAt: "2027-01-20",
    fileUrl: "/mock/certificates/mandor/foreman-001-skk.pdf",
    fileType: "pdf",
    status: "valid"
  },
  {
    id: "cert-foreman-001-002",
    foremanId: "foreman-001",
    title: "Sertifikat K3 Konstruksi",
    issuer: "Kemnaker",
    certificateNumber: "K3-MDR-2024-118",
    issuedAt: "2024-03-15",
    expiredAt: "2027-03-15",
    fileUrl: "/mock/certificates/mandor/foreman-001-k3.pdf",
    fileType: "pdf",
    status: "valid"
  },
  {
    id: "cert-foreman-001-003",
    foremanId: "foreman-001",
    title: "Pelatihan Manajemen Tukang Lapangan",
    issuer: "RKK Internal",
    certificateNumber: "RKK-TR-2024-05",
    issuedAt: "2024-04-10",
    expiredAt: "2029-04-10",
    fileUrl: "/mock/certificates/mandor/foreman-001-training.pdf",
    fileType: "pdf",
    status: "valid"
  },

  // Certificates for foreman-002 (Agus Setiawan)
  {
    id: "cert-foreman-002-001",
    foremanId: "foreman-002",
    title: "Sertifikat Keahlian Finishing Bangunan",
    issuer: "LPJK",
    certificateNumber: "LPJK-FIN-2023-088",
    issuedAt: "2023-05-10",
    expiredAt: "2026-05-10",
    fileUrl: "/mock/certificates/mandor/foreman-002-skk.pdf",
    fileType: "pdf",
    status: "valid"
  },
  {
    id: "cert-foreman-002-002",
    foremanId: "foreman-002",
    title: "Sertifikat K3 Konstruksi",
    issuer: "Kemnaker",
    certificateNumber: "K3-MDR-2023-210",
    issuedAt: "2023-06-01",
    expiredAt: "2026-06-01",
    fileUrl: "/mock/certificates/mandor/foreman-002-k3.pdf",
    fileType: "pdf",
    status: "valid"
  },

  // Certificates for foreman-003 (Dedi Rahman)
  {
    id: "cert-foreman-003-001",
    foremanId: "foreman-003",
    title: "Sertifikat Pelatihan Baja Ringan",
    issuer: "BlueScope",
    certificateNumber: "BS-TRAIN-2024-012",
    issuedAt: "2024-02-15",
    expiredAt: "2027-02-15",
    fileUrl: "/mock/certificates/mandor/foreman-003-blue.pdf",
    fileType: "pdf",
    status: "pending"
  },

  // Certificates for foreman-004 (Hendra Wijaya)
  {
    id: "cert-foreman-004-001",
    foremanId: "foreman-004",
    title: "Sertifikat Mandor Drainase",
    issuer: "BNSP",
    certificateNumber: "BNSP-DRN-2020-005",
    issuedAt: "2020-01-10",
    expiredAt: "2023-01-10",
    fileUrl: "/mock/certificates/mandor/foreman-004-expired.pdf",
    fileType: "pdf",
    status: "expired"
  }
];

// Helper to get certificates by foreman ID
export const getCertificatesByForeman = (foremanId) => 
  mockForemanCertificates.filter(c => c.foremanId === foremanId);
