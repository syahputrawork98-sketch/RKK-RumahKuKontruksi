# Role & Permission Matrix

Dokumen ini merinci hak akses dan tanggung jawab setiap peran dalam sistem.

## Daftar Peran (Roles)

| Role | Fungsi Utama | Akses Utama | Batasan | Catatan |
|---|---|---|---|---|
| **Owner** | Pemilik bisnis / Founder. | Full Read/View seluruh sistem. | Tidak melakukan input data operasional. | Fokus pada reporting dan audit. |
| **Superadmin** | Administrator Teknis. | Full CRUD seluruh sistem + Config. | - | Penanggung jawab teknis data. |
| **Admin Proyek** | Penjaga gerbang data. | Input RAB, Kontrak, Kelola User Lapangan. | Tidak mengubah progres lapangan. | Admin adalah validasi data pusat. |
| **Estimator** | Penyusun Anggaran. | Kelola data RAB dan katalog harga. | Tidak memiliki akses ke data pembayaran. | Seringkali digabung dengan Admin. |
| **Pengawas** | Supervisor Lapangan. | Approval Laporan Harian, Buat Laporan Mingguan. | Tidak mengubah data RAB/Kontrak. | Memastikan kualitas & kebenaran data lapangan. |
| **Mandor** | Eksekutor Lapangan. | Input Laporan Harian, Request Material. | Hanya melihat proyek yang ditugaskan. | Sumber data utama aktivitas fisik. |
| **Konsumen** | Klien / Pemilik Rumah. | View Progres, Dokumen, & Invoice. | Read-Only (kecuali approval termin). | Transparansi progres untuk klien. |
| **Supplier** | Vendor Material. | Lihat PO dan update pengiriman. | Hanya data transaksi terkait vendor. | Direncanakan untuk tahap lanjut. |

## Prinsip Hak Akses
1. **Gatekeeping**: Admin Proyek adalah pemegang kendali data administratif.
2. **Verification**: Pengawas bertindak sebagai verifikator atas data yang diinput oleh Mandor.
3. **Transparency**: Konsumen memiliki hak akses untuk melihat seluruh dokumen dan foto progres yang telah disetujui.
4. **Accountability**: Setiap tindakan (CREATE, UPDATE, DELETE, APPROVE) harus mencatat identitas pelaku (audit log).
