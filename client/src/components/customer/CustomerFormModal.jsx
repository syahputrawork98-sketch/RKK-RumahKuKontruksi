import React, { useState, useEffect } from "react";
import { FiX, FiCheck } from "react-icons/fi";

export default function CustomerFormModal({ isOpen, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        customerType: "Individual",
        name: "",
        email: "",
        phone: "",
        address: "",
        companyName: "",
        picName: "",
        picPosition: "",
        taxNumber: "",
        businessField: "",
        notes: "",
        status: "active"
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                customerType: initialData.customerType || "Individual",
                name: initialData.name || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                address: initialData.address || "",
                companyName: initialData.companyName || "",
                picName: initialData.picName || "",
                picPosition: initialData.picPosition || "",
                taxNumber: initialData.taxNumber || "",
                businessField: initialData.businessField || "",
                notes: initialData.notes || "",
                status: initialData.status || "active"
            });
        } else {
            setFormData({
                customerType: "Individual",
                name: "",
                email: "",
                phone: "",
                address: "",
                companyName: "",
                picName: "",
                picPosition: "",
                taxNumber: "",
                businessField: "",
                notes: "",
                status: "active"
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
            <div className="bg-[var(--dashboard-surface)] w-full max-w-2xl rounded-2xl shadow-2xl p-6 border border-[var(--dashboard-border)] overflow-y-auto max-h-[90vh]">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black tracking-tight text-[var(--dashboard-text)]">
                        {initialData ? "Edit Persona Konsumen" : "Tambah Persona Konsumen Lokal"}
                    </h2>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--dashboard-surface-soft)] transition-colors text-[var(--dashboard-text-soft)]">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tipe Konsumen */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Tipe Konsumen</label>
                        <div className="flex gap-4">
                            {["Individual", "Corporate"].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData({...formData, customerType: type})}
                                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                                        formData.customerType === type 
                                        ? "bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-600/20" 
                                        : "bg-[var(--dashboard-surface-soft)] border-[var(--dashboard-border-soft)] text-[var(--dashboard-text-soft)] hover:border-teal-500/30"
                                    }`}
                                >
                                    {formData.customerType === type && <FiCheck />}
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formData.customerType === "Individual" ? (
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Nama Lengkap</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    placeholder="Nama Konsumen..."
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Nama Perusahaan</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                        placeholder="PT. Contoh Perusahaan..."
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Nama PIC</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                        placeholder="Nama PIC..."
                                        value={formData.picName}
                                        onChange={(e) => setFormData({...formData, picName: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Jabatan PIC</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                        placeholder="Jabatan PIC..."
                                        value={formData.picPosition}
                                        onChange={(e) => setFormData({...formData, picPosition: e.target.value})}
                                    />
                                </div>
                            </>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Email</label>
                            <input 
                                required
                                type="email" 
                                className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                placeholder="email@contoh.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Telepon</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                placeholder="0812xxxx"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Alamat Lengkap</label>
                            <textarea 
                                rows="3"
                                className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
                                placeholder="Alamat penagihan/domisili..."
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border-soft)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                            >
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
                            </select>
                        </div>
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
                            className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20"
                        >
                            {initialData ? "Simpan Perubahan" : "Tambah Persona Konsumen"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
