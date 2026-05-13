import React from 'react';
import { 
    FiArrowLeft, 
    FiInfo, 
    FiRefreshCw, 
    FiCheckCircle, 
    FiClock 
} from "react-icons/fi";
import DesignTimeline from "../../design/DesignTimeline";
import DesignRevisionForm from "../../design/DesignRevisionForm";
import PostDesignDecisionPanel from "./PostDesignDecisionPanel";
import DesignFilesGallery from "./DesignFilesGallery";


const DesignRequestDetailOverlay = ({ 
    selectedRequest, 
    onClose, 
    getStatusLabel, 
    submitting, 
    onAddRevision, 
    onApproveDesign, 
    onPostDesignDecision 
}) => {
    if (!selectedRequest) return null;

    const hasCustomerRelease = selectedRequest.history?.some(h => h.action === 'admin_released_design_to_customer');
    const hasCustomerApproval = selectedRequest.history?.some(h => h.action === 'customer_design_approved');

    return (
        <div className="fixed inset-0 z-[1000] flex flex-col bg-white animate-slideInUp overflow-y-auto">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center gap-4 z-20">
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                >
                    <FiArrowLeft size={20} />
                </button>
                <div>
                    <h3 className="text-lg font-black text-gray-800">{selectedRequest.title}</h3>
                    <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest mt-0.5">Timeline & Kolaborasi Desain (Local Simulation v1)</p>
                </div>
            </div>

            <div className="bg-indigo-50/50 px-8 py-3 border-b border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <FiInfo className="text-indigo-600 shrink-0" size={14} />
                    <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-tighter italic">
                        Info: Riwayat ini adalah bagian dari alur simulasi pengembangan lokal RKK.
                    </p>
                </div>
                
                {/* STEP INDICATOR */}
                <div className="flex items-center gap-2">
                    {[
                        { id: 'submitted', label: 'Brief' },
                        { id: 'assigned', label: 'Arsitek' },
                        { id: 'revision_requested', label: 'Revisi', alt: ['revised'] },
                        { id: 'in_review', label: 'Review' },
                        { id: 'approved', label: 'Selesai', alt: ['project_created'] }
                    ].map((step, idx, arr) => {
                        const isActive = selectedRequest.status === step.id || step.alt?.includes(selectedRequest.status);
                        const isPast = arr.findIndex(s => selectedRequest.status === s.id || s.alt?.includes(selectedRequest.status)) > idx;
                        
                        return (
                            <React.Fragment key={step.id}>
                                <div className="flex flex-col items-center">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black ${
                                        isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 
                                        isPast ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
                                    }`}>
                                        {isPast ? <FiCheckCircle size={10} /> : idx + 1}
                                    </div>
                                    <span className={`text-[7px] font-black uppercase tracking-tighter mt-1 ${
                                        isActive ? 'text-indigo-600' : 'text-gray-400'
                                    }`}>{step.label}</span>
                                </div>
                                {idx < arr.length - 1 && (
                                    <div className={`w-4 h-0.5 rounded-full ${isPast ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="max-w-6xl mx-auto w-full p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* LEFT: INFO & REVISION FORM */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="space-y-4">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
                            selectedRequest.status === 'submitted' ? "bg-blue-50 text-blue-600 border-blue-100" :
                            selectedRequest.status === 'open' ? "bg-teal-50 text-teal-600 border-teal-100" :
                            selectedRequest.status === 'assigned' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                            selectedRequest.status === 'revision_requested' ? "bg-rose-50 text-rose-600 border-rose-100" :
                            selectedRequest.status === 'revised' ? "bg-purple-50 text-purple-600 border-purple-100" :
                            selectedRequest.status === 'in_review' ? "bg-amber-50 text-amber-600 border-amber-100" :
                            selectedRequest.status === 'approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            selectedRequest.status === 'project_created' ? "bg-indigo-600 text-white border-indigo-700" :
                            "bg-gray-50 text-gray-600 border-gray-100"
                        } inline-block`}>
                            Status: {getStatusLabel(selectedRequest.status)}
                        </span>
                        <h1 className="text-3xl font-black text-gray-900 leading-tight">{selectedRequest.title}</h1>
                        <p className="text-sm text-gray-500 leading-relaxed italic whitespace-pre-wrap">"{selectedRequest.description || 'Tidak ada deskripsi tambahan.'}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Tipe</p>
                            <p className="text-xs font-bold text-gray-700">{selectedRequest.buildingType || '-'}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Budget</p>
                            <p className="text-xs font-bold text-gray-700">Rp {Number(selectedRequest.estimatedBudget || 0).toLocaleString('id-ID')}</p>
                        </div>
                    </div>

                    <DesignFilesGallery designRequestId={selectedRequest.id} />

                    <div className="pt-8 border-t border-gray-100">
                        <div className="mb-4 p-4 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-between">
                            <div>
                                <p className="text-[9px] font-black text-teal-800 uppercase tracking-widest">Sisa Kuota Revisi Lokal</p>
                                <p className="text-[10px] font-bold text-teal-600 mt-0.5">3 Major / 5 Minor (Standar Kontrak RKK)</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-gray-400 uppercase">Major</p>
                                    <p className={`text-xs font-black ${selectedRequest.majorRevisionCount >= 3 ? 'text-red-600' : 'text-teal-700'}`}>{selectedRequest.majorRevisionCount || 0}/3</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-gray-400 uppercase">Minor</p>
                                    <p className={`text-xs font-black ${selectedRequest.minorRevisionCount >= 5 ? 'text-red-600' : 'text-teal-700'}`}>{selectedRequest.minorRevisionCount || 0}/5</p>
                                </div>
                            </div>
                        </div>

                        <h4 className="text-sm font-black text-gray-800 mb-6 flex items-center gap-2">
                            <FiRefreshCw className="text-teal-600" />
                            Ajukan Revisi Desain
                        </h4>
                        <DesignRevisionForm 
                            majorCount={selectedRequest.majorRevisionCount || 0}
                            minorCount={selectedRequest.minorRevisionCount || 0}
                            onSubmit={onAddRevision}
                            loading={submitting}
                        />
                    </div>

                    {/* CUSTOMER APPROVAL BUTTON */}
                    {((selectedRequest.status === 'in_review' || hasCustomerRelease) && !hasCustomerApproval) && (
                        <div className="pt-8 border-t border-gray-100">
                            <button
                                onClick={onApproveDesign}
                                disabled={submitting}
                                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <FiCheckCircle className="inline mr-2" /> Setujui Desain Lokal
                            </button>
                            <p className="text-[8px] text-gray-400 font-bold text-center mt-3 uppercase tracking-tighter italic">
                                * Gunakan tombol ini jika desain sudah sesuai keinginan.
                            </p>
                        </div>
                    )}

                    {/* POST-DESIGN DECISION PANEL */}
                    <PostDesignDecisionPanel 
                        selectedRequest={selectedRequest}
                        onPostDesignDecision={onPostDesignDecision}
                        submitting={submitting}
                    />
                </div>

                {/* RIGHT: TIMELINE */}
                <div className="lg:col-span-2">
                    <h4 className="text-sm font-black text-gray-800 mb-8 flex items-center gap-2">
                        <FiClock className="text-indigo-600" />
                        Timeline Ringkasan Desain
                    </h4>
                    <DesignTimeline
                        history={(selectedRequest.history || []).filter(log =>
                            ['submitted', 'admin_released_design_to_customer', 'revision_major', 'revision_minor', 'customer_design_feedback', 'customer_design_approved', 'customer_post_design_decision', 'approved', 'rejected'].includes(log.action)
                        )}
                        majorCount={selectedRequest.majorRevisionCount || 0}
                        minorCount={selectedRequest.minorRevisionCount || 0}
                    />
                    {(selectedRequest.history || []).filter(h => h.action === 'admin_released_design_to_customer').length === 0 && (
                        <div className="mt-8 p-8 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 text-center">
                            <FiInfo className="text-gray-300 text-4xl mx-auto mb-4" />
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                                Belum ada ringkasan desain yang dirilis oleh Admin.<br/>
                                Proses desain sedang dikerjakan secara internal oleh Arsitek.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DesignRequestDetailOverlay;
