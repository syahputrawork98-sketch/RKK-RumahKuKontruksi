import React, { useState } from "react";
import { FiCreditCard, FiEdit2, FiCheck, FiX, FiAlertCircle } from "react-icons/fi";

const ForemanBankAccountPanel = ({ initialData = null, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [bankName, setBankName] = useState(initialData?.bankName || "");
    const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || "");
    const [accountHolder, setAccountHolder] = useState(initialData?.accountHolder || "");
    const [notes, setNotes] = useState(initialData?.notes || "");

    const isComplete = bankName && accountNumber && accountHolder;

    const handleSave = () => {
        if (!isComplete) {
            alert("Harap lengkapi Nama Bank, No. Rekening, dan Nama Pemilik.");
            return;
        }
        onSave({ bankName, accountNumber, accountHolder, notes });
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-all ${isComplete ? 'bg-blue-600 text-white shadow-blue-500/20' : 'bg-slate-100 text-slate-400 shadow-slate-100'}`}>
                        <FiCreditCard />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Rekening Pembayaran</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Data transfer operasional Anda</p>
                    </div>
                </div>

                {!isEditing ? (
                    <div className="flex flex-1 flex-col md:flex-row md:items-center justify-end gap-8">
                        {isComplete ? (
                            <div className="flex gap-8">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bank</p>
                                    <p className="text-sm font-black text-slate-800">{bankName}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">No. Rekening</p>
                                    <p className="text-sm font-black text-slate-800 tracking-wider">{accountNumber}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">A.N. Pemilik</p>
                                    <p className="text-sm font-black text-slate-800">{accountHolder}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-amber-500 animate-pulse">
                                <FiAlertCircle size={14} />
                                <p className="text-[10px] font-black uppercase tracking-widest">Lengkapi rekening sebelum mengajukan pembayaran</p>
                            </div>
                        )}
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all hover:bg-blue-50"
                        >
                            <FiEdit2 size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
                        <input 
                            type="text" 
                            placeholder="Nama Bank" 
                            className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Nomor Rekening" 
                            className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Pemilik Rekening" 
                            className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={accountHolder}
                            onChange={(e) => setAccountHolder(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <button onClick={handleSave} className="flex-1 bg-blue-600 text-white rounded-xl flex items-center justify-center transition-all hover:scale-105">
                                <FiCheck size={18} />
                            </button>
                            <button onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center transition-all hover:bg-slate-200">
                                <FiX size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
        </div>
    );
};

export default ForemanBankAccountPanel;
