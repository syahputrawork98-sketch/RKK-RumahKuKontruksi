// client/src/components/admin/AdminFormModal.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AdminFormModal({ isOpen, onClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        nama: "",
        email: "",
        password: "",
        no_hp: "",
        alamat: "",
        role: "admin",
        foto: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({ ...initialData, password: "" });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
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
                        {initialData ? "Edit Admin" : "Tambah Admin Baru"}
                    </h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nama Admin</label>
                        <input
                            type="text"
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:border-emerald-600 focus:ring-emerald-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:border-emerald-600 focus:ring-emerald-600"
                            required
                        />
                    </div>

                    {!initialData && (
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:border-emerald-600 focus:ring-emerald-600"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium">Nomor HP</label>
                        <input
                            type="text"
                            name="no_hp"
                            value={form.no_hp}
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

                    {/* ROLE */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:border-emerald-600 focus:ring-emerald-600"
                        >
                            <option value="admin">Admin</option>
                            <option value="superadmin">Superadmin</option>
                        </select>
                    </div>

                    {/* FOTO */}
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
                            {initialData ? "Simpan Perubahan" : "Tambah Admin"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}