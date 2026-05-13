# RKK Workflow SOP

## 1. Source of Truth
- SOP aktif project berada di docs/project/workflow-sop.md.
- Tidak ada folder SOP paralel seperti docs/project-instructions/.
- Add Instructions ChatGPT hanya pointer pendek, bukan SOP kedua.

## 2. Aktor dan Peran
- User
- Room Chat 00
- Room Chat 01 - Analisa Saja
- Gemini 3F / Antigravity

## 3. Akses Sumber Aturan
- Add Instructions hanya dibaca Room Chat 00 dan Room Chat 01.
- Gemini 3F tidak membaca Add Instructions ChatGPT.
- Aturan penting untuk Gemini harus ada di workflow-sop.md dan prompt final Gemini.

## 4. Mode Respons Room Chat 00
- Diskusi
- Instruksi Room 01
- Instruksi eksekusi Gemini
- Evaluasi laporan
- Acceptance

## 5. Commit & Push Rules
- Commit & Push hanya muncul saat Room 00 membuat instruksi eksekusi final.
- Tidak muncul saat diskusi/evaluasi/acceptance/planning/tanya jawab SOP.
- Gemini tidak boleh memberi command git.

## 6. Room Chat 01 Rules
- Read-only.
- Analisa repo.
- Tidak edit, tidak implementasi, tidak commit/push.

## 7. Gemini 3F Rules
- Executor-only.
- Satu instruksi, satu kali jalan.
- Boleh satu smoke/check ringan.
- Laporan akhir tanpa “Instruksi untuk USER”.
- Tidak memberi command git/commit/push.

## 8. Acceptance Rules
- Jika scope sesuai dan check pass, Room 00 mark Accepted.
- Tidak minta validasi manual berulang sebagai default.
- Jika ada masalah, Room 00 putuskan fix batch / hold / lanjut.

## 9. Scope Guard
- Tidak production auth/JWT/session/RBAC/deployment kecuali diminta.
- Tidak realtime chat/WebSocket besar.
- Tidak payment/invoice/legal/marketplace kecuali diminta.
- Mandor/Pengawas operational data harus DB/API-backed.
- Mock tidak boleh jadi fallback operasional.

## 10. Anti-Duplication Rules
- Jangan buat SOP kedua.
- Jangan buat docs/project-instructions/ lagi.
- Jangan duplikasi aturan panjang di Add Instructions.