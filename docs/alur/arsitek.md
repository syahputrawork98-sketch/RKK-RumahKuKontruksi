# Alur Arsitek

## Status Dokumen
**Versi**: 1.0 (Local Development Integration Phase)
**Status**: Aktif - Konteks Produk

## Definisi Role
Arsitek adalah mitra teknis desain dalam sistem RKK (RumahKu Kontruksi) yang bertanggung jawab menerjemahkan kebutuhan konsumen menjadi konsep ruang dan gambar teknis yang siap bangun. Arsitek bertindak sebagai tenaga ahli profesional yang memastikan aspek estetika, fungsi, dan kekuatan struktur direncanakan dengan matang di tahap pra-proyek.

## Posisi Arsitek dalam Alur Proyek
Arsitek berada di garis depan alur produksi RKK (Tahap Pra-Konstruksi). Arsitek menerima penugasan desain setelah kebutuhan konsumen divalidasi oleh Admin. Hasil kerja Arsitek (Gambar Kerja Final) menjadi dasar utama pembuatan RAB dan pelaksanaan konstruksi di lapangan.

## Tanggung Jawab Utama
- **Brief Interpretation**: Memahami kebutuhan konsumen berdasarkan data resmi dari sistem.
- **Konsep Desain**: Membuat usulan konsep ruang, denah, dan tampak.
- **Gambar Kerja**: Menyusun dokumen teknis (DED - Detail Engineering Design) sebagai acuan lapangan.
- **Revisi & Sinkronisasi**: Melakukan perbaikan desain berdasarkan masukan sistem/konsumen sesuai batas revisi.
- **Evaluasi Teknis**: Memberikan tinjauan ahli jika terjadi permintaan perubahan (Change Order) di kemudian hari.

## Alur Utama Arsitek (Implemented)
1. **Peluang Desain**: Arsitek melihat daftar peluang desain (`DesignTender`) yang dipublish oleh Admin.
2. **Submit Penawaran**: Arsitek mengajukan penawaran harga (`DesignTenderBid`) sesuai budget 70% yang disediakan.
3. **Penerimaan Brief**: Jika terpilih (`awarded`), Arsitek menerima penugasan (`assigned`) pada `DesignRequest` tersebut.
4. **Analisis Kebutuhan**: Mempelajari data lahan, kebutuhan ruang, dan batasan anggaran dari konsumen.
5. **Update Progress**: Arsitek memperbarui status pengerjaan desain di sistem (e.g., `in_review`, `approved`).
6. **Final Approval**: Desain yang sudah disetujui Admin/Konsumen dikunci untuk kemudian dikonversi menjadi proyek konstruksi.

## Tahapan Desain dan Versioning
Tahapan desain dalam alur RKK dibagi menjadi beberapa fase kunci:
1. **Konsep Awal** (Ide ruang & zonasi)
2. **Denah** (Layout detail ukuran)
3. **Tampak** (Visualisasi estetika & 3D)
4. **Gambar Kerja** (Detail teknis untuk konstruksi)

**Status & Versioning**:
- Setiap tahap memiliki status: `Draft`, `Review`, `Revisi`, dan `Final Approved`.
- Setiap unggahan file harus memiliki versioning (V1, V2, V3, dst) dan tidak boleh menimpa file lama agar riwayat revisi tetap terjaga.
- File dengan status **Final Approved** menjadi dokumen hukum dan acuan resmi pelaksanaan.

## Evaluasi Teknis dan Change Order
Arsitek berperan sebagai penilai kelayakan teknis jika terjadi permintaan perubahan setelah desain masuk tahap konstruksi.

**Cakupan Evaluasi Arsitek**:
- Kelayakan perubahan desain terhadap struktur bangunan.
- Dampak perubahan terhadap utilitas (pipa, kabel) dan fungsi ruang.
- Catatan risiko teknis dan estetika akibat perubahan.
- Rekomendasi solusi teknis untuk penyesuaian lapangan.

**Batasan Wewenang**:
- **Tidak boleh** menyetujui Change Order secara pribadi (keputusan di Admin/Sistem).
- **Tidak boleh** menjanjikan perubahan biaya atau durasi kepada konsumen.
- **Tidak boleh** memberikan instruksi langsung kepada Mandor di luar jalur koordinasi sistem.

## Yang Boleh Dilakukan di Aplikasi
- Melihat Dashboard Arsitek dengan daftar tugas desain aktif.
- Melihat dan mengedit data profil Arsitek milik sendiri (DB-backed).
- Melihat brief desain dan data teknis lahan dari sistem.
- Mengunggah draft desain dan revisinya (Rencana Fitur).
- Memberi catatan atau evaluasi teknis pada modul Change Order (Rencana Fitur).
- Melihat riwayat revisi dan dokumen Final Approved (Rencana Fitur).

## Yang Tidak Boleh Dilakukan
- **Instruksi Luar Sistem**: Dilarang menerima atau mengikuti instruksi desain langsung dari klien di luar platform RKK sebagai sumber keputusan resmi.
- **Ubah Desain Final**: Dilarang mengubah file Final Approved secara sepihak tanpa alur revisi/Change Order resmi.
- **Janji Finansial**: Tidak boleh memberikan estimasi biaya pembangunan atau diskon kepada konsumen.
- **Instruksi Mandor**: Tidak boleh memerintah Mandor di lapangan tanpa koordinasi dengan Pengawas/Admin.
- **Keputusan Kontrak**: Tidak boleh membuat keputusan yang berdampak pada perubahan kontrak konstruksi secara mandiri.
- **Self-Approval**: Tidak boleh memberikan persetujuan final atas desainnya sendiri.

## Status Implementasi Saat Ini
- **Data Arsitek DB-backed**: ✅ Implemented (Database & Persona).
- **Dashboard Arsitek**: ✅ Implemented.
- **Peluang Desain (Design Tender)**: ✅ Implemented.
- **Submit Bid & Awarding**: ✅ Implemented.
- **DesignRequest Management**: ✅ Implemented (CRUD & Status).
- **Edit Profil Arsitek**: ✅ Implemented.
- **Workflow Tahapan Desain**: 🔄 Partial (Status updates only, no file upload yet).
- **Upload File Desain Production**: Postponed.
- **Final Approved Desain**: ✅ Implemented (Status logic).
- **Evaluasi Teknis Change Order**: Planned.
- **Change Order Final**: Do Not Build Yet.
- **Auth/JWT/Session/Role Guard**: Do Not Build Yet.

## Catatan untuk Developer / AI Assistant
- Arsitek adalah **mitra teknis**, bukan staf internal manajemen (Admin).
- Arsitek bekerja berdasarkan brief yang sudah difilter oleh sistem, bukan komunikasi bebas tanpa batas dengan konsumen.
- Jangan membangun workflow desain penuh (upload/revisi) pada fase ini (status **Planned**).
- Tetap ikuti prinsip **local-development-first** dengan Switcher persona.
- Peran ini fokus pada **integritas teknis desain**, segala urusan biaya konstruksi adalah wewenang Admin.
