import React, { useState } from "react";
import { 
    FiFileText, 
    FiPackage, 
    FiActivity, 
    FiAlertCircle, 
    FiCheckCircle, 
    FiClock, 
    FiLayers, 
    FiFilter,
    FiSearch,
    FiPlus
} from "react-icons/fi";
import TerminBillingDraft from "./TerminBillingDraft";
import CategoryBillingDraft from "./CategoryBillingDraft";
import CustomerInvoiceTable from "./CustomerInvoiceTable";
import InvoiceDraftModal from "./InvoiceDraftModal";

const CustomerBillingTab = ({ projects = [] }) => {
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [activeBillingMode, setActiveBillingMode] = useState("TERMIN"); // TERMIN or CATEGORY
    const [showDraftModal, setShowDraftModal] = useState(false);
    const [currentDraft, setCurrentDraft] = useState(null);
    const [invoices, setInvoices] = useState([
        // Mock existing invoices
        { 
            id: 1, 
            code: "INV-2023-001", 
            projectName: "Villa Canggu Refurbishment", 
            customerName: "Budi Santoso", 
            type: "TERMIN", 
            itemName: "Down Payment (DP)", 
            amount: 375000000, 
            dueDate: "2023-12-01", 
            status: "VERIFIED" 
        },
        { 
            id: 2, 
            code: "INV-2023-002", 
            projectName: "Villa Canggu Refurbishment", 
            customerName: "Budi Santoso", 
            type: "TERMIN", 
            itemName: "Pekerjaan Struktur Selesai", 
            amount: 375000000, 
            dueDate: "2024-01-15", 
            status: "WAITING_PAYMENT" 
        }
    ]);

    const selectedProject = projects.find(p => p.id === selectedProjectId);

    const handleCreateDraft = (data) => {
        const newDraft = {
            ...data,
            code: `INV-DRAFT-${Math.floor(1000 + Math.random() * 9000)}`,
            projectName: selectedProject ? selectedProject.name : "N/A Project",
            customerName: "Budi Santoso", // Mock
            mode: activeBillingMode === 'TERMIN' ? 'Termin' : 'Per Kategori',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'DRAFT'
        };
        setCurrentDraft(newDraft);
        setShowDraftModal(true);
    };

    const saveDraft = (draft) => {
        setInvoices([draft, ...invoices]);
        setShowDraftModal(false);
        alert(`Draft invoice ${draft.code} berhasil disimpan.`);
    };

    const sendInvoice = (draft) => {
        const sentInvoice = { ...draft, status: 'SENT' };
        setInvoices([sentInvoice, ...invoices]);
        setShowDraftModal(false);
        alert(`Invoice ${draft.code} telah dikirim ke konsumen.`);
    };

    // Summary logic
    const stats = {
        draft: invoices.filter(i => i.status === 'DRAFT').length,
        sent: invoices.filter(i => i.status === 'SENT').length,
        waiting: invoices.filter(i => i.status === 'WAITING_PAYMENT').length,
        verified: invoices.filter(i => i.status === 'VERIFIED').length,
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Draft</p>
                        <FiClock className="text-slate-300" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">{stats.draft}</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tagihan Dikirim</p>
                        <FiCheckCircle className="text-blue-500" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">{stats.sent}</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Menunggu Bayar</p>
                        <FiAlertCircle className="text-amber-500" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">{stats.waiting}</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Lunas</p>
                        <FiCheckCircle className="text-emerald-500" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">{stats.verified}</p>
                </div>
            </div>

            {/* Project & Mode Filter */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm border border-blue-100">
                            <FiPackage size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Pilih Proyek & Skema</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Siapkan Draft Tagihan Berdasarkan Realisasi</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <select 
                            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none min-w-[240px]"
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                        >
                            <option value="">-- Pilih Proyek --</option>
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                        <select 
                            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none"
                            value={activeBillingMode}
                            onChange={(e) => setActiveBillingMode(e.target.value)}
                        >
                            <option value="TERMIN">Mode Termin</option>
                            <option value="CATEGORY">Mode Per Kategori RAB</option>
                        </select>
                    </div>
                </div>

                {selectedProject && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 animate-slideDown">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Konsumen</p>
                            <p className="text-xs font-bold text-slate-800">Budi Santoso</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nilai Proyek</p>
                            <p className="text-xs font-bold text-slate-800">Rp 1.250.000.000</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Progres Saat Ini</p>
                            <p className="text-xs font-black text-blue-600">45% (Verified)</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mode Pembayaran</p>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-200">
                                {activeBillingMode === 'TERMIN' ? 'Termin 4 Kali' : 'Per Kategori RAB'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Billing Draft Section */}
            {selectedProjectId ? (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 ml-4">
                        <div className={`w-2 h-8 rounded-full ${activeBillingMode === 'TERMIN' ? 'bg-blue-600' : 'bg-emerald-600'}`}></div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">
                            {activeBillingMode === 'TERMIN' ? 'Draf Penagihan Berbasis Termin' : 'Kategori RAB Siap Tagih'}
                        </h3>
                    </div>

                    {activeBillingMode === 'TERMIN' ? (
                        <TerminBillingDraft 
                            projectId={selectedProjectId} 
                            onCreateDraft={handleCreateDraft}
                        />
                    ) : (
                        <CategoryBillingDraft 
                            projectId={selectedProjectId}
                            categories={[
                                { id: 1, name: "Pekerjaan Persiapan", total: 15000000, progress: 100 },
                                { id: 2, name: "Pekerjaan Tanah & Pasir", total: 25000000, progress: 100 },
                                { id: 3, name: "Pekerjaan Struktur Lantai 1", total: 120000000, progress: 85 },
                                { id: 4, name: "Pekerjaan Pasangan Dinding", total: 85000000, progress: 15 }
                            ]}
                            onCreateDraft={handleCreateDraft}
                        />
                    )}
                </div>
            ) : (
                <div className="py-20 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
                    <FiLayers size={48} className="text-slate-100 mb-4" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Silakan pilih proyek untuk melihat draf penagihan</p>
                </div>
            )}

            {/* Global Invoice Table */}
            <CustomerInvoiceTable invoices={invoices} />

            {/* Draft Modal */}
            <InvoiceDraftModal 
                isOpen={showDraftModal}
                onClose={() => setShowDraftModal(false)}
                draftData={currentDraft}
                onSave={saveDraft}
                onSend={sendInvoice}
            />
        </div>
    );
};

export default CustomerBillingTab;
