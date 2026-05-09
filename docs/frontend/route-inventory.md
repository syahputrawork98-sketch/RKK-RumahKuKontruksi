# Route Inventory

Daftar seluruh route yang terdaftar di aplikasi berdasarkan `client/src/App.jsx`.

## Kategori Status
- **DB-Backed v1**: Sudah terhubung ke database melalui API rill.
- **Partial**: Sebagian data rill, sebagian masih mock/shell.
- **Shell / Static**: UI sudah ada tetapi data masih bersifat statis/manual.
- **Mock-First**: Masih menggunakan data dummy dari folder `mock/`.
- **Local Stabilized**: Terhubung ke backend lokal dan sudah distabilkan untuk fase CRUD lokal, tetapi belum production-ready.
- **Experimental / Backend Draft**: Terhubung ke backend yang masih dalam tahap eksperimen (belum final).
- **Operational Backend Pending**: UI sudah siap, namun menunggu implementasi backend operasional.

---

## 1. Public Routes
| Halaman | Route | Status | Catatan |
|---|---|---|---|
| Home | `/` | Done | Landing page utama. |
| Layanan | `/layanan` | Done | Grid layanan jasa konstruksi. |
| Cara Kerja | `/cara-kerja` | Done | Visualisasi alur kerja proyek. |
| Portofolio | `/proyek` | Done | Galeri proyek publik. |
| Tentang | `/about`, `/tentang` | Done | Visi, misi, dan tim. |
| Kontak | `/contact`, `/kontak` | Done | Form kontak dan lokasi. |

## 2. Admin Routes
| Halaman | Route | Status | Catatan |
|---|---|---|---|
| Dashboard | `/admin/dashboard` | DB-Backed v1 | Statistik rill database. |
| Data Konsumen | `/admin/konsumen/data` | DB-Backed v1 | Manajemen data customer lokal. |
| Pengajuan Desain Konsumen | `/admin/konsumen/pengajuan-desain` | DB-Backed v2 | Management Design Request lokal. |
| Pengajuan Konstruksi | `/admin/konsumen/pengajuan-konstruksi` | Shell / Pending | Placeholder konversi pengajuan konstruksi. |
| Validasi Pengajuan | `/admin/konsumen/validasi` | Shell / Pending | Placeholder checklist validasi administrasi. |
| List Proyek | `/admin/proyek` | DB-Backed v1 | Manajemen proyek rill. |
| Create Proyek | `/admin/proyek/create` | DB-Backed v1 | Form pembuatan proyek rill. |
| Aktivasi Proyek | `/admin/proyek/aktivasi` | Local Stabilized | Readiness checklist dan aktivasi proyek via `PATCH /projects/:id/activate`. |
| Detail Proyek | `/admin/proyek/:id` | DB-Backed v1 | Info detail & penugasan tim. |
| Penutupan Proyek | `/admin/proyek/penutupan` | Shell / Pending | Placeholder serah terima dan penutupan administrasi. |
| List RAB | `/admin/rab` | DB-Backed v1 | Daftar RAB proyek. |
| Detail RAB | `/admin/rab/:projectId` | Partial | Read data RAB dari DB. |
| Gambar Kerja | `/admin/dokumen/gambar-kerja` | Shell / Pending | Placeholder arsip gambar kerja. |
| Kontrak | `/admin/dokumen/kontrak` | Shell / Pending | Placeholder dokumen kontrak. |
| Dokumen Final / BAST | `/admin/dokumen/final` | Shell / Pending | Placeholder dokumen legal akhir. |
| Change Order | `/admin/dokumen/change-order` | Shell / Pending | Placeholder pencatatan perubahan pekerjaan. |
| Penugasan Tim | `/admin/penugasan-tim` | DB-Backed v1 | Assign Pengawas/Mandor. |
| Laporan Progress | `/admin/laporan-progress` | DB-Backed v1 | Monitoring progres resmi (SOT). |
| Jurnal Mandor Approved | `/admin/monitoring/jurnal-mandor` | Shell / Pending | Placeholder monitoring jurnal Mandor approved. |
| Request Material | `/admin/request-material`| Local Stabilized | Terhubung ke Material Request backend v1 dengan approval/status flow lokal. |
| Laporan Pengawas | `/admin/laporan-mingguan-pengawas` | DB-Backed v1 | List review laporan mingguan Pengawas. |
| Detail Review | `/admin/laporan-mingguan-pengawas/:id` | DB-Backed v1 | Review, approve, reject laporan Pengawas. |
| Kendala & Eskalasi | `/admin/monitoring/kendala` | Shell / Pending | Placeholder kendala lapangan untuk keputusan Admin. |
| Publikasi Konsumen | `/admin/publikasi` | Local Stabilized | Source flow Stage Communication untuk update Konsumen, belum production RBAC. |
| Pembayaran Konsumen | `/admin/pembayaran/konsumen` | Shell / Pending | Placeholder invoice/bukti bayar konsumen. |
| Pembayaran Mandor | `/admin/pembayaran/mandor` | Shell / Pending | Placeholder opname/disbursement mitra. |
| Validasi Disbursement | `/admin/pembayaran/validasi` | Shell / Pending | Placeholder validasi pencairan. |
| Riwayat Pembayaran | `/admin/pembayaran/riwayat` | Shell / Pending | Placeholder arsip transaksi. |
| Pembayaran | `/admin/pembayaran` | Shell / Pending | Legacy mapping ke halaman pembayaran existing; belum payment production. |
| Pengaturan | `/admin/pengaturan` | DB-Backed v1 | Profil admin rill. |

