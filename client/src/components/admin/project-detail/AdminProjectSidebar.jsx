import React from "react";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";

const AdminProjectSidebar = ({ project, stages, isReady }) => {
    return (
        <div className="space-y-6">
            <div className="dashboard-card shadow-sm border-[var(--dashboard-border)]">
                <h3 className="font-black text-[10px] uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-6">Aksi Cepat Admin</h3>
                <div className="flex flex-col gap-3">
                    {(!['active', 'ongoing', 'Berjalan'].includes(project.status)) && (
                        <Link 
                            to="/admin/proyek/aktivasi"
                            className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl text-center flex items-center justify-center
                                ${isReady 
                                    ? "bg-[var(--dashboard-primary)] text-white shadow-[var(--dashboard-primary)]/30 hover:scale-[1.02]" 
                                    : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"}
                            `}
                        >
                            Aktivasi Proyek
                        </Link>
                    )}
                    <button disabled className="w-full py-4 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] cursor-not-allowed">Ringkasan Dokumen (Hold)</button>
                    <button disabled className="w-full py-4 bg-slate-50 border border-slate-100 text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] cursor-not-allowed">Batalkan Proyek (Hold)</button>
                </div>
            </div>

            <div className="dashboard-card bg-[var(--dashboard-primary)] text-white relative overflow-hidden shadow-xl shadow-[var(--dashboard-primary)]/20">
                <div className="relative z-10">
                    <h3 className="font-black text-[10px] uppercase tracking-widest opacity-70 mb-2">Statistik Pengerjaan</h3>
                    <div className="space-y-5 mt-6">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Hari Berjalan</span>
                            <span className="text-2xl font-black">0 <span className="text-[10px] opacity-70">Hari</span></span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Tahap Selesai</span>
                            <span className="text-2xl font-black">0 <span className="text-[10px] opacity-70">/ {stages.length}</span></span>
                        </div>
                    </div>
                </div>
                <FiClock className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
            </div>
        </div>
    );
};

export default AdminProjectSidebar;
