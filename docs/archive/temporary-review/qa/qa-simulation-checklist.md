# RKK Operational Workflow QA Checklist (Local Simulation)

Dokumen ini berisi panduan simulasi alur operasional proyek secara end-to-end pada lingkungan `localhost`. Gunakan **Persona Switcher** di Topbar untuk berganti peran.

## Fase 1: Persiapan & Aktivasi (Role: Admin)
- [ ] **Pilih Persona Admin** di Topbar.
- [ ] Buka menu **Proyek > Aktivasi Proyek**.
- [ ] Pastikan ada proyek dengan status "Siap Aktivasi" (Readiness 100%).
- [ ] Klik **Aktifkan Proyek**.
- [ ] Verifikasi proyek berpindah ke tab **Sudah Aktif**.
- [ ] Buka **Monitoring Proyek**, pastikan `Progress Resmi` adalah **0%**.

## Fase 2: Pelaporan Lapangan (Role: Mandor)
- [ ] **Pilih Persona Mandor** di Topbar.
- [ ] Buka menu **Proyek Aktif**.
- [ ] Verifikasi proyek yang baru diaktifkan muncul di daftar.
- [ ] Klik **Detail Proyek** > Tombol **Lapor Progres** (Shell).
- [ ] *Catatan: Untuk simulasi full jurnal, pastikan database sudah terisi WeeklyJournal via seed atau API tester.*
- [ ] Verifikasi bahwa progress yang ditampilkan di dashboard Mandor adalah `verifiedProgress` (Progress Resmi).

## Fase 3: Verifikasi Progres (Role: Pengawas)
- [ ] **Pilih Persona Pengawas** di Topbar.
- [ ] Buka menu **Proyek Diawasi**.
- [ ] Pilih Proyek, masuk ke **Detail Proyek**.
- [ ] Lihat section **Log Progres Resmi**.
- [ ] Klik **Verifikasi Progres Baru**.
- [ ] Masukkan nilai progress (misal: 15%) dan keterangan.
- [ ] Simpan. Verifikasi status progress proyek di database/UI berubah menjadi 15%.
- [ ] Pastikan progress tidak bisa diturunkan (Backend Guard).

## Fase 4: Monitoring & Publikasi (Role: Admin)
- [ ] **Pilih Persona Admin** kembali.
- [ ] Buka **Dashboard Admin** atau **Monitoring Proyek**.
- [ ] Verifikasi progress proyek sudah terupdate menjadi 15% secara otomatis.
- [ ] Buka **Laporan Mingguan**, review laporan dari Pengawas (jika sudah ada).
- [ ] Klik **Publish ke Konsumen** (Memerlukan `customerSummaryDraft`).

## Fase 5: Konsumsi Data (Role: Konsumen)
- [ ] **Pilih Persona Konsumen**.
- [ ] Buka portal **Proyek Saya**.
- [ ] Verifikasi progress yang tampil sesuai dengan `verifiedProgress` terakhir yang dipublish oleh Admin.

---
**Standard Source of Truth:**
- **Official Progress:** `verifiedProgress` (Hanya bisa diubah oleh Pengawas via Verifikasi Progres).
- **Claimed Progress:** `claimedProgress` (Hanya referensi dari Mandor, tidak mengubah angka resmi).
