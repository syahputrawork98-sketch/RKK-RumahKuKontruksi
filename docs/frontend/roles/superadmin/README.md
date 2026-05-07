# Role: Superadmin

## Status Umum
Role Superadmin memiliki otoritas penuh untuk mengelola seluruh user internal, mitra (Mandor & Arsitek), serta monitoring finansial dan progres proyek secara global.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/superadmin/dashboard` | `DashboardSuperadmin.jsx` | **Done** | Statistik global & monitoring cepat. |
| Data Admin | `/superadmin/data-admin` | `DataAdminPage.jsx` | **Shell** | Manajemen staff internal. |
| Data Pengawas | `/superadmin/data-pengawas` | `DataPengawasPage.jsx` | **Shell** | Manajemen pengawas lapangan. |
| Data Mandor | `/superadmin/data-mandor` | `DataMandorPage.jsx` | **Shell** | Manajemen mitra mandor. |
| Data Arsitek | `/superadmin/data-arsitek` | `PlaceholderPage` | **Placeholder** | Manajemen mitra arsitek. |
| Pembayaran | `/superadmin/pembayaran/*` | `PlaceholderPage` | **Placeholder** | Monitoring arus kas keluar/masuk. |

## Business Terminology (Penting)
- **Tukang/Pekerja**: RKK tidak mengelola data tukang secara individu di sistem utama. Semua pekerja lapangan direpresentasikan melalui **Mandor** atau **Mitra Mandor**.
- **Mitra Arsitek**: Mengelola fee desain dan progres gambar pra-konstruksi.

## Komponen Terkait
- `SuperAdminLayout.jsx`: Sidebar dengan akses penuh ke manajemen user & finansial.
- `DashboardStats.jsx`: Widget statistik responsif (5 cards).

## Data / Mock Data
- **Centralized Staff Tables**: Menggunakan `mockAdmins`, `mockSupervisors`, `mockForemen`, dan `mockArchitects`.
- **System Settings**: Mengelola parameter sistem dan log aktivitas.

## Sudah Dikerjakan
- [x] Struktur layout dengan sidebar dan header bertema (Light/Dark).
- [x] Dashboard stats terintegrasi (Proyek, Klien, Mandor, Arsitek).
- [x] Routing namespace `/superadmin/` yang konsisten.
- [x] Placeholder untuk modul-modul ekspansi.

## Belum Dikerjakan
- [ ] Implementasi CRUD rill untuk Manajemen User.
- [ ] Integrasi data pembayaran rill.
- [ ] Visualisasi grafik pertumbuhan di dashboard.
