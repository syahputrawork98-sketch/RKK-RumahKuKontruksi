import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import rabService from "../../services/rabService";
import projectStageService from "../../services/projectStageService";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";
import AdminStageCommentModal from "../../components/admin/AdminStageCommentModal";
import ProjectPaymentPlanTab from "../../components/admin/payment/ProjectPaymentPlanTab";
import ForemanPaymentEligibilityTab from "../../components/admin/payment/ForemanPaymentEligibilityTab";

import { FiInfo, FiUser, FiUsers, FiLayers, FiFileText, FiCreditCard, FiPackage, FiCheckCircle } from "react-icons/fi";

// MODULAR COMPONENTS
import AdminProjectHeader from "../../components/admin/project-detail/AdminProjectHeader";
import AdminProjectTabs from "../../components/admin/project-detail/AdminProjectTabs";
import AdminProjectOverviewTab from "../../components/admin/project-detail/AdminProjectOverviewTab";
import AdminProjectCustomerTab from "../../components/admin/project-detail/AdminProjectCustomerTab";
import AdminProjectTeamTab from "../../components/admin/project-detail/AdminProjectTeamTab";
import AdminProjectStagesTab from "../../components/admin/project-detail/AdminProjectStagesTab";
import AdminProjectRabTab from "../../components/admin/project-detail/AdminProjectRabTab";
import AdminProjectLogisticsTab from "../../components/admin/project-detail/AdminProjectLogisticsTab";
import AdminProjectReadinessTab from "../../components/admin/project-detail/AdminProjectReadinessTab";
import AdminProjectCompletionTab from "../../components/admin/project-detail/AdminProjectCompletionTab";
import AdminProjectSidebar from "../../components/admin/project-detail/AdminProjectSidebar";
import AdminProjectActivationModal from "../../components/admin/project-detail/AdminProjectActivationModal";
import AdminProjectCompletionModal from "../../components/admin/project-detail/AdminProjectCompletionModal";
import AdminProjectStageModal from "../../components/admin/project-detail/AdminProjectStageModal";
import DailyMonitoringTab from "../../components/common/DailyMonitoringTab";

