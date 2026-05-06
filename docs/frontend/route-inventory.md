# Route Inventory

Daftar seluruh route yang terdaftar di aplikasi berdasarkan `client/src/App.jsx`.

| Route | Role | File | Status | Catatan |
|---|---|---|---|---|
| `/` | Guest | `modules/guest/pages/Home.jsx` | UI-DONE | Landing page utama. |
| `/layanan` | Guest | `modules/guest/pages/Layanan.jsx` | UI-DONE | Detail layanan RKK. |
| `/cara-kerja` | Guest | `modules/guest/pages/CaraKerja.jsx` | UI-DONE | Alur kerja proyek. |
| `/proyek` | Guest | `modules/guest/pages/Proyek.jsx` | MOCK-DONE | Portfolio & progres proyek publik. |
| `/about` | Guest | `modules/guest/pages/Tentang.jsx` | UI-DONE | Informasi perusahaan. |
| `/contact` | Guest | `modules/guest/Contact.jsx` | UI-DONE | Halaman kontak. |
| `/konsumen/TimelineProyek` | Konsumen | `pages/konsumen/TimelineProyek.jsx` | MOCK-DONE | Visualisasi progres proyek. |
| `/konsumen/proyek` | Konsumen | `pages/konsumen/Proyek.jsx` | UI-DONE | List proyek konsumen. |
| `/konsumen/profil` | Konsumen | `pages/konsumen/Profil.jsx` | UI-DONE | Manajemen profil konsumen. |
| `/superadmin/dashboard` | Superadmin | `pages/superadmin/DashboardSuperadmin.jsx` | UI-DONE | Ringkasan statistik sistem. |
| `/superadmin/data-admin` | Superadmin | `pages/superadmin/DataAdminPage.jsx` | EMPTY | Manajemen data admin. |
| `/superadmin/data-pengawas` | Superadmin | `pages/superadmin/DataPengawasPage.jsx` | EMPTY | Manajemen data pengawas. |
| `/superadmin/data-mandor` | Superadmin | `pages/superadmin/DataMandorPage.jsx` | EMPTY | Manajemen data mandor. |
| `/admin/dashboard` | Admin | `pages/admin/DashboardAdmin.jsx` | SHELL | Dashboard operasional admin. |
| `/pengawas/dashboard` | Pengawas | `pages/pengawas/DashboardPengawas.jsx` | SHELL | Dashboard monitoring pengawas. |
| `/mandor/dashboard` | Mandor | `pages/mandor/DashboardMandor.jsx` | SHELL | Dashboard harian mandor. |

## Keterangan Status:
- **UI-DONE**: Tampilan dasar sudah ada.
- **MOCK-DONE**: Sudah terhubung dengan data mock.
- **EMPTY**: Tampilan ada tapi data/tabel kosong.
- **SHELL**: Hanya berupa bingkai layout tanpa konten utama.
