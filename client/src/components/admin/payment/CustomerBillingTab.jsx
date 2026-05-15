import React, { useState, useEffect } from "react";
import { 
    FiFileText, 
    FiPackage, 
    FiActivity, 
    FiAlertCircle, 
    FiCheckCircle, 
    FiClock, 
    FiLayers, 
    FiFilter,
    FiSearch,
    FiPlus
} from "react-icons/fi";
import TerminBillingDraft from "./TerminBillingDraft";
import CategoryBillingDraft from "./CategoryBillingDraft";
import CustomerInvoiceTable from "./CustomerInvoiceTable";
import InvoiceDraftModal from "./InvoiceDraftModal";
import customerPaymentPlanService from "../../../services/customerPaymentPlanService";
import administrativeHelperDocumentService from "../../../services/administrativeHelperDocumentService";
import RoleDataState from "../../common/RoleDataState";

const CustomerBillingTab = ({ projects = [] }) => {
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [activeBillingMode, setActiveBillingMode] = useState("TERMIN"); // TERMIN or CATEGORY
    const [showDraftModal, setShowDraftModal] = useState(false);
    const [currentDraft, setCurrentDraft] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [paymentPlan, setPaymentPlan] = useState(null);
    const [helperDocuments, setHelperDocuments] = useState([]);

    const selectedProject = projects.find(p => p.id === selectedProjectId);

    const fetchData = async () => {
        if (!selectedProjectId) return;
        setLoading(true);
        try {
            // 1. Fetch Payment Plan & Milestones
            const planRes = await customerPaymentPlanService.getPaymentPlan(selectedProjectId);
            setPaymentPlan(planRes.data);

            // 2. Fetch Helper Documents (Invoice Drafts)
            const docRes = await administrativeHelperDocumentService.getDocuments({ 
                projectId: selectedProjectId,
                category: 'INVOICE_DRAFT'
            });
            setHelperDocuments(docRes.data || []);
        } catch (err) {
            console.error("Failed to fetch billing data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedProjectId]);

    const handleCreateDraft = (data) => {
        const newDraft = {
            ...data,
            projectId: selectedProjectId,
            projectName: selectedProject ? selectedProject.name : "N/A Project",
            customerName: selectedProject?.customer?.name || "Konsumen RKK",
            mode: activeBillingMode === 'TERMIN' ? 'Termin' : 'Per Kategori',
            status: 'DRAFT'
        };
        setCurrentDraft(newDraft);
        setShowDraftModal(true);
    };

    const handleSaveDraft = async (draftData) => {
        try {
            await administrativeHelperDocumentService.createDraft({
                projectId: selectedProjectId,
                title: `Invoice Draft - ${draftData.itemName}`,
                category: 'INVOICE_DRAFT',
                content: JSON.stringify(draftData),
                status: 'DRAFT'
            });
            await fetchData();
            setShowDraftModal(false);
            alert("Draft invoice berhasil disimpan.");
        } catch (err) {
            alert("Gagal menyimpan draft.");
        }
    };

    const handleSendInvoice = async (draftData) => {
        try {
            await administrativeHelperDocumentService.createDraft({
                projectId: selectedProjectId,
                title: `Invoice Draft - ${draftData.itemName}`,
                category: 'INVOICE_DRAFT',
                content: JSON.stringify(draftData),
                status: 'RELEASED' // Posisikan sebagai terkirim
            });
            await fetchData();
            setShowDraftModal(false);
            alert("Invoice telah dikirim ke konsumen (Simulation via Released status).");
        } catch (err) {
            alert("Gagal mengirim invoice.");
        }
    };

    // Summary logic from helper documents
    const stats = {
        draft: helperDocuments.filter(d => d.status === 'DRAFT').length,
        sent: helperDocuments.filter(d => d.status === 'RELEASED').length,
        waiting: 0, // In real world would map to PaymentRecord pending
        verified: 0, // In real world would map to PaymentRecord verified
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Draft</p>
                        <FiClock className="text-slate-300" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">{stats.draft}</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tagihan Dikirim</p>
                        <FiCheckCircle className="text-blue-500" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">{stats.sent}</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Menunggu Bayar</p>
                        <FiAlertCircle className="text-amber-500" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">{stats.waiting}</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Lunas</p>
                        <FiCheckCircle className="text-emerald-500" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">{stats.verified}</p>
                </div>
            </div>

            {/* Project & Mode Filter */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm border border-blue-100">
                            <FiPackage size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Pilih Proyek & Skema</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Siapkan Draft Tagihan Berdasarkan Realisasi</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <select 
                            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none min-w-[240px]"
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                        >
                            <option value="">-- Pilih Proyek --</option>
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                        <select 
                            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none"
                            value={activeBillingMode}
                            onChange={(e) => setActiveBillingMode(e.target.value)}
                        >
                            <option value="TERMIN">Mode Termin</option>
                            <option value="CATEGORY">Mode Per Kategori RAB</option>
                        </select>
                    </div>
                </div>

                {selectedProject && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 animate-slideDown">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Konsumen</p>
                            <p className="text-xs font-bold text-slate-800">{selectedProject.customer?.name || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nilai Proyek</p>
                            <p className="text-xs font-bold text-slate-800">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(selectedProject.totalBudget || 0)}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Progres Saat Ini</p>
                            <p className="text-xs font-black text-blue-600">{(selectedProject.verifiedProgress || 0).toFixed(1)}% (Verified)</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mode Pembayaran</p>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-200">
                                {paymentPlan?.billingMode === 'TERMIN' ? 'Termin' : 'Kategori RAB'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Billing Draft Section */}
            {selectedProjectId ? (
                loading ? (
                    <RoleDataState status="loading" message="Memuat rencana pembayaran..." />
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 ml-4">
                            <div className={`w-2 h-8 rounded-full ${activeBillingMode === 'TERMIN' ? 'bg-blue-600' : 'bg-emerald-600'}`}></div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">
                                {activeBillingMode === 'TERMIN' ? 'Draf Penagihan Berbasis Termin' : 'Kategori RAB Siap Tagih'}
                            </h3>
                        </div>

                        {activeBillingMode === 'TERMIN' ? (
                            <TerminBillingDraft 
                                projectId={selectedProjectId}
                                milestones={paymentPlan?.milestones || []}
                                projectProgress={selectedProject?.verifiedProgress || 0}
                                projectValue={selectedProject?.totalBudget || 0}
                                onCreateDraft={handleCreateDraft}
                            />
                        ) : (
                            <CategoryBillingDraft 
                                projectId={selectedProjectId}
                                categories={[
                                    { id: 1, name: "Pekerjaan Persiapan", total: 15000000, progress: 100 },
                                    { id: 2, name: "Pekerjaan Tanah & Pasir", total: 25000000, progress: 100 },
                                    { id: 3, name: "Pekerjaan Struktur Lantai 1", total: 120000000, progress: 85 },
                                    { id: 4, name: "Pekerjaan Pasangan Dinding", total: 85000000, progress: 15 }
                                ]}
                                onCreateDraft={handleCreateDraft}
                            />
                        )}
                    </div>
                )
            ) : (
                <div className="py-20 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
                    <FiLayers size={48} className="text-slate-100 mb-4" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Silakan pilih proyek untuk melihat draf penagihan</p>
                </div>
            )}

            {/* Global Invoice Table */}
            <CustomerInvoiceTable invoices={helperDocuments} />

            {/* Draft Modal */}
            <InvoiceDraftModal 
                isOpen={showDraftModal}
                onClose={() => setShowDraftModal(false)}
                draftData={currentDraft}
                onSave={handleSaveDraft}
                onSend={handleSendInvoice}
            />
        </div>
    );
};

export default CustomerBillingTab;
