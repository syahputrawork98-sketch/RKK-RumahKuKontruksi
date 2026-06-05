# Alur Pembayaran Konsumen

## Status Dokumen
**Status**: Planned / Konteks Produk
**Versi**: 1.0
Dokumen ini mendefinisikan alur bisnis pembayaran konsumen di ekosistem RumahKu Konstruksi (RKK). Alur ini bersifat rencana strategis dan belum diimplementasikan secara teknis (backend/API).

## Prinsip Utama Pembayaran
1. **Otoritas Admin**: Seluruh skema pembayaran ditentukan dan divalidasi oleh Admin. Konsumen tidak memilih skema secara bebas tanpa persetujuan Admin.
2. **Kesesuaian Layanan**: Admin menentukan skema berdasarkan jenis layanan, nilai proyek, risiko, dan kebutuhan cashflow RKK.
3. **Transparansi Administratif**: Konsumen dapat melihat tagihan, histori, dan sisa pembayaran, namun tidak melihat detail margin internal RKK.
4. **Keamanan Transaksi**: Pembayaran wajib melalui rekening resmi RKK. Pembayaran ke personil lapangan (Mandor/Pengawas) dilarang.

## Pembagian Alur Pembayaran
Alur pembayaran di RKK dibagi menjadi tiga jalur utama:
1. **Design Payment Flow** (Pembayaran Jasa Gambar)
2. **Construction Term Payment Flow** (Pembayaran Proyek Sistem Termin)
3. **Construction Category Payment Flow** (Pembayaran Proyek Sistem Per Kategori Pekerjaan)

---

## 1. Design Payment Flow (Jasa Gambar)

Alur ini digunakan untuk layanan arsitektur dan perencanaan sebelum masuk tahap konstruksi.

### Aturan Bisnis
- **Basis Harga**: Dihitung berdasarkan luas bangunan (per m2), bukan per lembar.
- **Rumus Dasar**: `Total = Luas Bangunan (m2) * Harga Paket (per m2)`.
- **Paket Layanan**: Basic, Standard, atau Lengkap + RAB.
- **Pembagian Hasil (Internal)**: RKK Fee 30%, Arsitek Payout 70%.
- **Skema Default**: DP 50% (Mulai) + Pelunasan 50% (Selesai).
- **Skema Paket Besar**: DP 30% + Progress 40% + Final 30%.
- **Akses File**: File final (High-res/CAD) hanya dapat diunduh setelah status pelunasan terverifikasi.

### Alur Kerja
1. Konsumen mengajukan kebutuhan desain dan mengisi estimasi luas bangunan.
2. Sistem menghitung estimasi harga awal.
3. Admin memvalidasi data dan menentukan skema pembayaran.
4. Sistem menerbitkan Invoice DP.
5. Konsumen membayar DP dan mengunggah bukti.
6. Admin memverifikasi pembayaran.
7. Arsitek mulai mengerjakan desain (status: `in_design`).
8. Konsumen melakukan review/revisi sesuai batas paket.
9. Setelah desain final disetujui, Admin menerbitkan Invoice Pelunasan.
10. Konsumen melunasi tagihan.
11. Admin memverifikasi pelunasan.
12. Akses file final dibuka untuk Konsumen.
13. Sistem mencatat kewajiban payout ke Arsitek.

### Status Pembayaran Desain
`draft` -> `waiting_admin_review` -> `waiting_dp_payment` -> `dp_paid` -> `in_design` -> `revision` -> `final_waiting_payment` -> `paid` -> `completed`

---

## 2. Construction Term Payment Flow (Sistem Termin)

Alur pembayaran standar untuk proyek konstruksi menengah hingga besar.

### Aturan Bisnis
- **Basis Harga**: RAB (RabPlan) yang telah disetujui.
- **Margin RKK**: Ditentukan oleh Admin (Default: 20% untuk proyek normal, 25-30% untuk renovasi/risiko tinggi).
- **Rumus Kontrak**: `(Subtotal RAB + Margin RKK) + Pajak (jika ada) = Total Kontrak`.
- **Skema Termin**: Ditentukan Admin (Contoh: 30-30-30-10 atau 20-30-30-20).
- **Trigger Tagihan**: Tagihan termin berikutnya aktif ketika progress lapangan mencapai target tertentu (misal: Tahap Struktur selesai).

### Alur Kerja
1. Admin menyetujui RAB dan menetapkan margin RKK.
2. Admin memilih skema termin yang sesuai.
3. Konsumen memberikan persetujuan (Approval) terhadap kontrak/penawaran.
4. Sistem menerbitkan Invoice DP (Termin 1).
5. Konsumen membayar dan Admin memverifikasi.
6. Proyek berubah status menjadi **Aktif**.
7. Pekerjaan berjalan. Pengawas memperbarui progres lapangan.
8. Ketika progres memenuhi syarat termin berikutnya, Admin mengaktifkan Invoice Termin.
9. Konsumen membayar termin.
10. Setelah termin final lunas dan proyek selesai (BAST), status menjadi `completed`.

