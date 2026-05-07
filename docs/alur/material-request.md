# Alur Pengajuan Material (Material Request)

## Status Dokumen
**Versi**: 1.0 (Rancangan Implementasi)
**Status**: Draft / Planned
Dokumen ini mendefinisikan alur bisnis dan teknis pengajuan kebutuhan material dari lapangan oleh Mandor hingga proses pengadaan oleh Admin.

## Tujuan Fitur
Bukan sekadar pencatatan, fitur ini berfungsi sebagai instrumen kontrol:
1. **Kontrol RAB**: Memastikan material yang diminta sesuai dengan perencanaan.
2. **Estimasi vs Aktual**: Membandingkan jumlah rencana (RAB) dengan jumlah yang benar-benar digunakan.
3. **Audit Trail**: Melacak siapa yang meminta, memverifikasi, dan menyetujui setiap item material.
4. **Evaluasi Performa**: Menilai akurasi estimasi RKK dan efisiensi kerja Mandor.

## Aktor dan Peran
- **Mandor**: Pembuat pengajuan, pengisi kebutuhan lapangan, dan konfirmator penerimaan barang.
- **Pengawas**: Verifikator lapangan yang memastikan kebutuhan material masuk akal dan sesuai tahap pekerjaan.
- **Admin**: Verifikator budget dan pengelola pengadaan/pembelian material.
- **Sistem**: Penghitung otomatis deviasi (estimasi vs aktual) dan pemberi peringatan (warning).

## Alur Utama
1. **Mandor membuat Draft**: Memilih proyek, tahap (*stage*), dan daftar item material.
2. **Pengecekan Sistem**: Sistem menampilkan sisa estimasi dari RAB untuk item terkait.
3. **Submit Request**: Jika melebihi estimasi (>5%), Mandor wajib mengisi alasan tambahan (*justification*).
4. **Verifikasi Pengawas**: Pengawas meninjau kondisi lapangan. Bisa *Approve*, *Reject*, atau *Minta Revisi*.
5. **Approval Admin**: Admin meninjau dari sisi budget dan stok. Bisa *Approve*, *Reject*, atau *Minta Revisi*.
6. **Proses Pengadaan**: Admin menandai status sebagai `processing` atau `ordered`.
7. **Pengiriman**: Barang dikirim ke lokasi, status menjadi `delivered`.
8. **Penerimaan**: Mandor mengonfirmasi penerimaan dan mencatat jika ada selisih jumlah atau kerusakan (`received_with_issue`).
9. **Selesai**: Setelah diverifikasi, status menjadi `completed` dan data aktual diperbarui.

## Status Request Material
Gunakan status berikut dalam sistem:
- `draft`: Disimpan oleh Mandor, belum diajukan.
- `submitted`: Menunggu verifikasi Pengawas.
- `revision_requested`: Perlu perbaikan oleh Mandor.
- `approved_by_supervisor`: Lolos verifikasi lapangan, menunggu Admin.
- `approved_by_admin`: Disetujui untuk pengadaan.
- `processing`: Sedang dalam proses pembelian/persiapan.
- `delivered`: Barang dalam perjalanan/sudah di lokasi.
- `received`: Konfirmasi diterima oleh Mandor.
- `completed`: Selesai dan masuk catatan audit.
- `rejected`: Ditolak (oleh Pengawas atau Admin).
- `cancelled`: Dibatalkan oleh Mandor.

## Kontrol Estimasi (Tolerance Policy)
Sistem akan memberikan label pada setiap pengajuan berdasarkan persentase terhadap RAB:
- **0% - 5%**: Normal (Wajar).
- **5% - 10%**: Perlu Catatan (Mandor wajib isi alasan).
- **10% - 20%**: Peringatan (Butuh verifikasi kuat Pengawas).
- **> 20%**: Anomali (Wajib eskalasi ke Admin).

## Struktur Data (Draf)

### MaterialRequest
- `requestCode`: ID unik (misal: REQ-2024-0001).
- `projectId`, `stageId`, `foremanId`, `supervisorId`.
- `status`, `priority` (Low, Medium, High).
- `neededDate`: Tanggal material dibutuhkan di lapangan.
- `reason`: Alasan umum pengajuan.
- `overEstimateReason`: Justifikasi jika melebihi RAB.

### MaterialRequestItem
- `materialName`: Nama barang.
- `requestedQty`, `approvedQty`, `receivedQty`.
- `unit`: Satuan (Sak, Batang, m3, dll).
- `rabItemId`: Relasi ke item RAB (opsional jika material tambahan).
- `estimatedQtyFromRab`: Jumlah di RAB sebagai referensi.
- `varianceQty`, `variancePercentage`: Hitungan deviasi.

## Catatan Implementasi
1. **Local Development First**: Gunakan Switcher Persona untuk menguji alur lintas role.
2. **No Deletion**: Hindari penghapusan data, gunakan status `cancelled` atau `rejected` untuk menjaga audit trail.
3. **Modular UI**: Pisahkan komponen daftar material agar bisa digunakan kembali di Dashboard Admin dan Pengawas.