## 3. Pengawas Routes
| Halaman | Route | Status | Catatan |
|---|---|---|---|
| Dashboard | `/pengawas/dashboard` | DB-Backed v1 | Stats harian lapangan. |
| Proyek Diawasi | `/pengawas/proyek` | DB-Backed v1 | List proyek per pengawas. |
| Detail Proyek | `/pengawas/proyek/:id` | DB-Backed v1 | Detail teknis proyek. |
| Verifikasi Progres | `/pengawas/verifikasi-progres` | DB-Backed v1 | Validasi progres resmi (SOT). |
| Dokumentasi | `/pengawas/dokumentasi` | Shell / Pending | Galeri fisik lapangan. |
| Laporan Mingguan | `/pengawas/laporan-mingguan` | DB-Backed v1 | List evaluasi mingguan pengawas. |
| Buat Laporan | `/pengawas/laporan-mingguan/create` | DB-Backed v1 | Form input evaluasi mingguan. |
| Detail Laporan | `/pengawas/laporan-mingguan/:id` | DB-Backed v1 | Detail, edit & submit laporan. |
| Request Material | `/pengawas/request-material` | Local Stabilized | Review/verifikasi Material Request via backend lokal. |
| Jurnal Mandor | `/pengawas/jurnal-mandor` | DB-Backed v1 | List jurnal mingguan Mandor. |
| Detail Jurnal Mandor | `/pengawas/jurnal-mandor/:id` | DB-Backed v1 | Review & Approve jurnal Mandor. |
| Pengaturan | `/pengawas/pengaturan` | DB-Backed v1 | Profil pengawas rill. |

## 4. Mandor Routes
| Halaman | Route | Status | Catatan |
|---|---|---|---|
| Dashboard | `/mandor/dashboard` | DB-Backed v1 | Progres kerja & tugas. |
| Proyek Aktif | `/mandor/proyek-aktif` | DB-Backed v1 | Daftar eksekusi proyek. |
| Detail Proyek | `/mandor/proyek-aktif/:id` | DB-Backed v1 | Info detail lapangan. |
| Tugas Harian | `/mandor/tugas-harian` | Shell / Pending | Checklist pekerjaan. |
| Laporan Harian | `/mandor/laporan-harian` | Shell / Pending | Logbook harian mandor. |
| Request Material | `/mandor/request-material` | Local Stabilized | Pengajuan dan konfirmasi penerimaan material via backend lokal. |
| Dokumentasi | `/mandor/dokumentasi` | Shell / Pending | Foto fisik harian. |
| Kendala Lapangan | `/mandor/kendala-lapangan` | Shell / Pending | Laporan hambatan. |
| Jurnal Mingguan | `/mandor/jurnal-mingguan` | DB-Backed v1 | List laporan mingguan mandor. |
| Buat Jurnal | `/mandor/jurnal-mingguan/create` | DB-Backed v1 | Form input jurnal mingguan. |
| Detail Jurnal | `/mandor/jurnal-mingguan/:id` | DB-Backed v1 | Detail, edit & submit jurnal. |
| Pengaturan | `/mandor/pengaturan` | DB-Backed v1 | Profil mandor rill. |

## 5. Arsitek Routes
| Halaman | Route | Status | Catatan |
|---|---|---|---|
| Dashboard | `/arsitek/dashboard` | DB-Backed v2 | Kapasitas & antrean desain dari backend lokal. |
| Brief Desain | `/arsitek/brief-desain` | DB-Backed v2 | Mapping ke peluang/permintaan desain lokal. |
| Peluang Desain | `/arsitek/peluang-desain` | DB-Backed v2 | Peluang tender desain lokal. |
| Permintaan Desain | `/arsitek/permintaan-desain`| DB-Backed v2 | Legacy mapping ke peluang desain. |
| Detail Permintaan | `/arsitek/permintaan-desain/:requestId`| DB-Backed v2 | Detail brief/tender desain lokal. |
| Desain Aktif | `/arsitek/desain-aktif` | DB-Backed v2 | Monitoring pengerjaan desain lokal. |
| Tahapan Konsep | `/arsitek/tahapan/konsep` | Shell / Pending | Placeholder tahapan desain detail. |
| Tahapan Denah | `/arsitek/tahapan/denah` | Shell / Pending | Placeholder tahapan desain detail. |
| Tahapan 3D | `/arsitek/tahapan/3d` | Shell / Pending | Placeholder tahapan desain detail. |
| Tahapan Gambar Kerja | `/arsitek/tahapan/gambar-kerja` | Shell / Pending | Placeholder tahapan desain detail. |
| File Desain | `/arsitek/file-desain` | Partial | Repositori desain lokal; upload/file production tetap Hold. |
| Revisi Desain | `/arsitek/revisi` | DB-Backed v2 | Catatan/revisi desain lokal sesuai flow arsitek. |
| Final Approved | `/arsitek/final-approved` | Shell / Pending | Placeholder paket desain final approved. |
| Evaluasi Teknis | `/arsitek/evaluasi` | Shell / Pending | Placeholder evaluasi teknis. |
| Riwayat | `/arsitek/riwayat` | DB-Backed v2 | Riwayat desain/tender lokal. |
| Pengaturan | `/arsitek/pengaturan` | DB-Backed v1 | Profil arsitek rill. |

