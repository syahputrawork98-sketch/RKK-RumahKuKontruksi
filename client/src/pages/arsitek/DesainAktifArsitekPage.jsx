import React from "react";
import { FiEdit3, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const DesainAktifArsitekPage = () => {
    const activeDesigns = [
        { id: "DR-005", customer: "Ibu Siti Aminah", type: "Rumah Minimalis", progress: 20, deadline: "12 Mei 2026", status: "Brief" },
        { id: "DR-004", customer: "Bpk. Heru", type: "Ruko 3 Lantai", progress: 45, deadline: "10 Mei 2026", status: "Konsep 2D" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Desain Aktif</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Daftar desain yang sedang dalam proses pengerjaan intensif.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeDesigns.map((design) => (
                    <div key={design.id} className="dashboard-card group hover:border-[var(--dashboard-primary)] transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{design.id}</span>
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase rounded-full">{design.status}</span>
                        </div>
                        <h3 className="text-sm font-bold truncate">{design.customer}</h3>
                        <p className="text-[10px] text-[var(--dashboard-text-soft)] uppercase font-bold tracking-tighter mb-6">{design.type}</p>
                        
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-[10px] font-black uppercase">
                                <span>Progress</span>
                                <span>{design.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--dashboard-primary)] group-hover:bg-emerald-500 transition-all duration-500" style={{ width: `${design.progress}%` }} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[var(--dashboard-border)]">
                            <div className="flex flex-col">
                                <span className="text-[9px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-tighter">Deadline</span>
                                <span className="text-[10px] font-black text-red-500">{design.deadline}</span>
                            </div>
                            <Link 
                                to={`/arsitek/permintaan-desain/${design.id}`}
                                className="p-2 bg-[var(--dashboard-surface-soft)] rounded-lg hover:bg-[var(--dashboard-primary)] hover:text-white transition-all"
                            >
                                <FiChevronRight />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DesainAktifArsitekPage;
