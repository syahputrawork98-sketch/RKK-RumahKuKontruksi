import React, { useState } from "react";
import { FiCheckCircle, FiClock, FiCreditCard, FiUpload, FiSearch, FiTarget, FiUser, FiInfo } from "react-icons/fi";
import ForemanTransferProofModal from "./ForemanTransferProofModal";

const ForemanDisbursementTab = ({ approvedRequests = [], onMarkAsPaid }) => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showUpload, setShowUpload] = useState(false);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Summary Cards for Disbursements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Siap Dibayar</p>
                        <h4 className="text-3xl font-black text-slate-900 tracking-tighter">
                            {approvedRequests.filter(r => r.status !== 'paid_simulated').length} <span className="text-sm font-bold text-slate-400 ml-1">Pengajuan</span>
                        </h4>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-8 -mt-8"></div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Total Outstanding</p>
                        <h4 className="text-2xl font-black text-blue-600 tracking-tighter">
                            {formatCurrency(approvedRequests.filter(r => r.status !== 'paid_simulated').reduce((sum, r) => sum + (r.approvedAmount || r.totalAmount || r.amount), 0))}
                        </h4>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-8 -mt-8"></div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Status Banking</p>
                        <div className="flex items-center gap-2 text-emerald-500">
                            <FiCheckCircle />
                            <span className="text-[10px] font-black uppercase tracking-widest">Manual Transfer Ready</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Kelola Pembayaran Mandor</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Daftar Pengajuan Disetujui (Outflow)</p>
                    </div>
                    <div className="relative w-64">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                        <input type="text" placeholder="Cari nomor rekening / Mandor..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold focus:outline-none w-full" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mandor & Proyek</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rekening Tujuan</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Nominal Disetujui</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Bayar</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {approvedRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest italic">Belum ada pengajuan siap dibayar</td>
                                </tr>
                            ) : (
                                approvedRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50/50 transition-all group">
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-slate-800">{req.foremanName}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{req.projectName} • {req.code}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                                    <FiCreditCard size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-800">{req.bankAccount?.bankName} - {req.bankAccount?.accountNumber}</p>
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase">A.N. {req.bankAccount?.accountHolder}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right font-black text-slate-900 text-sm">
                                            {formatCurrency(req.approvedAmount || req.totalAmount || req.amount)}
                                        </td>
                                        <td className="px-8 py-6">
                                            {req.status === 'paid_simulated' ? (
                                                <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white border-transparent flex items-center gap-2 w-fit">
                                                    <FiCheckCircle /> Sudah Dibayar
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-2 w-fit">
                                                    <FiClock /> Belum Dibayar
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            {req.status !== 'paid_simulated' ? (
                                                <button 
                                                    onClick={() => { setSelectedRequest(req); setShowUpload(true); }}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all flex items-center gap-2 ml-auto"
                                                >
                                                    <FiUpload /> Upload Bukti
                                                </button>
                                            ) : (
                                                <button className="px-4 py-2 bg-white border border-slate-100 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-blue-600 hover:border-blue-200 transition-all ml-auto">Lihat Bukti</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Instruction Warning */}
            <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem] flex gap-6 items-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                    <FiInfo size={32} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-base font-black text-blue-900 uppercase tracking-tight">Manual Disbursement Protocol</h4>
                    <p className="text-[11px] font-bold text-blue-700 leading-relaxed uppercase italic">
                        Lakukan transfer manual ke nomor rekening Mandor yang tertera di atas. Setelah transfer berhasil, upload screenshot bukti transfer ke sistem ini untuk mengubah status menjadi "Lunas".
                    </p>
                </div>
            </div>

            {/* Upload Proof Modal */}
            <ForemanTransferProofModal 
                isOpen={showUpload}
                onClose={() => setShowUpload(false)}
                requestData={selectedRequest}
                onSubmit={onMarkAsPaid}
            />
        </div>
    );
};

export default ForemanDisbursementTab;
