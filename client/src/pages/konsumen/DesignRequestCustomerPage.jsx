import React, { useState, useEffect } from "react";
import { 
    FiPlus, 
    FiPenTool
} from "react-icons/fi";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import designRequestService from "../../services/designRequestService";
import RoleDataState from "../../components/common/RoleDataState";

// Modular Components
import DesignRequestList from "../../components/konsumen/design-request/DesignRequestList";
import DesignRequestDetailOverlay from "../../components/konsumen/design-request/DesignRequestDetailOverlay";
import CreateDesignRequestModal from "../../components/konsumen/design-request/CreateDesignRequestModal";

const DesignRequestCustomerPage = () => {
    const { selectedCustomerId } = useCustomerPersona();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Create Form State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        buildingType: "",
        location: "",
        estimatedBudget: "",
        // Structured Brief Fields
        roomRequirements: "",
        designStyle: "",
        designPriorities: "",
        familyBusinessNotes: "",
        siteConstraints: "",
        materialPreferences: ""
    });

    const fetchRequests = async () => {
        if (!selectedCustomerId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const res = await designRequestService.getAllDesignRequests({ customerId: selectedCustomerId });
            setRequests(res.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching customer design requests:", err);
            setError("Gagal memuat daftar permintaan desain.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [selectedCustomerId]);

    const handleOpenForm = () => {
        setFormData({
            title: "",
            description: "",
            buildingType: "",
            location: "",
            estimatedBudget: "",
            roomRequirements: "",
            designStyle: "",
            designPriorities: "",
            familyBusinessNotes: "",
            siteConstraints: "",
            materialPreferences: ""
        });
        setIsFormOpen(true);
    };

    const handleOpenDetail = async (request) => {
        try {
            setLoading(true);
            const res = await designRequestService.getDesignRequestById(request.id);
            setSelectedRequest(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching detail:", err);
            alert("Gagal memuat detail pengajuan.");
            setLoading(false);
        }
    };

    const handleAddRevision = async ({ revisionType, note }) => {
        if (!selectedRequest || !selectedCustomerId) return;

        try {
            setSubmitting(true);
            await designRequestService.requestRevision(selectedRequest.id, {
                revisionType,
                note,
                actorRole: 'customer',
                actorId: selectedCustomerId,
                actorName: requests.find(r => r.customerId === selectedCustomerId)?.customer?.name || "Konsumen RKK"
            });
            
            // Refresh detail
            const res = await designRequestService.getDesignRequestById(selectedRequest.id);
            setSelectedRequest(res.data);
            fetchRequests(); // Refresh list
        } catch (err) {
            console.error("Error submitting revision:", err);
            alert(err.response?.data?.message || "Gagal mengajukan revisi.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleApproveDesign = async () => {
        if (!selectedRequest || !selectedCustomerId) return;
        if (!window.confirm("Apakah Anda sudah puas dengan desain ini? Persetujuan ini bersifat simulasi lokal untuk melanjutkan ke tahap berikutnya.")) return;

        try {
            setSubmitting(true);
            await designRequestService.addHistory(selectedRequest.id, {
                action: 'customer_design_approved',
                actorRole: 'customer',
                actorId: selectedCustomerId,
                actorName: requests.find(r => r.customerId === selectedCustomerId)?.customer?.name || "Konsumen RKK",
                note: "Konsumen telah memberikan persetujuan desain (Simulasi Lokal).",
                metadata: { approvalType: 'local-intent' }
            });
            
            // Refresh detail
            const res = await designRequestService.getDesignRequestById(selectedRequest.id);
            setSelectedRequest(res.data);
            alert("Terima kasih! Persetujuan Anda telah dicatat. Silakan tentukan jalur keputusan berikutnya pada panel di bawah.");
        } catch (err) {
            console.error("Error approving design:", err);
            alert("Gagal memberikan persetujuan.");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePostDesignDecision = async (decision) => {
        if (!selectedRequest || !selectedCustomerId) return;
        
        const decisionLabels = {
            design_only_completed: "Design/RAB Only Completed",
            continue_to_construction_preparation: "Continue to Construction Preparation"
        };

        if (!window.confirm(`Konfirmasi keputusan: ${decisionLabels[decision]}? Keputusan ini akan dicatat sebagai riwayat operasional lokal.`)) return;

        try {
            setSubmitting(true);
            await designRequestService.addHistory(selectedRequest.id, {
                action: 'customer_post_design_decision',
                actorRole: 'customer',
                actorId: selectedCustomerId,
                actorName: requests.find(r => r.customerId === selectedCustomerId)?.customer?.name || "Konsumen RKK",
                note: `Konsumen memilih jalur: ${decisionLabels[decision]}`,
                metadata: { decision }
            });
            
            // Refresh detail
            const res = await designRequestService.getDesignRequestById(selectedRequest.id);
            setSelectedRequest(res.data);
        } catch (err) {
            console.error("Error saving decision:", err);
            alert("Gagal menyimpan keputusan.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCustomerId) return;

        try {
            setSubmitting(true);
            const structuredDescription = `
### STRUKTUR BRIEF DESAIN (Local Simulation)
---
**Deskripsi Umum:** 
${formData.description || '-'}

**Kebutuhan Ruang:**
${formData.roomRequirements || '-'}

**Gaya Desain:**
${formData.designStyle || '-'}

**Prioritas Desain:**
${formData.designPriorities || '-'}

**Catatan Keluarga/Usaha:**
${formData.familyBusinessNotes || '-'}

**Batasan Lokasi/Lahan:**
${formData.siteConstraints || '-'}

**Preferensi Material:**
${formData.materialPreferences || '-'}
`.trim();

            const payload = {
                ...formData,
                description: structuredDescription,
                estimatedBudget: formData.estimatedBudget ? Number(formData.estimatedBudget) : null,
                customerId: selectedCustomerId
            };
            await designRequestService.createDesignRequest(payload);
            setIsFormOpen(false);
            fetchRequests(); // Refresh list
        } catch (err) {
            console.error("Error creating design request:", err);
            alert("Gagal mengirimkan permintaan desain. Silakan coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredRequests = requests.filter(r => 
        r.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusLabel = (status) => {
        const labels = {
            submitted: "Diajukan",
            open: "Tender Terbuka",
            assigned: "Arsitek Terpilih",
            in_review: "Proses Review",
            approved: "Desain Disetujui",
            rejected: "Ditolak",
            draft: "Draft"
        };
        return labels[status] || status;
    };

    if (loading && selectedCustomerId && requests.length === 0) return <RoleDataState type="loading" message="Memuat data pengajuan desain..." />;
    if (!selectedCustomerId) return <RoleDataState type="empty" message="Pilih persona konsumen terlebih dahulu." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchRequests} />;

    const hasRequests = requests.length > 0;

    return (
        <div className="animate-fadeIn space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Permintaan Desain</h1>
                    <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-widest italic">Simulasi Local Workflow — Kolaborasi Desain & Arsitek RKK</p>
                </div>
                <button 
                    onClick={handleOpenForm}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 flex items-center gap-2 transition-all hover:scale-105"
                >
                    <FiPlus size={18} /> Buat Brief Baru
                </button>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                    <FiPenTool size={20} />
                </div>
                <div>
                    <h4 className="text-xs font-black text-indigo-800 uppercase tracking-tight">ALUR KOLABORASI DESAIN</h4>
                    <p className="text-[10px] text-indigo-700 leading-relaxed font-bold mt-0.5">
                        Fase desain melibatkan diskusi intensif antara Anda, Arsitek, dan Admin. Seluruh riwayat revisi dan dokumen gambar kerja akan tercatat pada timeline di bawah ini.
                    </p>
                </div>
            </div>

            {hasRequests ? (
                <DesignRequestList 
                    requests={filteredRequests}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onOpenDetail={handleOpenDetail}
                />
            ) : (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-20 text-center shadow-sm">
                    <div className="max-w-md mx-auto space-y-6">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600">
                            <FiPenTool size={40} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-gray-800">Belum Ada Pengajuan Desain</h3>
                            <p className="text-sm text-gray-500 font-medium mt-2 leading-relaxed">
                                Anda belum memiliki riwayat pengajuan desain. Mulailah dengan membuat brief baru untuk mengonsultasikan hunian impian Anda dengan tim arsitek kami.
                            </p>
                        </div>
                        <button 
                            onClick={handleOpenForm}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20"
                        >
                            <FiPlus size={16} /> Konsultasi Desain Sekarang
                        </button>
                    </div>
                </div>
            )}

            <DesignRequestDetailOverlay 
                selectedRequest={selectedRequest}
                onClose={() => setSelectedRequest(null)}
                getStatusLabel={getStatusLabel}
                submitting={submitting}
                onAddRevision={handleAddRevision}
                onApproveDesign={handleApproveDesign}
                onPostDesignDecision={handlePostDesignDecision}
            />

            <CreateDesignRequestModal 
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
        </div>
    );
};

export default DesignRequestCustomerPage;
