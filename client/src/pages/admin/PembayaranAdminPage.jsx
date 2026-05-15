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
import { useAdminPersona } from "../../context/AdminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";
import ProjectPaymentPlanTab from "../../components/admin/payment/ProjectPaymentPlanTab";
import ForemanPaymentEligibilityTab from "../../components/admin/payment/ForemanPaymentEligibilityTab";
import RabCategoryPaymentPreview from "../../components/admin/payment/RabCategoryPaymentPreview";
import CompanyBankAccountPanel from "../../components/admin/payment/CompanyBankAccountPanel";
import PaymentModeSetupPanel from "../../components/admin/payment/PaymentModeSetupPanel";
import CustomerBillingTab from "../../components/admin/payment/CustomerBillingTab";
import CustomerPaymentVerificationTab from "../../components/admin/payment/CustomerPaymentVerificationTab";

const PembayaranAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    const [activeTab, setActiveTab] = useState("TAGIHAN_KONSUMEN"); // TAGIHAN_KONSUMEN, PEMBAYARAN_KONSUMEN, PENGAJUAN_MANDOR, PEMBAYARAN_MANDOR, SETTING_PAYMENT
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    
    // In a real scenario, we would fetch projects from projectService.
    // For now, we'll use a placeholder project list for the selectors.
    const [projects, setProjects] = useState([
        { id: "PRJ-001", name: "Villa Canggu Refurbishment" },
        { id: "PRJ-002", name: "Modern Minimalist House - Jakarta" }
    ]);

    const [customerPayments, setCustomerPayments] = useState([
        { 
            id: 201, 
            code: "PAY-INV-002-882", 
            billAmount: 125000000,
            amount: 125000000, 
            customerName: "Budi Santoso", 
            projectName: "Villa Canggu Refurbishment",
            itemName: "Termin II: Pekerjaan Struktur",
            uploadDate: "2026-05-15",
            transferDate: "2026-05-14",
            originBank: "BCA",
            senderName: "Budi Santoso",
            fileName: "bukti_transfer_budi.png",
            notes: "Pelunasan Termin 2.",
            status: "paid_uploaded" 
        },
        { 
            id: 202, 
            code: "PAY-INV-003-129", 
            billAmount: 45000000,
            amount: 44500000, 
            customerName: "Budi Santoso", 
            projectName: "Villa Canggu Refurbishment",
            itemName: "Kategori: Pekerjaan Atap",
            uploadDate: "2026-05-15",
            transferDate: "2026-05-15",
            originBank: "Mandiri",
            senderName: "Budi Santoso",
            fileName: "transfer_atap.pdf",
            notes: "Ada selisih admin bank.",
            status: "paid_uploaded" 
        }
    ]);

    useEffect(() => {
        fetchPayments();
    }, [selectedAdminId]);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await paymentService.getPayments();
            setPayments(response.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching payments:", error);
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        if (!window.confirm(`Update status pembayaran ini menjadi ${status}?`)) return;
        try {
            setUpdating(true);
            await paymentService.updateStatus(id, {
                status,
                verifiedByRole: 'admin',
                verifiedById: selectedAdminId,
                note: `Verified by Admin locally.`
            });
            await fetchPayments();
            setShowDetail(false);
            setUpdating(false);
        } catch (error) {
            alert("Gagal update status: " + error.message);
            setUpdating(false);
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
                        onVerify={(id, note) => {
                            setCustomerPayments(customerPayments.map(p => 
                                p.id === id ? { ...p, status: 'verified', adminNote: note } : p
                            ));
                            alert("Pembayaran berhasil diverifikasi!");
                        }}
                        onReject={(id, note) => {
                            setCustomerPayments(customerPayments.map(p => 
                                p.id === id ? { ...p, status: 'rejected', adminNote: note } : p
                            ));
                            alert("Pembayaran telah ditolak.");
                        }}
                    />
                )}

                {activeTab === "PENGAJUAN_MANDOR" && (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-3">
                            <FiBriefcase className="text-purple-600" /> Review Pengajuan Mandor
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 ml-9">Validasi Kelayakan Pembayaran Berdasarkan Jurnal Mingguan</p>
                        
                        <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pilih Proyek:</label>
                            <select 
                                className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none"
                                value={selectedProjectId}
                                onChange={(e) => setSelectedProjectId(e.target.value)}
                            >
                                <option value="">-- Pilih Proyek --</option>
                                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>

                        {selectedProjectId ? (
                            <ForemanPaymentEligibilityTab projectId={selectedProjectId} />
                        ) : (
                            <div className="py-20 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                                <FiBriefcase size={48} className="mx-auto text-slate-200 mb-4" />
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Pilih proyek untuk review pengajuan mandor.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "PAYMENT_MANDOR" && (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Upload Bukti Transfer ke Mandor</h3>
                            <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">Buat Bulk Transfer</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-50">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaksi</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Proyek & Mandor</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nominal</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Upload Bukti</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {payments.filter(p => p.type === 'FOREMAN_PAYMENT').length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">Belum ada pembayaran mandor</td>
                                        </tr>
                                    ) : (
                                        payments.filter(p => p.type === 'FOREMAN_PAYMENT').map(p => (
                                            <tr key={p.id} className="hover:bg-slate-50/50 transition-all">
                                                <td className="px-8 py-6 text-xs font-black">{p.paymentCode}</td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm font-black text-slate-800">{p.project?.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{p.foreman?.name}</p>
                                                </td>
                                                <td className="px-8 py-6 font-black text-slate-900">{formatCurrency(p.amount)}</td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${getStatusConfig(p.status).color}`}>
                                                        {getStatusConfig(p.status).icon} {getStatusConfig(p.status).label}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                                                        <FiDownload size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
