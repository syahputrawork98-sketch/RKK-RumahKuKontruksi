import React, { useState, useEffect } from "react";
import { FiUser, FiMonitor, FiUsers, FiInfo, FiLayers, FiAward, FiBriefcase } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import foremanService from "../../services/foremanService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const PengaturanMandorPage = () => {
    const { selectedForeman, selectedForemanId } = useForemanPersona();
    const [activeTab, setActiveTab] = useState("profil");
    const [certificates, setCertificates] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [statsData, setStatsData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!selectedForemanId) return;
            try {
                setIsLoading(true);
                setError(null);
                const [certs, exps, stats] = await Promise.all([
                    foremanService.getCertificates(selectedForemanId),
                    foremanService.getExperiences(selectedForemanId),
                    foremanService.getForemanStats(selectedForemanId)
                ]);
                if (certs.success) setCertificates(certs.data);
                if (exps.success) setExperiences(exps.data);
                if (stats.success) setStatsData(stats.data);
            } catch (err) {
                console.error("Failed to fetch foreman details:", err);
                setError("Gagal memuat detail profil mandor.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [selectedForemanId]);

    const tabs = [
        { id: "profil", label: "Profil", icon: FiUser },
        { id: "sertifikasi", label: "Sertifikasi", icon: FiAward },
        { id: "pengalaman", label: "Pengalaman", icon: FiBriefcase },
    ];

    if (error) {
        return (
            <RoleDataState 
                type="error"
                title={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    if (!selectedForemanId && !isLoading) {
        return (
            <RolePersonaEmptyState 
                description="Pilih akun Mandor untuk mengelola pengaturan profil dan pengalaman lapangan Anda."
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Pengaturan</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Kelola profil mandor, sertifikasi, dan riwayat pengalaman lapangan Anda.</p>
            </div>

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            activeTab === tab.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        <tab.icon size={14} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === "profil" && (
                        <div className="dashboard-card space-y-6">
                            <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                                <FiUser className="text-[var(--dashboard-primary)]" size={20} />
                                <h3 className="font-bold text-sm">Profil Mandor</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={selectedForeman?.avatar || "https://i.pravatar.cc/150?u=placeholder"} 
                                        className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--dashboard-primary)]/20" 
                                        alt="Avatar" 
                                    />
                                    <button className="px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[var(--dashboard-border)]">Ubah Foto</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Nama Lengkap</label>
                                        <input type="text" readOnly value={selectedForeman?.name || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">ID Mandor (System)</label>
                                        <input type="text" readOnly value={selectedForeman?.id || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-mono opacity-70 outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Telepon</label>
                                        <input type="text" readOnly value={selectedForeman?.phone || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Spesialisasi</label>
                                        <input type="text" readOnly value={selectedForeman?.specialization || 'Umum'} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "sertifikasi" && (
                        <div className="dashboard-card space-y-6">
                            <div className="flex items-center justify-between border-b border-[var(--dashboard-border)] pb-4">
                                <div className="flex items-center gap-3">
                                    <FiAward className="text-[var(--dashboard-primary)]" size={20} />
                                    <h3 className="font-bold text-sm">Sertifikasi & Lisensi</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded italic">Hold: Fitur Production</span>
                                </div>
                            </div>
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-6">
                                <p className="text-[10px] font-bold text-blue-700 leading-relaxed uppercase">
                                    Sertifikat resmi belum tersedia di database lokal. Ringkasan ini hanya berdasarkan aktivitas lokal Anda di sistem.
                                </p>
                            </div>
                            {isLoading ? (
                                <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div></div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {certificates.length > 0 ? certificates.map(cert => (
                                        <div key={cert.id} className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)]">
                                            <h4 className="text-sm font-bold mb-1">{cert.title}</h4>
                                            <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold mb-2 uppercase tracking-widest">{cert.issuer}</p>
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--dashboard-border)]/50">
                                                <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded uppercase">Valid</span>
                                                <button className="text-[9px] font-black text-[var(--dashboard-primary)] uppercase hover:underline">Edit</button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="col-span-2 py-12 text-center text-slate-400 text-xs italic">Belum ada data sertifikasi.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "pengalaman" && (
                        <div className="dashboard-card space-y-6">
                            <div className="flex items-center justify-between border-b border-[var(--dashboard-border)] pb-4">
                                <div className="flex items-center gap-3">
                                    <FiBriefcase className="text-[var(--dashboard-primary)]" size={20} />
                                    <h3 className="font-bold text-sm">Ringkasan Pengalaman Lokal</h3>
                                </div>
                            </div>
                            
                            {/* LOCAL STATS SUMMARY */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] text-center">
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-1">Proyek Aktif</p>
                                    <p className="text-xl font-black">{statsData?.activeProjects || 0}</p>
                                </div>
                                <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] text-center">
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-1">Proyek Selesai</p>
                                    <p className="text-xl font-black">{statsData?.finishedProjects || 0}</p>
                                </div>
                                <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] text-center">
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-1">Total Jurnal</p>
                                    <p className="text-xl font-black">
                                        {statsData?.journals?.reduce((acc, j) => acc + (j._count?._all || 0), 0) || 0}
                                    </p>
                                </div>
                                <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] text-center">
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-1">Material Req</p>
                                    <p className="text-xl font-black">
                                        {statsData?.materialRequests?.reduce((acc, m) => acc + (m._count?._all || 0), 0) || 0}
                                    </p>
                                </div>
                                <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] text-center">
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-1">Total Aktivitas</p>
                                    <p className="text-xl font-black">{statsData?.activitiesCount || 0}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-b border-[var(--dashboard-border)] pb-4">
                                <div className="flex items-center gap-3">
                                    <FiBriefcase className="text-[var(--dashboard-primary)]" size={20} />
                                    <h3 className="font-bold text-sm">Riwayat Pengalaman (Manual)</h3>
                                </div>
                                <button className="px-3 py-1 bg-[var(--dashboard-primary)] text-white rounded-lg text-[10px] font-black uppercase">Tambah</button>
                            </div>
                            {isLoading ? (
                                <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div></div>
                            ) : (
                                <div className="space-y-4">
                                    {experiences.length > 0 ? experiences.map(exp => (
                                        <div key={exp.id} className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-bold mb-1">{exp.projectName}</h4>
                                                <p className="text-[11px] font-semibold text-[var(--dashboard-text)] mb-1">{exp.location}</p>
                                                <p className="text-[10px] text-[var(--dashboard-text-soft)] font-medium">Role: {exp.role} | {exp.startYear} - {exp.endYear || 'Sekarang'}</p>
                                            </div>
                                            <button className="text-[9px] font-black text-[var(--dashboard-primary)] uppercase hover:underline">Edit</button>
                                        </div>
                                    )) : (
                                        <div className="py-12 text-center text-slate-400 text-xs italic">Belum ada data pengalaman kerja.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                            <FiUsers className="text-[var(--dashboard-primary)]" size={20} />
                            <h3 className="font-bold text-sm">Tim Binaan</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <span className="text-xs font-bold text-[var(--dashboard-text)]">Total Pekerja Terdaftar</span>
                                <span className="text-sm font-black text-[var(--dashboard-primary)]">0 Orang</span>
                            </div>
                            <p className="text-[9px] text-[var(--dashboard-text-soft)] font-medium leading-relaxed italic">
                                Data tukang dikelola secara mandiri oleh Mandor. Sistem hanya memantau ringkasan jumlah dan kehadiran di proyek.
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-card space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                            <FiMonitor className="text-[var(--dashboard-primary)]" size={20} />
                            <h3 className="font-bold text-sm">Akses Lapangan</h3>
                        </div>
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
                            <FiInfo className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[10px] font-medium text-amber-700 leading-relaxed">
                                Fitur sinkronisasi offline sedang dalam pengembangan untuk mempermudah pelaporan di area dengan sinyal lemah.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PengaturanMandorPage;
