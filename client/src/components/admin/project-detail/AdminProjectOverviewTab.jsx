import React from "react";
import { Link } from "react-router-dom";
import { FiInfo, FiCheckCircle, FiX, FiDollarSign, FiCalendar, FiAlertCircle, FiLayers } from "react-icons/fi";
import { InfoItem, StatusBadge, formatCurrency, formatDate } from "./ProjectDetailUIHelpers";

const AdminProjectOverviewTab = ({ project, isReady, readyCount, readinessChecks }) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            {/* BRIDGE INDICATOR */}
            {project.sourceDesignRequestId && (
                <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <FiLayers />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Draft dari Permintaan Desain</p>
                            <h4 className="text-sm font-bold text-slate-800">Berasal dari Desain: {project.designRequests?.[0]?.title || "Detail Desain"}</h4>
                        </div>
                    </div>
                    <Link 
                        to={`/admin/design-requests`} 
                        className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-sm"
                    >
                        Lihat Brief Desain
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)] flex items-center gap-2">
                        <FiInfo /> Ringkasan Operasional Lokal
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <InfoItem label="Kode Proyek" value={project.projectCode} />
                        <InfoItem label="Nama Proyek" value={project.name} />
                        <InfoItem label="Tipe Pekerjaan" value={project.type || "Pembangunan"} />
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Lapangan</p>
                            <div className="flex items-center gap-2">
                                <StatusBadge status={project.status} />
                                <span className="text-[10px] font-bold text-slate-500 italic">
                                    {['active', 'ongoing', 'Berjalan'].includes(project.status) 
                                        ? "— Operasional Sedang Berjalan" 
                                        : "— Menunggu Aktivasi Admin"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* READINESS CHECKLIST (Only for non-active projects) */}
                {!['active', 'ongoing', 'Berjalan'].includes(project.status) && (
                    <div className="p-6 bg-[var(--dashboard-surface-soft)] rounded-[32px] border border-[var(--dashboard-border)] border-dashed">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-text-soft)] flex items-center gap-2">
                                <FiCheckCircle /> Checklist Kesiapan Aktivasi
                            </h3>
                            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${isReady ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                {readyCount}/{readinessChecks.length} Lengkap
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {readinessChecks.map((check, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs font-bold">
                                    <span className={check.status ? "text-slate-700" : "text-slate-400"}>{check.label}</span>
                                    {check.status ? (
                                        <FiCheckCircle className="text-emerald-500" size={16} />
                                    ) : (
                                        <FiX className="text-slate-300" size={16} />
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {isReady && (
                            <div className="mt-6 p-4 bg-emerald-600 text-white rounded-2xl text-center shadow-lg shadow-emerald-600/20">
                                <p className="text-[10px] font-black uppercase tracking-widest mb-2">🚀 Proyek Siap Dijalankan</p>
                                <Link to="/admin/proyek/aktivasi" className="text-xs font-black underline">Klik di sini untuk Aktifkan Proyek</Link>
                            </div>
                        )}
                    </div>
                )}

                <div className="space-y-6">
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)] flex items-center gap-2">
                        <FiDollarSign /> Kontrak & Jadwal
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <InfoItem label="Nilai Kontrak RAB" value={formatCurrency(project.budgetTotal)} isBold />
                        <div className="grid grid-cols-2 gap-4">
                            <InfoItem label="Terbayar" value={formatCurrency(project.paidAmount)} color="text-blue-600" />
                            <InfoItem label="Piutang" value={formatCurrency(project.remainingAmount)} color="text-orange-600" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InfoItem label="Mulai" value={formatDate(project.startDate)} icon={<FiCalendar />} />
                            <InfoItem label="Estimasi" value={formatDate(project.estimatedEndDate)} icon={<FiCalendar />} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-[var(--dashboard-border)]">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)] mb-6">Progres Lapangan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Verified Progress (Resmi)</span>
                            <span className="text-2xl font-black text-[var(--dashboard-primary)]">{project.verifiedProgress ?? 0}%</span>
                        </div>
                        <div className="w-full h-3 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden border border-[var(--dashboard-border)] p-0.5">
                            <div 
                                className="h-full bg-gradient-to-r from-[var(--dashboard-primary)] to-emerald-400 rounded-full transition-all duration-1000" 
                                style={{ width: `${project.verifiedProgress ?? 0}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-[var(--dashboard-text-soft)] italic">
                            Diverifikasi terakhir: {project.verifiedProgressUpdatedAt ? formatDate(project.verifiedProgressUpdatedAt) : "-"}
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-4">
                        <FiAlertCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                        <div>
                            <h4 className="text-xs font-bold text-blue-700 uppercase">Catatan Admin</h4>
                            <p className="text-[10px] text-blue-600 mt-1 leading-relaxed">
                                Verified progress hanya bisa diubah oleh Pengawas melalui modul Verifikasi Progres. Admin tidak memiliki wewenang mengubah angka progres resmi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProjectOverviewTab;
