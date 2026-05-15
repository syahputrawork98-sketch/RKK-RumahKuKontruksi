import React from "react";
import { FiFileText, FiChevronRight, FiClock, FiCheckCircle, FiXCircle, FiSend, FiAlertCircle } from "react-icons/fi";

const CustomerInvoiceTable = ({ invoices = [] }) => {
    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case 'DRAFT': return 'bg-slate-100 text-slate-500 border-slate-200';
            case 'REVIEWED': return 'bg-amber-100 text-amber-600 border-amber-200';
            case 'RELEASED': return 'bg-blue-100 text-blue-600 border-blue-200';
            default: return 'bg-slate-100 text-slate-400 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case 'DRAFT': return <FiClock />;
            case 'REVIEWED': return <FiAlertCircle />;
            case 'RELEASED': return <FiSend />;
            default: return <FiClock />;
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden animate-fadeIn">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Daftar Invoice & Tagihan (Draft Helper)</h3>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Filter</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-50">
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">No. Ref</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Item Tagihan</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Nominal</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {invoices.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center">
                                        <FiFileText size={48} className="text-slate-100 mb-4" />
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Belum ada draf invoice yang dibuat</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            invoices.map((inv) => {
                                let contentData = {};
                                try {
                                    contentData = JSON.parse(inv.content || '{}');
                                } catch (e) {
                                    console.error("Failed to parse invoice content", e);
                                }

                                return (
                                    <tr key={inv.id} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-black text-blue-600">{inv.id.substring(0, 8).toUpperCase()}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Dibuat: {new Date(inv.createdAt).toLocaleDateString('id-ID')}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-slate-800">{contentData.itemName || inv.title}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{contentData.mode || 'Tagihan'}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right font-black text-slate-900">
                                            {formatCurrency(contentData.amount || 0)}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${getStatusStyle(inv.status)}`}>
                                                {getStatusIcon(inv.status)} {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all group-hover:bg-white shadow-sm border border-transparent group-hover:border-slate-100">
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
    );
};

export default CustomerInvoiceTable;
