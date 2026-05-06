# Route Inventory

Daftar seluruh route yang terdaftar di aplikasi berdasarkan `client/src/App.jsx`.

| Role | Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|---|
| Guest | Home | `/` | `modules/guest/pages/Home.jsx` | **Done** | Landing page utama. |
| Guest | Layanan | `/layanan` | `modules/guest/pages/Layanan.jsx` | **Done** | Grid layanan jasa konstruksi. |
| Guest | Cara Kerja | `/cara-kerja` | `modules/guest/pages/CaraKerja.jsx` | **Done** | Visualisasi alur kerja proyek. |
| Guest | Proyek | `/proyek` | `modules/guest/pages/Proyek.jsx` | **Done** | Portfolio publik. |
| Guest | Tentang | `/tentang` | `modules/guest/pages/Tentang.jsx` | **Done** | Visi, misi, dan tim. |
| Guest | Kontak | `/kontak` | `modules/guest/Contact.jsx` | **Done** | Form kontak dan peta lokasi. |
| Konsumen | Dashboard Timeline | `/konsumen/TimelineProyek` | `pages/konsumen/TimelineProyek.jsx` | **Done** | Monitoring progres proyek aktif. |
| Konsumen | Detail Tahap | `/konsumen/TimelineProyek/:stageId` | `pages/konsumen/DetailTimelineProyek.jsx` | **Done** | Laporan teknis per tahap pekerjaan. |
| Konsumen | List Proyek | `/konsumen/proyek` | `pages/konsumen/Proyek.jsx` | **Done** | Daftar proyek milik konsumen. |
| Konsumen | Profil | `/konsumen/profil` | `pages/konsumen/Profil.jsx` | **Done** | Pengaturan akun konsumen. |
| Superadmin | Dashboard | `/superadmin/dashboard` | `pages/superadmin/DashboardSuperadmin.jsx` | **Partial** | Statistik global sistem. |
| Superadmin | Data Admin | `/superadmin/data-admin` | `pages/superadmin/DataAdminPage.jsx` | **Shell** | Manajemen user admin. |
| Superadmin | Data Pengawas | `/superadmin/data-pengawas` | `pages/superadmin/DataPengawasPage.jsx` | **Shell** | Manajemen user pengawas. |
| Superadmin | Data Mandor | `/superadmin/data-mandor` | `pages/superadmin/DataMandorPage.jsx` | **Shell** | Manajemen user mandor. |
| Admin | Dashboard | `/admin/dashboard` | `pages/admin/DashboardAdmin.jsx` | **Shell** | Operasional proyek pusat. |
| Pengawas | Dashboard | `/pengawas/dashboard` | `pages/pengawas/DashboardPengawas.jsx` | **Shell** | Monitoring lapangan. |
| Mandor | Dashboard | `/mandor/dashboard` | `pages/mandor/DashboardMandor.jsx` | **Shell** | Laporan harian & tukang. |

## Keterangan Status:
* **Done**: Sudah cukup selesai secara UI dan fungsionalitas mock.
* **Partial**: Halaman sudah ada tapi masih perlu penyempurnaan/data mock.
* **Shell**: Route/layout sudah ada tapi konten belum lengkap (placeholder).
* **Planned**: Belum dibuat, masih dalam rencana pengembangan.
