// client/src/components/admin/AdminFormModal.jsx
// NOTE: Fase Local CRUD — Fitur tambah/edit admin belum terhubung ke backend.
// Formulir ini ditampilkan sebagai preview saja, tombol submit dinonaktifkan.
import React from "react";
import { X, Lock } from "lucide-react";

export default function AdminFormModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-[var(--dashboard-surface)] w-full max-w-md rounded-2xl shadow-2xl p-6 border border-[var(--dashboard-border)]">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black tracking-tight text-[var(--dashboard-text)]">
                        Tambah Admin Baru
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-[var(--dashboard-surface-soft)] transition-colors text-[var(--dashboard-text-soft)]"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* HOLD STATE NOTICE */}
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-100 flex items-center justify-center text-amber-500">
                        <Lock size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">
                            Status: Hold (Fase Local CRUD)
                        </p>
                        <h3 className="font-bold text-[var(--dashboard-text)] text-sm">Fitur Dalam Pengembangan</h3>
                        <p className="text-[11px] text-[var(--dashboard-text-soft)] mt-2 max-w-xs mx-auto leading-relaxed">
                            Tambah dan edit admin melalui panel Superadmin akan diaktifkan setelah modul Backend Auth selesai diimplementasikan.
                        </p>
                    </div>
                </div>

                {/* CLOSE ACTION */}
                <div className="flex justify-center mt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}