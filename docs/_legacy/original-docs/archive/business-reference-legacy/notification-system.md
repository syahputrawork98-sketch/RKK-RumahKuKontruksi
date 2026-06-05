# Alur Notifikasi Sistem

## Status Dokumen
**Versi**: 1.0
**Status**: Planned - Dokumentasi Alur
**Jenis**: Alur Turunan / Cross-Role Workflow

*Catatan: Dokumen ini hanya menjelaskan alur bisnis dan sinkronisasi antar role. Dokumen ini bukan instruksi untuk membangun backend, frontend, database, realtime notification, email, push notification, atau permission production.*

## Tujuan
Alur notifikasi dibuat untuk:
*   Menjadi penghubung antar alur pembayaran, material, pembayaran Mandor, laporan harian, dan verifikasi.
*   Mengurangi risiko proses terlewat atau terbengkalai.
*   Memberi tahu role terkait secara proaktif ketika ada aksi penting yang membutuhkan perhatian.
*   Menjaga semua komunikasi penting tetap terdokumentasi dan memiliki jejak audit di sistem.
*   Mengarahkan pengguna secara langsung ke halaman/modul asal untuk melakukan tindakan (*Deep Linking*).
*   Membantu Admin, Pengawas, Mandor, Konsumen, Arsitek, dan Superadmin mendapatkan informasi yang relevan sesuai perannya tanpa harus mencari manual.

## Definisi Notifikasi
Notifikasi adalah pemberitahuan sistem kepada pengguna atau role tertentu akibat adanya event penting di dalam proses operasional RKK.

**Notifikasi BUKAN:**
*   Pengganti tombol *approval*.
*   Tugas utama itu sendiri (tugas tetap ada di modul asal).
*   Status utama dari modul asal (misal: status pembayaran tetap dikelola oleh modul Finance).
*   Dokumen hukum atau kontrak.
*   Laporan harian itu sendiri.

Notifikasi hanyalah **pintu masuk** atau **pemicu** untuk membuka detail proses terkait di modul asalnya.

## Aktor yang Terlibat

### Admin
Menerima notifikasi terkait aspek administratif dan finansial tingkat proyek, seperti tagihan konsumen, pembayaran masuk, pengajuan material/mandor yang sudah siap bayar, dan eskalasi keterlambatan.

### Superadmin
Menerima notifikasi eskalasi tingkat sistemik, indikasi pelanggaran alur, audit, konflik data global, atau kondisi proyek yang macet (*stuck*) dalam waktu lama.

### Pengawas
Menerima notifikasi operasional lapangan yang membutuhkan verifikasi teknis, seperti jurnal mandor baru, permintaan material baru, kendala fisik, atau revisi laporan.

### Mandor
Menerima notifikasi mengenai status pengajuan (diterima/ditolak), instruksi resmi dari Pengawas, dan pengingat jadwal laporan/pengajuan.

### Konsumen
Menerima notifikasi resmi terkait kemajuan proyek (yang sudah diverifikasi), tagihan pembayaran, dan dokumen final. Konsumen **tidak** menerima notifikasi operasional internal RKK.

### Arsitek
Menerima notifikasi terkait siklus desain, permintaan revisi dari konsumen, evaluasi teknis lapangan, atau *Change Order* yang berdampak pada desain.

## Prinsip Dasar
1.  **Event-based**: Notifikasi hanya muncul karena adanya aksi atau perubahan data yang nyata di sistem.
2.  **Role-based & Context-aware**: Penerima ditentukan secara otomatis berdasarkan peran dan keterkaitannya dengan proyek spesifik.
3.  **Tidak Menggantikan Approval**: Persetujuan tetap dilakukan di modul asal (misal: tombol Approve Material tetap di halaman Material Request).
4.  **Tidak Menggantikan Status**: Status data (misal: `Paid`, `Pending`) dikelola oleh modul asal, bukan oleh sistem notifikasi.
5.  **Filter Konsumen**: Konsumen hanya melihat informasi yang sudah sah dan layak dipublikasikan.
6.  **Admin sebagai Filter Finansial**: Admin menerima data lapangan yang sudah difilter/diverifikasi oleh Pengawas.
7.  **Traceability**: Setiap notifikasi harus merujuk pada `sourceType` (Modul) dan `sourceId` (Data ID) yang jelas.
8.  **No New Features**: Dokumen ini tidak memerintahkan pembangunan fitur teknis baru pada fase ini.

## Jenis/Kategori Notifikasi
*   `project_progress`: Update kemajuan fisik proyek.
*   `payment_customer`: Tagihan, pengingat, dan konfirmasi pembayaran konsumen.
*   `material_request`: Siklus permintaan logistik mandor.
*   `foreman_payment_request`: Siklus pengajuan upah/pembayaran mandor.
*   `daily_report` / `weekly_journal`: Aktivitas laporan berkala mandor.
*   `verification` / `approval`: Permintaan tindakan persetujuan.
*   `rejection` / `revision`: Pemberitahuan penolakan atau permintaan perbaikan.
*   `design`: Siklus pekerjaan arsitek.
*   `change_order`: Perubahan lingkup pekerjaan.
*   `escalation`: Masalah kritis yang butuh campur tangan manajemen.

## Prioritas Notifikasi
*   **Low**: Informasi umum (misal: Update foto progress rutin).
*   **Normal**: Tugas rutin (misal: Jurnal mingguan baru dikirim).
*   **High**: Perlu tindakan cepat (misal: Material request mendesak, Laporan ditolak).
*   **Urgent**: Kritis (misal: Keterlambatan pembayaran termin, Kendala lapangan berat, Eskalasi sistem).

## Status Notifikasi
1.  **Unread**: Belum dibuka oleh penerima.
2.  **Read**: Sudah dibuka.
3.  **Archived**: Disimpan/disembunyikan dari daftar aktif.
4.  **Action Required**: Menandakan notifikasi ini butuh tindakan di modul asal.
5.  **Resolved**: Tindakan di modul asal sudah selesai dilakukan.

## Struktur Data Konseptual
*   `notificationId`
*   `recipientUserId` / `recipientRole`
*   `projectId`
*   `sourceType` (Nama Modul)
*   `sourceId` (ID Data Terkait)
*   `eventType` (Jenis Aksi)
*   `title` & `message`
*   `priority`
*   `status`
*   `linkTarget` (URL tujuan)
*   `createdAt`
*   `readAt`
*   `resolvedAt`

## Alur Umum Notifikasi
Aksi di Modul (misal: Mandor Submit Material)
↓
Sistem mendeteksi Event dan menentukan Penerima (Pengawas Proyek X)
↓
Sistem membuat data Notifikasi
↓
Penerima melihat notifikasi di Dashboard/Pusat Notifikasi
↓
Penerima klik notifikasi dan diarahkan ke Modul Asal (*Link Target*)
↓
Penerima melakukan aksi di Modul Asal (misal: Klik Approve)
↓
Status notifikasi diperbarui menjadi *Resolved* (Opsional)

## Sinkronisasi dengan Alur Lain

### 1. Pembayaran Konsumen (`payment-customer.md`)
*   **Event**: Tagihan dibuat, Bukti bayar diunggah, Pembayaran diverifikasi, Terlambat bayar.
*   **Alur**: Admin buat tagihan -> Konsumen dapat notifikasi -> Konsumen bayar -> Admin dapat notifikasi verifikasi -> Konsumen dapat notifikasi sukses.

### 2. Pengajuan Material Mandor (`material-request.md`)
*   **Event**: Mandor submit, Pengawas Approve/Revisi, Admin proses pembelian.
*   **Alur**: Mandor submit -> Pengawas dapat notifikasi -> Pengawas Approve -> Admin dapat notifikasi belanja -> Mandor dapat notifikasi barang dikirim.

### 3. Pengajuan Pembayaran Mandor (`payment-foreman.md`)
*   **Event**: Mandor submit, Pengawas verifikasi lapangan, Admin validasi keuangan.
*   **Alur**: Mandor submit -> Pengawas dapat notifikasi cek lapangan -> Pengawas Approve -> Admin dapat notifikasi proses transfer -> Mandor dapat notifikasi bayar.

