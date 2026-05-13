# Module: Mandor - RKK RumahKu Konstruksi

Role Mandor adalah pelaksana teknis di lapangan yang bertanggung jawab atas pelaporan harian, mingguan, dan pengelolaan kebutuhan logistik serta kendala proyek.

## Status
**Feature Complete — Local CRUD Integration**

## Persona Utama
- **Nama**: Hasan Basri
- **ID**: `foreman-002`
- **Project**: PRJ-2024-002 — Pembangunan Rumah Tipe 36 Depok

## Fitur Aktif
- **Dashboard**: Ringkasan tugas, material request aktif, dan kendala lapangan.
- **Proyek Aktif**: Daftar proyek yang sedang ditangani dengan detail teknis lengkap.
- **Informasi RAB (Read-only)**: Acuan item pekerjaan dan budget teknis lapangan.
- **Jadwal Kerja (Read-only)**: Monitoring timeline dan target milestone.
- **Gambar Kerja (Read-only)**: Akses file DED dan teknis untuk pelaksanaan.
- **Dokumentasi Lapangan (Read-only)**: Galeri foto progres yang diunggah tim.
- **Tugas Harian**: Daftar pekerjaan harian yang ditugaskan oleh Pengawas/Admin.
- **Laporan Harian**: Pelaporan hasil pekerjaan harian (Progress Log).
- **Jurnal Mingguan**: Pelaporan mingguan yang terhubung dengan kategori RAB & Stage.
- **Kebutuhan Material**: Pengajuan logistik proyek berbasis sisa kuota RAB.
- **Kendala Lapangan**: Pelaporan hambatan teknis/alam dan monitoring resolusi.
- **Pembayaran (Read-only)**: Monitoring catatan pembayaran opname operasional mandor (Lokal).
- **Pengaturan**: Manajemen profil, sertifikasi, dan riwayat pengalaman lapangan.

## Fitur Hold (Marketplace v2)
- **Project Posting**: Pencarian proyek baru di luar penugasan Admin.
- **Penawaran Saya**: Bidding proyek untuk mendapatkan kontrak baru.
- **Riwayat Penawaran**: Arsip penawaran proyek.

## Dataset Utama (Rumah Tipe 36)
- **Project ID**: `project-active-002`
- **RAB Items**: 12 Kategori (Persiapan, Tanah, Struktur, dst).
- **Stages**: 12 Tahapan pekerjaan yang dapat dipilih di Jurnal/Laporan.
- **Linked Data**: Material Request, Daily Task, Weekly Journal, dan Field Issue semuanya merujuk pada `projectId` yang sama.

## Progress SOT (Source of Truth)
> [!IMPORTANT]
> Mandor hanya mengirimkan **Klaim Progres** (`claimedProgress`).
> Angka ini bersifat administratif untuk pelaporan internal. Progres Resmi proyek (`verifiedProgress`) hanya dapat berubah melalui verifikasi manual oleh **Pengawas (Supervisor)**.

## Batasan & Kendala
- **Auth**: Menggunakan Persona Switcher (Tidak ada JWT/Session/Password).
- **Payment**: Hanya bersifat pencatatan administratif lokal (Tidak ada Payment Gateway).
- **Storage**: Foto dokumentasi disimpan di server lokal (public folder).
- **Ecosystem**: Belum terhubung ke fitur bidding/marketplace.

---
*Terakhir diperbarui: Batch Mandor 05 (DD/MM/YYYY)*
