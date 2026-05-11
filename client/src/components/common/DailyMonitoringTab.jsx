import React, { useState, useEffect } from 'react';
import { FiFileText, FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import dailyTaskService from '../../services/dailyTaskService';
import dailyReportService from '../../services/dailyReportService';

const DailyMonitoringTab = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDailyData = async () => {
            if (!projectId) return;
            try {
                setLoading(true);
                const [tasksRes, reportsRes] = await Promise.all([
                    dailyTaskService.getAllTasks({ projectId }),
                    dailyReportService.getAllReports({ projectId })
                ]);
                setTasks(tasksRes.data || []);
                setReports(reportsRes.data || []);
            } catch (err) {
                console.error("Error fetching daily monitoring:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDailyData();
    }, [projectId]);

    if (loading) {
        return <div className="p-8 text-center text-slate-400">Memuat data harian...</div>;
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Monitoring Harian Lapangan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tugas Harian Mandor</h4>
                    {tasks.length === 0 ? (
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center text-xs font-bold text-slate-400">
                            Tidak ada tugas harian.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {tasks.map(task => (
                                <div key={task.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h5 className="font-bold text-sm">{task.title}</h5>
                                        <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase ${task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                            {task.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 mb-2">{task.description}</p>
                                    <div className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                                        <FiClock /> Target: {new Date(task.targetDate).toLocaleDateString("id-ID")}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Laporan Harian (Logbook)</h4>
                    {reports.length === 0 ? (
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center text-xs font-bold text-slate-400">
                            Tidak ada laporan harian.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {reports.map(report => (
                                <div key={report.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h5 className="font-bold text-sm">{new Date(report.date).toLocaleDateString("id-ID")}</h5>
                                        <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase ${report.status !== 'draft' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                                            {report.status}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-slate-600 font-medium mb-1">"{report.activitySummary}"</p>
                                    <div className="text-[9px] font-bold text-slate-400 flex items-center gap-3 mt-3">
                                        <div className="flex items-center gap-1"><FiAlertCircle /> Cuaca: {report.weatherSummary}</div>
                                        <div className="flex items-center gap-1"><FiCheckCircle /> Pekerja: {report.workerCount}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyMonitoringTab;
