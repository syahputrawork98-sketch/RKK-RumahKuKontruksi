# RAB-Based Construction Workflow & Payment Model

## 1. Tujuan Dokumen
Menjelaskan arah fundamental RKK untuk fase konstruksi/lapangan sebelum implementasi Batch 4–6, memastikan integrasi yang kuat antara struktur biaya (RAB) dan eksekusi lapangan rill dalam fase **Local Development CRUD Integration**.

## 2. Prinsip Utama
- **RAB as Work Structure**: RAB bukan sekadar daftar biaya, melainkan struktur hierarki pekerjaan proyek (WBS - Work Breakdown Structure).
- **Hierarchical Alignment**: Kategori pekerjaan (Parent) dan Item pekerjaan (Child) menjadi dasar seluruh modul operasional.
- **RAB-Centric Integration**: Timeline, laporan Mandor, verifikasi Pengawas, update visibilitas Konsumen, dan penentuan kelayakan pembayaran Mandor wajib mengacu pada item/kategori RAB yang valid.

## 3. Struktur Ideal Alur Kerja
Alur data dan keputusan dalam sistem RKK mengikuti rantai berikut:
1. **RAB** (Baseline biaya dan struktur kerja).
2. **Kategori Pekerjaan** (Pengelompokan tahapan besar).
3. **Item Pekerjaan** (Unit kerja terkecil yang dilaporkan).
4. **Laporan Mandor** (Klaim progres dan aktivitas lapangan rill).
5. **Verifikasi Pengawas** (Validasi teknis dan kualitas fisik lapangan).
6. **Keputusan Admin/RKK** (Persetujuan administratif dan publikasi).
7. **Timeline Konsumen** (Transparansi progres terverifikasi).
8. **Dasar Pembayaran Mandor** (Kelayakan pembayaran berdasarkan hasil verifikasi).

## 4. Rantai Peran Konstruksi (Construction Role Chain)
- **Konsumen**: Memberi arahan, umpan balik desain/lapangan, dan memilih skema pembayaran yang disediakan oleh Admin.
- **Admin/RKK**: Pengelola pusat proyek, pengatur skema pembayaran, penentu publikasi update, dan pengambil keputusan operasional/keuangan proyek.
- **Pengawas (Supervisor)**: Verifikator kualitas fisik per item pekerjaan dan pemberi arahan teknis atau koreksi di lapangan.
- **Mandor (Foreman)**: Pelapor progres aktual, pengelola aktivitas harian, dan pengatur eksekusi lapangan (mengatur tukang/kenek).
- **Pekerja (Tukang)**: Di bawah koordinasi langsung Mandor; belum memerlukan akun sistem dalam fase ini.

## 5. Model Pembayaran Konsumen (Customer Payment Model)
Konsumen melakukan pembayaran kepada **RKK (Admin)**, bukan langsung kepada Mandor di lapangan.

**Opsi Skema Pembayaran Lokal:**
- **A. Per Progress**: Pembayaran berdasarkan milestone persentase (Contoh: 30% Awal, 30% Tengah, 30% Akhir, 10% Retensi).
- **B. Per Kategori Pekerjaan**: Pembayaran berdasarkan penyelesaian kategori pekerjaan besar (Contoh: Pekerjaan Persiapan, Pondasi, Struktur, Atap, Finishing).

**Catatan Pembayaran Konsumen:**
- Skema dipilih dan diatur oleh Admin atau Superadmin secara lokal di dalam sistem.
- Bersifat **Local Billing Plan**; tidak melibatkan payment gateway rill, invoice legal, atau escrow production.
- Belum ada fitur upload bukti bayar resmi atau integrasi perbankan.

## 6. Model Pembayaran Mandor (Mandor Payment Model)
RKK melakukan pembayaran kepada Mandor berdasarkan validitas pekerjaan aktual yang dilaporkan dan diverifikasi.

**Dasar Kelayakan Pembayaran (Weekly Payment Eligibility):**
- Realisasi pekerjaan aktual mingguan.
- Item RAB rill yang dikerjakan dan dilaporkan dalam jurnal.
- Laporan Mandor yang telah disetujui secara administratif.
- Verifikasi fisik/kualitas oleh Pengawas assigned.
- Persetujuan akhir (Approval) dari Admin/RKK untuk pencairan dana lokal.

