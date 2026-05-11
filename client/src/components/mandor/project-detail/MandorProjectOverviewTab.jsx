import React from "react";
import { FiInfo, FiActivity, FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { MandorInfoCard, MandorProgressSection } from "./MandorProjectDetailUIHelpers";

const MandorProjectOverviewTab = ({ project }) => {
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
                    
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                        <FiClock className="text-blue-500 shrink-0 mt-1" />
                        <p className="text-[10px] font-bold text-blue-800 leading-relaxed uppercase">
                            Informasi di atas bersumber dari data kontrak RAB Plan. Harap koordinasi dengan Pengawas jika terdapat ketidaksesuaian lokasi site.
                        </p>
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
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">Status Konstruksi</p>
                        <p className="text-[11px] font-bold text-emerald-600 leading-relaxed">
                            Akses pelaporan jurnal harian dan mingguan Anda terbuka penuh. Pastikan laporan foto terdokumentasi dengan baik untuk verifikasi progres.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MandorProjectOverviewTab;
