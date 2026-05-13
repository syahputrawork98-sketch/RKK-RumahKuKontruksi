import React from 'react';
import { FiX, FiSave } from "react-icons/fi";

export const Modal = ({ title, children, onClose, wide }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
        <div className={`bg-white w-full ${wide ? 'max-w-2xl' : 'max-w-md'} rounded-[2rem] shadow-2xl overflow-hidden border border-[var(--dashboard-border)] transition-all`}>
            <div className="p-6 border-b border-[var(--dashboard-border)] flex justify-between items-center bg-[var(--dashboard-surface-soft)]">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all shadow-sm"><FiX /></button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

export const Input = ({ label, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-1">{label}</label>
        <input {...props} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 transition-all font-bold disabled:opacity-50" />
    </div>
);

export const TextArea = ({ label, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-1">{label}</label>
        <textarea {...props} rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 transition-all font-bold disabled:opacity-50" />
    </div>
);

export const SubmitButton = ({ label, ...props }) => (
    <button type="submit" {...props} className="w-full py-4 bg-[var(--dashboard-primary)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
        <FiSave /> {label}
    </button>
);
