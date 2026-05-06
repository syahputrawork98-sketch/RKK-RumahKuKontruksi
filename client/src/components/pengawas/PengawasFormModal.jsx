// client/src/components/pengawas/PengawasFormModal.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function PengawasFormModal({ isOpen, onClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        nama_lengkap: "",
        nik: "",
        no_telp: "",
        alamat: "",
        foto: "",
        status_aktif: true,
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                status_aktif: initialData.status_aktif !== false,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 animate-in fade-in zoom-in">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        {initialData ? "Edit Pengawas" : "Tambah Pengawas Baru"}
                    </h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nama Lengkap</label>
                        <input
                            type="text"
                            name="nama_lengkap"
                            value={form.nama_lengkap}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:border-emerald-600 focus:ring-emerald-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">NIK</label>
                        <input
                            type="text"
                            name="nik"
                            value={form.nik}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:border-emerald-600 focus:ring-emerald-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Nomor HP</label>
                        <input
                            type="text"
                            name="no_telp"
                            value={form.no_telp}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:border-emerald-600 focus:ring-emerald-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Alamat</label>
                        <textarea
                            name="alamat"
                            value={form.alamat}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:border-emerald-600 focus:ring-emerald-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Link Foto (URL)</label>
                        <input
                            type="text"
                            name="foto"
                            value={form.foto}
                            onChange={handleChange}
                            placeholder="https://example.com/foto.jpg"
                            className="w-full border rounded-lg px-3 py-2 focus:border-emerald-600 focus:ring-emerald-600"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="status_aktif"
                            checked={form.status_aktif}
                            onChange={handleChange}
                            id="status_aktif"
                            className="h-4 w-4"
                        />
                        <label htmlFor="status_aktif" className="text-sm font-medium">
                            Aktif
                        </label>
                    </div>

                    {/* ACTION BUTTON */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                        >
                            {initialData ? "Simpan Perubahan" : "Tambah Pengawas"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
