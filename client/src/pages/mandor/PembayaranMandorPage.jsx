import React, { useState, useEffect } from "react";
import { 
    FiCreditCard, 
    FiInfo, 
    FiClock, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiPlus, 
    FiFileText, 
    FiChevronRight,
    FiDownload,
    FiSearch,
    FiFilter
} from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import paymentService from "../../services/paymentService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

const PembayaranMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("REQUEST"); // REQUEST, PAYMENT

    const fetchPayments = async () => {
        if (!selectedForemanId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const response = await paymentService.getPayments({ foremanId: selectedForemanId });
            setPayments(response.data || []);
        } catch (err) {
            console.error("Failed to fetch payments:", err);
            setError("Gagal memuat data pembayaran.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [selectedForemanId]);

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Mandor"
                description="Pilih mandor untuk melihat riwayat pembayaran operasional dan opname lapangan."
            />
        );
    }

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    return (
        <div className="animate-fadeIn space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Keuangan Mandor</h1>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Manajemen Opname & Pembayaran Lapangan</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-amber-50 border border-amber-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
                        <FiInfo className="text-amber-500" size={18} />
                        <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest leading-none">Simulasi Lokal CRUD</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-2xl w-fit">
                <button 
                    onClick={() => setActiveTab("REQUEST")}
                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'REQUEST' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <div className="flex items-center gap-2">
                        <FiFileText size={14} />
                        Pengajuan Pembayaran
                    </div>
                </button>
                <button 
                    onClick={() => setActiveTab("PAYMENT")}
                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'PAYMENT' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <div className="flex items-center gap-2">
                        <FiCreditCard size={14} />
                        Riwayat Diterima
                    </div>
                </button>
            </div>

            {activeTab === "REQUEST" ? (
                <div className="space-y-6">
                    {/* Action Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Cari pengajuan..." 
                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-500/5 focus:outline-none shadow-sm"
                            />
                        </div>
                        <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                            <FiPlus /> Buat Pengajuan Baru
                        </button>
                    </div>

                    {/* Request List (Placeholder) */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:border-blue-500/30 transition-all group">
                            <div className="flex flex-col md:flex-row justify-between gap-8">
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center text-xl shadow-sm border border-slate-100">
                                                <FiFileText />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-slate-800 tracking-tight">Pengajuan Minggu 14</h3>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: REQ-2026-05-001</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 border border-amber-200 rounded-full text-[8px] font-black uppercase tracking-widest">
                                            Draft
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Diajukan</p>
                                            <p className="text-lg font-black text-slate-900 tracking-tight">{formatCurrency(12500000)}</p>
                                        </div>
                                        <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rekomendasi Pengawas</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">Menunggu Review</p>
                                        </div>
                                        <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Item Pekerjaan</p>
                                            <p className="text-xs font-bold text-slate-700 mt-1">4 Kategori Pekerjaan</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-48 flex flex-col justify-center gap-2">
                                    <button className="w-full py-3 bg-slate-800 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all">
                                        Edit Draft
                                    </button>
                                    <button className="w-full py-3 bg-white border border-slate-200 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest cursor-not-allowed">
                                        Submit Pengajuan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] flex gap-4 items-start shadow-sm">
                        <FiInfo className="text-blue-500 shrink-0 mt-1" size={24} />
                        <div className="space-y-1">
                            <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest">Alur Pengajuan Mandor</h4>
                            <p className="text-[10px] text-blue-600 leading-relaxed font-bold uppercase italic tracking-tighter">
                                Buat draft pengajuan {">"} Submit {">"} Review Pengawas (Rekomendasi) {">"} Approval Admin {">"} Transfer/Pembayaran.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Payment History List */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-50">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaksi</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Proyek</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nominal</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {payments.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                                                        <FiCreditCard size={40} />
                                                    </div>
                                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Belum ada riwayat pembayaran diterima.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        payments.map(p => (
                                            <tr key={p.id} className="hover:bg-slate-50/50 transition-all cursor-pointer">
                                                <td className="px-8 py-6">
                                                    <p className="text-[10px] font-black text-blue-600 mb-1 uppercase tracking-widest">{p.paymentCode || 'PAY-MN'}</p>
                                                    <p className="text-sm font-black text-slate-800">{new Date(p.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm font-black text-slate-800">{p.project?.name || 'Project Name'}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-widest">{p.project?.projectCode}</p>
                                                </td>
                                                <td className="px-8 py-6 text-base font-black text-slate-900 tracking-tight">
                                                    {formatCurrency(p.amount)}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <StatusBadge type="payment" status={p.status} />
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="p-2 hover:bg-white rounded-xl transition-all text-slate-300">
                                                        <FiDownload size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100">
                            <FiInfo />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                            Hubungi Admin jika terdapat ketidaksesuaian nominal pada bukti transfer yang Anda terima.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PembayaranMandorPage;
