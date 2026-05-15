import React, { useState, useEffect } from "react";
import { 
    FiCreditCard, 
    FiInfo, 
    FiFileText
} from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import ForemanBankAccountPanel from "../../components/mandor/payment/ForemanBankAccountPanel";
import ForemanPaymentRequestTab from "../../components/mandor/payment/ForemanPaymentRequestTab";
import ForemanPaymentHistoryTab from "../../components/mandor/payment/ForemanPaymentHistoryTab";
import ForemanPaymentRequestModal from "../../components/mandor/payment/ForemanPaymentRequestModal";
import foremanPaymentEligibilityService from "../../services/foremanPaymentEligibilityService";
import paymentService from "../../services/paymentService";
import projectService from "../../services/projectService";

const PembayaranMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("REQUEST"); // REQUEST, PAYMENT
    const [requests, setRequests] = useState([]);
    const [history, setHistory] = useState([]);
    const [projects, setProjects] = useState([]);
    const [bankAccount, setBankAccount] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    
    const fetchData = async () => {
        if (!selectedForemanId) return;
        setLoading(true);
        try {
            // 1. Fetch Projects for dropdown
            const projectRes = await projectService.getProjects({ foremanId: selectedForemanId });
            setProjects(projectRes.data || []);

            // 2. Fetch Eligibility (Requests)
            const eligibilityRes = await foremanPaymentEligibilityService.getAll({ foremanId: selectedForemanId });
            setRequests(eligibilityRes.data || []);

            // 3. Fetch History (PaymentRecords)
            const historyRes = await paymentService.getPayments({ foremanId: selectedForemanId, type: 'FOREMAN_PAYMENT' });
            setHistory(historyRes.data || []);

            // 4. Fetch Bank Account (Still from localStorage as per scope)
            const storedBank = localStorage.getItem(`rkk_foreman_bank_${selectedForemanId}`);
            if (storedBank) setBankAccount(JSON.parse(storedBank));
        } catch (err) {
            console.error("Failed to fetch foreman payment data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedForemanId]);

    const handleSaveBank = (data) => {
        setBankAccount(data);
        localStorage.setItem(`rkk_foreman_bank_${selectedForemanId}`, JSON.stringify(data));
        alert("Rekening pembayaran berhasil disimpan.");
    };

    const handleRequestSubmit = () => {
        // According to Batch 109 Scope 2: Hold State / Disable creation if no API endpoint
        alert("Pengajuan pembayaran saat ini digenerate otomatis dari Jurnal Mingguan yang telah direview Pengawas.");
        setShowRequestModal(false);
    };

    if (!selectedForemanId) {
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
                    <div className="bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
                        <FiInfo className="text-emerald-500" size={18} />
                        <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest leading-none">Data Real dari Database</p>
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

            {loading ? (
                <RoleDataState status="loading" message="Memuat data keuangan..." />
            ) : activeTab === "REQUEST" ? (
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
                isPersistenceHold={true}
            />
        </div>
    );
};

export default PembayaranMandorPage;
