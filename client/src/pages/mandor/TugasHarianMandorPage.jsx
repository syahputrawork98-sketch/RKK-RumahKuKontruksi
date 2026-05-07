import React, { useState } from "react";
import { FiCheckCircle, FiClock, FiAlertCircle, FiChevronRight } from "react-icons/fi";

const TugasHarianMandorPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("today");

    const tasks = [
        { id: 1, project: "PRJ-001", task: "Pemasangan Keramik Kamar Mandi Utama", priority: "high", status: "unfinished", deadline: "16:00 WIB" },
        { id: 2, project: "PRJ-001", task: "Instalasi Pipa Air Buangan", priority: "medium", status: "done", deadline: "12:00 WIB" },
        { id: 3, project: "PRJ-002", task: "Pengecoran Sloof Depan", priority: "high", status: "unfinished", deadline: "17:00 WIB" },
        { id: 4, project: "PRJ-002", task: "Persiapan Galian Pagar", priority: "low", status: "unfinished", deadline: "15:00 WIB" },
    ];

    const subtabs = [
        { id: "today", label: "Hari Ini" },
        { id: "unfinished", label: "Belum Selesai" },
        { id: "done", label: "Selesai" },
        { id: "riwayat", label: "Riwayat" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Tugas Harian</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Daftar pekerjaan teknis yang harus diselesaikan oleh tim hari ini.</p>
            </div>

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {subtabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubtab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            activeSubtab === tab.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {tasks.map((task) => (
                    <div key={task.id} className="dashboard-card group">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1 flex gap-4">
                                <div className={`w-1 rounded-full ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-blue-500" : "bg-slate-300"}`} />
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{task.project}</span>
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                            task.priority === "high" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                                        }`}>
                                            {task.priority} Priority
                                        </span>
                                    </div>
                                    <h4 className="text-base font-bold">{task.task}</h4>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">
                                        <div className="flex items-center gap-1">
                                            <FiClock /> Target: {task.deadline}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FiAlertCircle /> Status: {task.status === "done" ? "SELESAI" : "PENDING"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-48 flex items-center gap-2">
                                {task.status !== "done" ? (
                                    <button className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                        <FiCheckCircle /> Selesai
                                    </button>
                                ) : (
                                    <div className="flex-1 py-2.5 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 flex items-center justify-center gap-2 cursor-not-allowed">
                                        <FiCheckCircle /> Sudah Selesai
                                    </div>
                                )}
                                <button className="p-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[var(--dashboard-text-soft)] hover:bg-[var(--dashboard-border)]">
                                    <FiChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TugasHarianMandorPage;
