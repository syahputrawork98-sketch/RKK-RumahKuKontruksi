# Alur Change Order / Perubahan RAB & Pekerjaan Tambahan

## 1. Tujuan Alur

Alur ini menjelaskan proses resmi ketika terjadi perubahan RAB, perubahan scope pekerjaan, pekerjaan tambahan, pekerjaan pengurangan, atau perubahan desain yang berdampak pada biaya, durasi, dokumen proyek, atau pelaksanaan lapangan.

Alur ini dibuat agar setiap perubahan tidak dilakukan secara sepihak oleh Mandor, Pengawas, Arsitek, Admin, maupun Konsumen tanpa proses resmi.

Prinsip utama:

> Tidak ada perubahan biaya, scope, desain, atau pekerjaan tambahan yang boleh berjalan hanya berdasarkan obrolan lapangan. Semua perubahan harus masuk sebagai Change Order resmi, direview secara teknis, dihitung oleh Admin, disetujui Konsumen, lalu baru dieksekusi.

---

## 2. Perbedaan Perubahan RAB dan Pekerjaan Tambahan

### 2.1 Perubahan RAB

Perubahan RAB adalah perubahan terhadap RAB yang sudah ada.

Contoh:

- Volume pekerjaan berubah.
- Harga item berubah.
- Item lama dikurangi atau dihapus.
- Spesifikasi material berubah.
- Ada koreksi estimasi awal.
- Ada penyesuaian karena kondisi lapangan berbeda.

Perubahan RAB tidak selalu berarti pekerjaan tambahan. Perubahan RAB bisa membuat nilai proyek naik, turun, atau hanya berubah secara struktur item.

### 2.2 Pekerjaan Tambahan

Pekerjaan tambahan adalah pekerjaan baru di luar scope awal proyek.

Contoh:

- Konsumen meminta tambahan pagar.
- Konsumen meminta tambahan kanopi.
- Konsumen meminta tambahan titik listrik.
- Konsumen meminta tambahan kamar mandi.
- Ada pekerjaan baru akibat perubahan desain.
- Ada pekerjaan tambahan akibat kondisi lapangan.

Pekerjaan tambahan hampir selalu berdampak ke RAB, biaya, durasi, material, jadwal, dan pembayaran.

Kesimpulan:

> Pekerjaan tambahan adalah salah satu penyebab perubahan RAB, tetapi perubahan RAB tidak selalu disebabkan oleh pekerjaan tambahan.

---

## 3. Aktor yang Terlibat

### 3.1 Mandor

Mandor dapat:

- Melaporkan kebutuhan perubahan dari lapangan.
- Mengusulkan pekerjaan tambahan berdasarkan kondisi aktual.
- Memberikan catatan, foto, dan alasan teknis awal.
- Menunggu instruksi resmi sebelum menjalankan pekerjaan tambahan.

Mandor tidak boleh:

- Mengubah RAB.
- Mengubah scope pekerjaan.
- Mengubah desain.
- Menyetujui biaya tambahan.
- Menjalankan pekerjaan tambahan tanpa approval resmi.

---

### 3.2 Pengawas

Pengawas dapat:

- Memeriksa kondisi lapangan.
- Memvalidasi apakah perubahan memang diperlukan.
- Memberikan rekomendasi teknis.
- Menolak pengajuan yang tidak valid secara teknis.
- Meneruskan pengajuan valid ke Admin.

Pengawas tidak boleh:

- Menyetujui biaya tambahan.
- Mengubah kontrak.
- Menjanjikan perubahan harga kepada Konsumen.
- Mengaktifkan pekerjaan tambahan tanpa approval Konsumen dan Admin.

---

### 3.3 Arsitek

Arsitek dilibatkan jika perubahan berdampak pada desain, gambar kerja, layout, struktur, estetika, atau utilitas.

Arsitek dapat:

- Mengevaluasi kelayakan perubahan desain.
- Memberikan catatan revisi desain.
- Menentukan apakah perubahan memerlukan gambar baru.
- Memberikan rekomendasi teknis desain.

Arsitek tidak boleh:

