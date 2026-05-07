import React, { useState } from "react";
import { FiSave, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CreateProyekAdminPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        customer: "",
        location: "",
        type: "Rumah Tinggal",
        budget: "",
        startDate: "",
        notes: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Project:", formData);
        alert("Simulasi: Proyek Berhasil Dibuat!\n(Data dicatat di console log)");
        navigate("/admin/proyek");
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate("/admin/proyek")}
                    className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                >
                    <FiArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Buat Proyek Baru</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] italic">Inisialisasi data proyek konstruksi baru.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="dashboard-card space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Nama Proyek</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    placeholder="Contoh: Renovasi Rumah Pak Agus"
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Customer</label>
                                <select 
                                    required
                                    className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    onChange={(e) => setFormData({...formData, customer: e.target.value})}
                                >
                                    <option value="">Pilih Customer...</option>
                                    <option value="1">Bpk. Budi Santoso</option>
                                    <option value="2">Ibu Maria Ulfa</option>
                                    <option value="3">PT. Maju Jaya</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Lokasi Proyek</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    placeholder="Alamat lengkap lokasi konstruksi"
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Tipe Proyek</label>
                                <select 
                                    className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                >
                                    <option>Rumah Tinggal</option>
                                    <option>Ruko / Komersial</option>
                                    <option>Industrial / Gudang</option>
                                    <option>Renovasi</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Estimasi Budget (Rp)</label>
                                <input 
                                    required
                                    type="number" 
                                    className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    placeholder="Contoh: 500000000"
                                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Tanggal Estimasi Mulai</label>
                                <input 
                                    required
                                    type="date" 
                                    className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Catatan Tambahan</label>
                                <textarea 
                                    rows="4"
                                    className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    placeholder="Kebutuhan khusus atau catatan lapangan..."
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[var(--dashboard-border)] flex justify-end">
                            <button 
                                type="submit"
                                className="flex items-center gap-2 px-8 py-3 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                            >
                                <FiSave />
                                Simpan Proyek
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card border-l-4 border-amber-500 bg-amber-500/5">
                        <div className="flex gap-3">
                            <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider">Penting</h4>
                                <p className="text-[10px] leading-relaxed text-amber-700 font-medium">
                                    Pastikan data customer sudah terdaftar di modul Konsumen sebelum membuat proyek baru. 
                                    Input budget hanya berupa estimasi kotor; RAB detail akan disusun di modul terpisah.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProyekAdminPage;
