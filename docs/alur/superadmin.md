# Alur Superadmin

## Status Dokumen
**Draft / Konteks Produk**
Dokumen ini mendefinisikan alur kerja, batas wewenang, dan tanggung jawab role **Superadmin** dalam ekosistem RumahKu Konstruksi (RKK).

## Definisi Role
Superadmin adalah role internal RKK level sistem/global. Superadmin bertindak sebagai pengawas sistem, pengelola data master, dan level tertinggi untuk eskalasi administratif.

**Prinsip Utama Superadmin:**
- Superadmin adalah pengelola sistem global, bukan penanggung jawab harian proyek tertentu.
- Superadmin berada di atas role Admin dalam konteks kendali sistem.
- Superadmin memastikan seluruh ekosistem RKK berjalan sesuai SOP dan integritas data terjaga.

## Posisi Superadmin dalam Alur RKK
Superadmin berada pada posisi *oversight* (pengawasan). Superadmin memiliki visibilitas penuh terhadap kinerja Admin, status proyek lintas wilayah/tim, dan validitas data seluruh mitra (Mandor, Pengawas, Arsitek).

## Perbedaan Superadmin dan Admin
| Aspek | Admin | Superadmin |
|-------|-------|------------|
| **Cakupan** | Proyek tertentu yang ditugaskan | Seluruh sistem dan lintas proyek |
| **Batasan Proyek** | Maksimal 3 proyek aktif | Tidak dibatasi (karena tidak mengelola teknis harian) |
| **Fokus** | Administrasi harian, kontrak, DP, termin | Data master, kapasitas sistem, eskalasi global |
| **Tanggung Jawab** | Kelengkapan dokumen proyek individu | Kesehatan sistem secara keseluruhan |

## Tanggung Jawab Utama
- Pengelolaan data master seluruh role (Admin, Superadmin lain, Konsumen, Mandor, Pengawas, Arsitek).
- Monitoring kapasitas kerja Admin (memastikan tidak ada Admin overload).
- Penanganan eskalasi administratif yang tidak dapat diselesaikan di level Admin.
- Menjaga integritas data master dan relasi antar data di sistem.
- Monitoring status proyek secara global untuk mendeteksi deviasi atau masalah sistemik.
- Audit sistem dan evaluasi kinerja lintas proyek (sebagai rencana fitur).

## Alur Utama Superadmin
1. **Akses Sistem**: Superadmin masuk ke sistem dan dapat beralih persona menggunakan selector pada fase local development.
2. **Dashboard Global**: Superadmin melihat ringkasan status sistem (jumlah proyek, jumlah mitra aktif, peringatan sistem).
3. **Monitoring Admin**: Superadmin memantau beban kerja Admin dan memastikan pembagian proyek merata.
4. **Manajemen Data Master**: Superadmin mengelola profil dan status keaktifan seluruh user (internal RKK maupun mitra luar).
5. **Eskalasi & Koreksi**: Superadmin menangani permintaan koreksi data administratif yang membutuhkan otorisasi tinggi.
6. **Validasi Proyek**: Superadmin melihat detail proyek lintas Admin untuk memastikan tidak ada prosedur yang dilanggar.
7. **Audit & Laporan**: Superadmin meninjau riwayat aktivitas dan status pembayaran global (sebagai rencana fitur).

## Superadmin dan Data Master
Superadmin memiliki hak akses tertinggi untuk mengelola data master:
- **CRUD Role**: Membuat, mengubah, atau menonaktifkan data Admin, Konsumen, Mandor, Pengawas, dan Arsitek.
- **Relasi Data**: Memperbaiki relasi data yang salah (misal: memindahkan proyek ke Admin lain jika diperlukan).
- **Status Dasar**: Mengelola data referensi yang menjadi dasar operasional sistem.

**Batasan Penting**: Superadmin tidak boleh menggunakan akses ini untuk menghapus histori penting, jejak approval, atau versioning dokumen. Setiap perubahan data master harus memiliki dasar administratif yang jelas.

## Superadmin dan Monitoring Global
Superadmin memantau kesehatan operasional melalui:
- **Kapasitas Admin**: Memastikan aturan "Maksimal 3 Proyek Aktif" ditaati.
- **Status Proyek**: Mendeteksi proyek yang tertahan lama di fase tertentu (stuck).
- **Status Pembayaran**: Melihat tren pembayaran/termin secara global (Planned).
- **Deteksi Pelanggaran**: Mengidentifikasi adanya bypass alur sistem (Planned).

