# Module: Mandor - RKK RumahKu Konstruksi

Role Mandor adalah pelaksana teknis di lapangan yang bertanggung jawab atas pelaporan harian, mingguan, dan pengelolaan kebutuhan logistik serta kendala proyek.

## Status
**Hardened — Local CRUD Integration (Batch 71-89)**

## Fitur Aktif
- **Dashboard**: Ringkasan tugas, material request aktif, dan kendala lapangan.
- **Proyek Aktif**: Daftar proyek yang sedang ditangani dengan detail teknis lengkap.
- **Informasi RAB (Read-only)**: Acuan item pekerjaan dan budget teknis lapangan.
- **Jadwal Kerja (Read-only)**: Monitoring timeline dan target milestone.
- **Gambar Kerja (Read-only)**: Akses file DED dan teknis untuk pelaksanaan.
- **Dokumentasi Lapangan (Read-only)**: Galeri foto progres yang diunggah tim.
- **Tugas Harian**: Daftar pekerjaan harian dengan konteks Proyek/Stage yang informatif (Batch 92).
- **Laporan Harian**: Pelaporan harian dengan context-aware data (Batch 92).
- **Jurnal Mingguan**: Pelaporan mingguan yang terhubung dengan kategori RAB & Stage.
- **Kebutuhan Material**: Pengajuan logistik proyek berbasis sisa kuota RAB.
- **Kendala Lapangan**: Pelaporan hambatan teknis/alam dan monitoring resolusi terintegrasi.
- **Payment Eligibility (Batch 109)**: Monitoring kelayakan bayar berbasis review jurnal pengawas (`ForemanWeeklyPaymentEligibility`).
- **Payment History (Batch 109)**: Monitoring riwayat pembayaran diterima (`PaymentRecord` FOREMAN_PAYMENT).
- **Manual Request creation**: **Hold** (Pengajuan manual mandor menunggu endpoint API khusus).

## Fitur Hold (Marketplace v2)
- **Project Posting**: Pencarian proyek baru di luar penugasan Admin.
- **Penawaran Saya**: Bidding proyek untuk mendapatkan kontrak baru.

## Progress SOT (Source of Truth)
> [!IMPORTANT]
> Mandor hanya mengirimkan **Klaim Progres** (`claimedProgress`).
> Angka ini bersifat administratif untuk pelaporan internal. Progres Resmi proyek (`verifiedProgress`) hanya dapat berubah melalui verifikasi manual oleh **Pengawas (Supervisor)**. Pembayaran mandor tidak mengubah progres resmi.

## Batasan & Kendala
- **Auth**: Menggunakan Persona Switcher (Tidak ada JWT/Session/Password).
- **Payment Gateway**: Tidak ada integrasi transfer bank otomatis (Manual simulation via `paid_simulated`).
- **Mandor Bank Accounts**: Rekening mandor disimpan secara lokal di `localStorage`.
- **Storage**: Foto dokumentasi disimpan di server lokal (public folder).
- **Ecosystem**: Belum terhubung ke fitur bidding/marketplace.

---
*Terakhir diperbarui: Batch 111 — Docs Sync + Checkpoint.*
