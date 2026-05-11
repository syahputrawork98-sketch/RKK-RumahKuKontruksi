import React from "react";
import { Link } from "react-router-dom";
import { FiInfo, FiPackage } from "react-icons/fi";

const AdminProjectLogisticsTab = ({ loadingLogistik, materialRequests }) => {
    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("pengerjaan") || s?.includes("berjalan")) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        if (s?.includes("persiapan") || s?.includes("plan") || s?.includes("planning")) return "bg-blue-500/10 text-blue-500 border-blue-500/20";
        if (s?.includes("finish") || s?.includes("selesai")) return "bg-purple-500/10 text-purple-500 border-purple-500/20";
        if (s?.includes("stop") || s?.includes("terhenti")) return "bg-red-500/10 text-red-500 border-red-500/20";
        if (s?.includes("received") || s?.includes("diterima")) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        if (s?.includes("processed") || s?.includes("diproses")) return "bg-blue-500/10 text-blue-500 border-blue-500/20";
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Permintaan Material (Logistik)</h3>
                <Link 
                    to={`/admin/logistik`}
                    className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
                >
                    Kelola Seluruh Logistik
                </Link>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 flex items-start gap-4">
                <FiInfo className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-700 mb-1">Local Logistics Monitoring</h4>
                    <p className="text-[11px] text-blue-600 font-medium leading-relaxed italic">
                        Daftar ini mencatat koordinasi kebutuhan material di lapangan. <span className="font-black">Bukan sistem procurement perbankan</span>. 
                        Status distribusi di sini bersifat informatif untuk manajemen site lokal.
                    </p>
                </div>
            </div>

            {loadingLogistik ? (
                <div className="py-20 text-center">
                    <div className="w-8 h-8 border-2 border-[var(--dashboard-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Memuat Logistik...</p>
                </div>
            ) : materialRequests.length > 0 ? (
                <div className="space-y-3">
                    {materialRequests.map(req => (
                        <div key={req.id} className="flex items-center justify-between p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] hover:border-[var(--dashboard-primary)]/30 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[var(--dashboard-primary)] transition-colors">
                                    <FiPackage />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase">{req.requestCode}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase border ${getStatusColor(req.status)}`}>
                                            {req.status?.replace(/_/g, ' ')}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-bold">{req.items?.[0]?.materialName} {req.items?.length > 1 ? `(+${req.items.length - 1} item)` : ''}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Oleh: {req.foreman?.name || 'Mandor'}</p>
                                </div>
                            </div>
                            <Link 
                                to={`/admin/logistik`} 
                                className="px-4 py-2 bg-white text-slate-800 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all shadow-sm"
                            >
                                TINJAU
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[var(--dashboard-border)] rounded-3xl">
                    <FiPackage size={48} className="text-[var(--dashboard-text-soft)] opacity-20 mb-4" />
                    <p className="text-sm font-bold text-[var(--dashboard-text-soft)]">Belum ada permintaan material.</p>
                </div>
            )}
        </div>
    );
};

export default AdminProjectLogisticsTab;
