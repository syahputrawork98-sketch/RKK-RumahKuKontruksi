import React from 'react';
import { FiX, FiFileText, FiType, FiDollarSign, FiMapPin, FiInfo, FiList } from "react-icons/fi";

const CreateDesignRequestModal = ({ 
    isOpen, 
    onClose, 
    formData, 
    setFormData, 
    onSubmit, 
    submitting 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-[32px] w-full max-w-xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-scaleIn">
                <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                    <div>
                        <h3 className="text-xl font-black text-gray-800">Buat Draft Brief Desain</h3>
                        <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest mt-0.5">Simulasi pengajuan brief lokal</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><FiX size={24} /></button>
                </div>
                
                <form onSubmit={onSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                            <FiFileText /> Judul Pengajuan / Nama Proyek
                        </label>
                        <input 
                            required 
                            type="text" 
                            placeholder="Contoh: Desain Rumah Minimalis Modern Tropis"
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" 
                            value={formData.title} 
                            onChange={(e) => setFormData({...formData, title: e.target.value})} 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                                <FiType /> Tipe Bangunan
                            </label>
                            <input 
                                type="text" 
                                placeholder="Rumah Tinggal, Ruko, dsb"
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" 
                                value={formData.buildingType} 
                                onChange={(e) => setFormData({...formData, buildingType: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                                <FiDollarSign /> Estimasi Budget
                            </label>
                            <input 
                                type="number" 
                                placeholder="Dalam Rupiah"
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" 
                                value={formData.estimatedBudget} 
                                onChange={(e) => setFormData({...formData, estimatedBudget: e.target.value})} 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                            <FiMapPin /> Lokasi Pembangunan
                        </label>
                        <input 
                            type="text" 
                            placeholder="Alamat lengkap atau kota"
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" 
                            value={formData.location} 
                            onChange={(e) => setFormData({...formData, location: e.target.value})} 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                            <FiInfo /> Deskripsi Brief / Keinginan
                        </label>
                        <textarea 
                            rows="3" 
                            placeholder="Jelaskan detail kebutuhan umum Anda..."
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none" 
                            value={formData.description || ""} 
                            onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        />
                    </div>

                    <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 space-y-4">
                        <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-widest flex items-center gap-2">
                            <FiList /> Structured Design Brief Section
                        </h4>
                        
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500">Kebutuhan Ruang (Kamar, Kamar Mandi, dll)</label>
                                <textarea 
                                    rows="2"
                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                                    value={formData.roomRequirements}
                                    onChange={(e) => setFormData({...formData, roomRequirements: e.target.value})}
                                    placeholder="Misal: 3 Kamar Tidur, 2 Kamar Mandi, Ruang Kerja..."
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500">Gaya Desain (Style)</label>
                                <input 
                                    type="text"
                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    value={formData.designStyle}
                                    onChange={(e) => setFormData({...formData, designStyle: e.target.value})}
                                    placeholder="Misal: Minimalis Modern, Industrial, Klasik..."
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500">Prioritas Desain</label>
                                <textarea 
                                    rows="2"
                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                                    value={formData.designPriorities}
                                    onChange={(e) => setFormData({...formData, designPriorities: e.target.value})}
                                    placeholder="Apa yang paling penting bagi Anda? (Misal: Pencahayaan Alami, Hemat Energi...)"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500">Batasan Lokasi/Lahan</label>
                                <textarea 
                                    rows="2"
                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                                    value={formData.siteConstraints}
                                    onChange={(e) => setFormData({...formData, siteConstraints: e.target.value})}
                                    placeholder="Misal: Lahan miring, ada pohon yang ingin dipertahankan..."
                                />
                            </div>
                        </div>

                        <p className="text-[10px] text-amber-600 font-bold italic mt-2">
                            * Brief ini akan dikurasi oleh Admin sebelum dikirim ke Arsitek.
                        </p>
                    </div>

                    <div className="pt-6 flex flex-col md:flex-row gap-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="flex-1 px-6 py-3.5 border border-gray-100 text-gray-400 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
                        >
                            Batal
                        </button>
                        <button 
                            type="submit" 
                            disabled={submitting} 
                            className="flex-[2] px-8 py-3.5 bg-teal-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {submitting ? "Mengirimkan..." : "Kirim Pengajuan Desain"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDesignRequestModal;
