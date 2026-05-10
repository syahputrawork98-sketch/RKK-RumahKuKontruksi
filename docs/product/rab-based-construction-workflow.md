# RAB-Based Construction Workflow, Timeline, Visibility, and Payment Model

## 1. Tujuan Dokumen
Menjelaskan arah fundamental RKK untuk fase konstruksi/lapangan sebelum implementasi Batch 4–6, memastikan integrasi yang kuat antara struktur biaya (RAB), eksekusi lapangan, transparansi konsumen, dan model pembayaran dalam fase **Local Development CRUD Integration**.

## 2. Prinsip Utama
- **RAB as Work Structure**: RAB bukan sekadar daftar biaya, melainkan struktur hierarki pekerjaan proyek (Work Breakdown Structure).
- **Hierarchical Alignment**: Kategori pekerjaan (Parent) dan Item pekerjaan (Child) menjadi dasar seluruh modul operasional.
- **RAB-Centric Integration**: Timeline, laporan Mandor, review Pengawas, visibility Konsumen, dan pembayaran wajib mengacu ke kategori/item RAB.
- **Progress Source of Truth**: Progres resmi tetap mengikuti `Project.verifiedProgress` yang diperbarui secara manual oleh Pengawas assigned.

## 3. Struktur RAB Ideal
Berikut adalah contoh kategori pekerjaan standar yang akan digunakan sebagai referensi dalam sistem:
- Pekerjaan Persiapan
- Pekerjaan Tanah dan Pondasi
- Pekerjaan Struktur Beton
- Pekerjaan Dinding
- Pekerjaan Atap
- Pekerjaan Plafon
- Pekerjaan Lantai
- Pekerjaan Kusen, Pintu, dan Jendela
- Pekerjaan Plumbing dan Sanitasi
- Pekerjaan Listrik
- Pekerjaan Finishing
- Biaya Lain-lain

## 4. Timeline Pelaksanaan Ideal (RAB-Based)
Timeline Konsumen harus berbasis minggu/periode dan mengacu secara eksplisit ke data RAB. Setiap entry timeline idealnya memiliki:
- **Periode**: Minggu ke-N atau Rentang Tanggal.
- **Kategori Tersentuh**: Daftar kategori pekerjaan yang aktif pada periode tersebut.
- **Item RAB Dikerjakan**: Rincian item spesifik yang sedang diproses.
- **Ringkasan Laporan Mandor**: Klaim progres dan aktivitas dari lapangan.
- **Review Pengawas**: Catatan kualitas dan instruksi dari verifikator.
- **Catatan Admin**: Pesan resmi dari manajemen RKK jika ada.
- **Status Visibility**:
    - `internal-only`: Hanya untuk tim lapangan (Mandor, Pengawas, Admin).
    - `customer-visible`: Ditampilkan di timeline konsumen.
    - `customer-visible-summary`: Hanya ringkasan yang ditampilkan.
    - `hold-for-review`: Menunggu keputusan Admin untuk dipublish.

## 5. Customer Timeline UI Concept (Two-Panel Layout)
UI Konsumen dirancang untuk memberikan konteks pekerjaan yang jelas melalui dua panel:

### Panel Kiri: RAB Tree / Struktur Pekerjaan
- Menampilkan hierarki **Kategori -> Item Pekerjaan**.
- **Status Item**: Belum mulai, sedang berjalan, selesai sebagian, selesai/verified.
- **Indicator**: Menandai item mana yang memiliki update terbaru yang bisa dilihat (customer-visible).

### Panel Kanan: Timeline Pelaksanaan
- Menampilkan urutan logis per **Minggu/Periode**.
- Ringkasan update terbaru.
- Detail laporan Mandor dan review Pengawas yang sudah lolos kurasi.
- **Interaktivitas**: Saat kategori/item/minggu diklik, panel akan membuka detail mendalam termasuk bukti fisik (evidence) jika tersedia.

## 6. Curated Project Transparency
Transparansi RKK mengedepankan data yang terkurasi, bukan sekadar menampilkan semua catatan internal mentah:
- **Internal Evidence**: Tetap disimpan lengkap di database untuk kebutuhan audit dan dispute resolution.
- **Visibility Gatekeeper**: Admin/RKK memiliki kendali penuh (Gatekeeper) untuk memilih data mana yang layak ditampilkan ke Konsumen.
- **Curated Feed**: Catatan teknis antara Mandor-Pengawas tidak harus langsung tampil ke Konsumen jika bersifat instruksi teknis internal.
- **Dispute Resolution**: Jika terjadi perselisihan, RKK memiliki bukti internal (Log Mandor, Review Pengawas, Keputusan Admin) yang solid.

