import React, { useState, useEffect } from "react";
import { FiUser, FiMonitor, FiLock, FiInfo, FiPieChart, FiAward, FiBriefcase } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import architectService from "../../services/architectService";
import designRequestService from "../../services/designRequestService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const PengaturanArsitekPage = () => {
    const { selectedArchitect, selectedArchitectId, loading: personaLoading, error: personaError } = useArchitectPersona();
    const [certificates, setCertificates] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [statsData, setStatsData] = useState(null);
    const [activeRequests, setActiveRequests] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [dataError, setDataError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedArchitectId) return;
            try {
                setLoadingData(true);
                setDataError(null);
                const [certRes, expRes, statsRes, requestsRes] = await Promise.all([
                    architectService.getCertificates(selectedArchitectId),
                    architectService.getExperiences(selectedArchitectId),
                    architectService.getArchitectStats(selectedArchitectId),
                    designRequestService.getAssignedRequests(selectedArchitectId)
                ]);
                if (certRes.success) setCertificates(certRes.data);
                if (expRes.success) setExperiences(expRes.data);
                if (statsRes.success) setStatsData(statsRes.data);
                if (requestsRes.success) {
                    const active = (requestsRes.data || []).filter(r => !["approved", "rejected"].includes(r.status));
                    setActiveRequests(active);
                }
            } catch (err) {
                console.error("Failed to fetch architect details:", err);
                setDataError("Gagal mengambil data profil.");
            } finally {
                setLoadingData(false);
            }
        };
        fetchData();
    }, [selectedArchitectId]);

    if (personaLoading || loadingData) {
        return <RoleDataState type="loading" message="Sinkronisasi profil arsitek..." />;
    }

    if (!selectedArchitectId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Arsitek Terlebih Dahulu"
                description="Pilih akun Arsitek untuk mengelola profil, sertifikasi, dan pengalaman profesional Anda."
                actionLabel="Pilih Arsitek"
                onAction={() => {}}
            />
        );
    }

    if (personaError || dataError) {
        return (
            <RoleDataState 
                type="error"
                title={personaError || dataError}
                onRetry={() => window.location.reload()}
            />
        );
    }

    const activeCount = activeRequests.length;
    const maxCapacity = statsData?.maxDesignCapacity || selectedArchitect?.maxDesignCapacity || 0;
    const capacityPercentage = maxCapacity > 0 ? Math.round((activeCount / maxCapacity) * 100) : 0;

    return (
        <div className="animate-fadeIn space-y-6 pb-12">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Pengaturan</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic uppercase tracking-widest">Kelola profil arsitek dan preferensi sistem (Local CRUD).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="dashboard-card space-y-6 h-fit">
                    <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                        <FiUser className="text-[var(--dashboard-primary)]" size={20} />
                        <h3 className="font-bold text-sm">Profil Arsitek</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <img 
                                src={selectedArchitect?.avatar || "https://placehold.co/200x200"} 
                                className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--dashboard-primary)]/20" 
                                alt="Avatar" 
                            />
                            <button disabled className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed">Ubah Foto (Hold)</button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Nama Lengkap</label>
                                <input type="text" readOnly value={selectedArchitect?.name || ""} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Email Professional</label>
                                <input type="text" readOnly value={selectedArchitect?.email || ""} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Spesialisasi</label>
                                <input type="text" readOnly value={selectedArchitect?.specialization || ""} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                            <FiPieChart className="text-[var(--dashboard-primary)]" size={20} />
                            <h3 className="font-bold text-sm">Kapasitas & Beban Kerja</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)]">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Desain Aktif</span>
                                    <span className="text-xs font-black">{activeCount} / {maxCapacity} Slot</span>
                                </div>
                                <div className="w-full h-2 bg-[var(--dashboard-border)] rounded-full overflow-hidden">
                                    <div className="h-full bg-[var(--dashboard-primary)] transition-all duration-1000" style={{ width: `${capacityPercentage}%` }} />
                                </div>
                                <p className="text-[9px] text-[var(--dashboard-text-soft)] font-medium mt-2 leading-relaxed italic">
                                    Sistem membatasi maksimal {maxCapacity} permintaan desain aktif secara bersamaan untuk menjaga kualitas output (Local Constraint).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                            <FiAward className="text-[var(--dashboard-primary)]" size={20} />
                            <h3 className="font-bold text-sm uppercase tracking-widest">Sertifikasi & Keahlian</h3>
                        </div>
                        <div className="space-y-3">
                            {certificates.length > 0 ? (
                                certificates.map(cert => (
                                    <div key={cert.id} className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                        <p className="text-xs font-bold">{cert.title}</p>
                                        <p className="text-[10px] text-[var(--dashboard-text-soft)] mt-0.5">{cert.issuer} • {cert.certificateNumber || "No Sertifikat Tidak Ada"}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center border-2 border-dashed border-[var(--dashboard-border)] rounded-2xl">
                                    <p className="text-[10px] text-[var(--dashboard-text-soft)] uppercase font-bold tracking-widest">Belum ada sertifikat</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="dashboard-card md:col-span-2 space-y-6">
                    <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                        <FiBriefcase className="text-[var(--dashboard-primary)]" size={20} />
                        <h3 className="font-bold text-sm uppercase tracking-widest">Pengalaman Profesional</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {experiences.length > 0 ? (
                            experiences.map(exp => (
                                <div key={exp.id} className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)]">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-sm font-black text-[var(--dashboard-primary)]">{exp.projectName}</p>
                                        <span className="text-[10px] font-bold bg-[var(--dashboard-primary-soft)] text-[var(--dashboard-primary)] px-2 py-0.5 rounded-full">
                                            {exp.startYear} - {exp.endYear || "Sekarang"}
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text)] uppercase">{exp.role} @ {exp.companyName}</p>
                                    <p className="text-[10px] text-[var(--dashboard-text-soft)] mt-2 leading-relaxed">{exp.description}</p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 p-8 text-center border-2 border-dashed border-[var(--dashboard-border)] rounded-2xl">
                                <p className="text-[10px] text-[var(--dashboard-text-soft)] uppercase font-bold tracking-widest">Belum ada riwayat pengalaman</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="dashboard-card md:col-span-2 border-dashed border-2 border-[var(--dashboard-border)] bg-transparent">
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-500">
                            <FiLock size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--dashboard-text)]">Keamanan & Akses</h4>
                            <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 max-w-md mx-auto">
                                Manajemen kata sandi dan sesi saat ini dinonaktifkan dalam **Fase Local CRUD**. Persona switcher di Topbar digunakan sebagai pengganti autentikasi untuk tahap pengembangan ini.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PengaturanArsitekPage;
