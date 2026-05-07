# Role: Arsitek

## Status Umum
Role Arsitek saat ini dalam tahap **Shell Expanded / Mock-First**. Seluruh navigasi utama, layout bertema (Light/Dark), dan halaman shell profesional telah tersedia untuk memandu pengembangan alur kerja desain pra-proyek.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/arsitek/dashboard` | `DashboardArsitek.jsx` | **Done (Mock)** | Ringkasan kapasitas & desain aktif. |
| Permintaan Desain | `/arsitek/permintaan-desain` | `PermintaanDesainArsitekPage.jsx` | **Done (Mock)** | List permintaan dengan subtab status. |
| Detail Permintaan | `/arsitek/permintaan-desain/:id` | `DetailPermintaanDesainArsitekPage.jsx` | **Done (Mock)** | Detail brief, timeline, & file desain. |
| Desain Aktif | `/arsitek/desain-aktif` | `DesainAktifArsitekPage.jsx` | **Done (Mock)** | Fokus pengerjaan desain berjalan. |
| File Desain | `/arsitek/file-desain` | `FileDesainArsitekPage.jsx` | **Done (Mock)** | Repositori dokumen desain. |
| Revisi Desain | `/arsitek/revisi` | `RevisiDesainArsitekPage.jsx` | **Done (Mock)** | Monitoring catatan revisi customer. |
| Riwayat Desain | `/arsitek/riwayat` | `RiwayatDesainArsitekPage.jsx` | **Done (Mock)** | Arsip desain selesai/batal. |
| Pengaturan | `/arsitek/pengaturan` | `PengaturanArsitekPage.jsx` | **Done (Mock)** | Profil & preferensi tampilan. |

## Komponen Terkait
- `ArsitekLayout.jsx`: Sidebar navigasi & Topbar khusus Arsitek.
- `DashboardStats.jsx`: Widget statistik dashboard.

## Data / Mock Data (Mock-First)
- **Design Requests**: Mengikuti status `assigned`, `in_design`, `waiting_customer_review`, dll.
- **Kapasitas**: Arsitek dibatasi maksimal **8 desain aktif**.
- **Handover**: Alur finalisasi desain sebelum dikonversi menjadi proyek konstruksi (Admin).

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar Arsitek.
- [x] Sinkronisasi tema Light/Dark dengan sistem pusat.
- [x] Routing lengkap (8+ route aktif).
- [x] Halaman shell profesional untuk seluruh modul Arsitek.

## Belum Dikerjakan
- [ ] Integrasi API Backend (Design Requests, Files).
- [ ] Fitur Upload File Desain rill.
- [ ] Sistem Komentar/Review rill.

## Prioritas Berikutnya
1. Implementasi alur "Permintaan Desain" dari data backend.
2. Fitur pengelolaan file per permintaan desain.
3. Sinkronisasi timeline desain dengan progres di sisi Konsumen.