- Menyetujui Change Order secara final.
- Menentukan biaya tambahan.
- Menjanjikan durasi tambahan kepada Konsumen.
- Mengganti file final tanpa riwayat revisi.

---

### 3.4 Admin

Admin adalah pengendali administratif alur Change Order.

Admin dapat:

- Menerima Change Order Request.
- Mengklasifikasikan jenis perubahan.
- Menghitung dampak biaya.
- Menghitung dampak durasi.
- Menyusun revisi RAB.
- Menyusun dokumen Change Order.
- Mengirim permintaan approval ke Konsumen.
- Mengaktifkan Change Order setelah disetujui.
- Mengatur dampak ke invoice, termin, atau pembayaran.

Admin tidak boleh:

- Menghapus histori RAB lama.
- Mengubah RAB final tanpa versioning.
- Menjalankan perubahan tanpa approval yang sesuai.
- Mengabaikan review teknis jika perubahan berdampak ke lapangan atau desain.

---

### 3.5 Konsumen

Konsumen adalah pihak yang memberikan approval akhir untuk perubahan scope, biaya, durasi, dan pekerjaan tambahan.

Konsumen dapat:

- Mengajukan pekerjaan tambahan.
- Melihat detail dampak biaya dan durasi.
- Menyetujui Change Order.
- Menolak Change Order.
- Meminta revisi atau klarifikasi.

Konsumen tidak boleh:

- Meminta Mandor menjalankan pekerjaan tambahan langsung.
- Membayar biaya tambahan langsung ke personil lapangan.
- Mengubah scope tanpa proses resmi.

---

### 3.6 Superadmin

Superadmin tidak terlibat dalam alur normal.

Superadmin hanya masuk jika:

- Ada konflik data.
- Ada kesalahan approval.
- Ada data yang terkunci.
- Ada eskalasi serius.
- Ada kebutuhan audit sistem.

---

## 4. Trigger Alur

Alur Change Order dapat dimulai dari beberapa kondisi:

1. Konsumen meminta pekerjaan tambahan.
2. Mandor menemukan kebutuhan tambahan di lapangan.
3. Pengawas menemukan deviasi kondisi aktual.
4. Arsitek merekomendasikan perubahan desain.
5. Admin menemukan koreksi pada RAB atau dokumen proyek.
6. Ada perubahan material, spesifikasi, volume, atau metode kerja.
7. Ada pengurangan pekerjaan dari scope awal.

Setiap trigger harus dicatat sebagai Change Order Request.

### 4.1 Hubungan dengan Rekomendasi Teknis Pengawas
Rekomendasi teknis dari Pengawas tidak otomatis menjadi Change Order. Klasifikasi dampak rekomendasi:
- **No Cost Impact**: Dicatat sebagai catatan teknis, pekerjaan lanjut, **bukan** Change Order.
- **Possible Cost Impact**: Admin diberi notifikasi, review diperlukan, berpotensi menjadi Change Order.
- **Must Become Change Order**: Pekerjaan **dilarang** lanjut sebelum alur Change Order ini selesai disetujui.

---

## 5. Jenis Perubahan

### 5.1 Minor Technical Adjustment

Perubahan kecil yang tidak berdampak besar pada biaya, scope, desain, atau durasi.

Contoh:

- Penyesuaian kecil posisi item.
- Penyesuaian metode kerja lapangan.
- Koreksi teknis ringan.

Tetap harus dicatat, tetapi tidak selalu membutuhkan approval Konsumen jika tidak berdampak biaya atau scope.

---

### 5.2 RAB Revision

Perubahan yang memengaruhi RAB existing.

Contoh:

- Volume item berubah.
- Harga satuan berubah.
- Item dikoreksi.
- Item dikurangi.
- Spesifikasi berubah.

Wajib dihitung oleh Admin.

---

### 5.3 Additional Work

Pekerjaan baru di luar scope awal.

Contoh:

- Tambah pagar.
- Tambah ruangan.
- Tambah titik listrik.
- Tambah finishing.
- Tambah pekerjaan akibat permintaan Konsumen.

Wajib approval Konsumen sebelum dikerjakan.

