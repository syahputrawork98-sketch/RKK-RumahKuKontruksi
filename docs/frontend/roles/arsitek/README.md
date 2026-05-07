# Role: Arsitek

## Status Umum
Role Arsitek saat ini dalam tahap **Shell Expanded / Mock-First**. Seluruh navigasi utama, layout bertema (Light/Dark), dan halaman shell profesional telah tersedia untuk memandu pengembangan alur kerja desain pra-proyek.

## Fungsi Utama Role
Arsitek bertanggung jawab menangani fase pra-proyek/desain sebelum RAB dan implementasi lapangan dimulai. Tugas utama meliputi pembuatan konsep, gambar kerja, manajemen revisi, dan finalisasi desain (handover).

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

## Business Rules (Penting)
*   **Aturan Revisi**: Konsumen mendapatkan **3 revisi gratis**. Revisi ke-4 dan seterusnya dikenakan biaya tambahan yang tercatat di sistem.
*   **Kapasitas Desain**: Setiap arsitek dibatasi maksimal menangani **2-8 desain aktif** (tergantung profil) untuk menjaga kualitas output.
*   **Handover**: Desain yang telah disetujui konsumen akan melalui masa finalisasi sebelum dikonversi menjadi proyek konstruksi (Admin).

## Design Request Status Flow
| Status | Makna | Dihitung Aktif? |
|---|---|---|
| `assigned` | Sudah ditugaskan ke Arsitek. | Ya |
| `in_design` | Arsitek sedang mengerjakan desain. | Ya |
| `waiting_customer_review` | Menunggu review konsumen. | Ya |
| `revision_requested` | Konsumen meminta revisi. | Ya |
| `ready_to_convert` | Finalisasi selesai, siap menjadi Proyek. | Tidak |
| `converted_to_project` | Sudah menjadi proyek konstruksi. | Tidak |

## Komponen Terkait
- `ArsitekLayout.jsx`: Sidebar navigasi & Topbar khusus Arsitek.
- `DashboardStats.jsx`: Widget statistik dashboard.

## Data / Mock Data (Mock-First)
- **Design Requests**: Menggunakan `mockDesignRequests` di `src/data/mock/designRequests.js`.
- **Design Files**: Dokumentasi gambar teknis (Denah, 3D, Detail).
- **Design Revisions**: Pelacakan riwayat revisi dan biaya tambahan.

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar Arsitek.
- [x] Sinkronisasi tema Light/Dark global.
- [x] Routing lengkap (8 route aktif).
- [x] Halaman shell profesional untuk seluruh modul Arsitek.

## Belum Dikerjakan
- [ ] Integrasi API Backend rill.
- [ ] Fitur Upload File Desain rill.
- [ ] Sistem Komentar/Review rill pada gambar desain.

## Batasan Saat Ini
- **UI-Only / Mock-First**: Seluruh data dan aksi masih bersifat simulasi.
- **No Auth**: Belum ada sistem login/izin akses.
- **Backend v0**: Data belum sinkron dengan database rill.

## Prioritas Berikutnya
1. Implementasi alur "Permintaan Desain" dari data backend.
2. Fitur pengelolaan file per permintaan desain.
3. Sinkronisasi timeline desain dengan progres di sisi Konsumen.
