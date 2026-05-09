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
| List Proyek | `/admin/proyek` | DB-Backed v1 | Manajemen proyek rill. |
| Create Proyek | `/admin/proyek/create` | DB-Backed v1 | Form pembuatan proyek rill. |
| Detail Proyek | `/admin/proyek/:id` | DB-Backed v1 | Info detail & penugasan tim. |
| List RAB | `/admin/rab` | DB-Backed v1 | Daftar RAB proyek. |
| Detail RAB | `/admin/rab/:id` | Partial | Read data RAB dari DB. |
| Pembayaran | `/admin/pembayaran` | Shell / Pending | Manajemen termin konsumen. |
| Penugasan Tim | `/admin/penugasan-tim` | DB-Backed v1 | Assign Pengawas/Mandor. |
| Laporan Progress | `/admin/laporan-progress` | DB-Backed v1 | Monitoring progres resmi (SOT). |
| Request Material | `/admin/request-material`| Local Stabilized | Terhubung ke Material Request backend v1 dengan approval/status flow lokal. |
| Laporan Pengawas | `/admin/laporan-mingguan-pengawas` | DB-Backed v1 | List review laporan mingguan Pengawas. |
| Detail Review | `/admin/laporan-mingguan-pengawas/:id` | DB-Backed v1 | Review, approve, reject laporan Pengawas. |
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
| Dashboard | `/arsitek/dashboard` | DB-Backed v1 | Kapasitas & antrean desain. |
| Permintaan Desain | `/arsitek/permintaan-desain`| Mock-First | Belum ada backend desain. |
| Detail Permintaan | `/arsitek/permintaan-desain/:id`| Mock-First | Detail brief desain. |
| Desain Aktif | `/arsitek/desain-aktif` | Mock-First | Monitoring pengerjaan. |
| File Desain | `/arsitek/file-desain` | Mock-First | Repositori dokumen. |
| Revisi Desain | `/arsitek/revisi` | Mock-First | Catatan revisi konsumen. |
| Riwayat | `/arsitek/riwayat` | Mock-First | Portofolio internal. |
| Pengaturan | `/arsitek/pengaturan` | DB-Backed v1 | Profil arsitek rill. |

## 6. Superadmin Routes
| Halaman | Route | Status | Catatan |
|---|---|---|---|
| Dashboard | `/superadmin/dashboard` | Partial | Statistik sistem (sebagian mock). |
| Data Admin | `/superadmin/data-admin` | DB-Backed v1 | CRUD Manajemen Admin. |
| Data Pengawas | `/superadmin/data-pengawas` | DB-Backed v1 | CRUD Manajemen Pengawas. |
| Data Mandor | `/superadmin/data-mandor` | DB-Backed v1 | CRUD Manajemen Mandor. |
| Data Arsitek | `/superadmin/data-arsitek` | Shell / Placeholder | Rencana manajemen arsitek. |
| Log Aktivitas | `/superadmin/log-aktivitas` | Shell / Static | Riwayat aksi sistem. |

## 7. Konsumen Routes
| Halaman | Route | Status | Catatan |
|---|---|---|---|
| Proyek Saya | `/konsumen/proyek` | Mock-First | Monitoring progres investasi. |
| Timeline | `/konsumen/TimelineProyek` | Mock-First | Visualisasi tahap kerja. |
| Detail Progres | `/konsumen/TimelineProyek/:id`| Mock-First | Foto & laporan per tahap. |
| Profil | `/konsumen/profil` | Data Foundation Ready | Customer API dan seed persona siap; UI edit profil menunggu integrasi Gemini. |

---
*Terakhir diperbarui: 8 Mei 2026*
