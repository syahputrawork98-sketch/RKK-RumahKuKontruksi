import React from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiCreditCard, FiClock } from "react-icons/fi";

const MandorProjectSidebar = ({ project, stages }) => {
    return (
        <div className="space-y-6">
            <div className="dashboard-card shadow-sm border-[var(--dashboard-border)]">
                <h3 className="font-black text-[10px] uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-6">Informasi Kontak Site</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                            <FiUsers />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase">Pengawas Proyek</p>
                            <h4 className="text-xs font-black">{project.supervisor?.name || "BELUM ADA"}</h4>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <FiUsers />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase">Admin Penanggung Jawab</p>
                            <h4 className="text-xs font-black">{project.admin?.name || "BELUM ADA"}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-card bg-emerald-600 text-white relative overflow-hidden shadow-xl shadow-emerald-600/20">
                <div className="relative z-10">
                    <h3 className="font-black text-[10px] uppercase tracking-widest opacity-70 mb-2">Pencapaian Mingguan</h3>
                    <div className="space-y-5 mt-6">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Laporan Terkirim</span>
                            <span className="text-2xl font-black">0 <span className="text-[10px] opacity-70">Minggu</span></span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Tahap Selesai</span>
                            <span className="text-2xl font-black">0 <span className="text-[10px] opacity-70">/ {stages.length}</span></span>
                        </div>
                    </div>
                </div>
                <FiClock className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
            </div>

            <div className="dashboard-card border-dashed border-2 border-slate-200 bg-slate-50 opacity-70">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400">
                        <FiCreditCard />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Info Pembayaran</h4>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase italic leading-relaxed">
                    Data pembayaran mandor hanya dapat dilihat melalui modul "Mandor Payment Eligibility" yang diatur oleh Admin.
                </p>
            </div>
        </div>
    );
};

export default MandorProjectSidebar;
