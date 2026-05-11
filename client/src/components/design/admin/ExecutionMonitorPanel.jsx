import React from 'react';
import { FiActivity } from "react-icons/fi";

const ExecutionMonitorPanel = ({ history, status, architectId }) => {
    return (
        <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-4">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-600 text-white rounded-lg"><FiActivity size={14} /></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Execution Monitor</h4>
            </div>
            <div className="space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Latest Progress Update</p>
                    {(() => {
                        const updates = (history || []).filter(h => h.action === 'architect_progress_update');
                        if (updates.length === 0) return <p className="text-[10px] text-slate-400 italic">Belum ada progress update tercatat.</p>;

                        const latest = updates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
                        return (
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-slate-700 line-clamp-2 italic">"{latest.note}"</p>
                                <p className="text-[9px] text-emerald-600 font-bold">
                                    Update: {new Date(latest.createdAt).toLocaleString('id-ID')}
                                </p>
                            </div>
                        );
                    })()}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-xs font-bold text-slate-700 capitalize">{status?.replace('_', ' ')}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Assignee</p>
                        <p className="text-xs font-bold text-slate-700">{architectId ? "Mitra Arsitek" : "Not Assigned"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExecutionMonitorPanel;
