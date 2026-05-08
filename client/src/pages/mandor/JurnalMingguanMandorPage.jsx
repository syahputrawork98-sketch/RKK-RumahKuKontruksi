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
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
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
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[var(--dashboard-surface-soft)] rounded-2xl text-[var(--dashboard-primary)] group-hover:bg-[var(--dashboard-primary)] group-hover:text-white transition-all">
                                <FiCalendar size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{journal.project?.projectCode}</span>
                                    <StatusBadge type="journal" status={journal.status} />
                                </div>
                                <h3 className="text-lg font-black leading-tight group-hover:text-[var(--dashboard-primary)] transition-colors">{journal.project?.name}</h3>
                                <p className="text-xs font-bold text-[var(--dashboard-text-soft)] mt-1">
                                    Periode: {new Date(journal.weekStartDate).toLocaleDateString('id-ID')} - {new Date(journal.weekEndDate).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                            <div className="text-left md:text-right">
                                <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">Progress Klaim</p>
                                <p className="text-xl font-black text-[var(--dashboard-primary)]">{journal.claimedProgress || 0}%</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="hidden md:block text-right">
                                    <p className="text-[8px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Dibuat pada</p>
                                    <p className="text-[10px] font-bold">{new Date(journal.createdAt).toLocaleDateString('id-ID')}</p>
                                </div>
                                <FiChevronRight className="text-[var(--dashboard-text-soft)] group-hover:text-[var(--dashboard-primary)] group-hover:translate-x-1 transition-all" size={20} />
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
