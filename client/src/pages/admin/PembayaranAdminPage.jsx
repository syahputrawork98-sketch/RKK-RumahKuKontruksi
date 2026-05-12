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
    FiMoreVertical,
    FiX,
    FiCheck,
    FiInfo
} from "react-icons/fi";
import paymentService from "../../services/paymentService";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";

const PembayaranAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    const [activeTab, setActiveTab] = useState("CUSTOMER_PAYMENT");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [updating, setUpdating] = useState(false);

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

    const filteredPayments = payments.filter(p => 
        p.type === activeTab && 
        (p.paymentCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
         p.project?.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const stats = {
        totalCustomer: payments.filter(p => p.type === 'CUSTOMER_PAYMENT' && p.status === 'verified').reduce((acc, curr) => acc + parseFloat(curr.amount), 0),
        totalForeman: payments.filter(p => p.type === 'FOREMAN_PAYMENT' && p.status === 'verified').reduce((acc, curr) => acc + parseFloat(curr.amount), 0),
        pendingVerification: payments.filter(p => p.status === 'paid').length
    };

    return (
        <div className="animate-fadeIn space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manajemen Pembayaran</h1>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Foundation Record & Validasi Lokal</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Cari Kode / Proyek..." 
                            className="pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-500/5 focus:outline-none w-64 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        <FiDownload />
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="dashboard-card group overflow-hidden border-l-4 border-l-emerald-500 bg-white p-8 rounded-[2.5rem] shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Pemasukan (Verified)</p>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{formatCurrency(stats.totalCustomer)}</h3>
                        </div>
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-emerald-100">
                            <FiCreditCard />
                        </div>
                    </div>
                </div>
                <div className="dashboard-card group overflow-hidden border-l-4 border-l-purple-500 bg-white p-8 rounded-[2.5rem] shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Pengeluaran Mandor</p>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{formatCurrency(stats.totalForeman)}</h3>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-purple-100">
                            <FiBriefcase />
                        </div>
                    </div>
                </div>
                <div className="dashboard-card group overflow-hidden border-l-4 border-l-blue-500 bg-white p-8 rounded-[2.5rem] shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Menunggu Verifikasi</p>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stats.pendingVerification} Transaksi</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-blue-100">
                            <FiClock />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-2xl w-fit">
                <button 
                    onClick={() => setActiveTab("CUSTOMER_PAYMENT")}
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CUSTOMER_PAYMENT' ? 'bg-white text-[var(--dashboard-primary)] shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Billing Konsumen
                </button>
                <button 
                    onClick={() => setActiveTab("FOREMAN_PAYMENT")}
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'FOREMAN_PAYMENT' ? 'bg-white text-[var(--dashboard-primary)] shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Pembayaran Mandor
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaksi</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Proyek & Pihak</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nominal</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                                                <FiCreditCard size={40} />
                                            </div>
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tidak ada data pembayaran.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredPayments.map(p => {
                                    const status = getStatusConfig(p.status);
                                    return (
                                        <tr key={p.id} className="hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => { setSelectedPayment(p); setShowDetail(true); }}>
                                            <td className="px-8 py-6">
                                                <p className="text-[10px] font-black text-[var(--dashboard-primary)] mb-1">{p.paymentCode}</p>
                                                <p className="text-xs font-bold text-slate-800">{new Date(p.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-black text-slate-800">{p.project?.name || 'Project N/A'}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="w-4 h-4 bg-slate-100 rounded-full flex items-center justify-center text-[8px] text-slate-400">
                                                        <FiUser size={10} />
                                                    </div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                        {activeTab === 'CUSTOMER_PAYMENT' ? p.customer?.name : p.foreman?.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-base font-black text-slate-900 tracking-tight">
                                                {formatCurrency(p.amount)}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${status.color}`}>
                                                    {status.icon}
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-2 hover:bg-white rounded-xl transition-all text-slate-300">
                                                    <FiChevronRight size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DETAIL DRAWER / MODAL */}
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
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[var(--dashboard-primary)]/10 text-[var(--dashboard-primary)] rounded-xl flex items-center justify-center text-lg">
                                            <FiUser />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-800">{activeTab === 'CUSTOMER_PAYMENT' ? selectedPayment.customer?.name : selectedPayment.foreman?.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">{activeTab === 'CUSTOMER_PAYMENT' ? 'Konsumen' : 'Mandor'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Proyek</p>
                                    <p className="text-sm font-black text-slate-800">{selectedPayment.project?.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{selectedPayment.project?.projectCode}</p>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Nominal Pembayaran</p>
                                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{formatCurrency(selectedPayment.amount)}</h2>
                                <div className="mt-6 flex gap-2">
                                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 ${getStatusConfig(selectedPayment.status).color}`}>
                                        {getStatusConfig(selectedPayment.status).icon}
                                        {getStatusConfig(selectedPayment.status).label}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Catatan / Keterangan</p>
                                <div className="p-5 bg-white border border-slate-100 rounded-2xl italic text-slate-600 text-xs font-medium leading-relaxed">
                                    {selectedPayment.note || "Tidak ada catatan untuk transaksi ini."}
                                </div>
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
                            {selectedPayment.status === 'verified' && (
                                <div className="w-full py-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-2">
                                    <FiCheckCircle size={16} /> Transaksi Terverifikasi pada {new Date(selectedPayment.verifiedAt).toLocaleString('id-ID')}
                                </div>
                            )}
                            {selectedPayment.status === 'pending' && activeTab === 'CUSTOMER_PAYMENT' && (
                                <div className="w-full p-4 bg-amber-50 text-amber-600 border border-amber-100 rounded-2xl flex items-center gap-3">
                                    <FiInfo size={20} className="shrink-0" />
                                    <p className="text-[10px] font-bold uppercase tracking-tight leading-relaxed">
                                        Menunggu Konsumen melakukan konfirmasi pembayaran di dashboard mereka. Admin dapat melakukan verifikasi setelah status menjadi 'Paid'.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PembayaranAdminPage;
