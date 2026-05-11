import React from 'react';
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { getProjectBridgeReadiness } from "../../../utils/designRequestHistory";

const AdminControlsPanel = ({ 
    request, 
    onUpdateStatus, 
    onOpenConvert, 
    onOpenForm,
    submitting 
}) => {
    const readiness = getProjectBridgeReadiness(request);

    return (
        <div className="pt-8 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-800 mb-6 flex items-center gap-2">
                <FiCheckCircle className="text-emerald-600" />
                Admin Controls
            </h4>
            <div className="grid grid-cols-1 gap-3">
                {request.status === 'submitted' && (
                    <button
                        onClick={() => onUpdateStatus(request.id, 'open')}
                        disabled={submitting}
                        className="w-full py-3 bg-teal-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-teal-600/20 disabled:opacity-50"
                    >
                        {submitting ? "Publishing..." : "Publish to Tender"}
                    </button>
                )}
                {(request.status === 'assigned' || request.status === 'in_review') && (
                    <button
                        onClick={() => onUpdateStatus(request.id, 'approved')}
                        disabled={submitting}
                        className="w-full py-3 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                    >
                        {submitting ? "Approving..." : "Approve Design"}
                    </button>
                )}
                {request.status === 'approved' && !request.projectId && (
                    <div className="space-y-3">
                        {!readiness.isReady && (
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl space-y-2">
                                <div className="flex items-center gap-2 text-amber-700">
                                    <FiAlertCircle size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Bridge Eligibility Check</span>
                                </div>
                                <div className="space-y-1">
                                    {readiness.reasons.map((reason, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-[10px] text-amber-600 font-medium">
                                            <span className="mt-1.5 w-1 h-1 bg-amber-400 rounded-full shrink-0" />
                                            <span>{reason}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => onOpenConvert(request)}
                            disabled={submitting || !readiness.isReady}
                            className={`w-full py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                readiness.isReady
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:scale-[1.01]'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {submitting ? "Processing..." : "Convert to Project"}
                        </button>
                    </div>
                )}
                {request.projectId && (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center gap-2 text-emerald-600">
                        <FiCheckCircle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Project Draft Created</span>
                    </div>
                )}
                <button
                    onClick={() => onOpenForm(request)}
                    disabled={submitting}
                    className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                    Edit Brief Detail
                </button>
            </div>
        </div>
    );
};

export default AdminControlsPanel;
