# Remaining Hold & Follow-up Features

Dokumen ini mencatat fitur-fitur yang masih berstatus **Hold**, **Planned**, atau **Future Optional** pada fase *Local Development Feature Completion*.

---

## 🛑 1. Valid Hold (Strictly Postponed)
Fitur-fitur ini **TIDAK** dibuka pada fase Local Development dan memerlukan infrastruktur security/production rill.

| Fitur | Lokasi | Alasan Hold |
| :--- | :--- | :--- |
| **Production Auth & RBAC** | Lintas Role | Menunggu fase Security Hardening (JWT, Session, Password). |
| **Production Deployment** | Infrastructure | Project saat ini eksklusif untuk localhost. |
| **Real-time Chat / WebSocket** | Stage Communication | Menggunakan polling/HTTP thread sederhana untuk stabilitas lokal. |
| **Cloud Storage (S3/GCS)** | Document Upload | Menggunakan local binary upload (`/uploads`). |
| **Official Payment Gateway** | Finance | Menggunakan simulasi `PaymentRecord` lokal. |
| **Marketplace & Reputation** | Mitra (Mandor/Arsitek) | Sistem scoring/rating rill belum diaktifkan. |

---

## 🛠️ 2. Technical Follow-up (Roadmap Candidates)
Fitur yang secara teknis memungkinkan diimplementasikan secara lokal sebagai penyempurnaan CRUD.

| Fitur | Lokasi | Catatan |
| :--- | :--- | :--- |
| **Publish Laporan ke Konsumen** | Report Admin | Mekanisme kontrol visibilitas rill ke timeline konsumen. |
| **Export Data (PDF/Excel)** | RAB & Report | Penambahan fitur cetak/ekspor dokumen administratif lokal. |
| **Defensive Input Validation** | Form Entry | Penguatan validasi sisi client untuk mencegah data anomali. |
| **In-app Notifications v2** | Topbar | Optimasi polling dan kategori notifikasi. |

---

## 🌟 3. Future Optional (Phased Implementation)
Fitur tambahan yang dapat masuk roadmap jika scope lokal diperluas.

| Fitur | Lokasi | Status |
| :--- | :--- | :--- |
| **Katalog Arsitek/Mitra** | Dashboard | Planned as read-only gallery. |
| **Sistem Ticketing / Bantuan** | Support | Placeholder. |
| **Analytics Dashboard v2** | Superadmin | Advanced data aggregation (Global Stats). |

---

## 📜 4. Outdated / Already Stabilized (Reference Only)
Fitur yang sebelumnya direncanakan atau direkomendasikan namun sudah dianggap selesai atau tidak lagi menjadi prioritas teknis.

- **Batch 30E (Lightweight Factory)**: Bersifat teknis internal seed; prioritas dialihkan ke stabilitas workflow UI.
- **Admin Publish Update (Verification)**: Sudah tercover sebagian di Batch 37 & 43.
- **Admin Dashboard Demo Cleanup**: Sudah dilakukan di Batch 39 & 42.
- **Verified Progress Consistency Audit**: Sudah dilakukan di Batch 33 & 43.

---

## 🛡️ Scope Guard (Safety First)
Sistem RKK pada fase ini **SENGAJA TIDAK** membuat fitur berikut secara otomatis demi menjaga kontrol administratif:
- RAB & Stages otomatis (Harus direncanakan manual).
- Penugasan Tim otomatis.
- Aktivasi proyek otomatis (Aktivasi manual oleh Admin).
- Transaksi finansial rill (Hanya simulasi database).

---
*Terakhir diperbarui setelah Batch 44.*
