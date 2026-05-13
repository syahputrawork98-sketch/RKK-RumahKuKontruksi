import React from "react";
import { FiClock, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminPlaceholderPage = ({ title, description, badge = "Postponed" }) => {
    const navigate = useNavigate();

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                >
                    <FiArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] italic">Modul ini dalam antrian pengembangan fase local development.</p>
                </div>
            </div>

            <div className="dashboard-card flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-[var(--dashboard-primary-soft)] text-[var(--dashboard-primary)] rounded-3xl flex items-center justify-center shadow-inner">
                    <FiClock size={40} />
                </div>
                
                <div className="max-w-md space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <span className="px-3 py-1 bg-neutral-500/10 text-neutral-500 text-[10px] font-black uppercase rounded-full border border-neutral-500/20">
                            Non-Scope
                        </span>
                        <span className="px-3 py-1 bg-[var(--dashboard-primary-soft)] text-[var(--dashboard-primary)] text-[10px] font-black uppercase rounded-full border border-[var(--dashboard-primary)]/10">
                            Local Development Scope
                        </span>
                    </div>
                    <h3 className="text-xl font-bold">Akses Terbatas pada Simulasi</h3>
                    <p className="text-sm text-[var(--dashboard-text-soft)] leading-relaxed">
                        {description || "Halaman ini berkaitan dengan fitur lanjutan yang memerlukan integrasi layanan eksternal. Di fase pengembangan lokal ini, fokus dialokasikan pada pemantauan operasional inti."}
                    </p>
                </div>

                <div className="flex items-center gap-3 pt-4">
                    <button 
                        onClick={() => navigate("/admin/dashboard")}
                        className="px-6 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-bold shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                    >
                        Kembali ke Dashboard
                    </button>
                    <button 
                        onClick={() => navigate("/admin/proyek")}
                        className="px-6 py-2.5 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text)] rounded-xl text-xs font-bold border border-[var(--dashboard-border)] hover:bg-[var(--dashboard-border)] transition-all"
                    >
                        Lihat Daftar Proyek
                    </button>
                </div>

                <div className="pt-8 border-t border-[var(--dashboard-border)] w-full max-w-sm flex items-start gap-3 text-left">
                    <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-[var(--dashboard-text-soft)] leading-relaxed italic">
                        <strong>Catatan Dev:</strong> Workflow operasional (Laporan, Material, Pembayaran) bergantung pada desain final modul Project & RAB.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminPlaceholderPage;
