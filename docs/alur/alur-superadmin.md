# Alur Superadmin - RKK RumahKu Konstruksi

## 1. Status Dokumen
- Dokumen ini menjelaskan alur operasional untuk role **Superadmin**.
- Fokus pada pengelolaan ekosistem **Local Development** dan *Governance* sistem.
- Mengacu ke [Alur Bisnis RKK](./alur-bisnis-rkk.md) sebagai alur induk.

## 2. Posisi Role dalam Sistem
- Superadmin adalah pengelola tertinggi sistem konstruksi RKK.
- Berfungsi menjaga integritas data lintas role dan mengelola ketersediaan persona untuk simulasi pengerjaan.
- Bertanggung jawab atas audit log dan approval perubahan data profil sensitif.

## 3. Entity / Database Terkait
- **Model Utama**: `Superadmin` (Profil), `AuditLog` (Rekam Aktivitas), `ProfileChangeRequest` (Antrian Persetujuan Data).
- **Global Access**: Dapat melihat data dari seluruh model (`Project`, `Foreman`, `Supervisor`, dll) untuk tujuan monitoring.

## 4. Fitur / Halaman / API Terkait
- **Route Frontend**: `/superadmin/dashboard`, `/superadmin/personas`, `/superadmin/logs`, `/superadmin/requests`.
- **API**: `/api/superadmins`, `/api/audit-logs`, `/api/profile-change-requests`.

## 5. Alur Utama Role
1. **Persona Management**: Membuat, mengupdate, atau menghapus data persona (Mandor, Pengawas, Admin) yang bisa dipilih oleh developer di switcher.
2. **Monitoring Dashboard**: Melihat ringkasan aktivitas sistem secara global.
3. **Audit Log Inspection**: Meninjau log perubahan database untuk memastikan tidak ada aktivitas ilegal atau error yang tidak terlacak.
4. **Review Profile Request**: Meninjau permintaan perubahan data sensitif (seperti NIK atau nomor HP) dari role lain.
5. **System Governance**: Memastikan alur bisnis antar role berjalan sesuai aturan SOT (Source of Truth).

## 6. Hubungan dengan Role Lain
- **Superadmin ↔ All Roles**: Superadmin bertindak sebagai pengawas (governance) atas seluruh aktivitas yang dilakukan oleh Admin, Pengawas, Mandor, Arsitek, dan Konsumen.

## 7. Batasan dan Catatan Scope
- **Non-Auth Production**: Superadmin di sini mengelola "Persona" lokal, bukan User/Auth production berbasis JWT/Session rill.
- **Local Auditor**: Audit log bersifat lokal dan tersimpan di database PostgreSQL pengembangan.

## 8. Checklist Validasi Alur
- [ ] List persona menampilkan seluruh data aktor sistem (Admin, Pengawas, Mandor).
- [ ] Audit log mencatat setiap aksi `POST/PATCH/DELETE` yang dilakukan di sistem.
- [ ] Dashboard superadmin memiliki akses pandangan luas (Global View).

---
*Terakhir diperbarui: Batch Alur Per Role 01.*
