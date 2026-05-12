# Frontend Mock Data Issues

Audit Terakhir: 7 Mei 2026

## Masalah yang Diperbaiki (Fixed)
- [x] **Missing Users**: Menambahkan `user-konsumen-002` hingga `004` dan `user-customer-viewer-002` ke `users.js`.
- [x] **Role Assignments**: Melakukan redistribusi proyek pada Admin, Pengawas, dan Mandor agar sesuai kapasitas (Admin max 3, Pengawas max 3, Mandor max 2).
- [x] **Mandor Permissions**: Menghapus permission `manage_workers` dari role Mandor dan memperbarui deskripsi menjadi vendor lapangan.
- [x] **Relasi Komentar**: Menambahkan stage `stage-interior-01` pada `projectStages.js` untuk mengakomodasi komentar pada proyek `project-003`.
- [x] **Konsistensi RAB**: Menyelaraskan subtotal kategori dengan total item pada `rabCategories.js` dan menambahkan flag `isPlaceholder` untuk data yang belum lengkap.
- [x] **Audit Kapasitas**: Memastikan tidak ada staff/vendor yang overload.

## Masalah yang Ditunda (Pending / Technical Debt)
- [ ] **Backward Compatibility**: `activeCustomerProject` masih menggunakan struktur lama. Refactor ke struktur RAB 3 tingkat baru akan dilakukan pada tahap integrasi UI.
- [ ] **Enum Status Proyek**: Status proyek masih menggunakan Bahasa Indonesia (`Berjalan`, `Selesai`). Perlu dinormalisasi ke enum Inggris (`in_progress`, `completed`, dll) di masa depan.
- [ ] **Data Detail Proyek Lain**: Saat ini rincian RAB (Category/Item) baru lengkap untuk `project-001`. Proyek lain masih menggunakan data placeholder.

## Prioritas Berikutnya
1. Integrasi UI Detail Proyek Konsumen dengan data RAB 3 tingkat.
2. Implementasi form laporan harian Mandor.
3. Manajemen sertifikat staff di dashboard Admin.
