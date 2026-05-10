import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function PengawasFormModal({ isOpen, onClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        status: "active",
        avatar: "",
        specialization: ""
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                city: initialData.city || "",
                status: initialData.status || "active",
                avatar: initialData.avatar || "",
                specialization: initialData.specialization || ""
            });
        } else {
            setForm({
                name: "",
                email: "",
                phone: "",
                city: "",
                status: "active",
                avatar: "",
                specialization: ""
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-[var(--dashboard-surface)] w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-[var(--dashboard-border)] overflow-y-auto max-h-[90vh]">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black tracking-tight text-[var(--dashboard-text)]">
                        {initialData ? "Edit Persona Lokal" : "Daftarkan Persona Pengawas Lokal"}
                    </h2>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--dashboard-surface-soft)] transition-colors text-[var(--dashboard-text-soft)]">
                        <X size={20} />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            required
                            placeholder="Contoh: Ahmad Subarjo"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                                placeholder="ahmad@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Nomor HP</label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                                placeholder="0812..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Kota / Wilayah</label>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            placeholder="Contoh: Jakarta Selatan"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Spesialisasi</label>
                        <input
                            type="text"
                            name="specialization"
                            value={form.specialization}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            placeholder="Contoh: Struktur, Arsitektur, dll"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        >
                            <option value="active">Aktif</option>
                            <option value="inactive">Nonaktif</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Link Foto Profil (URL)</label>
                        <input
                            type="text"
                            name="avatar"
                            value={form.avatar}
                            onChange={handleChange}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text-soft)] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[var(--dashboard-border-soft)] transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-amber-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
                        >
                            {initialData ? "Simpan Perubahan" : "Simpan Persona"}
                        </button>
                    </div>
                </form>
                
                <div className="mt-6 pt-6 border-t border-[var(--dashboard-border-soft)] text-center">
                    <p className="text-[9px] font-bold text-[var(--dashboard-text-soft)] leading-relaxed uppercase italic">
                        * Persona ini adalah entitas database lokal untuk simulasi. Tidak melibatkan sistem password, JWT, atau session production.
                    </p>
                </div>
            </div>
        </div>
    );
}
