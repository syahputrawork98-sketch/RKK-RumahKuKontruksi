# Alur Dokumen & Foto Proyek

## 1. Pendahuluan
Dokumen ini menjelaskan alur pengelolaan dokumen dan foto proyek di sistem RKK (RumahKu Konstruksi). Prinsip utama yang mendasari alur ini adalah bahwa setiap dokumen dan foto proyek bukan sekadar galeri visual, melainkan **bukti proyek (evidence)** yang valid, terukur, dan memiliki konteks profesional.

## 2. Tujuan
*   Mengelola dokumentasi proyek sebagai bukti nyata (evidence) atas kemajuan dan kualitas pekerjaan.
*   Memastikan setiap file memiliki konteks yang jelas (proyek, tahap, pengunggah, dan kebutuhan).
*   Menjaga integritas data melalui mekanisme verifikasi internal sebelum ditampilkan ke pihak eksternal (Konsumen).
*   Memfasilitasi pelaporan yang transparan namun tetap terkontrol secara bisnis.

## 3. Prinsip Alur Utama
Sistem RKK mengikuti alur verifikasi berjenjang untuk memastikan kualitas informasi:
**Mandor membuat dokumentasi** -> **Pengawas memverifikasi** -> **Admin mengontrol publikasi** -> **Konsumen melihat dokumentasi yang sudah dipublish.**

*Catatan Penting: Foto/dokumen lapangan **tidak boleh langsung tampil ke Konsumen** sebelum diverifikasi oleh Pengawas dan diputuskan untuk dipublikasikan oleh Admin.*

## 4. Aktor dan Hak Akses

### Mandor
Sumber utama dokumentasi harian dari lapangan.
*   **Boleh**: Upload foto progress, upload bukti pekerjaan, memberi caption, mengaitkan foto ke proyek/tahap/laporan harian.
*   **Tidak Boleh**: Mempublikasikan foto langsung ke Konsumen, menyetujui/menolak dokumentasi sendiri, menghapus foto yang sudah diverifikasi, mengubah dokumen administrasi resmi.

### Pengawas
Verifikator utama kualitas teknis di lapangan.
*   **Boleh**: Melihat dokumentasi Mandor, Approve/Reject foto progress, memberi catatan verifikasi, upload foto inspeksi, merekomendasikan publikasi ke Konsumen.
*   **Tidak Boleh**: Mengubah nilai RAB secara sepihak, menyetujui biaya tambahan langsung, menghapus jejak audit dokumentasi.

### Admin
Pengelola administrasi dan penjaga gerbang (gatekeeper) publikasi.
*   **Boleh**: Melihat seluruh dokumen/foto, publish/unpublish ke Konsumen, mengarsipkan dokumen, mengunggah dokumen resmi proyek (Kontrak, RAB, BAST).
*   **Tanggung Jawab**: Memastikan komunikasi visual ke Konsumen aman dan profesional.

### Konsumen
Pihak penerima informasi resmi.
*   **Boleh**: Melihat foto progress yang dipublish, melihat dokumen proyek yang dibagikan, mengunduh dokumen resmi.
*   **Tidak Boleh**: Melihat foto yang ditolak (rejected), melihat catatan teknis internal, melihat dokumentasi kendala sebelum dikomunikasikan resmi.

### Arsitek
*   **Boleh**: Mengunggah/memperbarui dokumen desain/gambar kerja, memberi catatan teknis terhadap kesesuaian lapangan dengan desain.

## 5. Jenis Dokumentasi

| Kategori | Deskripsi | Sumber | Verifikasi |
| :--- | :--- | :--- | :--- |
| **Foto Progress Harian** | Bukti fisik pekerjaan (pondasi, bata, pengecoran, dll). | Mandor | Pengawas |
| **Foto Verifikasi** | Bukti inspeksi atau pengecekan kualitas. | Pengawas | Admin/Sistem |
| **Dokumen Teknis** | Gambar kerja, RAB final, spek material, kontrak. | Admin/Arsitek | - |
| **Foto Kendala** | Material rusak, cuaca buruk, kendala teknis mendesak. | Mandor/Pengawas | Admin/Pengawas |
| **Dokumen Final** | Foto serah terima, BAST, perbaikan defect final. | Pengawas/Admin | Admin |

## 6. Status Dokumen/Foto

