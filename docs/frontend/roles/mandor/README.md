# Role: Mandor

## Status Umum
Role Mandor saat ini dalam tahap **Shell Expanded / Mock-First**. Seluruh navigasi harian lapangan, layout bertema (Light/Dark), dan halaman shell profesional telah tersedia untuk memandu pengembangan fitur logbook harian dan eksekusi tugas.

## Fungsi Utama Role
Mandor bertanggung jawab atas eksekusi harian di lapangan, manajemen tugas tim teknis, pengisian logbook harian, pelaporan kendala, serta pengajuan kebutuhan material ke Pengawas/Admin.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/mandor/dashboard` | `DashboardMandor.jsx` | **Done (Mock)** | Ringkasan tugas & progress harian. |
| Proyek Aktif | `/mandor/proyek-aktif` | `ProyekAktifMandorPage.jsx` | **Done (Mock)** | List proyek dalam pengerjaan tim. |
| Detail Proyek | `/mandor/proyek-aktif/:id` | `DetailProyekAktifMandorPage.jsx` | **Done (Mock)** | Info tugas, tim, & kendala lapangan. |
| Tugas Harian | `/mandor/tugas-harian` | `TugasHarianMandorPage.jsx` | **Done (Mock)** | Checklist pekerjaan harian tim teknis. |
| Laporan Harian | `/mandor/laporan-harian` | `LaporanHarianMandorPage.jsx` | **Done (Mock)** | Logbook harian/catatan kemajuan fisik. |
| Request Material | `/mandor/request-material` | `RequestMaterialMandorPage.jsx" | **Done (Mock)** | Pengajuan kebutuhan logistik mendesak. |
| Dokumentasi | `/mandor/dokumentasi` | `DokumentasiLapanganMandorPage.jsx` | **Done (Mock)** | Bukti visual progres harian. |
| Kendala Lapangan | `/mandor/kendala-lapangan` | `KendalaLapanganMandorPage.jsx` | **Done (Mock)** | Pelaporan hambatan & masalah lapangan. |
| Pengaturan | `/mandor/pengaturan` | `PengaturanMandorPage.jsx` | **Done (Mock)** | Profil & ringkasan tim binaan. |

## Komponen Terkait
- `MandorLayout.jsx`: Sidebar navigasi & Topbar khusus Mandor.
- `DashboardStats.jsx`: Widget statistik operasional harian.

## Data / Mock Data (Mock-First)
- **Daily Operations**: Fokus pada `dailyTasks`, `logbook`, dan `fieldIssues`.
- **Team Management**: Hanya menampilkan ringkasan jumlah dan kategori pekerja (Batu, Kayu, dll).
- **Logistics**: Alur pengajuan material dari level terendah (lapangan).

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar Mandor.
- [x] Sinkronisasi tema Light/Dark global.
- [x] Routing lengkap (9 route aktif).
- [x] Halaman shell profesional untuk seluruh modul Mandor.

## Belum Dikerjakan
- [ ] Integrasi API Backend rill (Logbook, Material Requests).
- [ ] Modul Manajemen Tim Internal Mandor detail.
- [ ] Fitur Sinkronisasi Offline (PWA/Local Storage).

## Batasan Saat Ini
- **UI-Only / Mock-First**: Seluruh data dan aksi masih bersifat simulasi.
- **No Auth**: Belum ada sistem login/izin akses.
- **Backend v0**: Data belum sinkron dengan database rill.

## Prioritas Berikutnya
1. Implementasi alur Laporan Harian (Logbook) yang terhubung ke database.
2. Modul Request Material dari sisi Mandor.
3. Sinkronisasi data progres harian dengan verifikasi di sisi Pengawas.