---

### 5.4 Deduction Work

Pengurangan pekerjaan dari scope awal.

Contoh:

- Konsumen membatalkan item tertentu.
- Ada item yang tidak jadi dikerjakan.
- Ada pengurangan volume pekerjaan.

Wajib dihitung dampaknya ke nilai kontrak atau termin.

---

### 5.5 Design-impact Change

Perubahan yang berdampak ke desain.

Contoh:

- Perubahan denah.
- Perubahan tampak.
- Perubahan struktur.
- Perubahan utilitas.
- Perubahan fungsi ruang.
- Perubahan layout besar.

Wajib review Arsitek.

---

## 6. Alur Utama

### Tahap 1 — Permintaan Perubahan Dibuat

Pengajuan perubahan dapat dibuat oleh Konsumen, Mandor, Pengawas, Arsitek, atau Admin.

Data yang dicatat:

- Proyek terkait.
- Judul perubahan.
- Deskripsi perubahan.
- Alasan perubahan.
- Sumber pengajuan.
- Lokasi pekerjaan.
- Foto atau dokumen pendukung jika ada.
- Indikasi dampak biaya.
- Indikasi dampak durasi.
- Indikasi dampak desain.
- Item RAB terkait jika ada.

Status awal: `draft`

Setelah dikirim: `submitted`

### Tahap 2 — Review Pengawas

Pengawas memeriksa kondisi lapangan.

Pengawas menilai:
- Apakah perubahan valid secara teknis.
- Apakah perubahan memang diperlukan.
- Apakah perubahan masih sesuai scope awal.
- Apakah perubahan berdampak ke pekerjaan lapangan.
- Apakah perlu review Arsitek.
- Apakah perlu perhitungan Admin.

Kemungkinan status:
- `under_supervisor_review`
- `technically_validated`
- `need_revision`
- `rejected_by_supervisor`
- `need_architect_review`

Jika tidak valid, pengajuan ditolak dengan alasan.
Jika valid, pengajuan diteruskan ke tahap berikutnya.

### Tahap 3 — Review Arsitek Jika Berdampak Desain

Jika perubahan berdampak ke desain, sistem meneruskan ke Arsitek.

Arsitek menilai:
- Apakah perubahan desain layak.
- Apakah perlu gambar revisi.
- Apakah memengaruhi struktur.
- Apakah memengaruhi estetika.
- Apakah memengaruhi utilitas.
- Apakah perubahan dapat dikerjakan di lapangan.

Kemungkinan status:
- `under_architect_review`
- `architect_approved_technically`
- `design_revision_required`
- `rejected_by_architect`

Jika tidak berdampak desain, tahap ini dapat dilewati.

### Tahap 4 — Perhitungan Admin

Admin menghitung dampak administratif dan finansial.

Admin menghitung:
- Item RAB yang berubah.
- Item RAB baru.
- Item RAB yang dikurangi.
- Selisih biaya.
- Dampak ke total proyek.
- Dampak ke termin.
- Dampak ke invoice.
- Dampak ke durasi.
- Dampak ke jadwal proyek.
- Apakah pekerjaan boleh lanjut atau harus menunggu approval.

Kemungkinan status:
- `admin_estimating`
- `ready_for_customer_approval`
- `waiting_internal_approval`

### Tahap 5 — Approval Konsumen

Konsumen menerima detail Change Order.

Informasi yang ditampilkan ke Konsumen:
- Deskripsi perubahan.
- Alasan perubahan.
- Dampak biaya.
- Dampak durasi.
- Dampak desain jika ada.
- Dokumen atau foto pendukung.
- Rincian item RAB yang berubah.
- Konsekuensi jika disetujui.
- Konsekuensi jika ditolak.

Konsumen dapat:
- `approve`
- `reject`
- `request_revision`
- `request_clarification`

Kemungkinan status:
- `waiting_customer_approval`
- `approved_by_customer`
- `rejected_by_customer`
- `revision_requested_by_customer`

### Tahap 6 — Aktivasi Change Order

Jika Konsumen menyetujui, Admin mengaktifkan Change Order.

