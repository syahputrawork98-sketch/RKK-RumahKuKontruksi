import React, { useState, useEffect } from "react";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import supervisorService from "../../services/supervisor.service";
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
import { getSupervisorStatsConfig } from "../../components/role-settings/roleSettingsUtils";

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

    const supervisorStatsConfig = getSupervisorStatsConfig();

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Pengaturan</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Kelola profil pengawas, sertifikasi, dan riwayat pengalaman Anda.</p>
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
                            persona={selectedSupervisor}
                            title="Informasi Dasar"
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
                                    config={supervisorStatsConfig}
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
                        persona={selectedSupervisor}
                        type="supervisor"
                    />

                    <RoleGovernanceNoticePanel
                        roleName="Pengawas"
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

export default PengaturanPengawasPage;
