import React, { useState } from "react";
import { 
    FiPackage, 
    FiActivity, 
    FiCreditCard, 
    FiClock, 
    FiAlertCircle, 
    FiChevronRight,
    FiCheckCircle,
    FiInfo
} from "react-icons/fi";

const RabCategoryPaymentPreview = ({ projects = [] }) => {
    const [selectedProjectId, setSelectedProjectId] = useState("");
    
    // Dummy Data for RAB Categories if no project selected or for preview
    const dummyCategories = [
        { id: 1, name: "Pekerjaan Persiapan", total: 15000000, progress: 100, status: "PAID" },
        { id: 2, name: "Pekerjaan Tanah & Pasir", total: 25000000, progress: 100, status: "PAID" },
        { id: 3, name: "Pekerjaan Struktur Lantai 1", total: 120000000, progress: 85, status: "WAITING_VERIFICATION" },
        { id: 4, name: "Pekerjaan Pasangan Dinding", total: 85000000, progress: 15, status: "DRAFT" },
        { id: 5, name: "Pekerjaan Kusen & Pintu", total: 45000000, progress: 0, status: "NOT_STARTED" }
    ];

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'PAID': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'WAITING_VERIFICATION': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'DRAFT': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-slate-100 text-slate-400 border-slate-200';
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Project Selector */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm border border-blue-100">
                        <FiPackage size={24} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Preview Billing per Kategori</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mode: Termin Berbasis Selesai Pekerjaan</p>
                    </div>
                </div>
                <div className="w-full md:w-72">
                    <select 
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:ring-4 focus:ring-blue-500/5 focus:outline-none"
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                    >
                        <option value="">Pilih Proyek...</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                        <option value="dummy">Contoh Proyek: Villa Canggu</option>
                    </select>
                </div>
            </div>

            {/* RAB Category List */}
            <div className="grid grid-cols-1 gap-4">
                {dummyCategories.map((cat) => (
                    <div key={cat.id} className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <h4 className="text-base font-black text-slate-800">{cat.name}</h4>
                                    <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${getStatusStyle(cat.status)}`}>
                                        {cat.status.replace(/_/g, ' ')}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Subtotal Kategori</p>
                                        <p className="text-sm font-black text-slate-900 tracking-tight">{formatCurrency(cat.total)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Progres Pekerjaan</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-1000 ${cat.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                                    style={{ width: `${cat.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-700">{cat.progress}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Penagihan</p>
                                        <p className="text-[10px] font-bold text-slate-600">
                                            {cat.status === 'PAID' ? 'Sudah Lunas' : 
                                             cat.status === 'WAITING_VERIFICATION' ? 'Menunggu Verifikasi Admin' :
                                             cat.progress > 80 ? 'Siap Ditagihkan' : 'Pekerjaan Belum Selesai'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-48 flex flex-col justify-center items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                <button 
                                    disabled={cat.status === 'PAID' || cat.progress < 100}
                                    className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                        cat.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                        cat.progress >= 100 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:scale-105' :
                                        'bg-white border border-slate-200 text-slate-300 cursor-not-allowed'
                                    }`}
                                >
                                    {cat.status === 'PAID' ? 'Terbayar' : 'Buat Tagihan'}
                                </button>
                                {cat.progress < 100 && cat.progress > 0 && (
                                    <p className="text-[8px] text-center text-slate-400 font-bold uppercase tracking-tight">
                                        Selesaikan 100% untuk menagih
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Box */}
            <div className="p-6 bg-amber-50 border border-amber-100 rounded-[2rem] flex gap-4 items-start shadow-sm">
                <FiInfo className="text-amber-500 shrink-0 mt-1" size={24} />
                <div className="space-y-1">
                    <h4 className="text-xs font-black text-amber-700 uppercase tracking-widest">Konsep Billing Per Kategori</h4>
                    <p className="text-[10px] text-amber-600 leading-relaxed font-bold uppercase italic tracking-tighter">
                        Tagihan dibuat berdasarkan kategori pekerjaan yang telah diselesaikan 100% di lapangan (diverifikasi pengawas). Sistem ini memberikan fleksibilitas arus kas bagi RKK dan Konsumen sesuai realisasi fisik.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RabCategoryPaymentPreview;