## Superadmin dan Eskalasi
Superadmin menjadi tujuan eskalasi jika terjadi kondisi:
- Konflik data proyek yang tidak bisa diselesaikan Admin.
- Kebutuhan untuk mengubah data yang sudah "Locked" (misal: kesalahan input RAB final yang butuh koreksi sistem).
- Pelanggaran alur yang terdeteksi oleh sistem atau dilaporkan oleh role lain.
- Perubahan kebijakan besar yang berdampak pada status banyak proyek sekaligus.

## Superadmin dan Audit
Superadmin adalah penjaga akuntabilitas sistem. Superadmin harus memastikan:
- Seluruh perubahan data penting meninggalkan jejak (audit trail).
- Dokumen final yang sudah di-approve tidak diganti tanpa prosedur revisi resmi.
- Histori status proyek tetap utuh untuk keperluan evaluasi di masa depan.
*Catatan: Fitur audit trail final adalah bagian dari rencana pengembangan masa depan.*

## Yang Boleh Dilakukan di Aplikasi
- Melihat Dashboard Superadmin dengan data global.
- Melihat dan mengelola data master seluruh role.
- Membuat data Admin, Superadmin, Konsumen, Mandor, Pengawas, dan Arsitek.
- Mengelola status keaktifan user.
- Melihat relasi Admin dengan proyek yang ditangani.
- Memantau kapasitas proyek aktif per Admin.
- Memperbaiki data administratif yang salah secara sistemik.
- Melihat status proyek dan dokumen lintas Admin.

## Yang Tidak Boleh Dilakukan
- **Dilarang** menghapus histori approval atau versioning dokumen secara permanen.
- **Dilarang** membuat status proyek palsu atau memanipulasi progress lapangan.
- **Dilarang** melewati syarat wajib aktivasi (Kontrak, DP, RAB Final) tanpa prosedur eskalasi resmi.
- **Dilarang** mengambil keputusan teknis (desain/lapangan) menggantikan role Arsitek atau Pengawas.
- **Dilarang** menyetujui Change Order tanpa melalui alur approval yang sah.
- **Dilarang** bertindak sebagai Mandor, Pengawas, Arsitek, atau Konsumen di lapangan.
- **Dilarang** menjadikan PIC sebagai Project Controller (PIC adalah perwakilan Konsumen).
- **Dilarang** merusak integritas audit untuk menutupi kesalahan operasional.
- **Dilarang** membangun fitur Auth/JWT/Permission Matrix produksi tanpa instruksi spesifik.

## Status Implementasi Saat Ini
- **Data Superadmin DB-backed**: Partial (Fondasi sudah ada)
- **CRUD Superadmin**: Partial (Fondasi sudah ada)
- **Dashboard Superadmin**: Partial (Tergantung UI repo saat ini)
- **Data Master Role (Admin, Konsumen, dll)**: Partial (Fondasi DB sudah ada)
- **Global Management Semua Role**: Planned
- **Edit Data Master Lintas Role**: Planned
- **Monitoring Kapasitas Admin**: Planned
- **Monitoring Proyek Lintas Admin**: Planned
- **Monitoring Pembayaran Global**: Planned
- **Audit Lintas Proyek**: Planned
- **Eskalasi Sistem Global**: Planned
- **Permission Matrix Final**: Do Not Build Yet
- **Auth/JWT/Security Production**: Do Not Build Yet

## Catatan untuk Developer / AI Assistant
- Dokumen ini adalah panduan konteks alur, bukan perintah implementasi instan.
- Jangan membangun fitur yang bertanda **Planned, Postponed, atau Do Not Build Yet** tanpa instruksi lanjutan.
- Superadmin berbeda dari Admin; fokus Superadmin adalah kesehatan sistem secara global.
- Jangan membuat role "Project Controller" baru; fungsi tersebut saat ini menjadi bagian dari konteks Superadmin.
- Pastikan PIC tetap didefinisikan sebagai perwakilan Konsumen, bukan pengendali sistem.
- Tetap gunakan prinsip *local-development-first*.
- Perubahan data lintas sistem oleh Superadmin harus didesain untuk tetap menjaga histori dan integritas audit.
