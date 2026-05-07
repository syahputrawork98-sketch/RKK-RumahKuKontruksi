import React from "react";
import { FiUser, FiMonitor, FiUsers, FiInfo, FiLayers } from "react-icons/fi";

const PengaturanMandorPage = () => {
    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Pengaturan</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Kelola profil mandor dan preferensi antarmuka lapangan Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="dashboard-card space-y-6">
                    <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                        <FiUser className="text-[var(--dashboard-primary)]" size={20} />
                        <h3 className="font-bold text-sm">Profil Mandor</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <img src="https://placehold.co/200x200" className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--dashboard-primary)]/20" alt="Avatar" />
                            <button className="px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[var(--dashboard-border)]">Ubah Foto</button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Nama Lengkap</label>
                                <input type="text" readOnly value="Mandor Lapangan RKK" className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">ID Mandor</label>
                                <input type="text" readOnly value="MDR-FLD-015" className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                            <FiUsers className="text-[var(--dashboard-primary)]" size={20} />
                            <h3 className="font-bold text-sm">Tim Binaan</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <span className="text-xs font-bold text-[var(--dashboard-text)]">Total Pekerja Terdaftar</span>
                                <span className="text-sm font-black text-[var(--dashboard-primary)]">15 Orang</span>
                            </div>
                            <p className="text-[9px] text-[var(--dashboard-text-soft)] font-medium leading-relaxed italic">
                                Data tukang dikelola secara mandiri oleh Mandor. Sistem hanya memantau ringkasan jumlah dan kehadiran di proyek.
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-card space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                            <FiMonitor className="text-[var(--dashboard-primary)]" size={20} />
                            <h3 className="font-bold text-sm">Akses Lapangan</h3>
                        </div>
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
                            <FiInfo className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[10px] font-medium text-amber-700 leading-relaxed">
                                Fitur sinkronisasi offline sedang dalam pengembangan untuk mempermudah pelaporan di area dengan sinyal lemah.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PengaturanMandorPage;