const DetailProyekAdminPage = () => {
    const { projectId } = useParams();
    const { selectedAdminId } = useAdminPersona();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const [stages, setStages] = useState([]);
    const [rabPlan, setRabPlan] = useState(null);
    const [materialRequests, setMaterialRequests] = useState([]);
    const [loadingLogistik, setLoadingLogistik] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [completionSuccess, setCompletionSuccess] = useState(false);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [completionNote, setCompletionNote] = useState("");
    const [paymentSubTab, setPaymentSubTab] = useState("customer");
    const [isActivating, setIsActivating] = useState(false);
    const [showActivationModal, setShowActivationModal] = useState(false);

    // Stage Form State
    const [showStageModal, setShowStageModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedStageForComment, setSelectedStageForComment] = useState(null);
    const [isEditingStage, setIsEditingStage] = useState(false);
    const [editStageId, setEditStageId] = useState(null);
    const [stageForm, setStageForm] = useState({
        code: "",
        title: "",
        description: "",
        week: 1,
        status: "planning",
        startDate: "",
        endDate: "",
        durationDays: 7,
        order: 0,
        note: ""
    });

    useEffect(() => {
        if (projectId) {
            fetchProjectData();
            if (activeTab === "logistik") {
                fetchLogistikData();
            }
        }
    }, [projectId, activeTab]);

    const fetchProjectData = async () => {
        try {
            setLoading(true);
            const [projRes, stagesRes, rabRes] = await Promise.all([
                projectService.getProjectById(projectId),
                projectStageService.getStagesByProject(projectId),
                rabService.getRabByProject(projectId).catch(() => ({ data: null }))
            ]);
            
            setProject(projRes.data);
            setStages(stagesRes.data || []);
            setRabPlan(rabRes.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching project data:", err);
            setError("Gagal memuat data proyek. Pastikan server backend berjalan.");
            setLoading(false);
        }
    };

    const fetchLogistikData = async () => {
        try {
            setLoadingLogistik(true);
            const response = await projectService.getProjectMaterialRequests(projectId);
            setMaterialRequests(response.data || []);
            setLoadingLogistik(false);
        } catch (err) {
            console.error("Error fetching logistik data:", err);
            setLoadingLogistik(false);
        }
    };

    const handleSaveStage = async (e) => {
        if (e) e.preventDefault();
        try {
            if (isEditingStage) {
                await projectStageService.updateStage(editStageId, stageForm);
            } else {
                await projectStageService.createStage(projectId, stageForm);
            }
            setShowStageModal(false);
            fetchProjectData();
        } catch (err) {
            alert("Gagal menyimpan stage: " + (err.response?.data?.message || err.message));
        }
    };

    const handleDeleteStage = async (id) => {
        if (!window.confirm("Hapus tahapan pekerjaan ini?")) return;
        try {
            await projectStageService.deleteStage(id);
            fetchProjectData();
        } catch (err) {
            alert("Gagal menghapus stage: " + (err.response?.data?.message || err.message));
        }
    };

    const handleActivateProject = async () => {
        if (!projectId || !selectedAdminId) return;
        
        try {
            setIsActivating(true);
            const response = await projectService.activateProject(projectId, {
                adminId: selectedAdminId
            });

            if (response.success) {
                setShowActivationModal(false);
                fetchProjectData();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err) {
            console.error("Error activating project:", err);
            alert(err.response?.data?.message || "Gagal mengaktifkan proyek.");
        } finally {
            setIsActivating(false);
        }
    };

    const handleCompleteProject = async () => {
        if (!projectId || !selectedAdminId) return;
        
        try {
            setIsCompleting(true);
            const response = await projectService.completeProject(projectId, {
                adminId: selectedAdminId,
                note: completionNote
            });

            if (response.success) {
                setCompletionSuccess(true);
                setShowCompletionModal(false);
                fetchProjectData();
                setCompletionNote("");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err) {
            console.error("Error completing project:", err);
            alert(err.response?.data?.message || "Gagal menyelesaikan proyek.");
        } finally {
            setIsCompleting(false);
        }
    };

    if (!selectedAdminId) return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    if (loading) return <RoleDataState type="loading" message="Memuat detail proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchProjectData} />;
    
    // Soft warning: proyek di luar tanggung jawab Admin aktif — tidak diblokir untuk local dev monitoring.
    const isOtherAdminProject = project && project.adminId && project.adminId !== selectedAdminId;

    if (!project) return <RoleDataState type="empty" message="Data proyek tidak tersedia." />;

    // Readiness & Completion Logic
    const readinessChecks = [
        { label: "Customer terhubung", status: !!project.customerId },
        { label: "Admin ditugaskan", status: !!project.adminId },
        { label: "Pengawas ditugaskan", status: !!project.supervisorId },
        { label: "Mandor ditugaskan", status: !!project.foremanId },
        { label: "RAB Plan dibuat", status: (project._count?.rabPlans || 0) > 0 },
        { label: "Tahapan (Stages) dibuat", status: (project._count?.stages || 0) > 0 },
        { label: "Total RAB > 0", status: parseFloat(project.rabPlans?.[0]?.totalAmount || 0) > 0 },
        { label: "Tanggal mulai tersedia", status: !!project.startDate },
        { label: "Estimasi selesai tersedia", status: !!project.estimatedEndDate },
    ];
    const readyCount = readinessChecks.filter(c => c.status).length;
    const isReady = readyCount === readinessChecks.length;

    const completionChecks = [
        { label: "Verified Progress 100%", status: parseFloat(project?.verifiedProgress || 0) >= 100, desc: "Progres fisik resmi harus sudah mencapai 100% (diverifikasi Pengawas)." },
        { label: "Seluruh Tahapan Selesai", status: Array.isArray(stages) && stages.length > 0 && stages.every(s => s.status === 'Selesai' || (s.isVerified && parseFloat(s.progress) === 100)), desc: "Setiap item tahapan pekerjaan (Project Stages) harus berstatus Selesai." },
        { label: "Logistik Final / Selesai", status: !Array.isArray(materialRequests) || materialRequests.length === 0 || materialRequests.every(r => ['received', 'completed', 'rejected', 'cancelled'].includes(r.status)), desc: "Tidak boleh ada permintaan material yang masih dalam status Pending atau Processing." },
    ];
    const isCompletionReady = completionChecks.every(c => c.status);

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "customer", label: "Customer", icon: FiUser },
        { id: "tim", label: "Tim Project", icon: FiUsers },
        { id: "stages", label: "Stage / Jadwal", icon: FiLayers },
        { id: "harian", label: "Harian Lapangan", icon: FiFileText },
        { id: "rab", label: "RAB Ringkas", icon: FiFileText },
        { id: "payment", label: "Pembayaran", icon: FiCreditCard },
        { id: "logistik", label: "Logistik", icon: FiPackage },
        { id: "readiness", label: "Readiness", icon: FiCheckCircle },
    ];

    if (['active', 'ongoing', 'Berjalan'].includes(project.status)) {
        tabs.push({ id: "completion", label: "Penyelesaian", icon: FiCheckCircle });
    }

    return (
        <div className="animate-fadeIn space-y-6">
            {completionSuccess && (
                <div className="bg-purple-500 text-white p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-fadeIn shadow-lg shadow-purple-500/20">
                    <FiCheckCircle size={20} />
                    Proyek telah berhasil diselesaikan secara lokal. Akses lapangan untuk Mandor & Pengawas kini bersifat Read-Only.
                </div>
            )}

            {isOtherAdminProject && (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3 text-sm">
                    <FiInfo size={18} className="text-amber-500 shrink-0" />
                    <p className="text-amber-700 font-medium text-xs">Proyek ini tercatat atas nama Admin lain. Anda dapat memantau secara administratif (Read-only aksi sensitif).</p>
                </div>
            )}

            <AdminProjectHeader 
                project={project} 
                isReady={isReady} 
                onBack={() => navigate("/admin/proyek")} 
            />

            <AdminProjectTabs 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card min-h-[400px] relative overflow-hidden">
                        {activeTab === "overview" && <AdminProjectOverviewTab project={project} isReady={isReady} readyCount={readyCount} readinessChecks={readinessChecks} />}
                        {activeTab === "customer" && <AdminProjectCustomerTab project={project} />}
                        {activeTab === "tim" && <AdminProjectTeamTab project={project} />}
                        {activeTab === "stages" && (
                            <AdminProjectStagesTab 
                                project={project} 
                                stages={stages} 
                                onAddStage={() => {
                                    setStageForm({ code: "", title: "", description: "", week: 1, status: "planning", startDate: "", endDate: "", durationDays: 7, order: stages.length + 1, note: "" });
                                    setIsEditingStage(false);
                                    setShowStageModal(true);
                                }}
                                onEditStage={(stg) => {
                                    setStageForm({ 
                                        code: stg.code, title: stg.title, description: stg.description || "", 
                                        week: stg.week, status: stg.status, startDate: stg.startDate?.split('T')[0] || "", 
                                        endDate: stg.endDate?.split('T')[0] || "", durationDays: stg.durationDays, 
                                        order: stg.order, note: stg.note || "" 
                                    });
                                    setIsEditingStage(true);
                                    setEditStageId(stg.id);
                                    setShowStageModal(true);
                                }}
                                onDeleteStage={handleDeleteStage}
                                onCommentClick={(stg) => {
                                    setSelectedStageForComment(stg);
                                    setShowCommentModal(true);
                                }}
                            />
                        )}
                        {activeTab === "harian" && <DailyMonitoringTab projectId={projectId} />}
                        {activeTab === "rab" && <AdminProjectRabTab project={project} rabPlan={rabPlan} />}
                        {activeTab === "logistik" && <AdminProjectLogisticsTab loadingLogistik={loadingLogistik} materialRequests={materialRequests} />}
                        {activeTab === "payment" && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 border-b border-[var(--dashboard-border)] mb-6">
                                    <button onClick={() => setPaymentSubTab("customer")} className={`pb-3 px-4 text-xs font-black uppercase tracking-widest transition-all relative ${paymentSubTab === 'customer' ? 'text-[var(--dashboard-primary)]' : 'text-slate-400 hover:text-slate-600'}`}>
                                        Customer Billing Plan
                                        {paymentSubTab === 'customer' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--dashboard-primary)] rounded-t-full" />}
                                    </button>
                                    <button onClick={() => setPaymentSubTab("foreman")} className={`pb-3 px-4 text-xs font-black uppercase tracking-widest transition-all relative ${paymentSubTab === 'foreman' ? 'text-[var(--dashboard-primary)]' : 'text-slate-400 hover:text-slate-600'}`}>
                                        Mandor Payment Eligibility
                                        {paymentSubTab === 'foreman' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--dashboard-primary)] rounded-t-full" />}
                                    </button>
                                </div>
                                {paymentSubTab === "customer" ? <ProjectPaymentPlanTab projectId={projectId} actorRole="admin" budgetTotal={project.budgetTotal} /> : <ForemanPaymentEligibilityTab projectId={projectId} />}
                            </div>
                        )}
                        {activeTab === "readiness" && <AdminProjectReadinessTab project={project} isReady={isReady} readyCount={readyCount} readinessChecks={readinessChecks} onActivateClick={() => setShowActivationModal(true)} />}
                        {activeTab === "completion" && <AdminProjectCompletionTab project={project} isCompletionReady={isCompletionReady} completionChecks={completionChecks} onCompleteClick={() => setShowCompletionModal(true)} />}
                    </div>
                </div>

                <AdminProjectSidebar project={project} stages={stages} isReady={isReady} />
            </div>

            <AdminProjectStageModal isOpen={showStageModal} onClose={() => setShowStageModal(false)} isEditing={isEditingStage} stageForm={stageForm} onFormChange={setStageForm} onSubmit={handleSaveStage} />
            <AdminStageCommentModal isOpen={showCommentModal} onClose={() => setShowCommentModal(false)} stage={selectedStageForComment} projectId={project?.id} />
            <AdminProjectActivationModal isOpen={showActivationModal} onClose={() => setShowActivationModal(false)} project={project} onActivate={handleActivateProject} isActivating={isActivating} />
            <AdminProjectCompletionModal isOpen={showCompletionModal} onClose={() => setShowCompletionModal(false)} completionNote={completionNote} onNoteChange={setCompletionNote} onConfirm={handleCompleteProject} isCompleting={isCompleting} />
        </div>
    );
};

export default DetailProyekAdminPage;
