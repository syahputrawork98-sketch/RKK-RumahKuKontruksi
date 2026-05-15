import React, { useState, useEffect } from "react";
import { 
    FiCreditCard, 
    FiInfo, 
    FiFileText
} from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import ForemanBankAccountPanel from "../../components/mandor/payment/ForemanBankAccountPanel";
import ForemanPaymentRequestTab from "../../components/mandor/payment/ForemanPaymentRequestTab";
import ForemanPaymentHistoryTab from "../../components/mandor/payment/ForemanPaymentHistoryTab";
import ForemanPaymentRequestModal from "../../components/mandor/payment/ForemanPaymentRequestModal";

const PembayaranMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("REQUEST"); // REQUEST, PAYMENT
    const [requests, setRequests] = useState([]);
    const [history, setHistory] = useState([]);
    const [bankAccount, setBankAccount] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    
    // Simulated project list
    const projects = [
        { id: "PRJ-001", name: "Villa Canggu Refurbishment" },
        { id: "PRJ-002", name: "Modern Minimalist House - Jakarta" }
    ];

    // Load data from localStorage to simulate cross-persona data flow
    useEffect(() => {
        if (!selectedForemanId) {
            setLoading(false);
            return;
        }

        const storedRequests = localStorage.getItem('rkk_foreman_requests');
        const storedHistory = localStorage.getItem('rkk_foreman_history');
        const storedBank = localStorage.getItem(`rkk_foreman_bank_${selectedForemanId}`);
        
        if (storedRequests) setRequests(JSON.parse(storedRequests));
        if (storedHistory) setHistory(JSON.parse(storedHistory));
        if (storedBank) setBankAccount(JSON.parse(storedBank));
        
        setLoading(false);
    }, [selectedForemanId]);

    const handleSaveBank = (data) => {
        setBankAccount(data);
        localStorage.setItem(`rkk_foreman_bank_${selectedForemanId}`, JSON.stringify(data));
        alert("Rekening pembayaran berhasil disimpan.");
    };

    const handleRequestSubmit = (data) => {
        const newRequest = {
            id: Date.now(),
            code: `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            foremanName: "Ahmad Mandor", // Mock
            supervisorRecommendation: 'PENDING',
            ...data
        };
        const updatedRequests = [newRequest, ...requests];
        setRequests(updatedRequests);
        localStorage.setItem('rkk_foreman_requests', JSON.stringify(updatedRequests));
        alert("Pengajuan pembayaran berhasil dikirim.");
    };

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Mandor"
                description="Pilih mandor untuk melihat riwayat pembayaran operasional dan opname lapangan."
            />
        );
    }

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
                        <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest leading-none">Simulasi Lokal Transaksi</p>
                    </div>
                </div>
            </div>

            {/* Bank Account Section */}
            <ForemanBankAccountPanel 
                initialData={bankAccount} 
                onSave={handleSaveBank}
            />

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
                <ForemanPaymentRequestTab 
                    requests={requests}
                    onCreateClick={() => setShowRequestModal(true)}
                    canRequest={!!bankAccount}
                />
            ) : (
                <ForemanPaymentHistoryTab 
                    payments={history}
                />
            )}

            {/* Modals */}
            <ForemanPaymentRequestModal 
                isOpen={showRequestModal}
                onClose={() => setShowRequestModal(false)}
                projects={projects}
                bankAccount={bankAccount}
                onSubmit={handleRequestSubmit}
            />
        </div>
    );
};

export default PembayaranMandorPage;
