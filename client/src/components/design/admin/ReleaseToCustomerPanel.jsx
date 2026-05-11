import React from 'react';
import { FiSend } from "react-icons/fi";

const ReleaseToCustomerPanel = ({ summary, onSummaryChange, onSubmit, submitting }) => {
    return (
        <div className="p-6 bg-teal-50 border border-teal-100 rounded-[2rem] space-y-4">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-teal-600 text-white rounded-lg"><FiSend size={14} /></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-teal-900">Release to Customer</h4>
            </div>
            <p className="text-[10px] text-teal-700 font-bold leading-relaxed italic">
                Berikan ringkasan progress desain yang layak dilihat oleh Konsumen. Raw architect progress akan disembunyikan.
            </p>
            <textarea
                className="w-full p-4 bg-white border border-teal-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none min-h-[100px]"
                placeholder="Tulis ringkasan untuk konsumen..."
                value={summary}
                onChange={(e) => onSummaryChange(e.target.value)}
            />
            <button
                onClick={onSubmit}
                disabled={submitting || !summary.trim()}
                className="w-full py-3 bg-teal-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-teal-600/20 disabled:opacity-50"
            >
                {submitting ? "Mengirim..." : "Rilis ke Konsumen"}
            </button>
        </div>
    );
};

export default ReleaseToCustomerPanel;