### 4. Jurnal Mingguan Mandor (`jurnal-mingguan-mandor.md`)
*   **Event**: Entry baru, Submit akhir minggu, Review pengawas.
*   **Alur**: Mandor submit jurnal -> Pengawas dapat notifikasi review -> Pengawas Approve -> Admin dapat notifikasi ringkasan progress.

### 5. Verifikasi Pengawas (`pengawas.md`)
*   **Event**: Item menunggu verifikasi, Penolakan, Temuan deviasi.
*   **Alur**: Pengawas temukan deviasi -> Admin dapat notifikasi kendala -> Mandor dapat notifikasi instruksi perbaikan.

## Matrix Event dan Penerima (Ringkasan)

| Event | Modul | Penerima Utama | Konsumen Lihat? | Prioritas |
| :--- | :--- | :--- | :--- | :--- |
| `customer_invoice_created` | Payment | Konsumen | **Ya** | High |
| `customer_payment_verified` | Payment | Konsumen, Admin | **Ya** | High |
| `material_request_submitted` | Material | Pengawas | Tidak | Normal |
| `material_request_approved` | Material | Admin, Mandor | Tidak | Normal |
| `foreman_payment_submitted` | Foreman Pay | Pengawas | Tidak | High |
| `daily_report_rejected` | Journal | Mandor | Tidak | High |
| `project_progress_verified` | Project | Konsumen, Admin | **Ya** | Normal |
| `system_escalation_created` | Global | Superadmin | Tidak | Urgent |

## Aturan Khusus Role

### Aturan Konsumen
Hanya menerima informasi yang sudah diverifikasi, berkaitan langsung dengan hak/kewajiban mereka (uang & progres), dan tidak mengandung detail operasional internal (margin, konflik vendor, gaji mandor).

### Aturan Admin
Menerima notifikasi administratif yang sudah "matang" (siap bayar/siap proses). Admin tidak dibanjiri data mentah dari setiap aktivitas tukang di lapangan.

### Aturan Pengawas
Bertindak sebagai filter pertama. Menerima segala aktivitas teknis lapangan yang butuh validasi segera.

### Aturan Mandor
Menerima umpan balik langsung atas pengajuan dan laporan mereka, serta instruksi teknis yang sah dari sistem.

### Aturan Arsitek
Hanya fokus pada siklus desain dan perubahan teknis (*Change Order*) yang membutuhkan tinjauan estetika/struktur.

### Aturan Superadmin
Hanya menerima "Sinyal Bahaya" atau eskalasi yang gagal diselesaikan di level Admin.

## Potensi Tabrakan yang Harus Dihindari
1.  **Privasi Leak**: Notifikasi internal (misal: "Upah Mandor Ditolak") terkirim ke Konsumen. *Pencegahan: Strict role-based routing.*
2.  **Notification Fatigue**: Admin menerima notifikasi untuk setiap foto yang diupload Mandor. *Pencegahan: Hanya notifikasi pada status Submit/Final.*
3.  **Bypass Authority**: Notifikasi memberikan link aksi ke role yang tidak berhak. *Pencegahan: UI/Backend tetap melakukan pengecekan role di link target.*
4.  **Desinkronisasi Status**: Notifikasi bilang "Sudah Dibayar" padahal status di modul Payment masih "Pending". *Pencegahan: Notifikasi harus selalu fetch data terbaru dari source.*

## Status Implementasi Saat Ini
*   Alur Notifikasi Sistem: **Planned**
*   Backend & Database Notifikasi: **Do Not Build Yet**
*   UI Notification Center/Bell: **Do Not Build Yet**
*   Email/Push/Realtime Service: **Do Not Build Yet**

## Catatan untuk Developer / AI Assistant
*   Gunakan dokumen ini sebagai panduan alur produk.
*   Jangan membangun infrastruktur notifikasi sebelum alur-alur utama (Payment, Material, Journal) stabil secara CRUD.
*   Penerapan notifikasi harus dianggap sebagai "Notification Layer", bukan sumber kebenaran data utama.
