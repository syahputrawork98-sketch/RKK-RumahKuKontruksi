import React, { useState } from "react";
import { FiLayers, FiAlertCircle, FiChevronDown, FiChevronUp, FiCheckCircle, FiClock } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency, formatDateShort } from "./MandorProjectDetailUIHelpers";

const MandorProjectScopeTab = ({ stages }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const toggleCategory = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    const getStatusIcon = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("finish") || s?.includes("selesai") || s?.includes("completed")) return <FiCheckCircle className="text-purple-500 shrink-0" />;
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("berjalan") || s?.includes("in_progress")) return <FiClock className="text-emerald-500 animate-pulse shrink-0" />;
        return <FiClock className="text-slate-300 shrink-0" />;
    };

    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("berjalan") || s?.includes("in_progress")) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
        if (s?.includes("finish") || s?.includes("selesai") || s?.includes("completed")) return "bg-purple-500/10 text-purple-600 border-purple-500/20";
        return "bg-slate-100 text-slate-500 border-slate-200";
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Kategori Pekerjaan RAB</h3>
            </div>

            {stages.length > 0 ? (
                <div className="space-y-4">
                    {stages.map((stg) => {
                        const isExpanded = expandedCategory === stg.id;
                        const items = stg.rabItems || [];
                        
                        return (
                            <div key={stg.id} className="overflow-hidden bg-white rounded-3xl border border-[var(--dashboard-border)] shadow-sm hover:shadow-md transition-all">
                                {/* Header / Accordion Trigger */}
                                <div 
                                    className={`p-5 flex items-center justify-between cursor-pointer transition-colors ${isExpanded ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                                    onClick={() => toggleCategory(stg.id)}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 border border-slate-200">
                                            {stg.code?.replace('STG-', '') || stg.order}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-800">{stg.title}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${getStatusColor(stg.status)}`}>
                                                    {stg.status}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400">
                                                    {items.length} Item Pekerjaan
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 px-4">
                                        <div className="hidden md:block w-32">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[9px] font-black text-slate-400 uppercase">Progress</span>
                                                <span className="text-[10px] font-black text-blue-600">{stg.progress || 0}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-500 rounded-full transition-all duration-700" 
                                                    style={{ width: `${stg.progress || 0}%` }}
                                                />
                                            </div>
                                        </div>
                                        
                                        {isExpanded ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
                                    </div>
                                </div>

                                {/* Content / Items List */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="border-t border-slate-100 p-6 bg-white overflow-hidden">
                                                {items.length > 0 ? (
                                                    <div className="overflow-x-auto -mx-6 px-6">
                                                        <table className="w-full text-left border-collapse">
                                                            <thead>
                                                                <tr className="border-b border-slate-100">
                                                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">No</th>
                                                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest min-w-[200px]">Uraian Pekerjaan</th>
                                                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Volume</th>
                                                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Harga Satuan</th>
                                                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Jumlah</th>
                                                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-slate-50">
                                                                {items.map((item, idx) => (
                                                                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                                                        <td className="py-4 text-[10px] font-bold text-slate-400">{idx + 1}</td>
                                                                        <td className="py-4">
                                                                            <p className="text-xs font-bold text-slate-700">{item.description}</p>
                                                                            <p className="text-[9px] text-slate-400 mt-0.5">ID: {item.id}</p>
                                                                        </td>
                                                                        <td className="py-4 text-center">
                                                                            <span className="text-xs font-black text-slate-600">{Number(item.volume)}</span>
                                                                            <span className="text-[10px] font-bold text-slate-400 ml-1">{item.unit}</span>
                                                                        </td>
                                                                        <td className="py-4 text-right text-xs font-bold text-slate-500">
                                                                            {formatCurrency(Number(item.unitPrice))}
                                                                        </td>
                                                                        <td className="py-4 text-right text-xs font-black text-slate-800">
                                                                            {formatCurrency(Number(item.total))}
                                                                        </td>
                                                                        <td className="py-4 text-center">
                                                                            <div className="flex justify-center">
                                                                                {getStatusIcon(item.status)}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center py-8 text-slate-400 italic">
                                                        <p className="text-xs">Belum ada item pekerjaan untuk kategori ini.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-[var(--dashboard-border)] rounded-[3rem]">
                    <FiLayers size={48} className="text-slate-200 mb-4" />
                    <p className="text-sm font-bold text-slate-400">Belum ada kategori pekerjaan RAB untuk proyek ini.</p>
                </div>
            )}

            <div className="p-5 bg-blue-50 border border-blue-100 rounded-3xl flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                    <FiAlertCircle className="text-blue-600" />
                </div>
                <p className="text-[10px] font-bold text-blue-900 leading-relaxed uppercase">
                    Kategori pekerjaan mengikuti RAB yang sudah dikunci. Mandor menggunakan daftar ini sebagai acuan laporan jurnal, material, dan progres lapangan.
                </p>
            </div>
        </div>
    );
};

export default MandorProjectScopeTab;
