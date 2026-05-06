# Role: Arsitek

## Status Umum
Role Arsitek ditambahkan untuk menangani fase pra-proyek/desain sebelum RAB dan implementasi lapangan dimulai.

## Fungsi Utama
- Menerima design request dari konsumen melalui Admin/RKK.
- Membuat konsep desain dan gambar kerja.
- Upload file desain.
- Mengelola komentar desain.
- Mengelola revisi desain.
- Mengirim desain final untuk approval.

## Timeline Terkait
**Timeline 1: Design Timeline**
`Konsumen ↔ RKK/Admin ↔ Arsitek`

## Mock Data Terkait
- `architects.js`: Profil arsitek dan kapasitas.
- `designRequests.js`: Permintaan desain dari konsumen.
- `designFiles.js`: Berkas gambar (denah, 3D, dll).
- `designRevisions.js`: Riwayat revisi (Max 3 gratis).
- `designComments.js`: Diskusi fase desain.
- `users.js` & `roles.js`: Autentikasi dan izin akses.

## Aturan Revisi
- Konsumen mendapat **3 revisi gratis**.
- Revisi ke-4 dan seterusnya dikenakan biaya tambahan (Charge).
- Besar biaya disimpan di `designRevisions.chargeAmount`.

## Aturan Kapasitas
- Arsitek maksimal menangani **2 design request/gambar aktif**.
- Kapasitas disimpan di `architects.maxDesignCapacity`.
- Arsitek tidak memakai `maxProjectCapacity` karena Arsitek bekerja di fase desain, bukan fase konstruksi lapangan.

## Relasi ke Proyek
Setelah desain disetujui, Admin dapat mengonversi design request menjadi Project.
- `designRequests.convertedProjectId` -> `projects.id`
- `projects.sourceDesignRequestId` -> `designRequests.id`

## Belum Dikerjakan
- [ ] UI dashboard Arsitek
- [ ] Halaman daftar design request
- [ ] Halaman detail design request
- [ ] Komponen upload file desain
- [ ] Sistem komentar interaktif pada gambar desain
- [ ] Alur approval desain final oleh Konsumen
