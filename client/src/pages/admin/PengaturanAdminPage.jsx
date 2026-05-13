import React from "react";
import { FiUser, FiMonitor, FiInfo, FiLock } from "react-icons/fi";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";
import GovernanceNotice from "../../components/common/GovernanceNotice";

const PengaturanAdminPage = () => {
    const { selectedAdminId, selectedAdmin } = useAdminPersona();

    if (!selectedAdminId) {
        return <RoleDataState type="empty" message="Silakan pilih Admin persona di Topbar." />;
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Pengaturan</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Kelola profil dan preferensi dashboard Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="dashboard-card space-y-6">
                    <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                        <FiUser className="text-[var(--dashboard-primary)]" size={20} />
                        <h3 className="font-bold text-sm">Profil Admin</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 border-2 border-indigo-100 shadow-sm font-black text-xl">
                                {selectedAdmin?.name?.charAt(0) || "A"}
                            </div>
                            <button 
                                onClick={() => alert("Fitur Unggah Foto dinonaktifkan dalam Fase Local CRUD. Gunakan URL foto lokal jika tersedia.")}
                                className="px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-surface)] transition-colors"
                            >
                                Ubah Foto
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Nama Lengkap</label>
                                <input type="text" readOnly value={selectedAdmin?.name || ""} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-bold opacity-70" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Email</label>
                                <input type="text" readOnly value={selectedAdmin?.email || ""} className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-bold opacity-70" />
                            </div>
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
                            Tema (Light/Dark Mode) saat ini dikelola secara global melalui Topbar. Pilihan Anda akan tersimpan di penyimpanan lokal browser.
                        </p>
                    </div>

                    <GovernanceNotice roleName="Admin" />
                </div>

                <div className="dashboard-card md:col-span-2 border-dashed border-2 border-[var(--dashboard-border)] bg-transparent">
                    <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-500">
                            <FiLock size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest">Keamanan & Autentikasi</h4>
                            <p className="text-xs text-[var(--dashboard-text-soft)] mt-1">
                                Fitur penggantian password dan manajemen sesi dinonaktifkan dalam **Fase Local CRUD**. Gunakan persona switcher untuk simulasi role.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PengaturanAdminPage;
