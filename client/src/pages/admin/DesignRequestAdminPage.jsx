import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiPlus,
    FiSearch,
    FiEdit2,
    FiTrash2,
    FiUser,
    FiMapPin,
    FiClock,
    FiCheckCircle,
    FiUserPlus,
    FiX,
    FiInfo,
    FiZap,
    FiList,
    FiAward,
    FiDollarSign,
    FiArrowLeft,
    FiArrowRight,
    FiMessageSquare,
    FiSend,
    FiShield,
    FiActivity,
    FiAlertCircle,
    FiCalendar
} from "react-icons/fi";
import { 
    getLatestCustomerPostDesignDecision, 
    getLatestMandorPreparation, 
    getLatestConstructionReadiness, 
    getLatestConstructionTransitionReview,
    getLatestHistoryByAction,
    getProjectBridgeReadiness
} from "../../utils/designRequestHistory";
import designRequestService from "../../services/designRequestService";
import designTenderService from "../../services/designTenderService";
import customerService from "../../services/customerService";
import architectService from "../../services/architectService";
import foremanService from "../../services/foremanService";
import supervisorService from "../../services/supervisorService";
import RoleDataState from "../../components/common/RoleDataState";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import DesignTimeline from "../../components/design/DesignTimeline";

// Import Panels
import PostDesignDecisionMonitorPanel from "../../components/design/admin/PostDesignDecisionMonitorPanel";
import MandorSelectionPreparationPanel from "../../components/design/admin/MandorSelectionPreparationPanel";
import ConstructionReadinessPreparationPanel from "../../components/design/admin/ConstructionReadinessPreparationPanel";
import ConstructionTransitionSummaryPanel from "../../components/design/admin/ConstructionTransitionSummaryPanel";
import ConstructionTransitionReviewPanel from "../../components/design/admin/ConstructionTransitionReviewPanel";
import ExecutionMonitorPanel from "../../components/design/admin/ExecutionMonitorPanel";
import CustomerApprovalStatusPanel from "../../components/design/admin/CustomerApprovalStatusPanel";
import CuratedInstructionPanel from "../../components/design/admin/CuratedInstructionPanel";
import ReleaseToCustomerPanel from "../../components/design/admin/ReleaseToCustomerPanel";
import AdminControlsPanel from "../../components/design/admin/AdminControlsPanel";
import RevisionMonitoringPanel from "../../components/design/admin/RevisionMonitoringPanel";
import DesignDocumentReviewPanel from "../../components/design/admin/DesignDocumentReviewPanel";
import ProjectBridgeEligibilityPanel from "../../components/design/ProjectBridgeEligibilityPanel";