Dampaknya:
- Change Order menjadi resmi.
- RAB versi baru dibuat atau item tambahan dicatat.
- Total nilai proyek diperbarui jika diperlukan.
- Termin atau invoice diperbarui jika diperlukan.
- Durasi proyek diperbarui jika diperlukan.
- Pengawas mendapat instruksi resmi.
- Mandor mendapat instruksi resmi.
- Konsumen dapat melihat status Change Order.

Status:
- `approved`
- `activated`

### Tahap 7 — Eksekusi Lapangan

Setelah Change Order aktif, Mandor baru boleh menjalankan pekerjaan tambahan atau perubahan pekerjaan.

Alur eksekusi:
1. Admin mengaktifkan Change Order.
2. Pengawas menerima update scope.
3. Mandor menerima instruksi resmi.
4. Mandor mengerjakan pekerjaan.
5. Mandor mencatat progres.
6. Pengawas memverifikasi progres.
7. Konsumen melihat progres yang sudah diverifikasi.

Status:
- `in_progress`
- `completed_by_foreman`
- `verified_by_supervisor`

### Tahap 8 — Penutupan Change Order

Change Order ditutup setelah pekerjaan selesai dan diverifikasi.

Syarat penutupan:
- Pekerjaan sudah selesai.
- Pengawas sudah memverifikasi.
- Dampak RAB sudah tercatat.
- Dampak pembayaran sudah diproses.
- Dokumentasi sudah lengkap.
- Riwayat approval tersimpan.

Status akhir: `closed`

---

## 7. Status Lengkap

Status lengkap untuk Change Order:
- `draft`
- `submitted`
- `under_supervisor_review`
- `need_architect_review`
- `under_architect_review`
- `admin_estimating`
- `waiting_customer_approval`
- `revision_requested`
- `approved`
- `rejected`
- `activated`
- `in_progress`
- `completed`
- `verified`
- `closed`
- `cancelled`

Status ringkas untuk UI awal:
- `draft`
- `review`
- `estimating`
- `waiting_approval`
- `approved`
- `rejected`
- `active`
- `completed`
- `closed`

---

## 8. Dampak ke Modul Lain

### 8.1 Dampak ke RAB
RAB final tidak boleh diedit langsung tanpa histori.

Rekomendasi:
- RAB awal dikunci sebagai baseline.
- Setiap perubahan dicatat sebagai Change Order.
- Setelah disetujui, sistem dapat membuat versi RAB baru.
- Histori perubahan harus tetap tersimpan.

Contoh:
- RabPlan v1 = RAB awal / kontrak awal
- ChangeOrder 1 = tambahan pagar
- RabPlan v1.1 = RAB setelah tambahan pagar disetujui

### 8.2 Dampak ke Pembayaran Konsumen
Jika Change Order menambah biaya, maka dapat diproses dengan beberapa skema:
1. Dibayar langsung sebelum pekerjaan dimulai.
2. Ditambahkan ke termin berikutnya.
3. Dicatat sebagai invoice tambahan.
4. Dikurangi dari termin berikutnya jika terjadi pengurangan pekerjaan.

Perubahan invoice hanya boleh dilakukan setelah Change Order disetujui.

### 8.3 Dampak ke Material Request
Material Request tidak sama dengan Change Order. Material Request adalah permintaan material untuk pekerjaan yang sudah ada. Change Order adalah perubahan scope, RAB, desain, atau biaya.

Aturan:
- Jika material masih sesuai RAB, gunakan Material Request.
- Jika material di luar RAB atau mengubah spesifikasi, naikkan menjadi Change Order.

### 8.4 Dampak ke Laporan Harian
Mandor boleh mencatat temuan lapangan di laporan harian. Namun laporan harian tidak otomatis menjadi Change Order. Jika laporan harian menunjukkan kebutuhan perubahan scope, sistem/Admin/Pengawas dapat membuat Change Order Request dari laporan tersebut.

### 8.5 Dampak ke Desain
Jika perubahan menyentuh desain, gambar final tidak boleh ditimpa.

