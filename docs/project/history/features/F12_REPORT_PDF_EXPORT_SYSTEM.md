# F12 — Report / PDF Export System

## Story
Sistem pembuatan dokumen pelaporan fisik/digital (PDF) dari data *verified progress* maupun RAB proyek.

## Status
- **Current Status**: Not Started

## Scope
- Ekspor Laporan Kemajuan Proyek (Progress).
- Ekspor Dokumen Finansial (RAB, Material).

## Role / Modul Terkait
- Admin, Konsumen, Superadmin

## Alur Utama
1. User meminta cetak dokumen melalui dashboard.
2. Sistem mengekstrak SOT progress.
3. Server me-render HTML/Data menjadi format PDF yang dapat diunduh.

## Data / API / Dependency Terkait
- Library PDF generation (misalnya `puppeteer` atau library frontend).

## Status Implementasi Saat Ini
- *Existing / Needs Verification*

## Risiko / Needs Verification
- *Needs Verification*: Pemilihan pustaka ekspor. Library konversi PDF rentan terhadap limit memori di lingkungan server lokal atau *serverless*.

## Codebase Verification
- **Frontend Export**: **Not Started**. Modul konversi PDF belum terimplementasi di level antarmuka. Meskipun pustaka `jspdf` dan `jspdf-autotable` telah terdaftar dalam `package.json` klien, tidak ditemukan satupun pemanggilan instansiasi (*import*) pada `client/src`. Tombol *Export/Print PDF* pada laman pelaporan belum terhubung pada eksekutor konversi.
- **Backend Generator**: **Not Started**. Tidak ada modul `puppeteer`, *endpoint* *report generator*, maupun layanan pembuatan dokumen di pangkalan data backend (`server/src/modules/`).
- **Database Model**: Pelaporan masih mengandalkan struktur penyimpanan bawaan (seperti `DailyReport` dan `ProjectDocument`), tidak ada model khusus atau pemicu tabel yang dideksekusi murni untuk keluaran ekspor eksternal.
- **Keputusan Status**: Tervalidasi belum dibangun (*Not Started*). Instalasi pustaka pada *package.json* sekadar persiapan infrastruktur pasif (*dormant dependencies*).

## Next Step
- Mengimplementasikan logika fungsional `jspdf` untuk ekspor dokumen di *frontend*.
