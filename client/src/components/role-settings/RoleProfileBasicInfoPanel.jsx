import React from 'react';
import { FiUser } from "react-icons/fi";

const RoleProfileBasicInfoPanel = ({ persona, title }) => {
    return (
        <div className="dashboard-card space-y-6">
            <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                <FiUser className="text-[var(--dashboard-primary)]" size={20} />
                <h3 className="font-bold text-sm">{title || 'Informasi Dasar'}</h3>
            </div>
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <img 
                        src={persona?.avatar || "https://i.pravatar.cc/150?u=placeholder"} 
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--dashboard-primary)]/20 shadow-sm" 
                        alt="Avatar" 
                    />
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold">{persona?.name}</h4>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-medium uppercase tracking-wider">{persona?.specialization || 'Generalist'}</p>
                        <button 
                            onClick={() => alert("Fitur Unggah Foto dinonaktifkan dalam Fase Local CRUD. Gunakan URL foto lokal jika tersedia.")}
                            className="px-4 py-1.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-lg text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[var(--dashboard-border)]"
                        >
                            Ubah Foto
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">ID {title?.includes('Mandor') ? 'Mandor' : 'Pegawai'} (System)</label>
                        <input type="text" readOnly value={persona?.id || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs font-mono opacity-70 outline-none" />
                    </div>
                    {persona?.email && (
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Email</label>
                            <input type="text" readOnly value={persona?.email || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs opacity-70 outline-none" />
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Telepon</label>
                        <input type="text" readOnly value={persona?.phone || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs opacity-70 outline-none" />
                    </div>
                    {persona?.city && (
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Kota Domisili</label>
                            <input type="text" readOnly value={persona?.city || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs opacity-70 outline-none" />
                        </div>
                    )}
                    {persona?.specialization && title?.includes('Mandor') && (
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Spesialisasi</label>
                            <input type="text" readOnly value={persona?.specialization || 'Umum'} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                        </div>
                    )}
                </div>
                {persona?.bio && (
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Biografi</label>
                        <textarea readOnly value={persona?.bio || ''} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs opacity-70 outline-none h-24 resize-none" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoleProfileBasicInfoPanel;
