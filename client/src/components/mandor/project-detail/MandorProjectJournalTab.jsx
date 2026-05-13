import React from "react";
import { Link } from "react-router-dom";
import { FiFileText, FiCheckCircle, FiClock, FiPlus, FiChevronRight, FiCalendar } from "react-icons/fi";

const MandorProjectJournalTab = ({ project, journals = [], reports = [] }) => {
    const latestJournal = journals?.[0];
    const latestReport = reports?.[0];

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Sistem Pelaporan Jurnal</h3>
                <Link 
                    to="/mandor/jurnal-mingguan/create"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-800/20 hover:scale-105 transition-all"
                >
                    <FiPlus size={14} /> Buat Jurnal Baru
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Jurnal Mingguan Summary */}
                <div className="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FiFileText size={24} />
                        </div>
                        <Link to="/mandor/jurnal-mingguan" className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-500 transition-colors">
                            <FiChevronRight size={18} />
                        </Link>
                    </div>
                    <h4 className="text-sm font-black text-slate-800 mb-1 uppercase tracking-tight">Jurnal Mingguan</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">
                        Status verifikasi dan progres mingguan.
                    </p>
                    
                    {latestJournal ? (
                        <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-black text-slate-400 uppercase">Periode Terakhir</span>
                                <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full ${
                                    latestJournal.status === 'reviewed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    {latestJournal.status}
                                </span>
                            </div>
                            <p className="text-xs font-bold text-slate-700">
                                {new Date(latestJournal.weekStartDate).toLocaleDateString('id-ID')} - {new Date(latestJournal.weekEndDate).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    ) : (
                        <div className="mt-auto p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                            <p className="text-[10px] font-bold text-slate-400 italic">Belum ada jurnal mingguan.</p>
                        </div>
                    )}
                </div>

                {/* Laporan Harian Summary */}
                <div className="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FiCalendar size={24} />
                        </div>
                        <Link to="/mandor/laporan-harian" className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-500 transition-colors">
                            <FiChevronRight size={18} />
                        </Link>
                    </div>
                    <h4 className="text-sm font-black text-slate-800 mb-1 uppercase tracking-tight">Logbook Harian</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">
                        Catatan aktivitas site harian.
                    </p>

                    {latestReport ? (
                        <div className="mt-auto p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Update Terakhir</span>
                                <span className="text-[9px] font-bold text-emerald-500">{new Date(latestReport.reportDate).toLocaleDateString('id-ID')}</span>
                            </div>
                            <p className="text-xs font-black text-slate-700 truncate">
                                {latestReport.weather || "Cerah"} • {latestReport.totalWorkers || 0} Pekerja
                            </p>
                        </div>
                    ) : (
                        <div className="mt-auto p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                            <p className="text-[10px] font-bold text-slate-400 italic">Belum ada laporan harian.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 bg-[var(--dashboard-surface-soft)] rounded-3xl border border-[var(--dashboard-border)] border-dashed flex gap-4 items-center shadow-inner">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                    <FiClock size={20} />
                </div>
                <div>
                    <h5 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Panduan Pelaporan</h5>
                    <p className="text-[11px] text-slate-400 font-bold uppercase italic leading-relaxed">
                        Pastikan setiap laporan melampirkan dokumentasi visual (foto) yang jelas untuk mempercepat proses verifikasi oleh Pengawas.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MandorProjectJournalTab;
