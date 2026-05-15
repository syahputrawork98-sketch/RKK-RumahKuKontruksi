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
import CustomerActiveBillsTab from "../../components/konsumen/payment/CustomerActiveBillsTab";
import CustomerPaymentHistoryTab from "../../components/konsumen/payment/CustomerPaymentHistoryTab";
import PaymentProofUploadModal from "../../components/konsumen/payment/PaymentProofUploadModal";

const PaymentKonsumenPage = () => {
    const { selectedCustomerId } = useCustomerPersona();
    const [activeTab, setActiveTab] = useState("BILLING"); // BILLING, HISTORY

    const [bills, setBills] = useState([
        { 
            id: 1, 
            code: "INV-2026-002", 
            projectName: "Villa Canggu Refurbishment", 
            itemName: "Termin II: Pekerjaan Struktur", 
            amount: 125000000, 
            dueDate: "25 Mei 2026", 
            status: "sent" 
        },
        { 
            id: 2, 
            code: "INV-2026-003", 
            projectName: "Villa Canggu Refurbishment", 
            itemName: "Kategori: Pekerjaan Atap", 
            amount: 45000000, 
            dueDate: "10 Juni 2026", 
            status: "waiting_payment" 
        }
    ]);

    const [payments, setPayments] = useState([
        { 
            id: 101, 
            code: "PAY-2026-001", 
            itemName: "Termin I: DP Proyek", 
            projectName: "Villa Canggu Refurbishment",
            amount: 50000000, 
            uploadDate: "15 April 2026", 
            originBank: "Bank Mandiri",
            fileName: "bukti_dp.jpg",
            status: "verified",
            adminNote: "Pembayaran DP diterima dan diverifikasi. Proyek masuk tahap persiapan."
        }
    ]);

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    if (!selectedCustomerId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Konsumen"
                description="Pilih konsumen untuk melihat tagihan dan riwayat pembayaran proyek Anda."
            />
        );
    }

    const handleUploadClick = (bill) => {
        setSelectedBill(bill);
        setShowUploadModal(true);
    };

    const handleUploadSubmit = (submission) => {
        // Update bill status locally
        setBills(bills.map(b => b.id === submission.id ? { ...b, status: 'paid_uploaded' } : b));
        
        // Add to history
        const newPayment = {
            id: Date.now(),
            code: `PAY-${submission.code.split('-')[1]}-${Math.floor(100 + Math.random() * 900)}`,
            itemName: submission.itemName,
            projectName: submission.projectName,
            amount: submission.amount,
            uploadDate: submission.uploadDate,
            originBank: submission.originBank,
            fileName: submission.fileName,
            status: 'paid_uploaded',
            adminNote: null
        };
        setPayments([newPayment, ...payments]);
        
        alert("Terima kasih! Bukti transfer Anda telah berhasil di-upload dan sedang dalam proses verifikasi admin.");
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
                <CustomerActiveBillsTab 
                    bills={bills} 
                    onUploadClick={handleUploadClick}
                />
            ) : (
                <CustomerPaymentHistoryTab 
                    payments={payments}
                />
            )}

            {/* Upload Modal */}
            <PaymentProofUploadModal 
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                billData={selectedBill}
                onSubmit={handleUploadSubmit}
            />
        </div>
    );
};

export default PaymentKonsumenPage;
