import React, { useState, useEffect } from "react";
import { FiPlus, FiCalendar, FiChevronRight, FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import weeklyJournalService from "../../services/weeklyJournalService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

const JurnalMingguanMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJournals = async () => {
            if (!selectedForemanId) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const response = await weeklyJournalService.getWeeklyJournals({ 
                    actorRole: "mandor", 
                    actorId: selectedForemanId,
                    foremanId: selectedForemanId 
                });
                if (response.success) {
                    setJournals(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch journals:", err);
                setError("Gagal memuat daftar jurnal mingguan.");
            } finally {
                setLoading(false);
            }
        };

        fetchJournals();
    }, [selectedForemanId]);

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                description="Pilih akun Mandor untuk melihat dan membuat jurnal mingguan pekerjaan lapangan."
            />
        );
    }

    if (loading && journals.length === 0 && !error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--dashboard-primary)] border-t-transparent"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Memuat jurnal mingguan...</p>
            </div>
        );
    }

    if (error) {
        return (
            <RoleDataState 
                type="error"
                title={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Jurnal Mingguan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Daftar laporan aktivitas mingguan yang telah Anda buat.</p>
                </div>
                <Link 
                    to="/mandor/jurnal-mingguan/create"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--dashboard-primary)] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[var(--dashboard-primary)]/20"
                >
                    <FiPlus size={16} /> Buat Jurnal Baru
                </Link>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3">
                <FiAlertCircle className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                <p className="text-[10px] md:text-xs font-bold text-amber-700 leading-relaxed uppercase">
                    Penting: Jurnal Mingguan adalah sumber klaim aktivitas dan progres awal Mandor. 
                    Status progres resmi proyek tetap berasal dari verifikasi Pengawas di lapangan.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {journals.length > 0 ? journals.map((journal) => (
                    <Link 
                        key={journal.id} 
                        to={`/mandor/jurnal-mingguan/${journal.id}`}
                        className="dashboard-card group hover:border-[var(--dashboard-primary)]/50 transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                        <div className="flex items-start gap-4 flex-1">
                            <div className="p-3 bg-[var(--dashboard-surface-soft)] rounded-2xl text-[var(--dashboard-primary)] group-hover:bg-[var(--dashboard-primary)] group-hover:text-white transition-all shrink-0">
                                <FiCalendar size={20} />
                            </div>
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest bg-[var(--dashboard-primary)]/10 px-2 py-0.5 rounded">
                                        {journal.project?.projectCode || "PRJ-??"}
                                    </span>
                                    <StatusBadge type="journal" status={journal.status} />
                                </div>
                                <h3 className="text-lg font-black leading-tight group-hover:text-[var(--dashboard-primary)] transition-colors truncate">
                                    {journal.project?.name || "Proyek Tanpa Nama"}
                                </h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase flex items-center gap-1.5">
                                        <FiCalendar className="text-[var(--dashboard-primary)]" /> 
                                        {new Date(journal.weekStartDate).toLocaleDateString('id-ID')} - {new Date(journal.weekEndDate).toLocaleDateString('id-ID')}
                                    </p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                        {journal.activities?.length || 0} Aktivitas Dilaporkan
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-50">
                            <div className="text-left md:text-right">
                                <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">Klaim Progres</p>
                                <div className="flex items-baseline gap-1">
                                    <p className="text-2xl font-black text-[var(--dashboard-primary)]">{journal.claimedProgress || 0}</p>
                                    <span className="text-xs font-black text-[var(--dashboard-primary)]">%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="hidden md:block text-right">
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">Dibuat pada</p>
                                    <p className="text-[10px] font-bold text-slate-500">{new Date(journal.createdAt).toLocaleDateString('id-ID')}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[var(--dashboard-primary)]/10 transition-all">
                                    <FiChevronRight className="text-slate-300 group-hover:text-[var(--dashboard-primary)] transition-all" size={20} />
                                </div>
                            </div>
                        </div>
                    </Link>
                )) : (
                    <RoleDataState 
                        type="empty"
                        title="Belum ada jurnal mingguan"
                        description="Mulai catat aktivitas mingguan Anda dengan tombol 'Buat Jurnal Baru' untuk memantau progres lapangan."
                    />
                )}
            </div>
        </div>
    );
};

export default JurnalMingguanMandorPage;
