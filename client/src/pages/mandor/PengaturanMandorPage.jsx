import React, { useState, useEffect } from "react";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import foremanService from "../../services/foremanService";
import { FiUser, FiAward, FiBriefcase } from "react-icons/fi";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

// Modular Components
import RoleSettingsTabs from "../../components/role-settings/RoleSettingsTabs";
import RoleProfileBasicInfoPanel from "../../components/role-settings/RoleProfileBasicInfoPanel";
import RoleStatsCard from "../../components/role-settings/RoleStatsCard";
import RoleCapacityCard from "../../components/role-settings/RoleCapacityCard";
import RoleCertificateList from "../../components/role-settings/RoleCertificateList";
import RoleExperienceList from "../../components/role-settings/RoleExperienceList";
import RoleCertificateExperienceModal from "../../components/role-settings/RoleCertificateExperienceModal";
import RoleGovernanceNoticePanel from "../../components/role-settings/RoleGovernanceNoticePanel";
import RoleForemanTeamCard from "../../components/role-settings/RoleForemanTeamCard";
import { getForemanStatsConfig } from "../../components/role-settings/roleSettingsUtils";

const PengaturanMandorPage = () => {
    const { selectedForeman, selectedForemanId } = useForemanPersona();
    const [activeTab, setActiveTab] = useState("profil");
    const [certificates, setCertificates] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [projects, setProjects] = useState([]);
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
        if (!selectedForemanId) return;
        try {
            setIsLoading(true);
            setError(null);
            const [certs, exps, stats, projs] = await Promise.all([
                foremanService.getCertificates(selectedForemanId),
                foremanService.getExperiences(selectedForemanId),
                foremanService.getForemanStats(selectedForemanId),
                foremanService.getForemanProjects(selectedForemanId)
            ]);
            if (certs.success) setCertificates(certs.data);
            if (exps.success) setExperiences(exps.data);
            if (stats.success) setStatsData(stats.data);
            if (projs.success) setProjects(projs.data || []);
        } catch (err) {
            console.error("Failed to fetch foreman details:", err);
            setError("Gagal memuat detail profil mandor.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [selectedForemanId]);

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
        if (!selectedForemanId) return;

        try {
            setIsActionLoading(true);
            let res;
            if (modalType === 'certificate') {
                if (isEditing) {
                    res = await foremanService.updateCertificate(selectedId, formData);
                } else {
                    res = await foremanService.createCertificate(selectedForemanId, formData);
                }
            } else {
                if (isEditing) {
                    res = await foremanService.updateExperience(selectedId, formData);
                } else {
                    res = await foremanService.createExperience(selectedForemanId, formData);
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
                res = await foremanService.deleteCertificate(id);
            } else {
                res = await foremanService.deleteExperience(id);
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

    const foremanStatsConfig = getForemanStatsConfig();

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Pengaturan</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Kelola profil mandor, sertifikasi, dan riwayat pengalaman lapangan Anda.</p>
            </div>

            <RoleSettingsTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === "profil" && (
                        <RoleProfileBasicInfoPanel
                            persona={selectedForeman}
                            title="Profil Mandor"
                        />
                    )}

                    {activeTab === "sertifikasi" && (
                        <RoleCertificateList
                            certificates={certificates}
                            isLoading={isLoading}
                            onAdd={() => handleOpenModal('certificate')}
                            onEdit={(cert) => handleOpenModal('certificate', cert)}
                            onDelete={(id) => handleDelete('certificate', id)}
                        />
                    )}

                    {activeTab === "pengalaman" && (
                        <div className="space-y-6">
                            <div className="dashboard-card space-y-6">
                                <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                                    <FiBriefcase className="text-[var(--dashboard-primary)]" size={20} />
                                    <h3 className="font-bold text-sm">Ringkasan Pengalaman Lokal</h3>
                                </div>
                                <RoleStatsCard
                                    stats={statsData}
                                    config={foremanStatsConfig}
                                />
                                <RoleExperienceList
                                    experiences={experiences}
                                    isLoading={isLoading}
                                    onAdd={() => handleOpenModal('experience')}
                                    onEdit={(exp) => handleOpenModal('experience', exp)}
                                    onDelete={(id) => handleDelete('experience', id)}
                                    title="Riwayat Pengalaman Manual"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <RoleCapacityCard
                        persona={selectedForeman}
                        type="foreman"
                    />

                    {/* Proyek Aktif Section */}
                    <div className="dashboard-card space-y-4">
                        <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                            <FiBriefcase className="text-[var(--dashboard-primary)]" size={18} />
                            <h3 className="font-bold text-sm">Proyek Konstruksi Aktif</h3>
                        </div>
                        <div className="space-y-3">
                            {projects.filter(p => ['active', 'ongoing', 'Berjalan'].includes(p.status)).length > 0 ? (
                                projects.filter(p => ['active', 'ongoing', 'Berjalan'].includes(p.status)).map(p => (
                                    <div key={p.id} className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)] space-y-1">
                                        <p className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter">{p.projectCode}</p>
                                        <p className="text-xs font-black text-slate-800 line-clamp-1">{p.name}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-[8px] font-black text-emerald-600 uppercase">Status: Berjalan</span>
                                            <span className="text-[8px] font-black text-slate-400 uppercase">{p.location || 'Lokasi Terdaftar'}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[10px] text-slate-400 italic font-medium text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    Belum ada proyek aktif yang ditugaskan.
                                </p>
                            )}
                        </div>
                        <p className="text-[9px] text-[var(--dashboard-text-soft)] font-medium leading-relaxed italic">
                            Daftar di atas adalah proyek yang saat ini sedang Anda tangani secara operasional di lapangan.
                        </p>
                    </div>

                    <RoleForemanTeamCard />

                    <RoleGovernanceNoticePanel
                        roleName="Mandor"
                        infoText="Fitur sinkronisasi offline sedang dalam pengembangan untuk mempermudah pelaporan di area dengan sinyal lemah."
                    />
                </div>
            </div>

            <RoleCertificateExperienceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                modalType={modalType}
                isEditing={isEditing}
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleSubmit}
                isActionLoading={isActionLoading}
            />
        </div>
    );
};

export default PengaturanMandorPage;
