import React from 'react';
import { FiAward, FiPlus, FiInfo, FiEdit2, FiTrash2 } from "react-icons/fi";

const RoleCertificateList = ({ certificates, isLoading, onAdd, onEdit, onDelete }) => {
    return (
        <div className="dashboard-card space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--dashboard-border)] pb-4">
                <div className="flex items-center gap-3">
                    <FiAward className="text-[var(--dashboard-primary)]" size={20} />
                    <h3 className="font-bold text-sm">Sertifikasi & Lisensi</h3>
                </div>
                <button 
                    onClick={onAdd}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[var(--dashboard-primary)] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[var(--dashboard-primary)]/20"
                >
                    <FiPlus size={14} />
                    TAMBAH LOCAL
                </button>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-6">
                <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase">
                    <FiInfo className="inline mr-1" /> DATA LOKAL: Sertifikat ini belum diverifikasi resmi oleh admin & tidak menjadi rating marketplace.
                </p>
            </div>
            {isLoading ? (
                <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.length > 0 ? certificates.map(cert => (
                        <div key={cert.id} className="p-5 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] group hover:border-[var(--dashboard-primary)]/30 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-sm font-bold">{cert.title}</h4>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                    <button onClick={() => onEdit(cert)} className="p-1.5 text-slate-400 hover:text-[var(--dashboard-primary)] hover:bg-white rounded-lg transition-all"><FiEdit2 size={12} /></button>
                                    <button onClick={() => onDelete(cert.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"><FiTrash2 size={12} /></button>
                                </div>
                            </div>
                            <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold mb-2 uppercase tracking-widest">{cert.issuer || 'Penerbit N/A'}</p>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--dashboard-border)]/50">
                                <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-widest italic">Belum Diverifikasi</span>
                                {cert.category && <span className="text-[9px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter">{cert.category}</span>}
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-2 py-12 text-center text-slate-400 text-xs italic">Belum ada data sertifikasi lokal.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RoleCertificateList;
