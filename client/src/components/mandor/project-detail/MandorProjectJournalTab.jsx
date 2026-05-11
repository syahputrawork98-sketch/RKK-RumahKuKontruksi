import React from "react";
import { Link } from "react-router-dom";
import { FiFileText, FiCheckCircle, FiClock, FiPlus } from "react-icons/fi";

const MandorProjectJournalTab = ({ project }) => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Sistem Pelaporan Jurnal</h3>
                <Link 
                    to="/mandor/laporan-mingguan/create"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-800/20 hover:scale-105 transition-all"
                >
                    <FiPlus size={14} /> Buat Laporan Baru
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FiFileText size={24} />
                    </div>
                    <h4 className="text-sm font-black text-slate-800 mb-2 uppercase tracking-tight">Jurnal Mingguan</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                        Laporkan aktivitas mingguan, penggunaan tenaga kerja, dan kendala lapangan untuk diverifikasi Pengawas.
                    </p>
                    <Link to="/mandor/laporan-mingguan" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Lihat Riwayat Laporan →</Link>
                </div>

                <div className="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FiCheckCircle size={24} />
                    </div>
                    <h4 className="text-sm font-black text-slate-800 mb-2 uppercase tracking-tight">Status Verifikasi</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                        Pantau status verifikasi laporan Anda oleh Pengawas. Progres fisik hanya akan bertambah jika laporan disetujui.
                    </p>
                    <Link to="/mandor/laporan-mingguan" className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:underline">Cek Status Verifikasi →</Link>
                </div>
            </div>

            <div className="p-6 bg-[var(--dashboard-surface-soft)] rounded-3xl border border-[var(--dashboard-border)] border-dashed flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                    <FiClock size={20} />
                </div>
                <div>
                    <h5 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Akses Jurnal Harian (Hold)</h5>
                    <p className="text-[11px] text-slate-400 font-bold uppercase italic">Modul jurnal harian sedang dalam tahap sinkronisasi dengan jadwal site operasional.</p>
                </div>
            </div>
        </div>
    );
};

export default MandorProjectJournalTab;