Aturan:
- File final tetap menjadi baseline.
- Revisi desain dibuat sebagai versi baru.
- Riwayat perubahan harus tersimpan.
- Arsitek wajib terlibat jika perubahan berdampak desain.

---

## 9. Potensi Tabrakan yang Harus Dicegah

### 9.1 Tabrakan dengan Material Request
Mandor mengajukan material tidak otomatis berarti RAB berubah. Jika material masih ada di RAB, proses tetap sebagai Material Request. Jika material tidak ada di RAB atau mengubah spesifikasi, proses harus naik menjadi Change Order.

### 9.2 Tabrakan dengan Pengajuan Pembayaran Mandor
Pengajuan pembayaran Mandor adalah biaya keluar atau operasional internal. Change Order adalah perubahan nilai kontrak atau scope pekerjaan. Mandor tidak boleh mengajukan pembayaran tambahan lalu sistem menganggap Konsumen sudah menyetujui pekerjaan tambahan.

### 9.3 Tabrakan dengan Pembayaran Konsumen
Pembayaran Konsumen berkaitan dengan invoice, termin, atau tagihan resmi. Change Order yang menambah nilai proyek harus disetujui dulu sebelum dibuatkan tagihan.

### 9.4 Tabrakan dengan Laporan Harian
Laporan harian hanya mencatat kondisi lapangan. Jika ada catatan pekerjaan tambahan, catatan itu harus diproses sebagai kandidat Change Order, bukan langsung dianggap pekerjaan resmi.

### 9.5 Tabrakan dengan Desain Final
Perubahan desain tidak boleh langsung mengganti file final. Setiap perubahan desain harus punya versi, catatan revisi, dan approval yang jelas.

---

## 10. Rekomendasi Struktur Data Awal
*Catatan: bagian ini hanya rekomendasi dokumentasi, bukan instruksi implementasi.*

### 10.1 ChangeOrder
- `id`
- `projectId`
- `requestCode`
- `requestType`
- `sourceRole`
- `sourceUserId`
- `title`
- `description`
- `reason`
- `priority`
- `impactScope`
- `impactCost`
- `impactDuration`
- `impactDesign`
- `status`
- `requestedAt`
- `reviewedBySupervisorId`
- `reviewedAt`
- `estimatedByAdminId`
- `estimatedAt`
- `approvedByCustomerId`
- `approvedAt`
- `activatedAt`
- `closedAt`
- `notes`

### 10.2 ChangeOrderItem
- `id`
- `changeOrderId`
- `rabPlanId`
- `rabCategoryId`
- `rabItemId`
- `actionType`
- `description`
- `oldVolume`
- `newVolume`
- `unit`
- `unitPrice`
- `oldTotal`
- `newTotal`
- `differenceAmount`
- `notes`

### 10.3 Action Type
- `add_item`
- `update_volume`
- `update_price`
- `remove_item`
- `change_specification`
- `change_design`
- `deduct_item`

---

## 11. Alur Ringkas
Permintaan perubahan muncul → Dicatat sebagai Change Order Request → Pengawas review kondisi lapangan → Jika berdampak desain, Arsitek review → Admin hitung dampak RAB, biaya, termin, dan durasi → Konsumen approve / reject / minta revisi → Jika approve, Admin aktifkan Change Order → RAB versi baru atau item tambahan dicatat → Invoice / termin disesuaikan jika perlu → Pengawas dan Mandor menerima instruksi resmi → Pekerjaan tambahan dijalankan → Progres diverifikasi → Change Order ditutup

---

## 12. Kesimpulan

Alur ini sebaiknya diposisikan sebagai alur resmi untuk semua perubahan scope, RAB, desain, biaya, durasi, pekerjaan tambah, dan pekerjaan kurang.

Nama alur yang digunakan: **Alur Change Order / Perubahan RAB & Pekerjaan Tambahan**

Prinsip akhirnya:
Semua perubahan proyek harus tercatat, tervalidasi, terhitung, disetujui, dan memiliki histori. Tidak boleh ada pekerjaan tambahan, perubahan RAB, perubahan desain, atau perubahan biaya yang berjalan tanpa proses resmi.
