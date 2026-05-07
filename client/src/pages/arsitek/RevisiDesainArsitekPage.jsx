import React from "react";
import { FiRepeat, FiClock, FiAlertCircle } from "react-icons/fi";

const RevisiDesainArsitekPage = () => {
    const revisions = [
        { id: 1, request: "DR-003", customer: "PT. Global Jaya", note: "Ubah layout ruang meeting agar lebih luas, kurangi area pantry.", priority: "High", deadline: "08 Mei 2026", status: "In Progress" },
        { id: 2, request: "DR-001", customer: "Ibu Maria", note: "Warna facade diganti ke tone earth color.", priority: "Medium", deadline: "15 Mei 2026", status: "Waiting" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Revisi Desain</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Daftar permintaan revisi desain dari customer atau admin.</p>
            </div>

            <div className="space-y-4">
                {revisions.map((rev) => (
                    <div key={rev.id} className="dashboard-card border-l-4 border-red-500">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{rev.request}</span>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                        rev.priority === "High" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                                    }`}>
                                        {rev.priority} Priority
                                    </span>
                                </div>
                                <h4 className="text-sm font-bold text-[var(--dashboard-text)]">Customer: {rev.customer}</h4>
                                <div className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)] flex gap-3">
                                    <FiAlertCircle className="text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-xs font-medium leading-relaxed italic">"{rev.note}"</p>
                                </div>
                            </div>
                            <div className="md:w-48 space-y-4 flex flex-col justify-between">
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Batas Waktu</span>
                                    <div className="flex items-center gap-2 text-xs font-black text-red-500">
                                        <FiClock />
                                        {rev.deadline}
                                    </div>
                                </div>
                                <button className="w-full py-2 bg-[var(--dashboard-primary)] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">
                                    Upload Revisi
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RevisiDesainArsitekPage;
