import React from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiPlay } from "react-icons/fi";

const AdminProjectReadinessTab = ({ 
    project, 
    isReady, 
    readyCount, 
    readinessChecks, 
    onActivateClick 
}) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Checklist Kesiapan Project</h3>
                <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${isReady ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-amber-500 text-white shadow-lg shadow-amber-500/30"}`}>
                    {isReady ? "READY TO WORK" : "BELUM LENGKAP"}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {readinessChecks.map((check, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] hover:border-blue-500/20 transition-all">
                        <span className="text-xs font-bold">{check.label}</span>
                        {check.status ? (
                            <FiCheckCircle className="text-emerald-500" size={18} />
                        ) : (
                            <FiAlertCircle className="text-amber-500" size={18} />
                        )}
                    </div>
                ))}
            </div>

            <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] flex gap-6 items-start shadow-sm shadow-blue-100/50">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                    <FiInfo size={24} />
                </div>
                <div>
                    <h4 className="text-sm font-black text-blue-700 uppercase tracking-widest">Analisis Kesiapan Sistem</h4>
                    <p className="text-xs text-blue-600 mt-2 leading-relaxed font-bold">
                        {isReady 
                            ? "Proyek ini telah memenuhi seluruh kriteria administratif awal. Pengawas dan Mandor dapat mulai melakukan aktivitas pelaporan di lapangan secara sinkron."
                            : `Masih ada ${readinessChecks.length - readyCount} kriteria yang belum terpenuhi. Mohon lengkapi seluruh data administratif (Tim & RAB) agar proyek dapat diproses oleh Pengawas.`
                        }
                    </p>
                </div>
            </div>

            {(!['active', 'ongoing', 'Berjalan'].includes(project.status)) && (
                <div className="pt-4 flex justify-center">
                    {isReady ? (
                        <button 
                            onClick={onActivateClick}
                            className="px-10 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all animate-bounce"
                        >
                            <FiPlay className="inline mr-2" /> Aktifkan Proyek Sekarang
                        </button>
                    ) : (
                        <div className="text-center space-y-2 opacity-50">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Tombol Aktivasi Terkunci</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Lengkapi seluruh checklist di atas untuk mengaktifkan fungsi operasional.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminProjectReadinessTab;
