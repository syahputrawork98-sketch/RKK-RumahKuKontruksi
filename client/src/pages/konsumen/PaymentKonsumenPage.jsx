import React, { useState, useEffect } from "react";
import { 
    FiFileText, 
    FiCreditCard, 
    FiChevronRight,
    FiDownload,
    FiAlertTriangle,
    FiBox
} from "react-icons/fi";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import CustomerActiveBillsTab from "../../components/konsumen/payment/CustomerActiveBillsTab";
import CustomerPaymentHistoryTab from "../../components/konsumen/payment/CustomerPaymentHistoryTab";
import PaymentProofUploadModal from "../../components/konsumen/payment/PaymentProofUploadModal";
import projectService from "../../services/projectService";
import customerPaymentPlanService from "../../services/customerPaymentPlanService";
import paymentService from "../../services/paymentService";

const PaymentKonsumenPage = () => {
    const { selectedCustomerId } = useCustomerPersona();
    const [activeTab, setActiveTab] = useState("BILLING"); // BILLING, HISTORY
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [bills, setBills] = useState([]);
    const [payments, setPayments] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    const fetchData = async () => {
        if (!selectedCustomerId) return;
        setLoading(true);
        try {
            // 1. Fetch Projects
            const projectRes = await projectService.getProjects({ customerId: selectedCustomerId });
            const userProjects = projectRes.data || [];
            setProjects(userProjects);

            if (userProjects.length > 0) {
                const projectId = selectedProjectId || userProjects[0].id;
                if (!selectedProjectId) setSelectedProjectId(projectId);

                // 2. Fetch Payment Plan (Milestones)
                const planRes = await customerPaymentPlanService.getPaymentPlan(projectId);
                const milestones = planRes.data?.milestones || [];
                
                // Map milestones to "bills" UI format
                const mappedBills = milestones
                    .filter(m => m.status === 'sent' || m.status === 'rejected')
                    .map(m => ({
                        id: m.id,
                        code: m.invoiceCode || `INV-${m.id.substring(0, 8)}`,
                        projectName: userProjects.find(p => p.id === projectId)?.name,
                        itemName: m.name,
                        amount: m.amount,
                        dueDate: m.dueDate ? new Date(m.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A',
                        status: m.status
                    }));
                setBills(mappedBills);

                // 3. Fetch Payment Records (History)
                const historyRes = await paymentService.getPayments({ projectId, type: 'CUSTOMER_PAYMENT' });
                const historyData = historyRes.data || [];
                
                // Map records to UI history format
                const mappedHistory = historyData.map(h => ({
                    id: h.id,
                    code: h.paymentCode,
                    itemName: h.milestone?.name || 'Pembayaran Proyek',
                    projectName: h.project?.name,
                    amount: h.amount,
                    uploadDate: new Date(h.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                    originBank: h.originBank || 'Transfer Bank',
                    fileName: h.proofDocument?.originalName || 'Bukti Bayar',
                    status: h.status, // mapping: paid -> Menunggu, verified -> Lunas, rejected -> Ditolak
                    adminNote: h.adminNote
                }));
                setPayments(mappedHistory);
            }
        } catch (err) {
            console.error("Failed to fetch payment data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedCustomerId, selectedProjectId]);

    if (!selectedCustomerId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Konsumen"
                description="Pilih konsumen untuk melihat tagihan dan riwayat pembayaran proyek Anda."
            />
        );
    }

    const handleUploadClick = (bill) => {
        setSelectedBill(bill);
        setShowUploadModal(true);
    };

    const handleUploadSubmit = () => {
        // Refresh data after successful upload
        fetchData();
        alert("Terima kasih! Bukti transfer Anda telah berhasil di-upload dan sedang dalam proses verifikasi admin.");
    };

    return (
        <div className="animate-fadeIn space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Keuangan Proyek</h1>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Transparansi Tagihan & Pembayaran Resmi</p>
                </div>
                
                {/* Project Selector */}
                {projects.length > 1 && (
                    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                            <FiBox size={18} />
                        </div>
                        <select 
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                            className="bg-transparent text-xs font-black uppercase tracking-widest text-slate-700 focus:outline-none pr-8"
                        >
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-2xl w-fit">
                <button 
                    onClick={() => setActiveTab("BILLING")}
                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'BILLING' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <div className="flex items-center gap-2">
                        <FiFileText size={14} />
                        Tagihan Aktif
                    </div>
                </button>
                <button 
                    onClick={() => setActiveTab("HISTORY")}
                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'HISTORY' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <div className="flex items-center gap-2">
                        <FiCreditCard size={14} />
                        Riwayat Pembayaran
                    </div>
                </button>
            </div>

            {loading ? (
                <RoleDataState status="loading" />
            ) : (
                <>
                    {activeTab === "BILLING" ? (
                        <CustomerActiveBillsTab 
                            bills={bills} 
                            onUploadClick={handleUploadClick}
                        />
                    ) : (
                        <CustomerPaymentHistoryTab 
                            payments={payments}
                        />
                    )}
                </>
            )}

            {/* Upload Modal */}
            {selectedBill && (
                <PaymentProofUploadModal 
                    isOpen={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    billData={selectedBill}
                    projectId={selectedProjectId}
                    customerId={selectedCustomerId}
                    onSubmit={handleUploadSubmit}
                />
            )}
        </div>
    );
};

export default PaymentKonsumenPage;
