# Remaining Hold & Incomplete Features Scan

Dokumen ini mencatat fitur-fitur yang sudah ada di UI atau direncanakan di dokumen, tetapi masih berstatus **Hold**, **Planned**, **Coming Soon**, atau **Placeholder** pada fase *Production-Ready Feature Completion Mode with Developer Persona Switcher*.

## 1. Admin & Project Management
| Fitur | Lokasi | Status | Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Security/Auth** | `admin_gap_analysis.md` | Hold | Tunda (Fase 5+) |
| **Cetak RAB (PDF/Print)** | `DetailRabAdminPage.jsx` | Belum Tersedia | Tunda |
| **Financial Stats** | `DashboardAdmin.jsx` | ✅ DB-Backed v1 | PaymentRecord simulation available (Batch 26) |
| **Audit Trail (Log)** | `LogAktivitasPage.jsx` | ✅ Implemented v1 | Database Activity Logs available (Batch 30A-D) |
| **Notifikasi Production API** | lintas role | ✅ Polling Implemented | In-app notification with polling (Batch 28) |
| **Escrow/Payment Logic** | `design-tender-docs` | ✅ Local Ready | PaymentRecord & Billing Plan simulation (Batch 26) |
| **Project Planning Bridge** | `DesignRequestAdminPage.jsx` | ✅ Local Ready | Convert Request to Project sebagai action manual (Batch 16A/B) |
| **Assignment Final Mandor/Pengawas** | `DetailProyekAdminPage.jsx` | ✅ Local Ready | Assignment rill ke entitas `Project.foremanId` / `Project.supervisorId` (Batch 17) |
| **Project Activation Gate** | `DetailProyekAdminPage.jsx` | ✅ Local Ready | Aktivasi manual proyek Draft/Planning ke status Berjalan (Batch 18) |

## 2. Operasional Lapangan (Mandor & Pengawas)
| Fitur | Lokasi | Status | Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Upload Foto Rill** | `CreateJurnalMingguanMandorPage.jsx` | ✅ Local Upload | Local upload adapter available (Batch 25) |
| **Data Tim Harian** | `DetailProyekAktifMandorPage.jsx` | Belum ada di Schema | Tunda |
| **Material Request Local Flow**| `material-requests.service.js` / MR pages | Stabil Lokal | Selesai untuk local CRUD; warehouse/inventory production tetap tunda |
| **Report Review Impact** | `DetailLaporanMingguanPengawasAdminPage.jsx` | Stabil Lokal | Selesai untuk local CRUD; audit/publish polish lanjutan opsional |
| **Dokumentasi Lapangan** | `DokumentasiLapanganPengawasPage.jsx` | ✅ Local Upload | Supported via Local Upload Adapter (Batch 25) |

## 3. Mitra (Arsitek)
| Fitur | Lokasi | Status | Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Katalog Arsitek** | `DashboardArsitek.jsx` | Belum Tersedia | Tunda |
| **Payment Progress** | `PembayaranAdminPage.jsx` | Placeholder | Planned for staged implementation |

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

### Rekomendasi 0: Batch 30E — Lightweight Factory / Helper Introduction
- **Judul**: Batch 30E Factory/Helper Seed Optimization
- **Alasan**: Modularisasi `seed.js` sudah selesai (30D-4). `seed.js` sekarang sudah lean. Langkah berikutnya adalah merapikan pembuatan data dengan factory/helper ringan agar tidak banyak duplikasi kode di dalam modul seed.
- **Scope Aman**: Hanya helper internal seed, tidak mengubah schema atau bisnis logic.
- **Risiko**: Rendah.

### Rekomendasi 1: Admin Publish Update / Stage Communication Source Flow Verification
- **Judul**: Admin Publish Update untuk Stage Communication Panel
- **Alasan**: Panel Konsumen sudah functional v1. Jalur Admin sebagai sumber update resmi perlu diverifikasi agar role guard, payload `projectId`, dan status published tetap konsisten.
- **Scope Aman**: Modul stage communication existing dan route ProjectStagePublicComment, tanpa schema/auth/payment.
- **Risiko**: Sedang-rendah; jangan membuka update/delete bebas tanpa validasi role.

### Rekomendasi 2: Admin Dashboard Demo Data Cleanup
- **Judul**: Admin Dashboard Remaining Mock Cleanup
- **Alasan**: Beberapa statistik/aktivitas admin masih berpotensi placeholder dan perlu diselaraskan dengan API lokal.
- **Scope Aman**: UI dashboard dan service read-only.
- **Risiko**: Rendah (Fitur payment/finance kini allowed for phased roadmap, auth production tetap ditunda).

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
Task ini hanya docs/status cleanup dan scan ringan fitur existing yang masih Hold/incomplete. Fitur payment, legal upload, dan notification API kini diizinkan masuk roadmap secara bertahap (Planned for staged implementation), namun auth production, session, dan full RBAC tetap ditunda (Hold).
