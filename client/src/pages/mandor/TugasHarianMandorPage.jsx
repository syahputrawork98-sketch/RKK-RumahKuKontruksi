import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiClock, FiAlertCircle, FiChevronRight, FiInfo } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import dailyTaskService from "../../services/dailyTaskService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const TugasHarianMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [activeSubtab, setActiveSubtab] = useState("todo");
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedForemanId) {
            setLoading(false);
            return;
        }
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const data = await dailyTaskService.getAllTasks({ foremanId: selectedForemanId });
                setTasks(data.data || []);
            } catch (err) {
                setError(err.message || "Gagal memuat data tugas harian");
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [selectedForemanId]);

    const handleMarkDone = async (id) => {
        try {
            await dailyTaskService.updateTaskStatus(id, "completed");
            setTasks(tasks.map(task => task.id === id ? { ...task, status: "completed" } : task));
        } catch (err) {
            alert("Gagal memperbarui status tugas: " + err.message);
        }
    };

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Mandor"
                description="Pilih mandor untuk melihat daftar tugas harian."
            />
        );
    }

    if (loading && tasks.length === 0 && !error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return <RoleDataState type="error" title={error} onRetry={() => window.location.reload()} />;
    }

    const filteredTasks = tasks.filter(task => {
        if (activeSubtab === "todo") return task.status === "todo" || task.status === "in_progress";
        if (activeSubtab === "completed") return task.status === "completed";
        if (activeSubtab === "delayed") return task.status === "delayed";
        return true;
    });

    const subtabs = [
        { id: "todo", label: "Belum Selesai" },
        { id: "completed", label: "Selesai" },
        { id: "delayed", label: "Tertunda" }
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
                {filteredTasks.length === 0 ? (
                    <RoleDataState type="empty" title="Tidak ada tugas" description="Tidak ada tugas harian dengan status ini." />
                ) : filteredTasks.map((task) => (
                    <div key={task.id} className="dashboard-card group">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1 flex gap-4">
                                <div className={`w-1 rounded-full ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-blue-500" : "bg-slate-300"}`} />
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                         <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">
                                             {task.project?.projectCode ? `${task.project.projectCode} — ${task.project.name}` : task.projectId}
                                         </span>
                                         <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                             task.priority === "high" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                                         }`}>
                                             {task.priority} Priority
                                         </span>
                                     </div>
                                     <h4 className="text-base font-bold">{task.title}</h4>
                                     <div className="flex items-center gap-4 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">
                                         <div className="flex items-center gap-1">
                                             <FiClock /> Target: {new Date(task.targetDate).toLocaleDateString("id-ID")}
                                         </div>
                                         <div className="flex items-center gap-1">
                                             <FiAlertCircle /> Status: {task.status.replace('_', ' ').toUpperCase()}
                                         </div>
                                     </div>
                                 </div>
                             </div>
                                 <div className="md:w-56 flex items-center gap-2">
                                     {task.status !== "completed" ? (
                                         <button 
                                             onClick={() => handleMarkDone(task.id)} 
                                             className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                         >
                                             <FiCheckCircle /> Selesai
                                         </button>
                                     ) : (
                                         <div className="flex-1 py-2.5 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 flex items-center justify-center gap-2 cursor-not-allowed">
                                             <FiCheckCircle /> Sudah Selesai
                                         </div>
                                     )}
                                     <div 
                                         className="p-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-slate-400"
                                         title="Detail teknis tersedia di monitoring pengawas"
                                     >
                                         <FiChevronRight />
                                     </div>
                                 </div>
                             </div>
                             
                             {/* Expanded info if available */}
                             {(task.stage || task.rabItem || task.description) && (
                                 <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                                     {task.description && (
                                         <div className="col-span-2">
                                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Instruksi / Catatan</p>
                                             <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                                                 "{task.description}"
                                             </p>
                                         </div>
                                     )}
                                     {task.stage && (
                                         <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                                             <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-0.5">Tahapan Proyek</p>
                                             <p className="text-[11px] font-bold text-blue-700">{task.stage.title}</p>
                                         </div>
                                     )}
                                     {task.rabItem && (
                                         <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                                             <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-0.5">Item RAB Terkait</p>
                                             <p className="text-[11px] font-bold text-emerald-700">{task.rabItem.description}</p>
                                         </div>
                                     )}
                                 </div>
                             )}
                         </div>
                 ))}
             </div>

             {/* Footer Guard */}
             <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-medium leading-relaxed italic text-blue-800">
                    <strong>Catatan Operasional:</strong> Tugas harian adalah panduan pelaksanaan teknis di lapangan. Penyelesaian tugas membantu koordinasi tim, namun <strong>tidak otomatis memperbarui progres resmi proyek</strong> yang memerlukan verifikasi Pengawas.
                </p>
             </div>
        </div>
    );
};

export default TugasHarianMandorPage;
