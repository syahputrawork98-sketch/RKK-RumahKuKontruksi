# Existing Risk Notes

Catatan mengenai risiko awal yang diidentifikasi dari kondisi existing proyek RKK.

## Daftar Risiko Teridentifikasi
- **Dokumentasi Terbatas**: README lama dinilai terlalu singkat dan dokumentasi operasional proyek belum ada, yang berisiko menyulitkan *onboarding*.
- **Pelacakan Status**: Status fitur belum terlacak dengan baik, berpotensi memicu pengembangan yang tumpang tindih.
- **Sistem Auth/Akses**: Sistem *auth* dan *access control* belum jelas status finalnya. Perlu verifikasi mendalam di batch terkait.
- **Kompleksitas Role Frontend**: Karena frontend menangani multi-role (superadmin, admin, konsumen, dll.), pengubahan perlu dilakukan dengan batch sangat kecil untuk meminimalkan regresi.
- **Verifikasi Backend & Database**: Backend API dan Supabase perlu diverifikasi bertahap.
- **Hardcoded Endpoint**: Hardcoded localhost API mungkin ada dan perlu ditinjau/diperbaiki pada batch frontend atau backend selanjutnya agar siap deploy.

*Catatan: Sangat dilarang untuk mengubah code apa pun sebelum fase baseline ini dinyatakan selesai dan disetujui.*
