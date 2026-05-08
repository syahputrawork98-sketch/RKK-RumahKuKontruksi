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
| **Material Request Deduction**| `material-requests.service.js` | Logic Pending | **LANJUT (Next Task Opsi 1)** |
| **Report Review Impact** | `DetailLaporanMingguanPengawasAdminPage.jsx` | UI Shell | **LANJUT (Next Task Opsi 2)** |
| **Dokumentasi Lapangan** | `DokumentasiLapanganPengawasPage.jsx` | `placehold.co` | Tunda |

## 3. Mitra (Arsitek)
| Fitur | Lokasi | Status | Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Katalog Arsitek** | `DashboardArsitek.jsx` | Belum Tersedia | Tunda |
| **Payment Progress** | `PembayaranAdminPage.jsx` | Placeholder | Tunda |

## 4. Konsumen
| Fitur | Lokasi | Status | Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Edit Profil** | `Profil.jsx` (Konsumen) | Coming Soon | Tunda |
| **Timeline Proyek Rill** | `TimelineProyek.jsx` | Belum Tersedia | Tetap Hold (Butuh data verifikasi stabil) |

---

## Rekomendasi Next Task

Berdasarkan hasil scan, terdapat dua opsi yang paling masuk akal untuk dikerjakan selanjutnya tanpa membuka scope payment/auth besar:

### Rekomendasi 1: Material Request Approval Workflow Hardening
- **Judul**: Admin Material Request Approval & RAB Inventory Validation
- **Alasan**: UI Admin untuk me-review Material Request sudah ada, tetapi backend-nya baru sekadar mengubah status string. Belum ada validasi apakah jumlah yang diminta melebihi sisa RAB (Inventory Check) atau pengurangan "quota" RAB saat disetujui.
- **Scope Aman**: Hanya backend logic di `material-requests.service.js` dan feedback error di UI.
- **Risiko**: Rendah, selama tidak dipaksakan ke sistem gudang (Warehouse) yang kompleks.

### Rekomendasi 2: Supervisor Weekly Report Review & Progress Sync
- **Judul**: Admin Review Workflow for Supervisor Weekly Reports
- **Alasan**: Pengawas sudah bisa membuat laporan mingguan, tetapi Admin belum memiliki tombol "Approve/Reject" yang fungsional di backend untuk memperbarui "Official Progress" proyek.
- **Scope Aman**: Backend logic untuk menyetujui laporan dan meng-update field `progress` di tabel `Project`.
- **Risiko**: Rendah, membantu menutup loop "Monitoring & Control".

---

**Konfirmasi Scope**: 
Task ini hanya docs/status cleanup dan scan ringan fitur existing yang masih Hold/incomplete. Tidak ada implementasi fitur baru, schema change, auth production, payment, upload, atau workflow production baru.
