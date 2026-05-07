# 07 - Alur Approval, Rejection, dan Revisi

## 1. Tujuan
Alur ini dirancang sebagai mekanisme standar untuk proses persetujuan (approval), penolakan (rejection), dan permintaan perbaikan (revision) lintas modul dalam sistem RumahKu Konstruksi (RKK). Tujuan utamanya adalah menciptakan pola interaksi yang konsisten antara pembuat pengajuan (*requester*) dan peninjau (*reviewer*), memastikan integritas data, serta menyediakan jejak audit yang transparan.

## 2. Latar Belakang
Setiap peran (role) dalam RKK memiliki alur kerja masing-masing, namun banyak proses operasional yang melibatkan interaksi lintas peran yang berulang. Memasukkan detail mekanisme *approval* ke dalam setiap dokumen alur per role akan menyebabkan redundansi dan kompleksitas yang tinggi. Oleh karena itu, alur ini ditarik menjadi dokumen turunan standar agar dapat diacu oleh berbagai modul sistem.

## 3. Modul yang Menggunakan Alur Ini
Modul-modul berikut (namun tidak terbatas pada) diwajibkan mengikuti standar alur ini:
*   Pengajuan material oleh Mandor.
*   Pengajuan pembayaran oleh Mandor.
*   Jurnal mingguan Mandor.
*   Verifikasi progres pekerjaan lapangan.
*   Persetujuan dokumen atau foto proyek.
*   Perubahan RAB (*Change Order*).
*   Validasi tagihan atau pembayaran Konsumen.
*   Revisi desain oleh Arsitek.

## 4. Konsep Utama
Sistem RKK tidak hanya mengenal keputusan biner (Ya/Tidak), melainkan memiliki tiga keputusan utama:
1.  **Approve (Setujui)**: Data dinyatakan valid, memenuhi syarat, dan proses dapat berlanjut ke tahap berikutnya.
2.  **Reject (Tolak)**: Pengajuan dinyatakan tidak valid secara fundamental dan dihentikan secara final.
3.  **Request Revision (Minta Revisi)**: Pengajuan belum layak disetujui karena kekurangan informasi atau kesalahan minor, namun masih dapat diperbaiki tanpa harus membuat pengajuan baru dari nol.

## 5. Status Umum
Berikut adalah daftar status standar yang direkomendasikan untuk digunakan dalam modul-modul terkait:

| Status | Deskripsi |
| :--- | :--- |
| **draft** | Data masih disiapkan oleh pembuat, belum dikirim ke reviewer. |
| **submitted** | Data sudah dikirim dan terkunci dari perubahan bebas. |
| **under_review** | Sedang dalam proses pemeriksaan oleh reviewer. |
| **revision_requested** | Reviewer meminta perbaikan/penambahan data. |
| **revised** | Data telah diperbaiki oleh pembuat. |
| **resubmitted** | Data yang telah direvisi dikirim ulang ke reviewer. |
| **approved** | Pengajuan telah disetujui (baik di level tertentu maupun final). |
| **rejected** | Pengajuan ditolak secara final. |
| **cancelled** | Pengajuan dibatalkan oleh pembuat sebelum diproses. |

## 6. Alur Normal
1.  **Pembuat** mengisi data dan menyimpan sebagai `draft`.
2.  **Pembuat** melakukan `submit` pengajuan.
3.  Sistem mengubah status menjadi `submitted` dan **mengunci data** agar tidak bisa diubah secara sepihak.
4.  **Reviewer** menerima notifikasi pengajuan baru.
5.  **Reviewer** memeriksa detail pengajuan.
6.  **Reviewer** memberikan keputusan: *Approve*, *Reject*, atau *Request Revision*.
7.  Setiap aksi dan perubahan status dicatat secara otomatis ke dalam **Approval Log**.

## 7. Alur Approve
Terjadi ketika reviewer menyatakan data sudah sesuai dengan standar dan kondisi lapangan.
*   Reviewer dapat memberikan catatan tambahan (opsional).
*   Sistem mencatat identitas aktor dan stempel waktu (*timestamp*).
*   Sistem mengirimkan notifikasi kepada pembuat.
*   Jika modul memiliki *Multi-Level Approval*, status berubah menjadi `approved_by_[role]` dan berlanjut ke reviewer berikutnya.
*   Jika merupakan tahap akhir, status menjadi `approved` atau `final_approved`.

**Contoh**: Mandor Submit -> Pengawas Approve -> Admin Review -> Admin Approve (Final).

## 8. Alur Reject
Terjadi ketika pengajuan dianggap tidak valid, menyalahi aturan, atau salah sasaran secara fundamental.
*   **Alasan penolakan WAJIB diisi**.
*   Status `rejected` adalah status **FINAL**. Data tidak boleh diedit atau dikirim ulang.
*   Jika ingin mengajukan kembali, pembuat harus membuat data baru (atau menggunakan fitur *Duplicate* jika tersedia).
*   Sistem mencatat aktor, waktu, dan alasan penolakan secara permanen.

