import React from 'react';
import { FiCheckCircle } from "react-icons/fi";

const AdminControlsPanel = ({ 
    request, 
    onUpdateStatus, 
    onOpenConvert, 
    onOpenForm,
    submitting 
}) => {
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
                        className="w-full py-3 bg-teal-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-teal-600/20"
                    >
                        Publish to Tender
                    </button>
                )}
                {(request.status === 'assigned' || request.status === 'in_review') && (
                    <button
                        onClick={() => onUpdateStatus(request.id, 'approved')}
                        className="w-full py-3 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-600/20"
                    >
                        Approve Design
                    </button>
                )}
                {request.status === 'approved' && !request.projectId && (
                    <button
                        onClick={() => onOpenConvert(request)}
                        className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-600/20"
                    >
                        Convert to Project
                    </button>
                )}
                <button
                    onClick={() => onOpenForm(request)}
                    className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                    Edit Brief Detail
                </button>
            </div>
        </div>
    );
};

export default AdminControlsPanel;
