# Remaining Hold & Incomplete Features Scan

Dokumen ini mencatat fitur-fitur yang sudah ada di UI atau direncanakan di dokumen, tetapi masih berstatus **Hold**, **Planned**, **Coming Soon**, atau **Placeholder** pada fase *Local Development CRUD Integration*.

## 1. Admin & Project Management
| Fitur | Lokasi | Status | Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Security/Auth** | `admin_gap_analysis.md` | Hold | Tunda (Fase 5+) |
| **Cetak RAB (PDF/Print)** | `DetailRabAdminPage.jsx` | Belum Tersedia | Tunda |
| **Financial Stats** | `DashboardAdmin.jsx` | Placeholder / 0 | Tunda (Butuh logic payment) |
| **Audit Trail (Log)** | `LogAktivitasPage.jsx` | Hold | Tunda |
| **Escrow Logic** | `design-tender-docs` | ❌ Not Implemented | Tunda (Scope Payment) |

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
| **Edit Profil** | `Profil.jsx` (Konsumen) | Data Foundation Ready | Siap untuk Gemini UI integration via Customer CRUD API |

---

## Rekomendasi Next Task

Berdasarkan hasil scan terbaru, Material Request dan Supervisor Weekly Report sudah masuk status stabil lokal. Next task yang paling aman tanpa membuka scope payment/auth besar:

### Rekomendasi 1: Customer Profile UI Integration
- **Judul**: Konsumen Edit Profil UI Integration
- **Alasan**: Model `Customer`, seed persona konsumen, dan Customer CRUD API sudah tersedia. UI Edit Profil Konsumen masih Coming Soon dan membutuhkan integrasi ringan ke data lokal.
- **Scope Aman**: Halaman Profil Konsumen dan service customer existing, tanpa auth production.
- **Risiko**: Rendah, selama field auth/user/password tidak dibuat.

### Rekomendasi 2: Admin Dashboard Demo Data Cleanup
- **Judul**: Admin Dashboard Remaining Mock Cleanup
- **Alasan**: Beberapa statistik/aktivitas admin masih berpotensi placeholder dan perlu diselaraskan dengan API lokal.
- **Scope Aman**: UI dashboard dan service read-only.
- **Risiko**: Rendah, selama tidak masuk payment/auth/production finance.

---

**Konfirmasi Scope**: 
Task ini hanya docs/status cleanup dan scan ringan fitur existing yang masih Hold/incomplete. Tidak ada implementasi fitur baru, schema change, auth production, payment, upload, atau workflow production baru.
