# Frontend Checklist

Daftar progres implementasi fitur frontend RKK.

## Mock Data Foundation
- [x] Users & Roles Mock Table
- [x] Admin Mock Profiles (Capacity: 3)
- [x] Supervisor Mock Profiles (Capacity: 3)
- [x] Supervisor Certificates Mock Table
- [x] Mandor Mock Profiles (External Vendor Model)
- [x] Mandor Certificates Mock Table
- [ ] Workers/Tukang (Removed - Managed by Foreman)
- [x] Customer Mock Profiles (Individual & Company)
- [x] Customer Project Members (Viewer Access)
- [x] Project Comments (Timeline Discussion)
- [x] RAB Plan (Header/Document)
- [x] RAB Category (Work Groups)
- [x] RAB Item (Detailed Tasks)
- [x] Project Stages Sync with RAB Categories
- [x] Notifications Mock Table
- [x] Centralized Mock Exports (`index.js`)
- [x] Audit & Relational Integrity Fix
- [ ] Normalization of Project Status Enum (Technical Debt)
- [ ] Refactor Konsumen Detail with 3-Level RAB

## Design Timeline (Pre-Project)
- [x] Architect Mock Profiles
- [x] Design Request Mock Table
- [x] Design Files & Categories
- [x] Design Revisions (Free vs Chargeable)
- [x] Design Comments Mock Table
- [ ] UI Dashboard Arsitek
- [ ] UI Design Request Management (Konsumen/Admin)

## Documentation
- [x] Overview Dokumentasi (`README.md`)
- [x] Route Inventory Sinkronisasi
- [x] Role-based Documentation Structure
- [ ] UI Component Library Documentation

## Public / Guest
- [x] Home Page (Hero, Value, Call-to-action)
- [x] Halaman Layanan (Card based)
- [x] Halaman Cara Kerja (Step by step timeline)
- [x] Halaman Proyek (Portfolio grid)
- [x] Halaman Tentang (Brand story)
- [x] Halaman Kontak (Form & Map)
- [x] Global Public Design System (Reusable CSS)
- [x] Responsive Navigation

## Konsumen
- [x] Konsumen Layout & Sidebar
- [x] Dashboard Monitoring
- [x] Timeline Proyek (Card based vertical)
- [x] Detail Laporan Tahap (Technical RAB table)
- [ ] Profil User (Partial - data still hardcoded)
- [ ] List Proyek Aktif (Partial - data still hardcoded)
- [x] Dokumentasi Foto per Tahap

## Superadmin
- [x] Superadmin Layout & Sidebar (Refined & Themed)
- [x] Dashboard Statistik (Terminology & Grid Fixed)
- [x] CRUD Data Admin (UI Shell)
- [x] CRUD Data Pengawas (UI Shell)
- [x] CRUD Data Mandor (UI Shell)
- [ ] Audit Log View
- [x] Theme Toggle (Light/Dark)

## Admin
- [x] Admin Layout & Sidebar (Shell Expanded)
- [x] Dashboard Operasional Admin (Mock)
- [x] Manajemen Proyek (Mock List & Detail)
- [ ] Approval Pembayaran
- [ ] Penjadwalan Proyek Global

## Arsitek
- [x] Arsitek Layout & Sidebar (Shell Expanded)
- [x] Dashboard Kapasitas Desain (Implemented - DB)
- [x] Manajemen Profil & Sertifikasi (Implemented - DB)
- [x] Manajemen Permintaan Desain (Mock)
- [ ] Integrasi rill data Brief Desain
- [ ] Integrasi rill data Alur Kerja Desain
- [x] Architect Persona Switcher (Dev Mode)

## Pengawas
- [x] Pengawas Layout & Sidebar (Shell Expanded)
- [x] Dashboard Monitoring Lapangan (Implemented - DB)
- [x] Monitoring List Proyek Lapangan (Implemented - DB)
- [x] Manajemen Profil & Pengalaman (Implemented - DB)
- [x] Supervisor Persona Switcher (Dev Mode)
- [ ] Form Verifikasi Tahapan Proyek (Backend Pending)

## Mandor
- [x] Mandor Layout & Sidebar (Shell Expanded)
- [x] Dashboard Operasional Mandor (Implemented - DB)
- [x] Monitoring List Proyek Aktif (Implemented - DB)
- [x] Manajemen Profil & Sertifikasi (Implemented - DB)
- [x] Foreman Persona Switcher (Dev Mode)
- [x] Laporan Harian (Logbook Shell - Postponed)
- [ ] Request Material Proyek (Backend Pending)

---
*Status: 7 Mei 2026*
