# Module: Design Request - RKK RumahKu Konstruksi

Modul ini menangani fase pra-konstruksi di mana Konsumen mengajukan kebutuhan desain bangunan.

## 🔄 Alur Kerja
1. **Submit**: Konsumen membuat permintaan desain melalui form.
2. **Review**: Admin meninjau permintaan dan mempublikasikan tender lokal.
3. **Tender**: Arsitek memberikan bid (penawaran) terhadap tender tersebut.
4. **Award**: Admin memilih arsitek pemenang.
5. **Execution**: Arsitek mengerjakan desain dengan batas revisi tertentu.
6. **Bridge**: Admin melakukan konversi permintaan desain menjadi draf proyek (`planning`).

## 🛡️ Aturan Konversi
- **Manual Transition**: Konversi ke proyek hanya membuat draf perencanaan.
- **No Automation**: Tidak ada pembuatan otomatis RAB, Stages, atau Aktivasi proyek saat konversi.

---
*Status: Local E2E Workflow v1 / UI Consistency Stabilized.*