**Contoh Kasus Reject**: Pengajuan di luar scope proyek, nominal fiktif, atau dokumen yang tertukar dengan proyek lain.

## 9. Alur Request Revision / Minta Revisi
Terjadi jika pengajuan memiliki kesalahan yang masih bisa diperbaiki atau kekurangan lampiran.
*   Reviewer **WAJIB** mengisi catatan revisi yang spesifik.
*   Pembuat menerima notifikasi perbaikan.
*   Pembuat membuka kembali data (status `revision_requested`), melakukan perbaikan, dan mengirim ulang.
*   Sistem mencatat jumlah revisi (*revision_count*) atau versi dokumen.
*   Reviewer melakukan pengecekan ulang pada data yang sudah diperbaiki.

**Contoh Kasus Revisi**: Foto bukti kurang jelas, deskripsi pekerjaan terlalu singkat, atau lampiran file tertinggal.

## 10. Multi-Level Approval
Beberapa modul kritikal membutuhkan persetujuan dari lebih dari satu aktor. Rekomendasi urutan status:
1.  `waiting_supervisor_approval`
2.  `approved_by_supervisor`
3.  `waiting_admin_approval`
4.  `approved_by_admin` / `final_approved`

*Catatan: Persetujuan oleh Pengawas di lapangan tidak otomatis menjadi persetujuan biaya/finansial di tingkat Admin.*

## 11. Hak Akses dan Batasan Role

### Pembuat Pengajuan (*Requester*)
*   **Boleh**: Membuat/Edit draf, mengirim pengajuan, melihat status real-time, membaca alasan revisi/reject, kirim ulang revisi.
*   **Tidak Boleh**: Approve pengajuan sendiri, edit data status `submitted` tanpa alur revisi, menghapus data yang sudah masuk tahap review.

### Peninjau (*Reviewer*)
*   **Boleh**: Melihat detail pengajuan, Approve, Reject, Minta Revisi, memberi catatan audit, melihat riwayat revisi.
*   **Tidak Boleh**: Mengubah isi data pengajuan utama (hanya boleh memberi catatan), menghapus pengajuan, approve pengajuan sendiri.

### Admin (Otoritas Tinggi)
*   Memiliki hak sebagai reviewer akhir.
*   Dapat melakukan **Override** dalam kondisi darurat dengan kewajiban mengisi alasan yang terekam dalam log audit.

## 12. Approval Log / Audit Trail
Sistem wajib menyimpan riwayat setiap tindakan untuk transparansi dan kebutuhan audit di masa depan.
Data minimal dalam log:
*   `action`: (Submit, Approve, Reject, Request Revision, Override)
*   `actor_id` & `actor_role`
*   `note`: Catatan/Alasan dari aktor.
*   `old_status` & `new_status`
*   `created_at`: Waktu kejadian.

## 13. Rekomendasi Struktur Data Konseptual

### approval_requests (Header)
*   `id`, `module_type` (misal: 'material_request'), `module_id`
*   `requested_by`, `status`, `revision_count`
*   `created_at`, `updated_at`, `final_decision_at`

### approval_logs (Detail)
*   `id`, `approval_request_id`
*   `actor_id`, `actor_role`, `action`, `note`
*   `from_status`, `to_status`, `created_at`

## 14. Relasi dengan Notifikasi
Setiap transisi status penting wajib memicu notifikasi:
*   **Submit** -> Notifikasi ke Reviewer.
*   **Approve** -> Notifikasi ke Pembuat (dan Reviewer level atas).
*   **Request Revision / Reject** -> Notifikasi ke Pembuat.
*   **Resubmit** -> Notifikasi ke Reviewer.

## 15. Potensi Tabrakan yang Harus Dihindari
1.  **Pemisahan Reject & Revision**: Jangan gunakan Reject jika maksudnya adalah meminta perbaikan data.
2.  **Penerimaan Parsial**: Approval oleh level bawah (Pengawas) bukan merupakan keputusan final finansial (Admin).
3.  **Integritas Data**: Data historis (sebelum revisi) sebaiknya tetap tersimpan atau dapat dilacak untuk perbandingan.
4.  **Looping Revisi**: Batasi atau beri peringatan jika sebuah pengajuan mengalami revisi berulang kali (indikasi inefisiensi).

## 16. Rekomendasi Label UI
Agar tidak membingungkan pengguna, gunakan label bahasa manusia:
*   `submitted` -> **Dikirim**
*   `under_review` -> **Sedang Diperiksa**
*   `revision_requested` -> **Perlu Revisi**
*   `resubmitted` -> **Dikirim Ulang**
*   `approved` -> **Disetujui**
*   `rejected` -> **Ditolak**
*   `final_approved` -> **Selesai / Disetujui Final**

## 17. Kesimpulan
Alur *Approval, Rejection, dan Revisi* adalah tulang punggung akuntabilitas sistem RKK. Dengan menerapkan pola standar ini di seluruh modul, sistem akan menjadi lebih konsisten, mudah diaudit, dan memberikan kepastian kerja bagi setiap peran yang terlibat.
