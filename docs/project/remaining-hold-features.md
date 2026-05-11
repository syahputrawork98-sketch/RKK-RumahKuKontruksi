# Remaining Hold & Incomplete Features Scan

Dokumen ini mencatat fitur-fitur yang sudah ada di UI atau direncanakan di dokumen, tetapi masih berstatus **Hold**, **Planned**, **Coming Soon**, atau **Placeholder** pada fase *Local Development CRUD Integration*.

## 1. Admin & Project Management
| Fitur | Lokasi | Status | Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Security/Auth** | `admin_gap_analysis.md` | Hold | Tunda (Fase 5+) |
| **Cetak RAB (PDF/Print)** | `DetailRabAdminPage.jsx` | Belum Tersedia | Tunda |
| **Financial Stats** | `DashboardAdmin.jsx` | Placeholder / 0 | Tunda (Butuh logic payment) |
| **Audit Trail (Log)** | `LogAktivitasPage.jsx` | Hold | Tunda |
| **Notifikasi Production API** | lintas role | Hold | Tunda; belum ada notification service production |
| **Escrow Logic** | `design-tender-docs` | ❌ Not Implemented | Tunda (Scope Payment) |
| **Project Planning Bridge** | `DesignRequestAdminPage.jsx` | 🕒 Hold | Convert Request to Project sebagai action manual (Batch 16+) |
| **Assignment Final Mandor/Pengawas** | `DesignRequestAdminPage.jsx` | 🕒 Hold | Assignment rill ke entitas Project.foremanId / Project.supervisorId |
| **Project Activation (from Design)** | `DesignRequestAdminPage.jsx` | 🕒 Hold | Aktivasi otomatis dari flow desain |

## 2. Operasional Lapangan (Mandor & Pengawas)
| Fitur | Lokasi | Status | Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Upload Foto Rill** | `CreateJurnalMingguanMandorPage.jsx` | Placeholder URL | Tunda (Gunakan string URL manual) |
| **Data Tim Harian** | `DetailProyekAktifMandorPage.jsx` | Belum ada di Schema | Tunda |
| **Material Request Local Flow**| `material-requests.service.js` / MR pages | Stabil Lokal | Selesai untuk local CRUD; warehouse/inventory production tetap tunda |
| **Report Review Impact** | `DetailLaporanMingguanPengawasAdminPage.jsx` | Stabil Lokal | Selesai untuk local CRUD; audit/publish polish lanjutan opsional |
| **Dokumentasi Lapangan** | `DokumentasiLapanganPengawasPage.jsx` | `placehold.co` | Tunda |

## 3. Mitra (Arsitek)
| Fitur | Lokasi | Status | Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Katalog Arsitek** | `DashboardArsitek.jsx` | Belum Tersedia | Tunda |
| **Payment Progress** | `PembayaranAdminPage.jsx` | Placeholder | Tunda |

## 4. Konsumen
| Fitur | Lokasi | Status | Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Dashboard Konsumen** | `DashboardKonsumen.jsx` | API-Backed Stabil Lokal | Selesai untuk local CRUD; tetap dev persona, bukan auth production |
| **Edit Profil** | `Profil.jsx` (Konsumen) | API-Backed Stabil Lokal | Selesai via Customer CRUD API; jangan tambahkan auth/password |
| **Design Request Konsumen** | `DesignRequestCustomerPage.jsx` | Modular v1 / Stabil Lokal | Selesai modularisasi (Batch M1) |
| **Project Monitoring / Timeline** | `Proyek.jsx`, `TimelineProyek.jsx`, `DetailTimelineProyek.jsx` | API-Backed Stabil Lokal | Selesai untuk read monitoring proyek dan stage lokal |
| **Stage Communication Panel** | `StageCommunicationPanel.jsx` | Functional v1 | Read path dan customer reply memakai API |

---

## Rekomendasi Next Task

Berdasarkan hasil scan terbaru, Material Request, Supervisor Weekly Report, dan flow Konsumen utama sudah masuk status stabil lokal. Next task yang paling aman tanpa membuka scope payment/auth besar:

### Rekomendasi 1: Admin Publish Update / Stage Communication Source Flow Verification
- **Judul**: Admin Publish Update untuk Stage Communication Panel
- **Alasan**: Panel Konsumen sudah functional v1. Jalur Admin sebagai sumber update resmi perlu diverifikasi agar role guard, payload `projectId`, dan status published tetap konsisten.
- **Scope Aman**: Modul stage communication existing dan route ProjectStagePublicComment, tanpa schema/auth/payment.
- **Risiko**: Sedang-rendah; jangan membuka update/delete bebas tanpa validasi role.

### Rekomendasi 2: Admin Dashboard Demo Data Cleanup
- **Judul**: Admin Dashboard Remaining Mock Cleanup
- **Alasan**: Beberapa statistik/aktivitas admin masih berpotensi placeholder dan perlu diselaraskan dengan API lokal.
- **Scope Aman**: UI dashboard dan service read-only.
- **Risiko**: Rendah, selama tidak masuk payment/auth/production finance.

### Rekomendasi 3: Verified Progress Consistency Audit
- **Judul**: Verified Progress Consistency Audit
- **Alasan**: Tampilan progress dipakai oleh Admin, Pengawas, dan Konsumen. Perlu cek ringan konsistensi antara `progress`, `verifiedProgress`, stage progress, dan log verifikasi.
- **Scope Aman**: Read/check kontrak data dan UI display existing.
- **Risiko**: Rendah, selama tidak mengubah formula tanpa keputusan Room Chat 00.

### Rekomendasi 4: Superadmin Account & Profile Change Management Local CRUD v1
- **Judul**: Superadmin Account & Profile Governance Direction
- **Alasan**: Sesuai arah produk, Superadmin perlu memiliki kendali akun lintas role dan setiap role dapat mengelola profilnya sendiri dengan tata kelola perubahan data penting yang tercatat/tervalidasi.
- **Scope Aman**: Local CRUD akun seluruh role oleh Superadmin dan self-profile update, tanpa auth production atau RBAC production.
- **Risiko**: Rendah; pastikan hanya menggunakan API lokal dan dev persona.

---

**Konfirmasi Scope**: 
Task ini hanya docs/status cleanup dan scan ringan fitur existing yang masih Hold/incomplete. Tidak ada implementasi fitur baru, schema change, auth production, payment, legal upload, production notification API, atau workflow production baru.