const DesignRequestAdminPage = () => {
    const [activeTab, setActiveTab] = useState("requests"); // "requests" or "tenders"
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requests, setRequests] = useState([]);
    const [tenders, setTenders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAssignOpen, setIsAssignOpen] = useState(false);
    const [isPublishOpen, setIsPublishOpen] = useState(false);
    const [isBidsOpen, setIsBidsOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [currentRequest, setCurrentRequest] = useState(null);
    const [currentTender, setCurrentTender] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [architects, setArchitects] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const { selectedAdminId } = useAdminPersona();
    const navigate = useNavigate();
    const [isConvertOpen, setIsConvertOpen] = useState(false);
    const [curatedInstruction, setCuratedInstruction] = useState("");
    const [releaseSummary, setReleaseSummary] = useState("");
    const [foremen, setForemen] = useState([]);
    const [selectedMandorIds, setSelectedMandorIds] = useState([]);
    const [mandorNote, setMandorNote] = useState("");
    const [supervisors, setSupervisors] = useState([]);
    const [selectedSupervisorIds, setSelectedSupervisorIds] = useState([]);
    const [readinessNote, setReadinessNote] = useState("");
    const [finalReviewNote, setFinalReviewNote] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        buildingType: "",
        location: "",
        estimatedBudget: "",
        customerId: "",
        status: "submitted"
    });

    const [assignData, setAssignData] = useState({
        architectId: ""
    });

    const [publishData, setPublishData] = useState({
        baseDesignFee: ""
    });

    useEffect(() => {
        fetchData();
        fetchReferences();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            setLoading(true);
            if (activeTab === "requests") {
                const res = await designRequestService.getAllDesignRequests();
                setRequests(Array.isArray(res.data) ? res.data : []);
            } else {
                const res = await designTenderService.getDesignTenders();
                setTenders(Array.isArray(res.data) ? res.data : []);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Gagal memuat data.");
            setLoading(false);
        }
    };

    const fetchReferences = async () => {
        try {
            const [custRes, archRes] = await Promise.all([
                customerService.getAllCustomers(),
                architectService.getAllArchitects()
            ]);
            setCustomers(Array.isArray(custRes.data) ? custRes.data : []);
            setArchitects(Array.isArray(archRes.data) ? archRes.data : []);
        } catch (err) {
            console.error("Error fetching references:", err);
        }
    };

    const handleOpenForm = (request = null) => {
        if (request) {
            setCurrentRequest(request);
            setFormData({
                title: request.title || "",
                description: request.description || "",
                buildingType: request.buildingType || "",
                location: request.location || "",
                estimatedBudget: request.estimatedBudget || "",
                customerId: request.customerId || "",
                status: request.status || "submitted"
            });
        } else {
            setCurrentRequest(null);
            setFormData({
                title: "",
                description: "",
                buildingType: "",
                location: "",
                estimatedBudget: "",
                customerId: "",
                status: "submitted"
            });
        }
        setIsFormOpen(true);
    };

    const handleOpenAssign = (request) => {
        setCurrentRequest(request);
        setAssignData({
            architectId: request.architectId || ""
        });
        setIsAssignOpen(true);
    };

    const handleOpenPublish = (request) => {
        setCurrentRequest(request);
        setPublishData({ baseDesignFee: request.estimatedBudget || "" });
        setIsPublishOpen(true);
    };

    const handleOpenBids = async (tender) => {
        try {
            const res = await designTenderService.getDesignTenderBids(tender.id);
            setCurrentTender({ ...tender, bids: Array.isArray(res.data) ? res.data : [] });
            setIsBidsOpen(true);
        } catch (err) {
            console.error("Error loading bids:", err);
            alert("Gagal memuat penawaran.");
        }
    };

    const handleOpenConvert = async (request) => {
        try {
            setLoading(true);
            const res = await designRequestService.getDesignRequestById(request.id);
            setCurrentRequest(res.data);
            setIsConvertOpen(true);
        } catch (err) {
            console.error("Error fetching request for conversion:", err);
            alert("Gagal memuat detail pengajuan untuk konversi.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            if (currentRequest) {
                await designRequestService.updateDesignRequest(currentRequest.id, formData);
            } else {
                await designRequestService.createDesignRequest(formData);
            }
            setIsFormOpen(false);
            fetchData();
        } catch (err) {
            console.error("Error saving data:", err);
            alert("Gagal menyimpan data.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleAssignArchitect = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await designRequestService.assignArchitect(currentRequest.id, assignData.architectId);
            setIsAssignOpen(false);
            fetchData();
        } catch (err) {
            console.error("Error assigning architect:", err);
            alert("Gagal menugaskan arsitek.");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePublishTender = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await designTenderService.publishTender({
                designRequestId: currentRequest.id,
                baseDesignFee: publishData.baseDesignFee,
                title: currentRequest.title,
                description: currentRequest.description
            });
            setIsPublishOpen(false);
            fetchData();
        } catch (err) {
            console.error("Error publishing tender:", err);
            alert("Gagal mempublish peluang desain.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleAwardBid = async (tenderId, bidId) => {
        if (!window.confirm("Pilih arsitek ini untuk mengerjakan desain?")) return;
        try {
            setSubmitting(true);
            await designTenderService.awardBid(tenderId, bidId);
            setIsBidsOpen(false);
            fetchData();
        } catch (err) {
            console.error("Error awarding bid:", err);
            alert("Gagal memilih arsitek.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            setSubmitting(true);
            await designRequestService.updateDesignRequest(id, { status });

            // Add history log for status change
            await designRequestService.addHistory(id, {
                action: `status_change_${status}`,
                actorRole: 'admin',
                actorId: selectedAdminId || 'admin-system',
                actorName: 'Admin RKK',
                note: `Status pengajuan diubah menjadi ${status.replace('_', ' ')}.`
            });

            fetchData();
            if (selectedRequest && selectedRequest.id === id) {
                const res = await designRequestService.getDesignRequestById(id);
                setSelectedRequest(res.data);
            }
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Gagal memperbarui status.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleOpenDetail = async (request) => {
        try {
            setLoading(true);
            const res = await designRequestService.getDesignRequestById(request.id);
            const requestData = res.data;
            setSelectedRequest(requestData);

            const history = requestData.history || [];

            // Find latest curated instruction in history
            const latestCurated = getLatestHistoryByAction(history, 'admin_curated_instruction');
            setCuratedInstruction(latestCurated?.note || "");

            // Batch 11A: Fetch foremen if decision is continue_to_construction_preparation
            const latestDecision = getLatestCustomerPostDesignDecision(history);

            if (latestDecision?.metadata?.decision === 'continue_to_construction_preparation') {
                try {
                    const foremanRes = await foremanService.getAllForemen();
                    setForemen(foremanRes.data || []);

                    // Pre-populate shortlist if exists
                    const latestPrep = getLatestMandorPreparation(history);
                    setSelectedMandorIds(latestPrep?.metadata?.selectedCandidateIds || []);
                    setMandorNote(latestPrep?.note || "");
                    
                    // Batch 12A: Fetch supervisors if Mandor prep is done
                    if (latestPrep?.metadata?.preparationStatus === 'shortlist_prepared') {
                        try {
                            const supervisorRes = await supervisorService.getAllSupervisors();
                            setSupervisors(supervisorRes.data || []);

                            // Pre-populate readiness if exists
                            const latestReadiness = getLatestConstructionReadiness(history);
                            setSelectedSupervisorIds(latestReadiness?.metadata?.selectedSupervisorCandidateIds || []);
                            setReadinessNote(latestReadiness?.note || "");
                        } catch (sErr) {
                            console.error("Error fetching supervisors:", sErr);
                        }
                    } else {
                        setSupervisors([]);
                        setSelectedSupervisorIds([]);
                        setReadinessNote("");
                    }
                } catch (fErr) {
                    console.error("Error fetching foremen:", fErr);
                }
            } else {
                setForemen([]);
                setSelectedMandorIds([]);
                setMandorNote("");
                setSupervisors([]);
                setSelectedSupervisorIds([]);
                setReadinessNote("");
            }

            // Batch 14: Pre-populate final review if exists
            const latestReview = getLatestConstructionTransitionReview(history);
            setFinalReviewNote(latestReview?.note || "");

            setLoading(false);
        } catch (err) {
            console.error("Error fetching detail:", err);
            alert("Gagal memuat detail pengajuan.");
            setLoading(false);
        }
    };

    const handleConvertToProject = async () => {
        try {
            setSubmitting(true);
            const res = await designRequestService.convertToProject(currentRequest.id, { adminId: selectedAdminId });
            alert("Draft Proyek Berhasil Dibuat!");
            setIsConvertOpen(false);

            // Navigate to project detail for setup
            if (res.data?.data?.project?.id) {
                navigate(`/admin/proyek/${res.data.data.project.id}`);
            } else {
                fetchData();
            }
        } catch (err) {
            console.error("Error converting to project:", err);
            alert("Gagal membuat draft proyek: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    const handleSaveCuratedInstruction = async () => {
        if (!curatedInstruction.trim()) return;
        try {
            setSubmitting(true);
            await designRequestService.addHistory(selectedRequest.id, {
                action: 'admin_curated_instruction',
                actorRole: 'admin',
                actorId: selectedAdminId || 'admin-system',
                actorName: 'Admin RKK',
                note: curatedInstruction
            });

            // Also add a status log
            await designRequestService.addHistory(selectedRequest.id, {
                action: 'instruction_sent_to_architect',
                actorRole: 'admin',
                actorId: selectedAdminId || 'admin-system',
                actorName: 'Admin RKK',
                note: 'Instruksi terkurasi telah dikirimkan ke Arsitek.'
            });

            const res = await designRequestService.getDesignRequestById(selectedRequest.id);
            setSelectedRequest(res.data);
            alert("Instruksi berhasil disimpan dan diteruskan ke Arsitek.");
        } catch (err) {
            console.error("Error saving curated instruction:", err);
            alert("Gagal menyimpan instruksi.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleReleaseToCustomer = async () => {
        if (!releaseSummary.trim()) return;
        try {
            setSubmitting(true);
            await designRequestService.addHistory(selectedRequest.id, {
                action: 'admin_released_design_to_customer',
                actorRole: 'admin',
                actorId: selectedAdminId || 'admin-system',
                actorName: 'Admin RKK',
                note: releaseSummary,
                metadata: { visibility: 'customer-visible', source: 'design-review' }
            });

            const res = await designRequestService.getDesignRequestById(selectedRequest.id);
            setSelectedRequest(res.data);
            setReleaseSummary("");
            alert("Ringkasan desain telah dirilis ke Konsumen.");
        } catch (err) {
            console.error("Error releasing design:", err);
            alert("Gagal merilis desain.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSaveMandorPreparation = async () => {
        if (selectedMandorIds.length === 0 && !mandorNote.trim()) {
            alert("Silakan pilih minimal satu mandor atau tulis catatan persiapan.");
            return;
        }

        try {
            setSubmitting(true);
            await designRequestService.addHistory(selectedRequest.id, {
                action: 'admin_mandor_selection_preparation',
                actorRole: 'admin',
                actorId: selectedAdminId || 'admin-system',
                actorName: 'Admin RKK',
                note: mandorNote,
                metadata: {
                    selectedCandidateIds: selectedMandorIds,
                    preparationStatus: 'shortlist_prepared',
                    source: 'mandor-selection-preparation'
                }
            });

            const res = await designRequestService.getDesignRequestById(selectedRequest.id);
            setSelectedRequest(res.data);
            alert("Persiapan seleksi mandor berhasil disimpan.");
        } catch (err) {
            console.error("Error saving mandor prep:", err);
            alert("Gagal menyimpan persiapan seleksi mandor.");
        } finally {
            setSubmitting(false);
        }
    };

    const toggleMandorSelection = (id) => {
        setSelectedMandorIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSaveReadinessPreparation = async () => {
        if (selectedSupervisorIds.length === 0 && !readinessNote.trim()) {
            alert("Silakan pilih minimal satu pengawas atau tulis catatan kesiapan.");
            return;
        }

        try {
            setSubmitting(true);

            const hasProjectPlanning = (selectedRequest.history || []).some(h => h.action === 'admin_curated_instruction');

            await designRequestService.addHistory(selectedRequest.id, {
                action: 'admin_construction_readiness_preparation',
                actorRole: 'admin',
                actorId: selectedAdminId || 'admin-system',
                actorName: 'Admin RKK',
                note: readinessNote,
                metadata: {
                    selectedSupervisorCandidateIds: selectedSupervisorIds,
                    readinessStatus: 'readiness_prepared',
                    checklist: {
                        customerDecisionExists: true,
                        mandorPreparationExists: true,
                        supervisorCandidatePrepared: selectedSupervisorIds.length > 0,
                        projectPlanningExists: hasProjectPlanning
                    },
                    source: 'construction-readiness-preparation'
                }
            });

            const res = await designRequestService.getDesignRequestById(selectedRequest.id);
            setSelectedRequest(res.data);
            alert("Persiapan kesiapan konstruksi berhasil disimpan.");
        } catch (err) {
            console.error("Error saving readiness prep:", err);
            alert("Gagal menyimpan persiapan kesiapan konstruksi.");
        } finally {
            setSubmitting(false);
        }
    };

    const toggleSupervisorSelection = (id) => {
        setSelectedSupervisorIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSaveFinalReview = async () => {
        if (!finalReviewNote.trim()) {
            alert("Silakan tulis catatan review final.");
            return;
        }

        try {
            setSubmitting(true);

            const history = selectedRequest.history || [];
            const latestDecision = getLatestCustomerPostDesignDecision(history);
            const latestMandorPrep = getLatestMandorPreparation(history);
            const latestReadiness = getLatestConstructionReadiness(history);

            await designRequestService.addHistory(selectedRequest.id, {
                action: 'admin_construction_transition_review',
                actorRole: 'admin',
                actorId: selectedAdminId || 'admin-system',
                actorName: 'Admin RKK',
                note: finalReviewNote,
                metadata: {
                    reviewStatus: 'reviewed_for_project_planning',
                    constructionIntentConfirmed: latestDecision?.metadata?.decision === 'continue_to_construction_preparation',
                    mandorPreparationReviewed: !!latestMandorPrep,
                    supervisorReadinessReviewed: !!latestReadiness,
                    nextStepRecommendation: 'project_planning_review_only',
                    source: 'construction-transition-review'
                }
            });

            const res = await designRequestService.getDesignRequestById(selectedRequest.id);
            setSelectedRequest(res.data);
            alert("Review transisi konstruksi berhasil disimpan.");
        } catch (err) {
            console.error("Error saving final review:", err);
            alert("Gagal menyimpan review transisi konstruksi.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Hapus permintaan desain ini dari database lokal? Tindakan ini tidak dapat dibatalkan dalam fase pengembangan ini.")) {
            try {
                await designRequestService.deleteDesignRequest(id);
                fetchData();
            } catch (err) {
                console.error("Error deleting request:", err);
                alert("Gagal menghapus.");
            }
        }
    };

    const filteredRequests = (Array.isArray(requests) ? requests : []).filter(r => {
        if (!r) return false;
        return (r.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
               (r.customer?.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
               (r.customer?.companyName?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    });

    const filteredTenders = (Array.isArray(tenders) ? tenders : []).filter(t => {
        if (!t) return false;
        return (t.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
               (t.designRequest?.customer?.name?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    });

    const getStatusBadge = (status) => {
        const styles = {
            submitted: "bg-blue-50 text-blue-600 border-blue-100",
            open: "bg-teal-50 text-teal-600 border-teal-100",
            assigned: "bg-indigo-50 text-indigo-600 border-indigo-100",
            awarded: "bg-indigo-50 text-indigo-600 border-indigo-100",
            in_review: "bg-amber-50 text-amber-600 border-amber-100",
            approved: "bg-emerald-50 text-emerald-600 border-emerald-100",
            rejected: "bg-rose-50 text-rose-600 border-rose-100",
            draft: "bg-gray-50 text-gray-600 border-gray-100",
            cancelled: "bg-gray-100 text-gray-500 border-gray-200",
            project_created: "bg-purple-50 text-purple-600 border-purple-100"
        };
        const labels = {
            assigned: "Arsitek Terpilih",
            open: "Tender Aktif",
            approved: "Siap Convert",
            project_created: "Proyek Draft"
        };
        return { style: styles[status] || styles.draft, label: labels[status] || status.replace('_', ' ') };
    };

    if (loading && !isBidsOpen) return <RoleDataState type="loading" message="Memuat data..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;
    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Monitoring Desain & Tender</h1>
                    <p className="text-xs text-neutral-500 font-bold mt-1 uppercase tracking-widest italic">Simulasi Local Workflow — Koordinasi Arsitek & Pra-Konstruksi</p>
                </div>
                {activeTab === "requests" && (
                    <button
                        onClick={() => handleOpenForm()}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                    >
                        <FiPlus size={18} />
                        Buat Request Lokal
                    </button>
                )}
            </div>

            {/* AUTHORITY & MARKETPLACE BOUNDARY DISCLAIMER */}
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-start gap-4">
                <div className="w-10 h-10 bg-white border border-indigo-200 rounded-2xl flex items-center justify-center text-indigo-500 shrink-0 shadow-sm">
                    <FiShield size={20} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-widest">Local Coordination & Simulation Boundary</h4>
                    <p className="text-[10px] text-indigo-700/70 leading-relaxed font-bold">
                        Seluruh aktivitas desain, tender, dan seleksi arsitek di halaman ini bersifat **simulasi koordinasi lokal**. Sistem ini **bukan marketplace tender publik** dan tidak melibatkan transaksi keuangan atau kontrak legal produksi secara otomatis. Bridge ke Proyek Konstruksi bersifat **Draft Planning** dan tidak mengubah status Progress SOT (Verified Progress) resmi.
                    </p>
                </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)]">
                <button
                    onClick={() => setActiveTab("requests")}
                    className={`px-6 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "requests" ? "border-[var(--dashboard-primary)] text-[var(--dashboard-primary)]" : "border-transparent text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-text)]"}`}
                >
                    <FiList className="inline mr-2" />
                    Permintaan Masuk
                </button>
                <button
                    onClick={() => setActiveTab("tenders")}
                    className={`px-6 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "tenders" ? "border-[var(--dashboard-primary)] text-[var(--dashboard-primary)]" : "border-transparent text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-text)]"}`}
                >
                    <FiZap className="inline mr-2" />
                    Peluang Desain
                </button>
            </div>

            <div className="dashboard-card">
                <div className="mb-6 relative max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                    <input
                        type="text"
                        placeholder={activeTab === "requests" ? "Cari judul atau konsumen..." : "Cari peluang desain..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                    />
                </div>

                <div className="overflow-x-auto">
                    {activeTab === "requests" ? (
                        filteredRequests.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[var(--dashboard-border)] text-[10px] uppercase font-black tracking-widest text-[var(--dashboard-text-soft)]">
                                        <th className="pb-4 px-2">Project/Brief</th>
                                        <th className="pb-4 px-2">Konsumen</th>
                                        <th className="pb-4 px-2">Status</th>
                                        <th className="pb-4 px-2">Arsitek</th>
                                        <th className="pb-4 px-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRequests.map((r) => (
                                        <tr key={r.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors cursor-pointer group">
                                            <td className="py-4 px-2">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-[var(--dashboard-text)] group-hover:text-[var(--dashboard-primary)] transition-colors">{r.title}</span>
                                                    <div className="flex items-center gap-2 mt-1 text-[10px] text-[var(--dashboard-text-soft)] font-medium">
                                                        <FiMapPin className="shrink-0" />
                                                        <span className="truncate max-w-[150px]">{r.location || "-"}</span>
                                                        <span className="mx-1">•</span>
                                                        <span>{r.buildingType || "-"}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
                                                        <FiUser size={12} />
                                                    </div>
                                                    <span className="text-xs font-semibold">
                                                        {r.customer?.name || r.customer?.companyName || "N/A"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${getStatusBadge(r.status).style}`}>
                                                    {getStatusBadge(r.status).label}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2">
                                                {r.architect ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                            <FiCheckCircle size={12} />
                                                        </div>
                                                        <span className="text-xs font-medium text-indigo-700">{r.architect.name}</span>
                                                    </div>
                                                ) : <span className="text-[10px] text-gray-400 italic">Belum ditugaskan</span>}
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {['approved', 'project_created', 'finished'].includes(r.status) ? (
                                                        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-bold border border-emerald-100">
                                                            <FiCheckCircle size={10} /> Finalized
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {r.status === 'submitted' && (
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleOpenPublish(r); }}
                                                                    className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg"
                                                                    title="Publish Peluang"
                                                                >
                                                                    <FiZap size={14} />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleOpenAssign(r); }}
                                                                className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg"
                                                                title="Assign Arsitek"
                                                            >
                                                                <FiUserPlus size={14} />
                                                            </button>
                                                                <button
                                                                onClick={(e) => { e.stopPropagation(); handleOpenForm(r); }}
                                                                className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"
                                                                title="Edit"
                                                            >
                                                                <FiEdit2 size={14} />
                                                            </button>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleDelete(r.id); }}
                                                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                                                                title="Hapus"
                                                            >
                                                                <FiTrash2 size={14} />
                                                            </button>
                                                        </>
                                                    )}

                                                    {(r.status === 'approved' || r.status === 'project_created') && !r.projectId && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleOpenConvert(r); }}
                                                            className="px-2 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-indigo-700 shadow-sm"
                                                            title="Buat Draft Proyek"
                                                        >
                                                            Draft Proyek
                                                        </button>
                                                    )}

                                                    {r.projectId && (
                                                        <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-600 rounded-lg text-[9px] font-bold border border-purple-100">
                                                            <FiCheckCircle size={10} /> Drafted
                                                        </div>
                                                    )}

                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleOpenDetail(r); }}
                                                        className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg"
                                                        title="Detail Timeline"
                                                    >
                                                        <FiArrowRight size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <RoleDataState type="empty" message="Belum ada permintaan desain." />
                        )
                    ) : (
                        /* TENDER TABLE */
                        filteredTenders.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[var(--dashboard-border)] text-[10px] uppercase font-black tracking-widest text-[var(--dashboard-text-soft)]">
                                        <th className="pb-4 px-2">Peluang Desain</th>
                                        <th className="pb-4 px-2">Fee Total</th>
                                        <th className="pb-4 px-2">Budget Arsitek (70%)</th>
                                        <th className="pb-4 px-2">Status</th>
                                        <th className="pb-4 px-2">Penawaran</th>
                                        <th className="pb-4 px-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTenders.map((t) => (
                                        <tr key={t.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                            <td className="py-4 px-2">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-[var(--dashboard-text)]">{t.title}</span>
                                                    <span className="text-[10px] text-[var(--dashboard-text-soft)] mt-0.5">Ref: {t.designRequest?.customer?.name || "N/A"}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2 font-medium text-xs">
                                                Rp {Number(t.baseDesignFee).toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-4 px-2 font-bold text-xs text-teal-600">
                                                Rp {Number(t.drafterBudgetAmount).toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${getStatusBadge(t.status).style}`}>
                                                    {getStatusBadge(t.status).label}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2">
                                                <span className="px-2 py-1 bg-gray-100 rounded-lg text-[10px] font-black">{t.bids?.length || 0} Bid</span>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <button
                                                    onClick={() => handleOpenBids(t)}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black border border-blue-100 hover:bg-blue-100 transition-all uppercase tracking-widest"
                                                >
                                                    Cek Bid
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <RoleDataState type="empty" message="Belum ada peluang desain aktif." />
                        )
                    )}
                </div>
            </div>

            {/* DETAIL VIEW OVERLAY */}
            {selectedRequest && (
                <div className="fixed inset-0 z-[1000] flex flex-col bg-white animate-slideInUp overflow-y-auto">
                    <div className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center gap-4 z-20">
                        <button
                            onClick={() => setSelectedRequest(null)}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                        >
                            <FiArrowLeft size={20} />
                        </button>
                        <div>
                            <h3 className="text-lg font-black text-gray-800">{selectedRequest.title}</h3>
                            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mt-0.5">Admin Review & Collaboration Timeline</p>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto w-full p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* LEFT: INFO & ACTIONS */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="space-y-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${getStatusBadge(selectedRequest.status).style} inline-block`}>
                                    Status: {getStatusBadge(selectedRequest.status).label}
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 leading-tight">{selectedRequest.title}</h1>
                                <p className="text-sm text-gray-500 leading-relaxed italic whitespace-pre-wrap">"{selectedRequest.description || 'Tidak ada deskripsi tambahan.'}"</p>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Info Konsumen</h4>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                                        {selectedRequest.customer?.name?.[0] || 'C'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{selectedRequest.customer?.name || selectedRequest.customer?.companyName}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{selectedRequest.customer?.customerType}</p>
                                    </div>
                                </div>
                            </div>

                            <ProjectBridgeEligibilityPanel 
                                request={selectedRequest} 
                                role="admin" 
                            />

                            <RevisionMonitoringPanel 
                                majorCount={selectedRequest.majorRevisionCount} 
                                minorCount={selectedRequest.minorRevisionCount} 
                            />

                            <AdminControlsPanel 
                                request={selectedRequest}
                                onUpdateStatus={handleUpdateStatus}
                                onOpenConvert={handleOpenConvert}
                                onOpenForm={handleOpenForm}
                                submitting={submitting}
                            />

                            <ExecutionMonitorPanel 
                                history={selectedRequest.history} 
                                status={selectedRequest.status}
                                architectId={selectedRequest.architectId}
                            />

                            <CustomerApprovalStatusPanel history={selectedRequest.history} />

                            <CuratedInstructionPanel 
                                instruction={curatedInstruction}
                                onInstructionChange={setCuratedInstruction}
                                onSubmit={handleSaveCuratedInstruction}
                                submitting={submitting}
                            />

                            <ReleaseToCustomerPanel 
                                summary={releaseSummary}
                                onSummaryChange={setReleaseSummary}
                                onSubmit={handleReleaseToCustomer}
                                submitting={submitting}
                            />

                            <DesignDocumentReviewPanel 
                                designRequestId={selectedRequest.id}
                                customerId={selectedRequest.customerId}
                            />


                            <PostDesignDecisionMonitorPanel history={selectedRequest.history} />

                            <MandorSelectionPreparationPanel 
                                history={selectedRequest.history}
                                foremen={foremen}
                                selectedMandorIds={selectedMandorIds}
                                toggleMandorSelection={toggleMandorSelection}
                                mandorNote={mandorNote}
                                setMandorNote={setMandorNote}
                                onSubmit={handleSaveMandorPreparation}
                                submitting={submitting}
                            />

                            <ConstructionReadinessPreparationPanel 
                                history={selectedRequest.history}
                                supervisors={supervisors}
                                selectedSupervisorIds={selectedSupervisorIds}
                                toggleSupervisorSelection={toggleSupervisorSelection}
                                readinessNote={readinessNote}
                                setReadinessNote={setReadinessNote}
                                onSubmit={handleSaveReadinessPreparation}
                                submitting={submitting}
                            />

                            <ConstructionTransitionSummaryPanel history={selectedRequest.history} />

                            <ConstructionTransitionReviewPanel 
                                history={selectedRequest.history}
                                finalReviewNote={finalReviewNote}
                                setFinalReviewNote={setFinalReviewNote}
                                onSubmit={handleSaveFinalReview}
                                submitting={submitting}
                            />
                        </div>

                        {/* RIGHT: TIMELINE */}
                        <div className="lg:col-span-2">
                            <h4 className="text-sm font-black text-gray-800 mb-8 flex items-center gap-2">
                                <FiClock className="text-indigo-600" />
                                Collaboration Timeline
                            </h4>
                            <DesignTimeline
                                history={selectedRequest.history || []}
                                majorCount={selectedRequest.majorRevisionCount || 0}
                                minorCount={selectedRequest.minorRevisionCount || 0}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* REQUEST FORM MODAL */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFormOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-scaleIn">
                        <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                            <h3 className="text-xl font-extrabold">{currentRequest ? "Edit Draft Request" : "Request Desain Lokal Baru"}</h3>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><FiX size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmitForm} className="p-8 space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Judul / Nama Proyek</label>
                                <input required type="text" className="dashboard-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Tipe Bangunan</label>
                                    <input type="text" className="dashboard-input" placeholder="Rumah, Kantor, dll" value={formData.buildingType} onChange={(e) => setFormData({...formData, buildingType: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Konsumen</label>
                                    <select required className="dashboard-input" value={formData.customerId} onChange={(e) => setFormData({...formData, customerId: e.target.value})}>
                                        <option value="">Pilih Konsumen</option>
                                        {customers.map(c => <option key={c.id} value={c.id}>{c.name || c.companyName}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Lokasi</label>
                                <input type="text" className="dashboard-input" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Deskripsi / Brief Singkat</label>
                                <textarea rows="3" className="dashboard-input" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Estimasi Budget Konstruksi</label>
                                    <input type="number" className="dashboard-input" value={formData.estimatedBudget} onChange={(e) => setFormData({...formData, estimatedBudget: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Status Request</label>
                                    <select className="dashboard-input" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                                        <option value="draft">Draft</option>
                                        <option value="submitted">Submitted</option>
                                        <option value="assigned">Assigned</option>
                                        <option value="in_review">In Review</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 border border-gray-200 rounded-xl font-bold text-sm">Batal</button>
                                <button type="submit" disabled={submitting} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20">{submitting ? "Menyimpan..." : "Simpan"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ASSIGN MODAL */}
            {isAssignOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAssignOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-2xl animate-scaleIn overflow-hidden">
                        <div className="bg-purple-600 px-8 py-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-extrabold uppercase tracking-tight">Assign Arsitek</h3>
                                <p className="text-[10px] text-purple-100 font-bold opacity-80 mt-1 uppercase tracking-widest text-wrap">Tugaskan secara manual tanpa tender</p>
                            </div>
                            <button onClick={() => setIsAssignOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white"><FiX size={24} /></button>
                        </div>
                        <form onSubmit={handleAssignArchitect} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Pilih Arsitek</label>
                                <select
                                    required
                                    className="dashboard-input border-purple-100 focus:ring-purple-500/20"
                                    value={assignData.architectId}
                                    onChange={(e) => setAssignData({...assignData, architectId: e.target.value})}
                                >
                                    <option value="">-- Pilih Arsitek --</option>
                                    {architects.map(a => (
                                        <option key={a.id} value={a.id}>{a.name} ({a.specialization || "Umum"})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsAssignOpen(false)} className="px-6 py-3 border border-gray-100 text-gray-400 rounded-2xl font-bold text-xs uppercase tracking-widest">Batal</button>
                                <button type="submit" disabled={submitting} className="px-8 py-3 bg-purple-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg">Konfirmasi</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* PUBLISH TENDER MODAL */}
            {isPublishOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsPublishOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-2xl animate-scaleIn overflow-hidden">
                        <div className="bg-teal-600 px-8 py-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-extrabold uppercase tracking-tight">Publish Peluang</h3>
                                <p className="text-[10px] text-teal-100 font-bold opacity-80 mt-1 uppercase tracking-widest text-wrap">Buat peluang tender desain arsitektur</p>
                            </div>
                            <button onClick={() => setIsPublishOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white"><FiX size={24} /></button>
                        </div>
                        <form onSubmit={handlePublishTender} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Jasa Desain (RKK + Arsitek)</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rp</div>
                                    <input
                                        required
                                        type="number"
                                        className="dashboard-input pl-12 border-teal-100 focus:ring-teal-500/20"
                                        value={publishData.baseDesignFee}
                                        onChange={(e) => setPublishData({...publishData, baseDesignFee: e.target.value})}
                                    />
                                </div>
                            </div>
                            {publishData.baseDesignFee > 0 && (
                                <div className="p-5 bg-teal-50 rounded-2xl border border-teal-100 space-y-3">
                                    <div className="flex justify-between items-center pb-2 border-b border-teal-200/50">
                                        <span className="text-[10px] font-black text-teal-800 uppercase tracking-widest">Fee Platform Simulasi (30%)</span>
                                        <span className="text-xs font-bold text-teal-900">Rp {(publishData.baseDesignFee * 0.3).toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <span className="text-[10px] font-black text-teal-800 uppercase tracking-widest">Pagu Budget Arsitek (70%)</span>
                                        <span className="text-sm font-black text-teal-600 underline underline-offset-4">Rp {(publishData.baseDesignFee * 0.7).toLocaleString('id-ID')}</span>
                                    </div>
                                    <p className="text-[9px] text-teal-700 italic pt-2">* Angka di atas adalah simulasi alokasi jasa dalam sistem RKK lokal.</p>
                                </div>
                            )}
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsPublishOpen(false)} className="px-6 py-3 border border-gray-100 text-gray-400 rounded-2xl font-bold text-xs uppercase tracking-widest">Batal</button>
                                <button type="submit" disabled={submitting} className="px-8 py-3 bg-teal-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-teal-600/20 hover:scale-[1.02] transition-all">
                                    {submitting ? "Memproses..." : "Publish Peluang"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* BIDS LIST MODAL */}
            {isBidsOpen && currentTender && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsBidsOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] relative z-10 shadow-2xl animate-scaleIn flex flex-col overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                            <div>
                                <h3 className="text-xl font-extrabold uppercase tracking-tight text-gray-800">Daftar Penawaran</h3>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                                    {currentTender.title} • {currentTender.bids?.length || 0} Penawaran
                                </p>
                            </div>
                            <button onClick={() => setIsBidsOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-400"><FiX size={24} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-white">
                            {currentTender.bids && currentTender.bids.length > 0 ? (
                                currentTender.bids.map(bid => (
                                    <div key={bid.id} className={`p-6 border rounded-3xl transition-all ${bid.status === 'selected' ? 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-500/10' : 'bg-gray-50/30 border-gray-100 hover:border-blue-200'}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm ${bid.status === 'selected' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}`}>
                                                    {bid.architect?.name?.charAt(0) || "A"}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800 leading-none">{bid.architect?.name}</h4>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1 block">Arsitek Mitra</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Harga Penawaran</span>
                                                <span className="text-sm font-black text-blue-600">Rp {Number(bid.bidAmount).toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                <FiCalendar className="shrink-0" />
                                                <span>Estimasi: <strong className="text-gray-700">{bid.estimatedDurationDays || "-"} Hari</strong></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium justify-end">
                                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${getStatusBadge(bid.status)}`}>
                                                    {bid.status}
                                                </span>
                                            </div>
                                        </div>

                                        {bid.message && (
                                            <div className="p-4 bg-white/60 border border-gray-100 rounded-2xl text-xs text-gray-600 italic leading-relaxed mb-4">
                                                "{bid.message}"
                                            </div>
                                        )}

                                        {currentTender.status === 'open' && bid.status === 'submitted' && (
                                            <button
                                                onClick={() => handleAwardBid(currentTender.id, bid.id)}
                                                disabled={submitting}
                                                className="w-full py-3 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                                            >
                                                <FiAward size={16} />
                                                {submitting ? "Memproses..." : "Pilih Arsitek Ini"}
                                            </button>
                                        )}
                                        {bid.status === 'selected' && (
                                            <div className="w-full py-3 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-emerald-200 text-center flex items-center justify-center gap-2">
                                                <FiCheckCircle size={16} />
                                                Arsitek Terpilih
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 opacity-50">
                                    <FiZap size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p className="text-sm font-bold text-gray-400">Belum ada penawaran dari arsitek.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* CONVERT TO PROJECT MODAL */}
            {isConvertOpen && currentRequest && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsConvertOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-2xl animate-scaleIn overflow-hidden">
                        <div className="bg-indigo-600 px-8 py-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-extrabold uppercase tracking-tight">Buat Draft Proyek</h3>
                                <p className="text-[10px] text-indigo-100 font-bold opacity-80 mt-1 uppercase tracking-widest text-wrap">Inisialisasi Proyek Konstruksi dari Desain</p>
                            </div>
                            <button onClick={() => setIsConvertOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white"><FiX size={24} /></button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</span>
                                        <span className="text-xs font-bold text-gray-800">{currentRequest.customer?.name || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Judul Proyek</span>
                                        <span className="text-xs font-bold text-gray-800">{currentRequest.title}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lokasi</span>
                                        <span className="text-xs font-bold text-gray-800">{currentRequest.location || "-"}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estimasi Budget</span>
                                        <span className="text-xs font-black text-indigo-600">Rp {Number(currentRequest.estimatedBudget || 0).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl space-y-3">
                                    <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <FiAlertCircle size={14} />
                                        Bridge Governance Notice
                                    </p>
                                    <ul className="space-y-1">
                                        {[
                                            "Membuat Project Draft/Planning",
                                            "Tidak mengaktifkan proyek secara otomatis",
                                            "Tidak melakukan assignment final Mandor/Pengawas",
                                            "Tidak mengubah Progress SOT (Verified Progress)"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-start gap-2 text-[10px] text-amber-800 leading-relaxed font-medium">
                                                <span className="mt-1.5 w-1 h-1 bg-amber-400 rounded-full shrink-0" />
                                                <span>{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {!getProjectBridgeReadiness(currentRequest).isReady && (
                                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl space-y-2">
                                        <p className="text-[10px] text-rose-700 font-black uppercase tracking-widest">Readiness Blocked:</p>
                                        <div className="space-y-1">
                                            {getProjectBridgeReadiness(currentRequest).reasons.map((reason, idx) => (
                                                <div key={idx} className="flex items-start gap-2 text-[10px] text-rose-600 font-medium leading-tight">
                                                    <FiX className="mt-0.5 shrink-0" size={10} />
                                                    <span>{reason}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsConvertOpen(false)} className="px-6 py-3 border border-gray-100 text-gray-400 rounded-2xl font-bold text-xs uppercase tracking-widest">Batal</button>
                                <button
                                    onClick={handleConvertToProject}
                                    disabled={submitting || !getProjectBridgeReadiness(currentRequest).isReady}
                                    className={`px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all ${
                                        getProjectBridgeReadiness(currentRequest).isReady
                                        ? 'bg-indigo-600 text-white shadow-indigo-600/20 hover:scale-[1.02]'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {submitting ? "Memproses..." : "Konfirmasi Jadi Draft Proyek"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DesignRequestAdminPage;