### Status Pembayaran Termin
`rab_approved` -> `contract_waiting_approval` -> `waiting_dp_payment` -> `active` -> `term_waiting_payment` -> `term_paid` -> `final_payment_waiting` -> `paid` -> `completed`

---

## 3. Construction Category Payment Flow (Per Kategori)

Opsi pembayaran fleksibel bagi konsumen yang ingin membayar berdasarkan kelompok pekerjaan tertentu.

### Aturan Bisnis
- **Basis Harga**: RabCategory (Pembersihan, Pondasi, Struktur, dll).
- **Prinsip "Pay as You Go"**: Pekerjaan kategori berikutnya **DILARANG** dimulai sebelum pembayaran kategori tersebut diterima.
- **Margin**: Margin RKK dialokasikan secara proporsional pada tiap kategori atau ditagihkan di awal sebagai biaya operasional.
- **Risiko**: Proyek otomatis masuk status `paused` jika pembayaran kategori berikutnya belum dilakukan saat kategori sebelumnya selesai.

### Alur Kerja
1. Admin menyetujui RAB dan menetapkan skema "Per Kategori".
2. Admin memilih satu atau beberapa kategori pekerjaan untuk ditagihkan pertama kali.
3. Sistem menghitung nilai invoice kategori (termasuk alokasi margin/pajak).
4. Konsumen membayar invoice kategori tersebut.
5. Admin memverifikasi; pekerjaan kategori tersebut dimulai.
6. Saat kategori hampir selesai, Admin menerbitkan invoice untuk kategori pekerjaan selanjutnya.
7. Jika belum ada pembayaran, proyek berhenti sementara setelah kategori aktif selesai.

### Status Pembayaran Kategori
`category_plan_draft` -> `waiting_category_payment` -> `category_paid` -> `category_in_progress` -> `category_completed` -> `paused_waiting_payment` -> `completed`

---

## Ketentuan Pajak (Taxation)
Implementasi pajak bersifat fleksibel dan tidak di-hardcode dengan angka mutlak:
- **Field**: `tax_rate`, `tax_amount`, `tax_type`, `is_tax_included`.
- **Penerapan**: Tergantung status legal RKK (PKP/Non-PKP) dan jenis layanan (Jasa Konstruksi memiliki aturan PPh Final khusus).
- **Validasi**: Perhitungan pajak final wajib divalidasi oleh pemilik bisnis/konsultan pajak sebelum masuk fase produksi.

## Otoritas Admin (Admin Authority)
- Admin memilih skema pembayaran sebelum invoice pertama dibayar.
- Perubahan skema setelah ada pembayaran harus dilakukan melalui **Addendum/Revisi Kontrak**, bukan menimpa data lama.
- Admin memantau seluruh histori dan sisa piutang konsumen secara terpusat.

---

## Data Model Draft (Future Implementation)

### PaymentPlan
Rencana induk pembayaran untuk satu proyek/order.
- `type`: `DESIGN` | `CONSTRUCTION_TERM` | `CONSTRUCTION_CATEGORY`
- `status`: `DRAFT` | `ACTIVE` | `CLOSED`
- `subtotal`, `marginRate`, `marginAmount`, `taxRate`, `taxAmount`, `totalAmount`

### Invoice
Dokumen penagihan spesifik.
- `type`: `DP` | `TERM` | `CATEGORY` | `FINAL`
- `status`: `DRAFT` | `ISSUED` | `WAITING_PAYMENT` | `PAID` | `VERIFIED`
- `verifiedByAdminId`, `verifiedAt`

### Payment
Bukti transaksi dari konsumen.
- `invoiceId`, `amount`, `method`, `proofUrl`
- `status`: `SUBMITTED` | `VERIFIED` | `REJECTED`

---

## Sinkronisasi Role
- **Admin**: Memiliki otoritas penuh menentukan skema, menerbitkan invoice, dan verifikasi bukti bayar.
- **Konsumen**: Melihat riwayat tagihan, sisa pembayaran, dan melakukan konfirmasi bayar. Tidak bisa mengubah skema sendiri.
- **Arsitek**: Terkait dengan status `payout` pada flow jasa gambar setelah pelunasan konsumen.
- **Pengawas/Mandor**: Memberikan data progres fisik sebagai pemicu (trigger) tagihan termin berikutnya (pada modul operasional mendatang).
