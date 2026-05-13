import React from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiInfo, FiExternalLink, FiClock, FiCheckCircle } from "react-icons/fi";

const MandorProjectMaterialTab = ({ project, requests = [] }) => {
    // Calculate stats
    const activeRequests = requests.filter(r => ['submitted', 'approved', 'processing'].includes(r.status?.toLowerCase())).length;
    const deliveredRequests = requests.filter(r => ['delivered', 'received', 'completed'].includes(r.status?.toLowerCase())).length;
    const latestRequest = requests?.[0];

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Logistik & Material Site</h3>
                <Link 
                    to="/mandor/request-material"
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-bold shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-105 transition-all"
                >
                    <FiPackage size={14} /> Buat Permintaan
                </Link>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 space-y-4 shadow-sm shadow-blue-500/5">
                <div className="flex items-start gap-4">
                    <FiInfo className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-700 mb-1">Local Material Workflow</h4>
                        <p className="text-[11px] text-blue-600 font-medium leading-relaxed italic">
                            Modul ini digunakan untuk koordinasi stok material di lapangan. <span className="font-black">Bukan sistem e-commerce atau procurement perbankan</span>. 
                            Gunakan untuk mencatat barang masuk dan permintaan barang ke gudang pusat.
                        </p>
                    </div>
                </div>
                
                <div className="pt-4 border-t border-blue-100 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-tighter">Monitoring Status</span>
                        <span className="text-[11px] font-bold text-blue-800">Akses monitoring status permintaan material</span>
                    </div>
                    <Link 
                        to="/mandor/request-material"
                        className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm transition-all hover:bg-blue-50"
                    >
                        KE DASHBOARD MATERIAL <FiExternalLink size={10} />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-white border border-slate-100 rounded-3xl text-center shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Permintaan Aktif</p>
                    <h4 className="text-2xl font-black text-slate-800">{activeRequests}</h4>
                </div>
                <div className="p-5 bg-white border border-slate-100 rounded-3xl text-center shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Terikirim / Diterima</p>
                    <h4 className="text-2xl font-black text-emerald-600">{deliveredRequests}</h4>
                </div>
                <div className="p-5 bg-slate-50 border border-slate-100 border-dashed rounded-3xl text-center opacity-70">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Return (Hold)</p>
                    <h4 className="text-2xl font-black text-slate-400">0</h4>
                </div>
            </div>

            {requests.length > 0 ? (
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Permintaan Terakhir</h4>
                    <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                                <FiPackage size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-tight text-slate-500">{latestRequest.requestCode}</p>
                                <p className="text-xs font-bold text-slate-700">{latestRequest.items?.[0]?.materialName || "Material"}</p>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                latestRequest.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                                {latestRequest.status.replace(/_/g, ' ')}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400">{new Date(latestRequest.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                    <FiPackage className="mx-auto text-slate-200 mb-3" size={40} />
                    <p className="text-xs font-bold text-slate-400 italic">Belum ada pengajuan material untuk proyek ini.</p>
                </div>
            )}
        </div>
    );
};

export default MandorProjectMaterialTab;