**Catatan Pembayaran Mandor:**
- **Initial Capital**: Mandor dapat memodal tenaga/alat di awal proyek (Minggu 1-2) sesuai kesepakatan lokal.
- **Independent Flow**: Pembayaran Mandor tidak harus mengikuti jadwal pembayaran Konsumen secara kaku (tergantung likuiditas operasional RKK).
- Bersifat **Weekly Payment Eligibility**; bukan payroll otomatis, penggajian karyawan rill, atau integrasi disbursement bank.

## 7. Progress Source of Truth (SOT)
- **`Project.verifiedProgress`** tetap satu-satunya indikator progres resmi sistem.
- Progres resmi wajib berasal dari input manual **Pengawas** setelah verifikasi fisik di lapangan.
- Klaim Mandor (`claimedProgress`) bersifat administratif dan tidak mengubah progres resmi secara otomatis.
- Flow pembayaran Mandor dapat menggunakan data pekerjaan terverifikasi, namun tidak boleh secara otomatis mengubah status progres resmi tanpa alur verifikasi fisik yang sah.

## 8. Arah Timeline Konsumen (RAB-Based Timeline)
Timeline di sisi Konsumen harus mencerminkan data teknis RAB yang mudah dipahami:
- Menampilkan periode waktu (Minggu/Hari).
- Menginformasikan **Kategori Pekerjaan** yang sedang dikerjakan.
- Merinci **Item RAB** rill yang sedang aktif atau selesai.
- Menampilkan ringkasan laporan Mandor dan catatan review Pengawas yang sudah dipublish.
- Menyertakan catatan administratif Admin jika diperlukan.
- Berbasis **HTTP CRUD** (Non-realtime) dengan kendali visibilitas (`isVisibleToCustomer`).

## 9. Roadmap Pengembangan Batch 4–6

### Batch 4: RAB Tree & Work Item Execution Mapping
- Perapihan struktur hierarki Kategori -> Item RAB dalam UI dan data fetching.
- Memastikan Item RAB menjadi baseline utama dalam pembuatan laporan Mandor dan tampilan timeline.
- Implementasi visualisasi RAB Tree untuk memudahkan monitoring cakupan pekerjaan.

### Batch 5: Customer Payment Plan Setup
- Fitur bagi Admin/Superadmin untuk memilih skema pembayaran Konsumen (Per Progress atau Per Kategori).
- Implementasi status tagihan lokal (Local Billing Plan Only) untuk simulasi administrasi keuangan.
- Tidak ada integrasi payment gateway atau sistem escrow rill.

### Batch 6: Mandor Weekly Payment Eligibility
- Sistem kelayakan pembayaran mingguan Mandor berbasis pekerjaan aktual rill yang sudah diverifikasi Pengawas.
- Dashboard monitoring kelayakan pembayaran lokal untuk Admin RKK.

## 10. Roadmap Lanjutan Batch 7–9: Design & Architect Foundation
- Alur instruksi desain: Konsumen -> Admin -> Arsitek.
- Manajemen masukan desain dari Konsumen yang dikelola oleh Admin sebelum diteruskan ke Arsitek.
- Arsitek Workspace untuk pengerjaan teknis desain dan RAB awal.
- Tetap bersifat **Local Development Workflow** (Bukan kontrak/tender legal production).

## 11. Batasan Tidak Boleh (Guards)
- Jangan klaim sistem ini sebagai **Production-ready**.
- Jangan membuka akses **Auth/JWT/Session/RBAC production**.
- Jangan mengimplementasikan **Payment Gateway** atau integrasi bank rill.
- Jangan membuat **Invoice Legal** atau dokumen hukum otomatis.
- Jangan menggunakan **Escrow** sistem rill.
- Jangan mengaktifkan **Upload Dokumen/File production** (Gunakan mock/simulasi).
- Jangan menggunakan **WebSocket atau Realtime Chat** (Gunakan HTTP CRUD).
- Jangan mengubah aturan fundamental **Progress SOT**.

---
*Dokumen ini merupakan panduan arah produk RKK untuk memastikan konsistensi antara perencanaan biaya dan eksekusi lapangan.*
