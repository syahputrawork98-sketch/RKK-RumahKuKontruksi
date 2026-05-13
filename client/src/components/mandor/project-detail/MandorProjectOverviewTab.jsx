import React from "react";
import { FiInfo, FiActivity, FiMapPin, FiCalendar, FiClock, FiAlertTriangle, FiPackage, FiFileText } from "react-icons/fi";
import { MandorInfoCard, MandorProgressSection } from "./MandorProjectDetailUIHelpers";

const MandorProjectOverviewTab = ({ project, stages, materialRequests, journals, reports, fieldIssues }) => {
    // Calculate active stats
    const activeStages = stages?.filter(s => s.status === 'In Progress') || [];
    const openIssues = fieldIssues?.filter(i => ['open', 'in_review'].includes(i.status?.toLowerCase())) || [];
    const pendingRequests = materialRequests?.filter(r => ['submitted', 'approved', 'processing', 'delivered'].includes(r.status?.toLowerCase())) || [];
    const latestJournal = journals?.[0];

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)] flex items-center gap-2">
                        <FiInfo /> Informasi Site Operasional
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MandorInfoCard label="Kode Proyek" value={project.projectCode} icon={<FiInfo />} />
                        <MandorInfoCard label="Tipe Bangunan" value={project.type || "Pembangunan"} icon={<FiActivity />} color="emerald" />
                        <MandorInfoCard label="Lokasi" value={project.customer?.address || "Site Lokal"} icon={<FiMapPin />} color="orange" />
                        <MandorInfoCard label="Target Selesai" value={project.estimatedEndDate ? new Date(project.estimatedEndDate).toLocaleDateString('id-ID') : "-"} icon={<FiCalendar />} color="purple" />
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 shadow-sm shadow-blue-500/5">
                        <FiClock className="text-blue-500 shrink-0 mt-1" />
                        <p className="text-[10px] font-bold text-blue-800 leading-relaxed uppercase">
                            Informasi di atas bersumber dari data kontrak RAB Plan. Harap koordinasi dengan Pengawas jika terdapat ketidaksesuaian lokasi site.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Tim Terkait</h4>
                        <div className="flex flex-wrap gap-3">
                            <div className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-200 border border-white overflow-hidden flex items-center justify-center text-[8px] font-black text-slate-500">P</div>
                                <div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase leading-none mb-1">Pengawas</p>
                                    <p className="text-[10px] font-bold text-slate-700 leading-none">{project.supervisor?.name || "Belum ditugaskan"}</p>
                                </div>
                            </div>
                            <div className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-200 border border-white overflow-hidden flex items-center justify-center text-[8px] font-black text-slate-500">A</div>
                                <div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase leading-none mb-1">Admin Ops</p>
                                    <p className="text-[10px] font-bold text-slate-700 leading-none">{project.admin?.name || "Pusat"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)] flex items-center gap-2">
                        <FiActivity /> Dashboard Progres Lapangan
                    </h3>
                    <div className="bg-white p-6 rounded-[2.5rem] border border-[var(--dashboard-border)] shadow-sm">
                        <MandorProgressSection verifiedProgress={project.verifiedProgress} />
                        
                        <div className="mt-8 pt-6 border-t border-[var(--dashboard-border)] grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Verifikasi Terakhir</p>
                                <p className="text-xs font-black">{project.verifiedProgressUpdatedAt ? new Date(project.verifiedProgressUpdatedAt).toLocaleDateString('id-ID') : "Belum ada"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Oleh Pengawas</p>
                                <p className="text-xs font-black">{project.supervisor?.name || "-"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card border-dashed">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-primary)] mb-4">Ringkasan Aktivitas Lapangan</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <FiActivity size={12} className="text-blue-500" />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Pekerjaan Berjalan</span>
                                </div>
                                <p className="text-sm font-black">{activeStages.length} Kategori</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <FiAlertTriangle size={12} className="text-red-500" />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Kendala Aktif</span>
                                </div>
                                <p className="text-sm font-black">{openIssues.length} Masalah</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <FiPackage size={12} className="text-amber-500" />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Request Material</span>
                                </div>
                                <p className="text-sm font-black">{pendingRequests.length} Pending</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <FiFileText size={12} className="text-emerald-500" />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Jurnal Terakhir</span>
                                </div>
                                <p className="text-[10px] font-black truncate">{latestJournal ? new Date(latestJournal.weekStartDate).toLocaleDateString('id-ID') : "Belum ada"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MandorProjectOverviewTab;
