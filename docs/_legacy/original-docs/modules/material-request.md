# Module: Material Request - RKK RumahKu Konstruksi

Modul ini menangani pengadaan material proyek berbasis baseline RAB.

## 🔄 Alur Kerja
1. **Request**: Mandor memilih item RAB dan mengajukan kuantitas yang dibutuhkan.
2. **Review**: Pengawas memverifikasi kebutuhan tersebut di lapangan.
3. **Approval**: Admin memberikan persetujuan akhir dan mencatat status distribusi.
4. **Receipt**: Mandor mengonfirmasi penerimaan barang setelah sampai di site.

## 🛡️ Aturan Bisnis
- **RAB-Linked**: Request diutamakan merujuk pada `RabItem` yang ada.
- **Outside-RAB**: Penambahan material di luar RAB diperbolehkan dengan catatan wajib dan approval khusus Admin.
- **No Inventory**: Sistem hanya mencatat status distribusi administratif, belum terhubung ke sistem inventory gudang rill.

## 📊 Technical Authority
- **Baseline Valid**: Sumber data kuantitas valid adalah `RabItem.volume`.
- **Reference**: `MaterialRequestItem` wajib merujuk pada `RabItem` jika tersedia dalam perencanaan.
- **Additional Material**: Item di luar RAB ditandai dengan `isAdditionalMaterial = true` dan memerlukan validasi ekstra.

---
*Status: Material Request from RAB Usage = Local Workflow v1 / Stabilized.*