| Status | Arti |
| :--- | :--- |
| `draft` | Baru dibuat, belum diajukan untuk review. |
| `submitted` | Sudah diajukan oleh pengunggah. |
| `under_review` | Sedang dalam proses pemeriksaan teknis. |
| `approved` | Dinyatakan valid sebagai bukti internal. |
| `rejected` | Ditolak karena tidak sesuai/kurang jelas (butuh alasan). |
| `published` | Resmi ditampilkan di dashboard Konsumen. |
| `archived` | Disimpan sebagai arsip histori proyek. |

## 7. Kontrol Visibilitas (Visibility)

| Visibility | Cakupan Akses |
| :--- | :--- |
| `admin_only` | Hanya Admin dan Superadmin. |
| `internal_only` | Tim proyek internal (Admin, Pengawas, Mandor, Arsitek). |
| `field_team` | Mandor, Pengawas, dan Admin yang ditugaskan di proyek. |
| `customer_visible` | Dapat dilihat oleh Konsumen (setelah status `published`). |

## 8. Detail Langkah Alur

### Alur A: Upload Foto Progress oleh Mandor
1. Mandor memilih proyek dan tahap pekerjaan terkait.
2. Mandor mengunggah foto dan mengisi deskripsi singkat.
3. Status otomatis menjadi `submitted`.
4. Pengawas menerima notifikasi untuk review.
5. Jika valid, Pengawas mengubah status menjadi `approved`.
6. Jika tidak valid, Pengawas mengubah status menjadi `rejected` disertai alasan.

### Alur B: Publikasi ke Konsumen
1. Admin meninjau foto yang sudah berstatus `approved`.
2. Admin memastikan foto layak secara estetika dan komunikasi untuk dilihat Konsumen.
3. Admin mengubah status menjadi `published` dan visibility menjadi `customer_visible`.
4. Konsumen mendapatkan notifikasi pembaruan dokumentasi proyek.

### Alur C: Penanganan Kendala / Insiden
1. Mandor/Pengawas mengunggah foto kendala lapangan.
2. Kategori diset sebagai `issue` atau `incident`.
3. Secara default, visibility adalah `internal_only`.
4. Admin/Pengawas merumuskan solusi sebelum mengomunikasikannya ke Konsumen (jika diperlukan).

## 9. Relasi dengan Alur Lain
*   **Laporan Harian Mandor**: Foto progress menjadi lampiran wajib laporan harian.
*   **Verifikasi Progres**: Foto yang `approved` menjadi basis data utama validasi persentase kemajuan fisik.
*   **Pembayaran Termin**: Dokumentasi yang dipublikasikan menjadi bukti pendukung bagi Konsumen sebelum melakukan pembayaran termin berikutnya.
*   **Notifikasi**: Memicu peringatan ke Pengawas (saat upload) dan ke Konsumen (saat publish).

## 10. Potensi Tabrakan / Catatan Penting
1.  **Akses Tanpa Filter**: Risiko Konsumen melihat foto pekerjaan berantakan atau bermasalah. *Solusi: Ketat pada status `published`.*
2.  **Pencampuran Kategori**: Risiko foto kendala muncul di galeri progress utama. *Solusi: Gunakan pemisahan kategori sistemik.*
3.  **Bocornya Data Internal**: Risiko RAB internal atau catatan margin terlihat Konsumen. *Solusi: Gunakan visibilitas `admin_only` secara default untuk dokumen teknis sensitif.*
4.  **Batas Wewenang**: Persetujuan foto bukan merupakan persetujuan biaya tambahan (*Change Order*).

## 11. Struktur Data Konseptual
Entitas `ProjectDocument` / `ProjectPhoto`:
*   `id`, `projectId`, `stageId`, `type`, `category`.
*   `uploadedById`, `uploadedByRole`.
*   `title`, `description`, `fileUrl`.
*   `status` (draft, submitted, approved, rejected, published, archived).
*   `visibility` (admin_only, internal_only, field_team, customer_visible).
*   `rejectionReason`, `verifiedAt`, `publishedAt`.

## 12. Catatan Implementasi Nanti
*   Gunakan kompresi gambar di sisi klien sebelum upload untuk efisiensi bandwidth lapangan.
*   Implementasikan sistem watermark otomatis "INTERNAL RKK" atau "OFFICIAL DOCUMENT" pada foto yang dipublikasikan.
*   Integrasikan dengan layanan cloud storage (S3/GCS) setelah model data dan alur verifikasi stabil.

---
**Keputusan Akhir: Dokumentasi proyek adalah Evidence, bukan sekadar Galeri.**
