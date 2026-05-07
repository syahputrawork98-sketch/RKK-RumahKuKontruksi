import React, { useState, useEffect } from "react";
import { FiUser, FiMonitor, FiMapPin, FiInfo, FiLayers, FiAward, FiBriefcase } from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import supervisorService from "../../services/supervisorService";

const PengaturanPengawasPage = () => {
    const { selectedSupervisor } = useSupervisorPersona();
    const [activeTab, setActiveTab] = useState("profil");
    const [certificates, setCertificates] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!selectedSupervisor?.id) return;
            try {
                setIsLoading(true);
                const [certs, exps] = await Promise.all([
                    supervisorService.getCertificates(selectedSupervisor.id),
                    supervisorService.getExperiences(selectedSupervisor.id)
                ]);
                if (certs.success) setCertificates(certs.data);
                if (exps.success) setExperiences(exps.data);
            } catch (error) {
                console.error("Failed to fetch details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [selectedSupervisor]);

    const tabs = [
        { id: "profil", label: "Profil", icon: FiUser },
        { id: "sertifikasi", label: "Sertifikasi", icon: FiAward },
        { id: "pengalaman", label: "Pengalaman", icon: FiBriefcase },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Pengaturan</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Kelola profil pengawas, sertifikasi, dan riwayat pengalaman Anda.</p>
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
                                <h3 className="font-bold text-sm">Informasi Dasar</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <img 
                                        src={selectedSupervisor?.avatar || "https://i.pravatar.cc/150?u=placeholder"} 
                                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--dashboard-primary)]/20 shadow-sm" 
                                        alt="Avatar" 
                                    />
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-bold">{selectedSupervisor?.name}</h4>
                                        <p className="text-xs text-[var(--dashboard-text-soft)] font-medium uppercase tracking-wider">{selectedSupervisor?.specialization || 'Generalist'}</p>
                                        <button className="px-4 py-1.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-lg text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[var(--dashboard-border)]">Ubah Foto</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">ID Pegawai (System)</label>
                                        <input type="text" readOnly value={selectedSupervisor?.id || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs font-mono opacity-70 outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Email</label>
                                        <input type="text" readOnly value={selectedSupervisor?.email || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs opacity-70 outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Telepon</label>
                                        <input type="text" readOnly value={selectedSupervisor?.phone || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs opacity-70 outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Kota Domisili</label>
                                        <input type="text" readOnly value={selectedSupervisor?.city || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs opacity-70 outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Biografi</label>
                                    <textarea readOnly value={selectedSupervisor?.bio || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs opacity-70 outline-none h-24 resize-none" />
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
                                <button className="px-3 py-1 bg-[var(--dashboard-primary)] text-white rounded-lg text-[10px] font-black uppercase">Tambah</button>
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
                                    <h3 className="font-bold text-sm">Riwayat Pengalaman</h3>
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
                                                <p className="text-[11px] font-semibold text-[var(--dashboard-text)] mb-1">{exp.companyName}</p>
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
                            <FiLayers className="text-[var(--dashboard-primary)]" size={20} />
                            <h3 className="font-bold text-sm">Status Kapasitas</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs font-bold mb-1">
                                <span>Kapasitas Proyek</span>
                                <span className="text-[var(--dashboard-primary)]">{selectedSupervisor?._count?.projects || 0} / {selectedSupervisor?.maxProjectCapacity || 3}</span>
                            </div>
                            <div className="w-full h-2 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-[var(--dashboard-primary)]" 
                                    style={{ width: `${((selectedSupervisor?._count?.projects || 0) / (selectedSupervisor?.maxProjectCapacity || 3)) * 100}%` }} 
                                />
                            </div>
                            <p className="text-[9px] text-[var(--dashboard-text-soft)] font-medium leading-relaxed italic">
                                Anda bertanggung jawab atas pengawasan proyek di wilayah yang telah ditentukan oleh Admin Pusat. Kapasitas maksimal Anda adalah {selectedSupervisor?.maxProjectCapacity || 3} proyek secara bersamaan.
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-card space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                            <FiMonitor className="text-[var(--dashboard-primary)]" size={20} />
                            <h3 className="font-bold text-sm">Akses & Sesi</h3>
                        </div>
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
                            <FiInfo className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[10px] font-medium text-amber-700 leading-relaxed">
                                Fitur keamanan dan manajemen sesi sedang dalam pengembangan. Saat ini akses menggunakan mode **Database-Backed Persona (Dev Mode)**.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PengaturanPengawasPage;
