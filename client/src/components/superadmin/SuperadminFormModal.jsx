import React, { useState, useEffect } from "react";
import { FiX, FiShield } from "react-icons/fi";

export default function SuperadminFormModal({ isOpen, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "active",
        avatar: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                status: initialData.status || "active",
                avatar: initialData.avatar || ""
            });
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                status: "active",
                avatar: ""
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-[var(--dashboard-surface)] w-full max-w-md rounded-2xl shadow-2xl p-6 border border-[var(--dashboard-border)] overflow-y-auto max-h-[90vh]">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <FiShield className="text-rose-600" />
                      <h2 className="text-lg font-black tracking-tight text-[var(--dashboard-text)]">
                          {initialData ? "Edit Persona Lokal" : "Daftarkan Persona Superadmin Lokal"}
                      </h2>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--dashboard-surface-soft)] transition-colors text-[var(--dashboard-text-soft)]">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                            placeholder="Nama Lengkap..."
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                            placeholder="email@rkk.co.id"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Telepon</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                            placeholder="0812..."
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                        >
                            <option value="active">Aktif</option>
                            <option value="inactive">Nonaktif</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Link Foto Profil (URL)</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                            placeholder="https://..."
                            value={formData.avatar}
                            onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                        />
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text-soft)] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[var(--dashboard-border-soft)] transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20"
                        >
                            {initialData ? "Simpan Perubahan" : "Simpan Persona"}
                        </button>
                    </div>
                </form>

                <div className="mt-6 pt-6 border-t border-[var(--dashboard-border-soft)] text-center">
                    <p className="text-[9px] font-bold text-amber-600 leading-relaxed uppercase italic">
                        * Persona Superadmin memiliki akses global. Perubahan ini hanya untuk simulasi lokal dan tidak melibatkan sistem keamanan production.
                    </p>
                </div>
            </div>
        </div>
    );
}
