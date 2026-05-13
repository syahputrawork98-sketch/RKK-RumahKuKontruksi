import React, { useState, useEffect } from 'react';
import { 
    FiFileText, FiClock, FiAlertCircle, FiCheckCircle, 
    FiUsers, FiCloud, FiActivity, FiX, FiInfo, FiCamera,
    FiChevronRight, FiMapPin, FiUser
} from 'react-icons/fi';
import { useSupervisorPersona } from '../../context/SupervisorPersonaContext';
import dailyTaskService from '../../services/dailyTaskService';
import dailyReportService from '../../services/dailyReportService';

const DailyMonitoringTab = ({ projectId }) => {
    const { selectedSupervisorId } = useSupervisorPersona();
    const [tasks, setTasks] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [reviewNote, setReviewNote] = useState("");

    const openReportDetail = (report) => {
        setSelectedReport(report);
        setReviewNote(report.supervisorNote || "");
        setIsModalOpen(true);
    };

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

    const handleReview = async (status) => {
        if (!reviewNote && status === 'rejected') {
            alert("Harap isi catatan jika menolak laporan.");
            return;
        }
        
        try {
            setIsActionLoading(true);
            const response = await dailyReportService.reviewReport(selectedReport.id, {
                supervisorId: selectedSupervisorId,
                status: status === 'approved' ? 'reviewed' : 'rejected',
                note: reviewNote
            });
            
            if (response.success) {
                // Update local state
                setReports(reports.map(r => r.id === selectedReport.id ? response.data : r));
                setSelectedReport(response.data);
                setReviewNote("");
                alert("Laporan berhasil direview.");
            }
        } catch (err) {
            alert("Gagal mereview laporan: " + err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mensinkronisasi Logbook Harian...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header with Disclaimer */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Monitoring Operasional Harian</h3>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-[8px] font-black uppercase tracking-widest">Supervisor View</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase italic">Logbook aktivitas & penugasan mandor di lapangan.</p>
                </div>
                 <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-100">
                        <FiInfo className="shrink-0" />
                        <p className="text-[9px] font-black uppercase tracking-tighter leading-none">
                            Monitoring Operasional: Tidak mengubah Progres SOT
                        </p>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter italic">* Progres resmi hanya diubah melalui menu Verifikasi Progres</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* DAILY TASKS SECTION */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <FiActivity className="text-blue-500" /> Tugas Harian Mandor
                        </h4>
                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{tasks.length} Items</span>
                    </div>
                    {tasks.length === 0 ? (
                        <div className="p-12 bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-center">
                            <FiActivity size={32} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Belum ada penugasan harian.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {tasks.map(task => (
                                <div key={task.id} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="space-y-1">
                                            <h5 className="font-black text-sm text-slate-800 uppercase tracking-tight group-hover:text-[var(--dashboard-primary)] transition-colors">{task.title}</h5>
                                            {task.projectStage && (
                                                <span className="inline-block px-2 py-0.5 bg-slate-100 text-[8px] font-black uppercase rounded text-slate-500 tracking-tighter">
                                                    Stage: {task.projectStage.title}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`text-[8px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest ${
                                            task.status === 'completed' 
                                            ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' 
                                            : 'bg-amber-100 text-amber-600 border border-amber-200 animate-pulse'
                                        }`}>
                                            {task.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed mb-4">
                                        {task.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase">
                                            <FiClock className="text-blue-400" /> 
                                            Target: {new Date(task.targetDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
                                        </div>
                                        {task.completedAt && (
                                            <div className="text-[9px] font-black text-emerald-500 flex items-center gap-1 uppercase">
                                                <FiCheckCircle /> Selesai: {new Date(task.completedAt).toLocaleDateString("id-ID")}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* DAILY REPORTS SECTION */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <FiFileText className="text-emerald-500" /> Laporan Harian (Logbook)
                        </h4>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{reports.length} Reports</span>
                    </div>
                    {reports.length === 0 ? (
                        <div className="p-12 bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-center">
                            <FiFileText size={32} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Belum ada laporan harian masuk.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {reports.map(report => (
                                <button 
                                    key={report.id} 
                                    onClick={() => openReportDetail(report)}
                                    className="w-full text-left p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-emerald-200 hover:shadow-md transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-all"></div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100">
                                                <span className="text-[8px] font-black text-slate-400 uppercase leading-none">{new Date(report.date).toLocaleDateString("id-ID", { month: 'short' })}</span>
                                                <span className="text-sm font-black text-slate-800 leading-none mt-0.5">{new Date(report.date).getDate()}</span>
                                            </div>
                                            <div>
                                                <h5 className="font-black text-xs text-slate-800 uppercase tracking-tight">Laporan Harian</h5>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase">{new Date(report.date).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest border ${
                                            report.status === 'submitted' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                            report.status === 'reviewed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            report.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                            'bg-slate-50 text-slate-400 border-slate-200'
                                        }`}>
                                            {report.status}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 font-bold italic leading-relaxed mb-4 line-clamp-2">
                                        "{report.activitySummary}"
                                    </p>
                                    <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase">
                                            <FiUsers className="text-blue-400" /> {report.workerCount} Pekerja
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase">
                                            <FiCloud className="text-amber-400" /> {report.weatherSummary}
                                        </div>
                                        {report.blockerSummary && (
                                            <div className="flex items-center gap-1.5 text-[9px] font-black text-red-500 uppercase ml-auto">
                                                <FiAlertCircle /> Ada Kendala
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* REPORT DETAIL MODAL */}
            {isModalOpen && selectedReport && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-slideUp border border-slate-100 flex flex-col max-h-[90vh]">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-linear-to-r from-white to-slate-50/50 flex-shrink-0">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{new Date(selectedReport.date).toLocaleDateString("id-ID", { month: 'short' })}</span>
                                    <span className="text-2xl font-black">{new Date(selectedReport.date).getDate()}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-xl font-black tracking-tight text-slate-800">Detail Laporan Harian</h3>
                                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                            selectedReport.status === 'submitted' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                            selectedReport.status === 'reviewed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            selectedReport.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                            'bg-slate-50 text-slate-400 border-slate-200'
                                        }`}>
                                            {selectedReport.status}
                                        </span>
                                    </div>
                                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <FiClock /> {new Date(selectedReport.date).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 w-fit">
                                        <span className="text-[9px] font-black uppercase tracking-widest italic">Tipe: Klaim Progres Mandor (Opsional)</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="p-3 hover:bg-slate-100 rounded-2xl transition-all group"
                            >
                                <FiX size={24} className="text-slate-400 group-hover:text-slate-600" />
                            </button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto space-y-8 flex-grow custom-scrollbar">
                            {/* Summary Card */}
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                                    <FiFileText /> Ringkasan Aktivitas
                                </h4>
                                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 relative">
                                    <div className="absolute top-4 right-4 opacity-5">
                                        <FiFileText size={40} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                                        "{selectedReport.activitySummary}"
                                    </p>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-md">
                                        <FiUsers size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Tenaga Kerja</p>
                                        <p className="text-sm font-black text-blue-900">{selectedReport.workerCount} Orang Pekerja</p>
                                    </div>
                                </div>
                                <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-md">
                                        <FiCloud size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-tighter">Kondisi Cuaca</p>
                                        <p className="text-sm font-black text-amber-900">Cuaca: {selectedReport.weatherSummary}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Blockers */}
                            {selectedReport.blockerSummary && (
                                <div className="space-y-3">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
                                        <FiAlertCircle /> Kendala Lapangan
                                    </h4>
                                    <div className="p-5 bg-red-50 rounded-2xl border border-red-100 flex gap-4">
                                        <FiAlertCircle className="text-red-500 shrink-0 mt-1" />
                                        <p className="text-xs font-bold text-red-700 leading-relaxed italic">
                                            "{selectedReport.blockerSummary}"
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Documentation Placeholder */}
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                    <FiCamera /> Dokumentasi Foto
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                                        <FiCamera size={24} className="mb-2 opacity-30" />
                                        <span className="text-[8px] font-black uppercase tracking-widest opacity-50">No Image</span>
                                    </div>
                                    <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                                        <FiCamera size={24} className="mb-2 opacity-30" />
                                        <span className="text-[8px] font-black uppercase tracking-widest opacity-50">No Image</span>
                                    </div>
                                </div>
                            </div>

                            {/* Review Form / History */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                {selectedReport.status === 'submitted' && selectedSupervisorId ? (
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 flex items-center gap-2">
                                            <FiActivity /> Review Supervisor
                                        </h4>
                                        <textarea 
                                            value={reviewNote}
                                            onChange={(e) => setReviewNote(e.target.value)}
                                            placeholder="Tambahkan catatan atau instruksi perbaikan (opsional untuk Approve, wajib untuk Reject)..."
                                            className="w-full p-5 rounded-2xl bg-indigo-50/30 border border-indigo-100 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:outline-none min-h-[100px] transition-all"
                                        />
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => handleReview('approved')}
                                                disabled={isActionLoading}
                                                className="flex-1 py-3.5 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                            >
                                                Review & Tandai Selesai
                                            </button>
                                            <button 
                                                onClick={() => handleReview('rejected')}
                                                disabled={isActionLoading}
                                                className="flex-1 py-3.5 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                            >
                                                Minta Revisi Laporan
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    (selectedReport.supervisorNote || selectedReport.status === 'submitted') && (
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 flex items-center gap-2">
                                                <FiActivity /> {selectedReport.status === 'submitted' ? 'Status: Menunggu Review' : 'Catatan Review'}
                                            </h4>
                                            {selectedReport.supervisorNote ? (
                                                <div className="p-5 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
                                                    <p className="text-xs font-bold text-indigo-900 leading-relaxed italic">
                                                        "{selectedReport.supervisorNote}"
                                                    </p>
                                                    <div className="mt-3 pt-3 border-t border-indigo-100 flex items-center gap-2 text-[9px] font-black text-indigo-400 uppercase">
                                                        <FiUser /> {selectedReport.supervisor?.name || 'Supervisor'} • {selectedReport.reviewedAt ? new Date(selectedReport.reviewedAt).toLocaleString("id-ID") : '-'}
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-[10px] font-bold text-slate-400 italic">Belum ada catatan review dari Supervisor.</p>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex-shrink-0">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-black text-xs border-2 border-white shadow-sm">
                                        {selectedReport.foreman?.name?.charAt(0) || 'M'}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pelapor (Mandor)</p>
                                        <p className="text-xs font-bold text-slate-700">{selectedReport.foreman?.name || 'Hasan Basri'}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full md:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-sm"
                                >
                                    Tutup Detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyMonitoringTab;
