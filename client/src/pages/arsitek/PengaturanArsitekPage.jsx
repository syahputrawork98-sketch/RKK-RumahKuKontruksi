import React from "react";
import { FiUser, FiMonitor, FiLock, FiInfo, FiPieChart } from "react-icons/fi";

const PengaturanArsitekPage = () => {
    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Pengaturan</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Kelola profil arsitek dan preferensi sistem Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="dashboard-card space-y-6">
                    <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                        <FiUser className="text-[var(--dashboard-primary)]" size={20} />
                        <h3 className="font-bold text-sm">Profil Arsitek</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <img src="https://placehold.co/200x200" className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--dashboard-primary)]/20" alt="Avatar" />
                            <button className="px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[var(--dashboard-border)]">Ubah Foto</button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Nama Lengkap</label>
                                <input type="text" readOnly value="Arsitek Senior RKK" className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Email Professional</label>
                                <input type="text" readOnly value="arsitek.senior@rkk.co.id" className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-70 outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                            <FiPieChart className="text-[var(--dashboard-primary)]" size={20} />
                            <h3 className="font-bold text-sm">Kapasitas & Beban Kerja</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)]">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Desain Aktif</span>
                                    <span className="text-xs font-black">6 / 8 Slot</span>
                                </div>
                                <div className="w-full h-2 bg-[var(--dashboard-border)] rounded-full overflow-hidden">
                                    <div className="h-full bg-[var(--dashboard-primary)]" style={{ width: "75%" }} />
                                </div>
                                <p className="text-[9px] text-[var(--dashboard-text-soft)] font-medium mt-2 leading-relaxed">
                                    Sistem membatasi maksimal 8 permintaan desain aktif secara bersamaan untuk menjaga kualitas output.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                            <FiMonitor className="text-[var(--dashboard-primary)]" size={20} />
                            <h3 className="font-bold text-sm">Preferensi Tampilan</h3>
                        </div>
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
                            <FiInfo className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[10px] font-medium text-amber-700 leading-relaxed">
                                Tema (Light/Dark Mode) disinkronkan secara global. Perubahan akan mempengaruhi seluruh antarmuka dashboard Arsitek.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card md:col-span-2 border-dashed border-2 border-[var(--dashboard-border)] bg-transparent">
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-500">
                            <FiLock size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--dashboard-text)]">Keamanan & Akses</h4>
                            <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 max-w-md mx-auto">
                                Manajemen kata sandi dan sesi saat ini dinonaktifkan dalam tahap **Mock-First Development**. Autentikasi akan diimplementasikan pada fase berikutnya.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PengaturanArsitekPage;
