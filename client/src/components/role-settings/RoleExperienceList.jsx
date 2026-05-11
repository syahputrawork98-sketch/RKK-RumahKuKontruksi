import React from 'react';
import { FiBriefcase, FiPlus, FiInfo, FiEdit2, FiTrash2 } from "react-icons/fi";

const RoleExperienceList = ({ experiences, isLoading, onAdd, onEdit, onDelete, title = "Riwayat Pengalaman Manual" }) => {
    return (
        <div className="dashboard-card space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--dashboard-border)] pb-4 mt-0">
                <div className="flex items-center gap-3">
                    <FiBriefcase className="text-[var(--dashboard-primary)]" size={20} />
                    <h3 className="font-bold text-sm">{title}</h3>
                </div>
                <button 
                    onClick={onAdd}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[var(--dashboard-primary)] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[var(--dashboard-primary)]/20"
                >
                    <FiPlus size={14} />
                    TAMBAH LOCAL
                </button>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-blue-700 leading-relaxed uppercase">
                    <FiInfo className="inline mr-1" /> DATA LOKAL: Pengalaman ini diisi secara manual dan tidak terikat otomatis dengan proyek sistem.
                </p>
            </div>
            {isLoading ? (
                <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div></div>
            ) : (
                <div className="space-y-4">
                    {experiences.length > 0 ? experiences.map(exp => (
                        <div key={exp.id} className="p-5 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] flex justify-between items-start group hover:border-[var(--dashboard-primary)]/30 transition-all">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="text-sm font-bold">{exp.projectName}</h4>
                                    <span className="text-[9px] font-bold px-2 py-0.5 bg-white border border-slate-200 text-slate-400 rounded uppercase tracking-widest">Manual</span>
                                </div>
                                <p className="text-[11px] font-semibold text-[var(--dashboard-text)] mb-1">{exp.companyName || exp.location || 'Instansi / Lokasi N/A'}</p>
                                <p className="text-[10px] text-[var(--dashboard-text-soft)] font-medium">Role: {exp.role || 'Tenaga Ahli'} | {exp.startYear} - {exp.endYear || 'Sekarang'}</p>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                <button onClick={() => onEdit(exp)} className="p-1.5 text-slate-400 hover:text-[var(--dashboard-primary)] hover:bg-white rounded-lg transition-all"><FiEdit2 size={12} /></button>
                                <button onClick={() => onDelete(exp.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"><FiTrash2 size={12} /></button>
                            </div>
                        </div>
                    )) : (
                        <div className="py-12 text-center text-slate-400 text-xs italic">Belum ada data pengalaman kerja manual.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RoleExperienceList;
