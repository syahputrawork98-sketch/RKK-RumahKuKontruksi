import React from "react";
import { FiCheckCircle, FiClock, FiAlertCircle, FiInfo } from "react-icons/fi";

const CategoryPaymentSetup = ({ categories = [], totalValue = 1000000000 }) => {
    // If no categories provided, use dummy data
    const displayCategories = categories.length > 0 ? categories : [
        { id: 1, name: "Pekerjaan Persiapan", total: 15000000, progress: 100, isEligible: true },
        { id: 2, name: "Pekerjaan Tanah & Pasir", total: 25000000, progress: 100, isEligible: true },
        { id: 3, name: "Pekerjaan Struktur Lantai 1", total: 120000000, progress: 85, isEligible: false },
        { id: 4, name: "Pekerjaan Pasangan Dinding", total: 85000000, progress: 15, isEligible: false }
    ];

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori Pekerjaan</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Subtotal</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Progres Fisik</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Kelayakan</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {displayCategories.map((cat) => (
                                <tr key={cat.id} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-slate-800">{cat.name}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">ID: {cat.id.toString().padStart(3, '0')}</p>
                                    </td>
                                    <td className="px-8 py-6 text-right font-black text-slate-900 text-sm">
                                        {formatCurrency(cat.total)}
                                    </td>
                                    <td className="px-8 py-6 w-48">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-1000 ${cat.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                                    style={{ width: `${cat.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-700">{cat.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {cat.progress === 100 ? (
                                                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-[8px] font-black uppercase tracking-widest">
                                                    <FiCheckCircle /> Siap Ditagih
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-400 border border-slate-200 rounded-full text-[8px] font-black uppercase tracking-widest">
                                                    <FiClock /> Belum Layak
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button 
                                            disabled={cat.progress < 100}
                                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${cat.progress === 100 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:scale-105' : 'bg-slate-50 text-slate-200 border border-slate-100 cursor-not-allowed'}`}
                                        >
                                            Buat Tagihan
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-6 bg-amber-50 border border-amber-100 rounded-[2rem] flex gap-4 items-start shadow-sm">
                <FiInfo className="text-amber-500 shrink-0 mt-1" size={24} />
                <div className="space-y-1">
                    <h4 className="text-xs font-black text-amber-700 uppercase tracking-widest">Mode Kelayakan Penagihan</h4>
                    <p className="text-[10px] text-amber-600 leading-relaxed font-bold uppercase italic tracking-tighter">
                        Dalam mode "Per Kategori RAB", tagihan hanya dapat dibuat jika progress fisik pada kategori tersebut telah mencapai 100% dan telah diverifikasi oleh tim pengawas lapangan.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CategoryPaymentSetup;
