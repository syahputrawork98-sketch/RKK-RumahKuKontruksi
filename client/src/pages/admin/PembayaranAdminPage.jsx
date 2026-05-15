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
    const [customerPayments, setCustomerPayments] = useState([]);
    const [foremanRequests, setForemanRequests] = useState([]);
    const [foremanHistory, setForemanHistory] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
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
                code: h.paymentCode,
                itemName: h.milestone?.name || 'Pembayaran Proyek',
                uploadDate: new Date(h.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                transferDate: h.transferDate ? new Date(h.transferDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-',
                customerName: h.customer?.name || 'Unknown',
                projectName: h.project?.name || 'Unknown',
                billAmount: h.milestone?.amount || h.amount,
                amount: h.amount,
                status: h.status,
                senderName: h.senderName,
                originBank: h.originBank,
                fileName: h.proofDocument?.originalName || 'Bukti Bayar',
                notes: h.notes,
                proofDocumentId: h.proofDocumentId
            }));
            setCustomerPayments(mappedCustomerPayments);

            // 3. Load Foreman stuff (Local simulation for now as per instructions)
            const storedRequests = localStorage.getItem('rkk_foreman_requests');
            const storedHistory = localStorage.getItem('rkk_foreman_history');
            if (storedRequests) setForemanRequests(JSON.parse(storedRequests));
            if (storedHistory) setForemanHistory(JSON.parse(storedHistory));

        } catch (err) {
            console.error("Failed to fetch admin payment data:", err);
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

    const handleForemanDecision = (id, decision) => {
        const updated = foremanRequests.map(r => 
            r.id === id ? { ...r, ...decision } : r
        );
        setForemanRequests(updated);
        localStorage.setItem('rkk_foreman_requests', JSON.stringify(updated));
        alert("Keputusan pengajuan mandor berhasil disimpan.");
    };

    const handleForemanPayment = (id, paymentData) => {
        const updatedRequests = foremanRequests.map(r => 
            r.id === id ? { ...r, status: 'paid' } : r
        );
        setForemanRequests(updatedRequests);
        localStorage.setItem('rkk_foreman_requests', JSON.stringify(updatedRequests));

        const request = foremanRequests.find(r => r.id === id);
        const newHistory = [
            { 
                ...paymentData, 
                id: Date.now(), 
                code: `PAY-${request.code.split('-')[2]}`, 
                projectName: request.projectName,
                itemName: request.targetItem,
                amount: paymentData.amount
            },
            ...foremanHistory
        ];
        setForemanHistory(newHistory);
        localStorage.setItem('rkk_foreman_history', JSON.stringify(newHistory));
        alert("Bukti transfer berhasil di-upload.");
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'verified':
                return { label: 'Verified', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <FiCheckCircle /> };
            case 'paid':
                return { label: 'Paid (Waiting)', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <FiClock /> };
            case 'pending':
                return { label: 'Pending', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <FiAlertCircle /> };
            case 'rejected':
                return { label: 'Rejected', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: <FiX /> };
            default:
                return { label: status, color: 'bg-slate-100 text-slate-700 border-slate-200', icon: <FiInfo /> };
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
                    <CustomerBillingTab projects={projects} />
                )}

                {activeTab === "PEMBAYARAN_KONSUMEN" && (
                    <CustomerPaymentVerificationTab 
                        payments={customerPayments}
                        onVerify={handleCustomerVerify}
                        onReject={handleCustomerReject}
                    />
                )}

                {activeTab === "PENGAJUAN_MANDOR" && (
                    <ForemanPaymentRequestAdminTab 
                        requests={foremanRequests.filter(r => r.status !== 'paid')}
                        onDecision={handleForemanDecision}
                    />
                )}

                {activeTab === "PEMBAYARAN_MANDOR" && (
                    <ForemanDisbursementTab 
                        approvedRequests={foremanRequests.filter(r => r.status === 'approved' || r.status === 'partial_approved' || r.status === 'paid')}
                        onMarkAsPaid={handleForemanPayment}
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

            {/* DETAIL MODAL (Shared for Payments) */}
            {showDetail && selectedPayment && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Detail Transaksi</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {selectedPayment.paymentCode}</p>
                            </div>
                            <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-white rounded-xl transition-all text-slate-300">
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pihak Terkait</p>
                                    <p className="text-sm font-black text-slate-800">{selectedPayment.customer?.name || selectedPayment.foreman?.name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Proyek</p>
                                    <p className="text-sm font-black text-slate-800">{selectedPayment.project?.name}</p>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Nominal</p>
                                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{formatCurrency(selectedPayment.amount)}</h2>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
                            {selectedPayment.status === 'paid' && (
                                <>
                                    <button 
                                        onClick={() => handleUpdateStatus(selectedPayment.id, 'verified')}
                                        disabled={updating}
                                        className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                                    >
                                        {updating ? "Memproses..." : "Verifikasi Pembayaran"}
                                    </button>
                                    <button 
                                        onClick={() => handleUpdateStatus(selectedPayment.id, 'rejected')}
                                        disabled={updating}
                                        className="flex-1 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-600/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                                    >
                                        Tolak / Batalkan
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PembayaranAdminPage;