## 7. Rantai Peran Konstruksi (Construction Role Chain)
- **Konsumen**: Memberi arahan, feedback, approval, dan menyetujui skema pembayaran.
- **Admin/RKK**: Mengatur proyek, skema pembayaran, publikasi update, keputusan operasional, dan visibility gatekeeping.
- **Pengawas (Supervisor)**: Memverifikasi item pekerjaan secara fisik dan memberi arahan teknis lapangan.
- **Mandor (Foreman)**: Melaporkan pekerjaan aktual dan mengatur eksekusi lapangan (tukang/tenaga).
- **Pekerja (Tukang)**: Di bawah koordinasi Mandor; belum memerlukan akun sistem dalam fase ini.

## 8. Model Pembayaran Konsumen (Customer Payment Model)
Konsumen melakukan pembayaran kepada **RKK (Admin)**, bukan langsung kepada Mandor.

**Opsi Skema Pembayaran Lokal:**
- **A. Per Progress**: Milestone persentase (Contoh: 30% + 30% + 30% + 10% retensi).
- **B. Per Kategori Pekerjaan**: Berdasarkan penyelesaian blok kategori (Contoh: Pekerjaan Pondasi Selesai -> Bayar).

**Catatan Pembayaran Konsumen:**
- Skema diatur oleh Admin/Superadmin secara lokal (Local Billing Plan).
- **Guards**: Tidak ada payment gateway, invoice legal, escrow rill, atau upload bukti bayar production.

## 9. Model Pembayaran Mandor (Mandor Payment Model)
RKK melakukan pembayaran kepada Mandor berdasarkan validitas pekerjaan di lapangan.

**Dasar Kelayakan Pembayaran (Weekly Payment Eligibility):**
- Realisasi pekerjaan aktual mingguan yang dilaporkan.
- Item RAB spesifik yang dikerjakan.
- Verifikasi kualitas fisik oleh Pengawas.
- Approval administratif oleh Admin/RKK.

**Catatan Pembayaran Mandor:**
- **Initial Capital**: Mandor dimungkinkan memodali tenaga/alat di awal.
- **Verification Driven**: Pengawas memverifikasi setiap item untuk menentukan nilai pekerjaan yang layak dibayar.
- Bersifat **Weekly Payment Eligibility**; bukan payroll otomatis atau integrasi bank rill.

## 10. Progress Source of Truth (SOT)
- **`Project.verifiedProgress`** tetap menjadi satu-satunya Source of Truth progres resmi.
- Berasal eksklusif dari input manual **Pengawas** assigned.
- Klaim Mandor (`claimedProgress`) bersifat administratif.
- Milestone pembayaran konsumen harus mengacu pada progres/kategori yang telah tervalidasi secara fisik.

## 11. Roadmap Pengembangan (Batch 4–9)

### Batch 4: RAB Tree & Work Item Execution Mapping
- Perapihan struktur hierarki Kategori -> Item RAB.
- Integrasi Item RAB sebagai baseline laporan operasional dan timeline.
- Arah baru Timeline Konsumen berbasis kategori/item RAB.

### Batch 5: Customer Payment Plan Setup
- Admin/Superadmin memilih skema pembayaran (Per Progress / Per Kategori).
- Implementasi Local Billing Plan (Simulasi administrasi).

### Batch 6: Mandor Weekly Payment Eligibility
- Penentuan kelayakan pembayaran Mandor berdasarkan verifikasi item pekerjaan mingguan.
- Admin approval flow untuk status pembayaran lokal.

### Batch 7–9: Design & Architect Foundation
- Alur kolaborasi: Konsumen <-> Admin <-> Arsitek.
- Arsitek mengerjakan desain/RAB awal berdasarkan instruksi Admin.
- Tetap bersifat Local Development Workflow.

## 12. Batasan Pengembangan (Guards)
- **No Production Auth**: Tidak menggunakan JWT/session rill.
- **No Payment Gateway**: Semua transaksi adalah simulasi database lokal.
- **No Legal/Escrow**: Tidak ada invoice legal atau sistem escrow rill.
- **No Realtime/WebSocket**: Komunikasi tetap berbasis HTTP standard.
- **No Progress Automation**: Progres resmi tidak dihitung otomatis (Tetap manual SOT).
- **Curated Timeline**: Timeline Konsumen bukan merupakan raw internal chat.

---
*Dokumen ini merupakan dasar arah produk RKK untuk Batch 4–6 dalam fase Local Development CRUD Integration.*
