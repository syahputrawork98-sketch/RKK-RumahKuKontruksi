// client/src/components/ui/dashboard/DashboardActivity.jsx

import React from "react";
import { FiClock } from "react-icons/fi";

export const DashboardActivity = ({ activities = [] }) => {
    const formatTime = (date) => {
        if (!date) return "-";
        const d = new Date(date);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) + ' ' + 
               d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="space-y-4">
            {activities.length > 0 ? (
                activities.map((a) => (
                    <div key={a.id} className="relative flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-white transition-all group">
                        <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                            style={{ backgroundColor: a.color || '#94A3B8' }}
                        >
                            {a.icon ? <a.icon size={18} /> : <FiClock size={18} />}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-black text-slate-800 truncate group-hover:text-[var(--dashboard-primary)] transition-colors">
                                {a.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                                {a.subtitle}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                <FiClock size={10} /> {formatTime(a.timestamp)}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Belum ada aktivitas baru</p>
                </div>
            )}
        </div>
    );
};
