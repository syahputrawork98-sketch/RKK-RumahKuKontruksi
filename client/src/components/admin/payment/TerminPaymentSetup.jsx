import React, { useState, useEffect } from "react";
import { FiActivity, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const TerminPaymentSetup = ({ totalValue = 1000000000 }) => {
    const [terminData, setTerminData] = useState([
        { id: 1, name: "Down Payment (DP)", progressTarget: 0, paymentPercent: 30, status: "READY" },
        { id: 2, name: "Pekerjaan Struktur Selesai", progressTarget: 40, paymentPercent: 30, status: "PENDING" },
        { id: 3, name: "Pekerjaan Finishing Selesai", progressTarget: 85, paymentPercent: 30, status: "PENDING" },
        { id: 4, name: "Serah Terima Kunci (Retensi)", progressTarget: 100, paymentPercent: 10, status: "PENDING" }
    ]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const handleUpdate = (index, field, value) => {
        const newData = [...terminData];
        newData[index][field] = value;
        setTerminData(newData);
    };

    const totalPercent = terminData.reduce((acc, curr) => acc + (parseFloat(curr.paymentPercent) || 0), 0);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 gap-4">
                {terminData.map((t, index) => (
                    <div key={t.id} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 font-black shadow-sm border border-blue-100">
                                {index + 1}
                            </div>
                            
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Termin</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        value={t.name}
                                        onChange={(e) => handleUpdate(index, "name", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Progres (%)</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            className="w-full p-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            value={t.progressTarget}
                                            onChange={(e) => handleUpdate(index, "progressTarget", e.target.value)}
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">%</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Pembayaran (%)</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            className="w-full p-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            value={t.paymentPercent}
                                            onChange={(e) => handleUpdate(index, "paymentPercent", e.target.value)}
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">%</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimasi Nominal</p>
                                    <p className="text-sm font-black text-slate-800 h-9 flex items-center bg-blue-50/30 px-3 rounded-xl border border-blue-50/50">
                                        {formatCurrency((t.paymentPercent / 100) * totalValue)}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 flex items-center gap-2">
                                <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${t.status === 'READY' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                                    {t.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Validation Info */}
            <div className={`p-6 rounded-[2rem] border flex items-center justify-between gap-4 shadow-sm ${totalPercent === 100 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg ${totalPercent === 100 ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-rose-500 shadow-rose-500/20'}`}>
                        {totalPercent === 100 ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
                    </div>
                    <div>
                        <h4 className={`text-xs font-black uppercase tracking-widest ${totalPercent === 100 ? 'text-emerald-700' : 'text-rose-700'}`}>
                            Total Persentase Pembayaran: {totalPercent}%
                        </h4>
                        <p className={`text-[10px] font-bold ${totalPercent === 100 ? 'text-emerald-600/70' : 'text-rose-600/70'}`}>
                            {totalPercent === 100 ? "Konfigurasi termin sudah valid (100%)." : "Total persentase harus berjumlah tepat 100%."}
                        </p>
                    </div>
                </div>
                <button 
                    disabled={totalPercent !== 100}
                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${totalPercent === 100 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:scale-105' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                    Simpan Konfigurasi
                </button>
            </div>
        </div>
    );
};

export default TerminPaymentSetup;
