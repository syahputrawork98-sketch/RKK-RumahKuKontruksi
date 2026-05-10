import React, { useState, useEffect } from "react";
import { FiUser, FiMonitor, FiMapPin, FiInfo, FiLayers, FiAward, FiBriefcase, FiPlus, FiEdit2, FiTrash2, FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import supervisorService from "../../services/supervisorService";

import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const PengaturanPengawasPage = () => {
    const { selectedSupervisor, selectedSupervisorId } = useSupervisorPersona();
    const [activeTab, setActiveTab] = useState("profil");
    const [certificates, setCertificates] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [statsData, setStatsData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [error, setError] = useState(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // 'certificate' | 'experience'
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({});

    const fetchDetails = async () => {
        if (!selectedSupervisorId) return;
        try {
            setIsLoading(true);
            setError(null);
            const [certs, exps, stats] = await Promise.all([
                supervisorService.getCertificates(selectedSupervisorId),
                supervisorService.getExperiences(selectedSupervisorId),
                supervisorService.getSupervisorStats(selectedSupervisorId)
            ]);
            if (certs.success) setCertificates(certs.data);
            if (exps.success) setExperiences(exps.data);
            if (stats.success) setStatsData(stats.data);
        } catch (err) {
            console.error("Failed to fetch details:", err);
            setError("Gagal memuat detail profil pengawas.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [selectedSupervisorId]);

    const handleOpenModal = (type, data = null) => {
        setModalType(type);
        setIsEditing(!!data);
        setSelectedId(data?.id || null);
        
        if (type === 'certificate') {
            setFormData({
                title: data?.title || "",
                issuer: data?.issuer || "",
                certificateNumber: data?.certificateNumber || "",
                category: data?.category || "",
                issuedAt: data?.issuedAt ? new Date(data.issuedAt).toISOString().split('T')[0] : "",
                expiredAt: data?.expiredAt ? new Date(data.expiredAt).toISOString().split('T')[0] : "",
                notes: data?.notes || ""
            });
        } else {
            setFormData({
                projectName: data?.projectName || "",
                companyName: data?.companyName || "",
                role: data?.role || "",
                location: data?.location || "",
                startYear: data?.startYear || "",
                endYear: data?.endYear || "",
                description: data?.description || "",
                workType: data?.workType || ""
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({});
        setIsEditing(false);
        setSelectedId(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSupervisorId) return;

        try {
            setIsActionLoading(true);
            let res;
            if (modalType === 'certificate') {
                if (isEditing) {
                    res = await supervisorService.updateCertificate(selectedId, formData);
                } else {
                    res = await supervisorService.createCertificate(selectedSupervisorId, formData);
                }
            } else {
                if (isEditing) {
                    res = await supervisorService.updateExperience(selectedId, formData);
                } else {
                    res = await supervisorService.createExperience(selectedSupervisorId, formData);
                }
            }

            if (res.success) {
                await fetchDetails();
                handleCloseModal();
            } else {
                alert(res.message || "Gagal menyimpan data.");
            }
        } catch (err) {
            console.error("Submit error:", err);
            alert("Terjadi kesalahan sistem saat menyimpan data.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm(`Hapus data ${type === 'certificate' ? 'sertifikat' : 'pengalaman'} ini secara lokal?`)) return;

        try {
            setIsActionLoading(true);
            let res;
            if (type === 'certificate') {
                res = await supervisorService.deleteCertificate(id);
            } else {
                res = await supervisorService.deleteExperience(id);
            }

            if (res.success) {
                await fetchDetails();
            } else {
                alert(res.message || "Gagal menghapus data.");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Terjadi kesalahan sistem saat menghapus data.");
        } finally {
            setIsActionLoading(false);
        }
    };

    if (error) {
        return (
            <RoleDataState 
                type="error"
                title={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    if (!selectedSupervisorId && !isLoading) {
        return (
            <RolePersonaEmptyState 
                description="Pilih akun Pengawas untuk mengelola pengaturan profil dan sertifikasi Anda."
            />
        );
    }

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
                                <button 
                                    onClick={() => handleOpenModal('certificate')}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-[var(--dashboard-primary)] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[var(--dashboard-primary)]/20"
                                >
                                    <FiPlus size={14} />
                                    TAMBAH LOCAL
                                </button>
                            </div>
                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-6">
                                <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase">
                                    <FiInfo className="inline mr-1" /> DATA LOKAL: Sertifikat ini belum diverifikasi resmi oleh admin & tidak menjadi rating marketplace.
                                </p>
                            </div>
                            {isLoading ? (
                                <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div></div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {certificates.length > 0 ? certificates.map(cert => (
                                        <div key={cert.id} className="p-5 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] group hover:border-[var(--dashboard-primary)]/30 transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-sm font-bold">{cert.title}</h4>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button onClick={() => handleOpenModal('certificate', cert)} className="p-1.5 text-slate-400 hover:text-[var(--dashboard-primary)] hover:bg-white rounded-lg transition-all"><FiEdit2 size={12} /></button>
                                                    <button onClick={() => handleDelete('certificate', cert.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"><FiTrash2 size={12} /></button>
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold mb-2 uppercase tracking-widest">{cert.issuer || 'Penerbit N/A'}</p>
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--dashboard-border)]/50">
                                                <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-widest italic">Belum Diverifikasi</span>
                                                {cert.category && <span className="text-[9px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter">{cert.category}</span>}
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="col-span-2 py-12 text-center text-slate-400 text-xs italic">Belum ada data sertifikasi lokal.</div>
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
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-1">Proyek Diawasi</p>
                                    <p className="text-lg font-black">{(statsData?.activeProjects || 0) + (statsData?.finishedProjects || 0)}</p>
                                </div>
                                <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] text-center">
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-1">Review Jurnal</p>
                                    <p className="text-lg font-black">
                                        {statsData?.journals?.reduce((acc, j) => acc + (j._count?._all || 0), 0) || 0}
                                    </p>
                                </div>
                                <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] text-center">
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-1">Laporan Mingguan</p>
                                    <p className="text-lg font-black">
                                        {statsData?.weeklyReports?.reduce((acc, r) => acc + (r._count?._all || 0), 0) || 0}
                                    </p>
                                </div>
                                <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] text-center">
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-1">Material Req</p>
                                    <p className="text-lg font-black">
                                        {statsData?.materialRequests?.reduce((acc, m) => acc + (m._count?._all || 0), 0) || 0}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-b border-[var(--dashboard-border)] pb-4 mt-8">
                                <div className="flex items-center gap-3">
                                    <FiBriefcase className="text-[var(--dashboard-primary)]" size={20} />
                                    <h3 className="font-bold text-sm">Riwayat Pengalaman Manual</h3>
                                </div>
                                <button 
                                    onClick={() => handleOpenModal('experience')}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-[var(--dashboard-primary)] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[var(--dashboard-primary)]/20"
                                >
                                    <FiPlus size={14} />
                                    TAMBAH LOCAL
                                </button>
                            </div>
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                                <p className="text-[10px] font-bold text-blue-700 leading-relaxed uppercase">
                                    <FiInfo className="inline mr-1" /> DATA LOKAL: Pengalaman ini diisi secara manual dan tidak terikat otomatis dengan proyek sistem.
                                </p>
                            </div>
                            {isLoading ? (
                                <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div></div>
                            ) : (
                                <div className="space-y-4">
                                    {experiences.length > 0 ? experiences.map(exp => (
                                        <div key={exp.id} className="p-5 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] flex justify-between items-start group hover:border-[var(--dashboard-primary)]/30 transition-all">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="text-sm font-bold">{exp.projectName}</h4>
                                                    <span className="text-[9px] font-bold px-2 py-0.5 bg-white border border-slate-200 text-slate-400 rounded uppercase tracking-widest">Manual</span>
                                                </div>
                                                <p className="text-[11px] font-semibold text-[var(--dashboard-text)] mb-1">{exp.companyName || 'Instansi N/A'}</p>
                                                <p className="text-[10px] text-[var(--dashboard-text-soft)] font-medium">Role: {exp.role || 'Pengawas'} | {exp.startYear} - {exp.endYear || 'Sekarang'}</p>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                <button onClick={() => handleOpenModal('experience', exp)} className="p-1.5 text-slate-400 hover:text-[var(--dashboard-primary)] hover:bg-white rounded-lg transition-all"><FiEdit2 size={12} /></button>
                                                <button onClick={() => handleDelete('experience', exp.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"><FiTrash2 size={12} /></button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="py-12 text-center text-slate-400 text-xs italic">Belum ada data pengalaman kerja manual.</div>
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

            {/* CRUD MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn" onClick={handleCloseModal}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-zoomIn flex flex-col border border-slate-100">
                        <div className="p-8 border-b flex items-center justify-between bg-white relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[var(--dashboard-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--dashboard-primary)]">
                                    {modalType === 'certificate' ? <FiAward size={24} /> : <FiBriefcase size={24} />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-800">
                                        {isEditing ? 'Ubah' : 'Tambah'} {modalType === 'certificate' ? 'Sertifikat' : 'Pengalaman'}
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5 italic">
                                        Data Lokal (Unverified)
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={handleCloseModal} 
                                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-800 transition-all border border-slate-100"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh] scrollbar-hide">
                            {modalType === 'certificate' ? (
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Sertifikat *</label>
                                        <input required name="title" value={formData.title || ''} onChange={handleFormChange} placeholder="Contoh: Ahli Pengawas Konstruksi" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[var(--dashboard-primary)]/5 transition-all outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Penerbit</label>
                                            <input name="issuer" value={formData.issuer || ''} onChange={handleFormChange} placeholder="LPJK, PII, dll" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</label>
                                            <input name="category" value={formData.category || ''} onChange={handleFormChange} placeholder="Keahlian" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nomor Sertifikat</label>
                                        <input name="certificateNumber" value={formData.certificateNumber || ''} onChange={handleFormChange} placeholder="No. Reg / Seri" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tgl Terbit</label>
                                            <input type="date" name="issuedAt" value={formData.issuedAt || ''} onChange={handleFormChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tgl Kadaluarsa</label>
                                            <input type="date" name="expiredAt" value={formData.expiredAt || ''} onChange={handleFormChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Catatan</label>
                                        <textarea name="notes" value={formData.notes || ''} onChange={handleFormChange} placeholder="Keterangan tambahan..." className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none h-24 resize-none" />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Proyek *</label>
                                        <input required name="projectName" value={formData.projectName || ''} onChange={handleFormChange} placeholder="Contoh: Pengawasan Gedung Perkantoran" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instansi / Owner</label>
                                            <input name="companyName" value={formData.companyName || ''} onChange={handleFormChange} placeholder="Nama Perusahaan / Dinas" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jabatan / Role</label>
                                            <input name="role" value={formData.role || ''} onChange={handleFormChange} placeholder="Contoh: Site Supervisor" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi Proyek</label>
                                        <input name="location" value={formData.location || ''} onChange={handleFormChange} placeholder="Contoh: Surabaya, Jawa Timur" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tahun Mulai</label>
                                            <input type="number" name="startYear" value={formData.startYear || ''} onChange={handleFormChange} placeholder="2018" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tahun Selesai</label>
                                            <input type="number" name="endYear" value={formData.endYear || ''} onChange={handleFormChange} placeholder="2020 (Kosongkan jika aktif)" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deskripsi Pekerjaan</label>
                                        <textarea name="description" value={formData.description || ''} onChange={handleFormChange} placeholder="Ceritakan lingkup pengawasan Anda..." className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none h-24 resize-none" />
                                    </div>
                                </div>
                            )}

                            <div className="pt-4">
                                <button 
                                    type="submit" 
                                    disabled={isActionLoading}
                                    className="w-full py-5 bg-slate-800 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-900 active:scale-95 transition-all shadow-xl shadow-slate-800/20 disabled:opacity-50"
                                >
                                    {isActionLoading ? 'Memproses...' : (isEditing ? 'SIMPAN PERUBAHAN' : 'TAMBAH DATA LOKAL')}
                                </button>
                                <p className="text-[9px] text-slate-400 font-bold text-center mt-4 uppercase tracking-widest italic">
                                    <FiAlertCircle className="inline mr-1" /> Data akan tersimpan sebagai riwayat lokal unverified.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PengaturanPengawasPage;