## 6. Superadmin Routes
| Halaman | Route | Status | Catatan |
|---|---|---|---|
| Dashboard | `/superadmin/dashboard` | Partial | Statistik sistem (sebagian mock). |
| Data Admin | `/superadmin/data-admin` | DB-Backed v1 | CRUD Manajemen Admin. |
| Data Superadmin | `/superadmin/data-superadmin` | DB-Backed v1 | CRUD/list data Superadmin lokal. |
| Data Konsumen | `/superadmin/data-konsumen` | DB-Backed v1 | CRUD/list Customer lokal. |
| Data Pengawas | `/superadmin/data-pengawas` | DB-Backed v1 | CRUD Manajemen Pengawas. |
| Data Mandor | `/superadmin/data-mandor` | DB-Backed v1 | CRUD Manajemen Mandor. |
| Data Arsitek | `/superadmin/data-arsitek` | DB-Backed v1 | CRUD/list Architect lokal. |
| Data Pengajuan Desain | `/superadmin/data-pengajuan-desain` | DB-Backed v2 | Reuse management Design Request lokal. |
| Data Perusahaan & PIC | `/superadmin/data-perusahaan` | Shell / Pending | Placeholder legalitas perusahaan dan PIC. |
| Monitoring Proyek Global | `/superadmin/proyek` | Partial | Placeholder monitoring global proyek. |
| Proyek Aktif Global | `/superadmin/proyek/aktif` | Shell / Pending | Placeholder daftar proyek aktif global. |
| Relasi Admin-Proyek | `/superadmin/proyek/relasi` | Shell / Pending | Placeholder pemetaan admin-proyek. |
| Kapasitas Admin | `/superadmin/kapasitas-admin` | Shell / Pending | Placeholder monitoring beban kerja Admin. |
| Laporan Progres Global | `/superadmin/progres-proyek` | Partial | Placeholder monitoring progress global. |
| Pembayaran Global | `/superadmin/pembayaran` | Shell / Pending | Placeholder payment global; bukan payment production. |
| Monitoring Material | `/superadmin/monitoring/material` | Shell / Pending | Placeholder audit material request global. |
| Audit Laporan Pengawas | `/superadmin/monitoring/laporan-pengawas` | Shell / Pending | Placeholder audit laporan pengawas global. |
| Eskalasi | `/superadmin/eskalasi` | Shell / Pending | Placeholder koreksi data/eskalasi. |
| Log Aktivitas | `/superadmin/log-aktivitas` | Shell / Static | Riwayat aksi sistem. |
| Pengaturan Sistem | `/superadmin/pengaturan` | Shell / Pending | Placeholder konfigurasi sistem. |

## 7. Konsumen Routes
| Halaman | Route | Status | Catatan |
|---|---|---|---|
| Proyek Saya | `/konsumen/proyek` | DB-Backed v1 | Project API memakai filter `customerId` dari dev persona. |
| Timeline | `/konsumen/timeline-proyek` | DB-Backed v1 | ProjectStage dan verifiedProgress dipakai untuk timeline Konsumen lokal; alias lama `/konsumen/TimelineProyek` tetap tersedia. |
| Detail Progres | `/konsumen/timeline-proyek/:stageId`| DB-Backed v1 | Detail stage dan Stage Communication Panel memakai ProjectStagePublicComment API; create/reply membutuhkan `projectId` eksplisit. Alias lama `/konsumen/TimelineProyek/:stageId` tetap tersedia. |
| Timeline Alias Mobile | `/konsumen/timeline` | DB-Backed v1 | Alias compatibility untuk timeline mobile. |
| Profil | `/konsumen/profil` | DB-Backed v1 | Customer API dipakai untuk view/update profil dev persona. |
| Permintaan Desain | `/konsumen/permintaan-desain` | DB-Backed v1 | List dan create Design Request memakai API lokal berdasarkan `customerId`. |
| Pembayaran | `/konsumen/pembayaran` | Shell / Pending | Placeholder termin pembayaran; belum payment production. |
| Dokumen | `/konsumen/dokumen` | Shell / Pending | Placeholder pusat dokumen; belum legal/upload production. |

---
*Terakhir diperbarui: 9 Mei 2026*
