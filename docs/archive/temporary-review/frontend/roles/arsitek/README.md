# Role: Arsitek

## Status Umum
Role Arsitek saat ini dalam tahap **Database-Backed v1 (Dashboard & Pengaturan)**. Data profil dan kapasitas ditarik dari database rill melalui **Persona Switcher (Dev Mode)**. Untuk modul alur kerja desain (Permintaan Desain, Revisi, dsb), sistem masih menggunakan data mock sementara.

## Fungsi Utama Role
Arsitek bertanggung jawab menangani fase pra-proyek/desain sebelum RAB dan implementasi lapangan dimulai. Tugas utama meliputi pembuatan konsep, gambar kerja, manajemen revisi, dan finalisasi desain (handover).

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/arsitek/dashboard` | `DashboardArsitek.jsx` | **Implemented (DB)** | Ringkasan profil & kapasitas dari database. |
| Permintaan Desain | `/arsitek/permintaan-desain` | `PermintaanDesainArsitekPage.jsx` | **Mock-First** | List permintaan desain (Backend Pending). |
| Detail Permintaan | `/arsitek/permintaan-desain/:id` | `DetailPermintaanDesainArsitekPage.jsx` | **Mock-First** | Detail brief & file desain (Backend Pending). |
| Desain Aktif | `/arsitek/desain-aktif` | `DesainAktifArsitekPage.jsx` | **Mock-First** | Fokus pengerjaan desain berjalan. |
| File Desain | `/arsitek/file-desain` | `FileDesainArsitekPage.jsx` | **Mock-First** | Repositori dokumen desain. |
| Revisi Desain | `/arsitek/revisi` | `RevisiDesainArsitekPage.jsx` | **Mock-First** | Monitoring catatan revisi customer. |
| Riwayat Desain | `/arsitek/riwayat` | `RiwayatDesainArsitekPage.jsx` | **Mock-First** | Arsip desain selesai/batal. |
| Pengaturan | `/arsitek/pengaturan` | `PengaturanArsitekPage.jsx` | **Implemented (DB)** | Profil, Sertifikasi, & Pengalaman rill DB. |

## Komponen Terkait
- `ArsitekLayout.jsx`: Sidebar navigasi & Topbar khusus Arsitek.
- `DashboardStats.jsx`: Widget statistik dashboard.
- `ArchitectPersonaContext.jsx`: Manajemen persona arsitek di frontend.
- `architectService.js`: Service API untuk data arsitek (`/api/architects`).

## Data Source Policy
- **Source of Truth (Profile)**: Data profil, sertifikat, dan pengalaman ditarik dari database lokal berdasarkan `architectId`.
- **Mock Data (Workflow)**: Halaman alur kerja desain (permintaan, file, revisi) masih menggunakan `mockDesignRequests` hingga backend modul terkait diimplementasikan.
- **No Persona Selected**: UI menampilkan `RolePersonaEmptyState` pada Dashboard dan Pengaturan jika persona belum dipilih.
- **Data Consistency**: Data profil utama dilarang fallback ke `mockArchitects`.

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

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar Arsitek.
- [x] Sinkronisasi tema Light/Dark global.
- [x] Routing lengkap (8 route aktif).
- [x] Integrasi Database-Backed v1 untuk Dashboard dan Pengaturan.
- [x] Implementasi Persona Switcher khusus Arsitek.

## Belum Dikerjakan
- [ ] Integrasi API Backend untuk Alur Kerja Desain (Design Requests).
- [ ] Fitur Upload File Desain rill.
- [ ] Sistem Komentar/Review rill pada gambar desain.

## Batasan Saat Ini
- **Hybrid Data**: Campuran antara data rill (Profil) dan data mock (Workflow Desain).
- **No Auth**: Belum ada sistem login/izin akses (menggunakan Persona Selector).
- **Local Dev Only**: Dioptimalkan untuk pengembangan di localhost.

## Prioritas Berikutnya
1. Implementasi alur "Permintaan Desain" dari data backend.
2. Fitur pengelolaan file per permintaan desain.
3. Sinkronisasi timeline desain dengan progres di sisi Konsumen.
