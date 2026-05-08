// client/src/components/ui/dashboard/DashboardActivity.jsx

import React from "react";

export const DashboardActivity = ({ activities }) => (
    <div className="dashboard-card">
        <h2 className="dashboard-title !text-lg mb-6">Aktivitas Terbaru</h2>

        <div className="relative pl-6">
            <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-[var(--dashboard-border-soft)]" />

            <div className="space-y-8">
                {activities.length > 0 ? (
                    activities.map((a) => (
                        <div key={a.id} className="relative flex items-start gap-4">
                            <div className="absolute -left-5 w-4 h-4 bg-[var(--dashboard-primary)] rounded-full border-4 border-[var(--dashboard-surface)] shadow-sm z-10"></div>
    
                            <div className="flex-1">
                                <p className="text-sm font-bold text-[var(--dashboard-text)] leading-snug">{a.text}</p>
                                <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-wider mt-1">{a.time}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-4 text-center">
                        <p className="text-xs font-bold text-[var(--dashboard-text-muted)] italic">Belum ada aktivitas terbaru dari database.</p>
                    </div>
                )}
            </div>
        </div>

        <button className="w-full mt-8 py-3 text-xs font-bold text-[var(--dashboard-text-muted)] hover:text-[var(--dashboard-primary)] transition-colors border-t border-[var(--dashboard-border-soft)]">
            Lihat Semua Aktivitas
        </button>
    </div>
);
