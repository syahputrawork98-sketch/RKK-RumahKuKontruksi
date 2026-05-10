import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AdminFormModal({ isOpen, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "active"
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                status: initialData.status || "active"
            });
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                status: "active"
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-[var(--dashboard-surface)] w-full max-w-md rounded-2xl shadow-2xl p-6 border border-[var(--dashboard-border)]">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black tracking-tight text-[var(--dashboard-text)]">
                        {initialData ? "Edit Persona Lokal" : "Daftarkan Persona Admin Lokal"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-[var(--dashboard-surface-soft)] transition-colors text-[var(--dashboard-text-soft)]"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                            placeholder="Contoh: John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                            placeholder="email@rkk.co.id"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">
                            Nomor Telepon
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                            placeholder="08123456789"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        >
                            <option value="active">Aktif</option>
                            <option value="inactive">Nonaktif</option>
                        </select>
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
                            className="flex-1 px-4 py-3 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
                        >
                            {initialData ? "Simpan Perubahan" : "Simpan Persona"}
                        </button>
                    </div>
                </form>
                
                <div className="mt-6 pt-6 border-t border-[var(--dashboard-border-soft)]">
                    <p className="text-[9px] font-bold text-[var(--dashboard-text-soft)] leading-relaxed uppercase italic">
                        * Persona ini adalah entitas database lokal untuk simulasi. Tidak melibatkan sistem password, JWT, atau session production.
                    </p>
                </div>
            </div>
        </div>
    );
}