import React, { useState, useEffect } from "react";
import { 
    FiCreditCard, 
    FiCheckCircle, 
    FiClock, 
    FiAlertCircle, 
    FiSearch, 
    FiFilter, 
    FiChevronRight,
    FiUser,
    FiBriefcase,
    FiDownload,
    FiX,
    FiCheck,
    FiInfo,
    FiSettings,
    FiFileText,
    FiPlus,
    FiMoreVertical
} from "react-icons/fi";
import foremanPaymentEligibilityService from "../../services/foremanPaymentEligibilityService";
import paymentService from "../../services/paymentService";
import projectService from "../../services/projectService";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";
import CompanyBankAccountPanel from "../../components/admin/payment/CompanyBankAccountPanel";
import PaymentModeSetupPanel from "../../components/admin/payment/PaymentModeSetupPanel";
import CustomerBillingTab from "../../components/admin/payment/CustomerBillingTab";
import CustomerPaymentVerificationTab from "../../components/admin/payment/CustomerPaymentVerificationTab";
import ForemanPaymentRequestAdminTab from "../../components/admin/payment/ForemanPaymentRequestAdminTab";
import ForemanDisbursementTab from "../../components/admin/payment/ForemanDisbursementTab";

const PembayaranAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [activeTab, setActiveTab] = useState("TAGIHAN_KONSUMEN"); // TAGIHAN_KONSUMEN, PEMBAYARAN_KONSUMEN, PENGAJUAN_MANDOR, PEMBAYARAN_MANDOR, SETTING_PAYMENT
    const [searchTerm, setSearchTerm] = useState("");
    const [customerPayments, setCustomerPayments] = useState([]);
    const [foremanRequests, setForemanRequests] = useState([]);
    const [foremanHistory, setForemanHistory] = useState([]);
    const [updating, setUpdating] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Projects for selectors
            const projectRes = await projectService.getProjects();
            setProjects(projectRes.data || []);

            // 2. Fetch Customer Payments
            const customerPaymentRes = await paymentService.getPayments({ type: 'CUSTOMER_PAYMENT' });
            const mappedCustomerPayments = (customerPaymentRes.data || []).map(h => ({
                id: h.id,
                code: h.paymentCode || (h.id ? `PAY-${h.id.substring(0,8).toUpperCase()}` : 'PAY-REF'),
                itemName: h.milestone?.name || h.title || 'Pembayaran Proyek',
                uploadDate: h.createdAt ? new Date(h.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-',
                transferDate: h.transferDate ? new Date(h.transferDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-',
                customerName: h.customer?.name || h.project?.customer?.name || 'Unknown',
                projectName: h.project?.name || 'Unknown Project',
                billAmount: h.milestone?.amount || h.amount || 0,
                amount: h.amount || 0,
                status: h.status || 'pending',
                senderName: h.senderName || '-',
                originBank: h.originBank || '-',
                fileName: h.proofDocument?.originalName || 'Bukti Bayar',
                notes: h.notes || '',
                proofDocumentId: h.proofDocumentId
            }));
            setCustomerPayments(mappedCustomerPayments);

            // 3. New data fetching for foremen (Batch 109)
            const foremanEligibilityRes = await foremanPaymentEligibilityService.getAll();
            const mappedRequests = (foremanEligibilityRes.data || []).map(r => ({
                ...r,
                foremanName: r.foreman?.name || 'Mandor',
                projectName: r.project?.name || 'Project',
                code: r.documentCode || (r.id ? `ELIG-${r.id.substring(0,8).toUpperCase()}` : 'ELIG-NEW'),
                amount: r.approvedAmount || r.estimatedAmount || 0,
                estimatedAmount: r.estimatedAmount || 0,
                approvedAmount: r.approvedAmount || 0,
                basis: 'WEEKLY',
                targetItem: r.weekNumber ? `Minggu ${r.weekNumber}` : (r.periodStart ? `${new Date(r.periodStart).toLocaleDateString()} - ${new Date(r.periodEnd).toLocaleDateString()}` : 'Pekerjaan Lapangan'),
                supervisorRecommendation: r.status // Map status as recommendation source
            }));
            setForemanRequests(mappedRequests);

            const foremanHistoryRes = await paymentService.getPayments({ type: 'FOREMAN_PAYMENT' });
            setForemanHistory(foremanHistoryRes.data || []);

        } catch (err) {
            console.error("Failed to fetch admin payment dashboard data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedAdminId]);

    const handleCustomerVerify = async (id, note) => {
        try {
            setUpdating(true);
            await paymentService.updateStatus(id, {
                status: 'verified',
                note,
                verifiedByRole: 'ADMIN',
                verifiedById: selectedAdminId
            });
            await fetchData();
            alert("Pembayaran konsumen berhasil diverifikasi.");
        } catch (err) {
            console.error("Verification failed:", err);
            alert("Gagal verifikasi pembayaran.");
        } finally {
            setUpdating(false);
        }
    };

    const handleCustomerReject = async (id, note) => {
        try {
            setUpdating(true);
            await paymentService.updateStatus(id, {
                status: 'rejected',
                note,
                verifiedByRole: 'ADMIN',
                verifiedById: selectedAdminId
            });
            await fetchData();
            alert("Pembayaran konsumen ditolak.");
        } catch (err) {
            console.error("Rejection failed:", err);
            alert("Gagal menolak pembayaran.");
        } finally {
            setUpdating(false);
        }
    };

    // Foreman Decision Logic (Batch 109)
    const handleForemanDecision = async (id, data) => {
        try {
            // Map UI status to API status
            let apiStatus = data.status; // approved -> eligible, partial_approved -> partial
            if (apiStatus === 'approved') apiStatus = 'eligible';
            if (apiStatus === 'partial_approved') apiStatus = 'partial';
            if (apiStatus === 'rejected') apiStatus = 'hold';

            await foremanPaymentEligibilityService.updateStatus(id, {
                status: apiStatus,
                adminNote: data.adminNote,
                approvedAmount: data.approvedAmount,
                actorRole: 'admin',
                actorId: selectedAdminId
            });
            await fetchData();
            alert("Status pengajuan mandor berhasil diperbarui.");
        } catch (err) {
            console.error("Foreman decision failed:", err);
            alert("Gagal memperbarui status pengajuan.");
        }
    };

    // Foreman Disbursement Logic (Batch 109)
    const handleForemanDisbursement = async (id, data) => {
        try {
            // As per Scope 5: update status to paid_simulated
            await foremanPaymentEligibilityService.updateStatus(id, {
                status: 'paid_simulated',
                adminNote: `Ref: ${data.refNumber}. ${data.bankOrigin}. ${data.adminNote || ''}`,
                approvedAmount: data.amount,
                actorRole: 'admin',
                actorId: selectedAdminId
            });
            await fetchData();
            alert("Pembayaran mandor berhasil dikonfirmasi. Payment Record telah dibuat otomatis.");
        } catch (err) {
            console.error("Foreman disbursement failed:", err);
            alert("Gagal konfirmasi pembayaran mandor.");
        }
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusConfig = (status) => {
        const s = status?.toLowerCase() || 'pending';
        switch (s) {
            case 'verified':
                return { label: 'Terverifikasi', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <FiCheckCircle /> };
            case 'paid':
                return { label: 'Review Bukti', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <FiClock /> };
            case 'pending':
                return { label: 'Menunggu Upload', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <FiAlertCircle /> };
            case 'rejected':
                return { label: 'Ditolak', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: <FiX /> };
            default:
                return { label: status || 'Unknown', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: <FiInfo /> };
        }
    };

    if (!selectedAdminId) return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    if (loading) return <RoleDataState type="loading" message="Memuat data pembayaran..." />;

    // Tabs Config
    const tabs = [
        { id: "TAGIHAN_KONSUMEN", label: "Tagihan Konsumen", icon: <FiFileText /> },
        { id: "PEMBAYARAN_KONSUMEN", label: "Pembayaran Konsumen", icon: <FiCreditCard /> },
        { id: "PENGAJUAN_MANDOR", label: "Pengajuan Mandor", icon: <FiBriefcase /> },
        { id: "PEMBAYARAN_MANDOR", label: "Pembayaran Mandor", icon: <FiDownload /> },
        { id: "SETTING_PAYMENT", label: "Setting", icon: <FiSettings /> },
    ];

    return (
        <div className="animate-fadeIn space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment Center</h1>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Foundation Record & Validasi Lokal</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Cari data..." 
                            className="pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-500/5 focus:outline-none w-64 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-2xl w-fit overflow-x-auto">
                {tabs.map((tab) => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
                {activeTab === "TAGIHAN_KONSUMEN" && (
                    <CustomerBillingTab projects={projects} adminId={selectedAdminId} />
                )}

                {activeTab === "PEMBAYARAN_KONSUMEN" && (
                    <CustomerPaymentVerificationTab 
                        payments={customerPayments.filter(p => 
                            p.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.code?.toLowerCase().includes(searchTerm.toLowerCase())
                        )}
                        onVerify={handleCustomerVerify}
                        onReject={handleCustomerReject}
                    />
                )}

                {activeTab === "PENGAJUAN_MANDOR" && (
                    <ForemanPaymentRequestAdminTab 
                        requests={foremanRequests.filter(r => 
                            ['pending_review', 'eligible', 'partial', 'hold', 'correction_required'].includes(r.status?.toLowerCase())
                        )}
                        onDecision={handleForemanDecision}
                    />
                )}

                {activeTab === "PEMBAYARAN_MANDOR" && (
                    <ForemanDisbursementTab 
                        approvedRequests={foremanRequests.filter(r => 
                            ['eligible', 'partial', 'paid_simulated'].includes(r.status?.toLowerCase())
                        )}
                        onMarkAsPaid={handleForemanDisbursement}
                    />
                )}

                {activeTab === "SETTING_PAYMENT" && (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Company Bank Account Management */}
                        <CompanyBankAccountPanel />

                        {/* Project Payment Mode Setup */}
                        <PaymentModeSetupPanel projects={projects} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PembayaranAdminPage;
