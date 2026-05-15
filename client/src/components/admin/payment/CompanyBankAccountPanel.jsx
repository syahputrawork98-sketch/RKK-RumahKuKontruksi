import React, { useState } from "react";
import { FiPlus, FiMoreVertical, FiTrash2, FiEdit3, FiInfo, FiCheckCircle } from "react-icons/fi";

const CompanyBankAccountPanel = () => {
    const [accounts, setAccounts] = useState([
        { 
            id: 1, 
            bankName: "Bank Mandiri", 
            accountNumber: "123-00-9876543-21", 
            ownerName: "PT. Rumah Ku Konstruksi",
            branch: "Jakarta Pusat",
            instructions: "Pastikan nominal transfer sesuai dengan invoice. Gunakan kode unik jika ada."
        },
        { 
            id: 2, 
            bankName: "Bank BCA", 
            accountNumber: "888-7766-5544", 
            ownerName: "PT. Rumah Ku Konstruksi",
            branch: "KCP Sudirman",
            instructions: "Pengecekan otomatis dilakukan setiap 30 menit. Simpan bukti transfer Anda."
        }
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newAccount, setNewAccount] = useState({
        bankName: "",
        accountNumber: "",
        ownerName: "",
        branch: "",
        instructions: ""
    });

    const handleAddAccount = () => {
        if (!newAccount.bankName || !newAccount.accountNumber || !newAccount.ownerName) {
            alert("Harap isi Nama Bank, No. Rekening, dan Nama Pemilik.");
            return;
        }
        setAccounts([...accounts, { ...newAccount, id: Date.now() }]);
        setNewAccount({ bankName: "", accountNumber: "", ownerName: "", branch: "", instructions: "" });
        setIsAdding(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Hapus rekening ini?")) {
            setAccounts(accounts.filter(a => a.id !== id));
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <FiCheckCircle className="text-blue-600" /> Rekening Perusahaan / RKK
                </h3>
                {!isAdding && (
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center gap-2"
                    >
                        <FiPlus /> Tambah Rekening
                    </button>
                )}
            </div>

            {isAdding && (
                <div className="p-6 bg-slate-50 rounded-3xl border border-blue-100 space-y-4 animate-slideDown">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Bank</label>
                            <input 
                                type="text" 
                                placeholder="Contoh: Bank BCA"
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={newAccount.bankName}
                                onChange={(e) => setNewAccount({...newAccount, bankName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nomor Rekening</label>
                            <input 
                                type="text" 
                                placeholder="Contoh: 8887766554"
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={newAccount.accountNumber}
                                onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Pemilik</label>
                            <input 
                                type="text" 
                                placeholder="Contoh: PT. Rumah Ku Konstruksi"
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={newAccount.ownerName}
                                onChange={(e) => setNewAccount({...newAccount, ownerName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Cabang / Ket (Opsional)</label>
                            <input 
                                type="text" 
                                placeholder="Contoh: KCP Sudirman"
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={newAccount.branch}
                                onChange={(e) => setNewAccount({...newAccount, branch: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Instruksi Pembayaran</label>
                        <textarea 
                            rows="2"
                            placeholder="Instruksi tambahan untuk konsumen..."
                            className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                            value={newAccount.instructions}
                            onChange={(e) => setNewAccount({...newAccount, instructions: e.target.value})}
                        ></textarea>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                        <button 
                            onClick={() => setIsAdding(false)}
                            className="px-4 py-2 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600"
                        >
                            Batal
                        </button>
                        <button 
                            onClick={handleAddAccount}
                            className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
                        >
                            Simpan Rekening
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {accounts.length === 0 ? (
                    <div className="py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Belum ada rekening terdaftar</p>
                    </div>
                ) : (
                    accounts.map(acc => (
                        <div key={acc.id} className="group relative p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                            <div className="flex justify-between items-start">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm">
                                            <FiCheckCircle size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{acc.bankName} {acc.branch && `(${acc.branch})`}</p>
                                            <p className="text-lg font-black text-slate-800 tracking-tight">{acc.accountNumber}</p>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">a.n. {acc.ownerName}</p>
                                        </div>
                                    </div>

                                    {/* Preview Instruction */}
                                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                            <FiInfo /> Preview Instruksi Konsumen
                                        </p>
                                        <p className="text-[10px] text-blue-700 font-bold leading-relaxed italic">
                                            "Silakan transfer ke <span className="underline">{acc.bankName} - {acc.accountNumber}</span> a.n. {acc.ownerName}. {acc.instructions || "Setelah transfer, upload bukti pembayaran melalui tab Tagihan."}"
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><FiEdit3 size={16} /></button>
                                    <button onClick={() => handleDelete(acc.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><FiTrash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CompanyBankAccountPanel;
