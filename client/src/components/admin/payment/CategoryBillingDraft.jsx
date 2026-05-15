import React, { useState } from "react";
import { FiCheckCircle, FiClock, FiAlertCircle, FiChevronDown, FiChevronUp, FiFilePlus, FiLayers, FiInfo } from "react-icons/fi";

const CategoryBillingDraft = ({ projectId, categories = [], onCreateDraft }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    // Dummy data for items if real data not available
    const dummyItems = [
        { id: 101, name: "Pembersihan Lahan", volume: "100", unit: "m2", total: 5000000, progress: 100 },
        { id: 102, name: "Pemasangan Bowplank", volume: "45", unit: "m'", total: 10000000, progress: 100 }
    ];

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const toggleExpand = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 gap-4">
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg ${cat.progress === 100 ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-blue-500 shadow-blue-500/20'}`}>
                                    <FiLayers size={20} />
                                </div>
                                
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Kategori RAB</p>
                                        <p className="text-sm font-black text-slate-800">{cat.name}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Progres Kategori</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${cat.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${cat.progress}%` }}></div>
                                            </div>
                                            <p className="text-xs font-bold text-slate-600">{cat.progress}%</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Subtotal</p>
                                        <p className="text-xs font-bold text-slate-900">{formatCurrency(cat.total)}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Penagihan</p>
                                        <div className="flex items-center gap-2">
                                            {cat.progress === 100 ? (
                                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tight flex items-center gap-1.5 animate-pulse">
                                                    <FiCheckCircle /> Siap Ditagih
                                                </span>
                                            ) : (
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight flex items-center gap-1.5">
                                                    <FiClock /> Belum 100%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center gap-3">
                                    <button 
                                        onClick={() => toggleExpand(cat.id)}
                                        className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all"
                                    >
                                        {expandedCategory === cat.id ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                                    </button>
                                    <button 
                                        disabled={cat.progress < 100}
                                        onClick={() => onCreateDraft({
                                            type: 'CATEGORY',
                                            itemName: cat.name,
                                            amount: cat.total,
                                            categoryId: cat.id
                                        })}
                                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${cat.progress === 100 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:scale-105' : 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'}`}
                                    >
                                        <FiFilePlus /> Buat Draft
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Expandable Details */}
                        {expandedCategory === cat.id && (
                            <div className="px-8 pb-8 animate-slideDown">
                                <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-100/50 border-b border-slate-100">
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Item Pekerjaan</th>
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Vol</th>
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Subtotal</th>
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Progres</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {(cat.items || dummyItems).map(item => (
                                                <tr key={item.id} className="hover:bg-white transition-all">
                                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-700">{item.name}</td>
                                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500 text-right">{item.volume} {item.unit}</td>
                                                    <td className="px-6 py-4 text-[11px] font-black text-slate-800 text-right">{formatCurrency(item.total)}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${item.progress === 100 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                                            {item.progress}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="p-4 bg-amber-50/50 flex items-center gap-3 border-t border-amber-100/50">
                                        <FiInfo className="text-amber-500" size={14} />
                                        <p className="text-[9px] font-bold text-amber-700 uppercase italic">Preview Struktur RAB - Akan disambungkan ke data RAB proyek batch berikutnya.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryBillingDraft;
