import React from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiInfo, FiExternalLink } from "react-icons/fi";

const MandorProjectMaterialTab = ({ project }) => {
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

            <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 space-y-4">
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
                        className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm"
                    >
                        KE DASHBOARD MATERIAL <FiExternalLink size={10} />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-white border border-slate-100 rounded-3xl text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Permintaan Aktif</p>
                    <h4 className="text-2xl font-black text-slate-800">0</h4>
                </div>
                <div className="p-5 bg-white border border-slate-100 rounded-3xl text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Barang Diterima</p>
                    <h4 className="text-2xl font-black text-emerald-600">0</h4>
                </div>
                <div className="p-5 bg-white border border-slate-100 rounded-3xl text-center opacity-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Return (Hold)</p>
                    <h4 className="text-2xl font-black text-slate-400">0</h4>
                </div>
            </div>
        </div>
    );
};

export default MandorProjectMaterialTab;
