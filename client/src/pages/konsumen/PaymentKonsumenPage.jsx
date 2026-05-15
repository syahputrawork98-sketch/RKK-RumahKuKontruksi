import React, { useState } from "react";
import { 
    FiFileText, 
    FiCreditCard, 
    FiInfo, 
    FiClock, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiChevronRight,
    FiUpload,
    FiDownload,
    FiAlertTriangle
} from "react-icons/fi";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

const PaymentKonsumenPage = () => {
    const { selectedCustomerId } = useCustomerPersona();
    const [activeTab, setActiveTab] = useState("BILLING"); // BILLING, HISTORY

    if (!selectedCustomerId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Konsumen"
                description="Pilih konsumen untuk melihat tagihan dan riwayat pembayaran proyek Anda."
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
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Keuangan Proyek</h1>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Transparansi Tagihan & Pembayaran Resmi</p>
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

            {activeTab === "BILLING" ? (
                <div className="space-y-6">
                    {/* Payment Instructions Placeholder */}
                    <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                    <FiInfo size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-tight">Instruksi Pembayaran Resmi</h3>
                                    <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">Hanya transfer ke rekening perusahaan RKK</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                    <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Rekening Bank Mandiri</p>
                                    <p className="text-xl font-black tracking-tight">123-00-9876543-21</p>
                                    <p className="text-[10px] font-bold text-blue-200 mt-1 uppercase">A.N. PT. Rumah Ku Konstruksi</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                    <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Rekening Bank BCA</p>
                                    <p className="text-xl font-black tracking-tight">888-7766-5544</p>
                                    <p className="text-[10px] font-bold text-blue-200 mt-1 uppercase">A.N. PT. Rumah Ku Konstruksi</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-amber-400 text-amber-950 rounded-2xl border border-amber-300/30">
                                <FiAlertTriangle className="shrink-0 mt-0.5" />
                                <p className="text-[10px] font-bold leading-relaxed">
                                    HATI-HATI PENIPUAN. RKK tidak pernah meminta pembayaran ke rekening pribadi atau pihak ketiga. Selalu verifikasi bukti transfer Anda di dashboard ini.
                                </p>
                            </div>
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                    </div>

                    {/* Active Bill List (Placeholder) */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Daftar Tagihan Menunggu Pembayaran</h4>
                        
                        {/* Dummy Active Bill */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:border-blue-500/30 transition-all group">
                            <div className="flex flex-col md:flex-row justify-between gap-8">
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-amber-100 group-hover:scale-110 transition-transform">
                                            <FiClock />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Termin II: Pekerjaan Struktur</h3>
                                                <span className="px-3 py-1 bg-amber-100 text-amber-700 border border-amber-200 rounded-full text-[8px] font-black uppercase tracking-widest">
                                                    Waiting Payment
                                                </span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Jatuh Tempo: 25 Mei 2026</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Tagihan</p>
                                            <p className="text-2xl font-black text-slate-900 tracking-tighter">{formatCurrency(125000000)}</p>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Proyek Terkait</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">On Progress (35%)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-64 flex flex-col gap-3">
                                    <button 
                                        className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                        onClick={() => alert("Fitur upload bukti transfer akan tersedia di Batch 102.")}
                                    >
                                        <FiUpload /> Upload Bukti Bayar
                                    </button>
                                    <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                        <FiDownload /> Download Invoice
                                    </button>
                                    <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-tighter">
                                        Format: JPG, PNG, atau PDF (Max 5MB)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Empty State Illustration if no bills */}
                        <div className="hidden py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                                <FiCheckCircle size={64} />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Tidak Ada Tagihan Aktif</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Semua tagihan Anda saat ini sudah terbayar atau belum jatuh tempo.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Payment History List (Placeholder) */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaksi</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Metode & Bukti</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nominal</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Catatan Admin</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="hover:bg-slate-50/50 transition-all">
                                    <td className="px-8 py-6">
                                        <p className="text-[10px] font-black text-blue-600 mb-1 uppercase tracking-widest">PAY-2026-001</p>
                                        <p className="text-sm font-black text-slate-800">Termin I: DP Proyek</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">15 April 2026</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                                                <FiCreditCard size={14} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">Transfer Bank Mandiri</p>
                                                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline mt-0.5">Lihat Bukti</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-base font-black text-slate-900 tracking-tight">
                                        {formatCurrency(50000000)}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-200 bg-emerald-100 text-emerald-700 flex items-center gap-2 w-fit">
                                            <FiCheckCircle size={12} /> Verified / Lunas
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <p className="text-[10px] font-bold text-slate-500 leading-relaxed italic">
                                            "Pembayaran DP diterima dan diverifikasi. Proyek masuk tahap persiapan."
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100">
                            <FiInfo />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                            Riwayat di atas hanya menampilkan pembayaran yang telah dikonfirmasi oleh sistem administrasi RKK.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentKonsumenPage;
