import React from 'react';
import { FiAlertCircle } from "react-icons/fi";
import { Modal } from "./RabUIAtoms";

const ConfirmActionModal = ({ 
    show, 
    title, 
    message, 
    onClose, 
    onConfirm, 
    submitting, 
    formError 
}) => {
    if (!show) return null;

    return (
        <Modal title={title} onClose={() => !submitting && onClose()}>
            <div className="space-y-6">
                {formError && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black text-red-600 uppercase flex items-center gap-2 animate-shake">
                        <FiAlertCircle /> {formError}
                    </div>
                )}
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{message}</p>
                <div className="flex gap-3">
                    <button 
                        onClick={onClose}
                        disabled={submitting}
                        className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={onConfirm}
                        disabled={submitting}
                        className="flex-1 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                    >
                        {submitting ? "Memproses..." : "Ya, Lanjutkan"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmActionModal;
