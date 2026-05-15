import React, { useState } from "react";
import { FiPackage, FiActivity, FiLayers, FiCheckCircle, FiAlertCircle, FiSettings, FiArrowRight } from "react-icons/fi";
import TerminPaymentSetup from "./TerminPaymentSetup";
import CategoryPaymentSetup from "./CategoryPaymentSetup";

const PaymentModeSetupPanel = ({ projects = [] }) => {
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [paymentMode, setPaymentMode] = useState("TERMIN_4X"); // TERMIN_4X, CATEGORY_RAB
    const [configStatus, setConfigStatus] = useState("NOT_CONFIGURED"); // NOT_CONFIGURED, READY, REVISION_NEEDED

    const selectedProject = projects.find(p => p.id === selectedProjectId);

    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <FiSettings className="text-blue-600" /> Mode Pembayaran Proyek
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 ml-7">Tentukan Skema Penagihan untuk Tiap Proyek</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <select 
                        className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 min-w-[240px]"
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                    >
                        <option value="">-- Pilih Proyek --</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {!selectedProjectId ? (
                <div className="py-20 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center">
                    <FiPackage size={48} className="text-slate-200 mb-4" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Silakan pilih proyek untuk mengatur mode pembayaran</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Mode Toggle */}
                    <div className="flex gap-4 p-2 bg-slate-50 rounded-[2rem] w-fit">
                        <button 
                            onClick={() => setPaymentMode("TERMIN_4X")}
                            className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${paymentMode === "TERMIN_4X" ? "bg-white text-blue-600 shadow-xl shadow-blue-500/5" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            <FiLayers size={18} />
                            Termin 4 Kali
                        </button>
                        <button 
                            onClick={() => setPaymentMode("CATEGORY_RAB")}
                            className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${paymentMode === "CATEGORY_RAB" ? "bg-white text-blue-600 shadow-xl shadow-blue-500/5" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            <FiActivity size={18} />
                            Per Kategori RAB
                        </button>
                    </div>

                    {/* Summary Card */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-100 space-y-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mode Aktif</p>
                            <p className="text-sm font-black text-slate-800">{paymentMode === "TERMIN_4X" ? "Termin 4 Kali" : "Per Kategori RAB"}</p>
                        </div>
                        <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-100 space-y-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Nilai Proyek</p>
                            <p className="text-sm font-black text-slate-800">Rp 1.250.000.000</p>
                        </div>
                        <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-100 space-y-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Rencana Bayar</p>
                            <p className="text-sm font-black text-blue-600">Rp 1.250.000.000</p>
                        </div>
                        <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-100 space-y-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status Konfigurasi</p>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${paymentMode === "TERMIN_4X" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}></span>
                                <p className="text-[10px] font-black text-slate-800 uppercase">{paymentMode === "TERMIN_4X" ? "Siap Digunakan" : "Perlu Verifikasi"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Setup Content */}
                    <div className="pt-4">
                        {paymentMode === "TERMIN_4X" ? (
                            <TerminPaymentSetup totalValue={1250000000} />
                        ) : (
                            <CategoryPaymentSetup totalValue={1250000000} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentModeSetupPanel;
