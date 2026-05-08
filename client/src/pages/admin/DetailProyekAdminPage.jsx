import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
    FiArrowLeft, 
    FiInfo, 
    FiUsers, 
    FiFileText, 
    FiActivity, 
    FiCreditCard,
    FiMoreVertical,
    FiUser,
    FiCheckCircle,
    FiAlertCircle,
    FiMapPin,
    FiCalendar,
    FiDollarSign,
    FiLayers,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiClock,
    FiBriefcase,
    FiPhone,
    FiMail,
    FiSave,
    FiX
} from "react-icons/fi";
import projectService from "../../services/projectService";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import projectStageService from "../../services/projectStageService";
import rabService from "../../services/rabService";
import RoleDataState from "../../components/common/RoleDataState";

const DetailProyekAdminPage = () => {
    const { projectId } = useParams();
    const { selectedAdminId } = useAdminPersona();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const [stages, setStages] = useState([]);
    const [rabPlan, setRabPlan] = useState(null);

    // Stage Form State
    const [showStageModal, setShowStageModal] = useState(false);
    const [isEditingStage, setIsEditingStage] = useState(false);
    const [editStageId, setEditStageId] = useState(null);
    const [stageForm, setStageForm] = useState({
        code: "",
        title: "",
        description: "",
        week: 1,
        status: "planning",
        startDate: "",
        endDate: "",
        durationDays: 7,
        order: 0,
        note: ""
    });

    const formatDateShort = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
        });
    };

    useEffect(() => {
        if (projectId) {
            fetchProjectData();
        }
    }, [projectId]);

    const fetchProjectData = async () => {
        try {
            setLoading(true);
            const [projRes, stagesRes, rabRes] = await Promise.all([
                projectService.getProjectById(projectId),
                projectStageService.getStagesByProject(projectId),
                rabService.getRabByProject(projectId).catch(() => ({ data: null }))
            ]);
            
            setProject(projRes.data);
            setStages(stagesRes.data || []);
            setRabPlan(rabRes.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching project data:", err);
            setError("Gagal memuat data proyek. Pastikan server backend berjalan.");
            setLoading(false);
        }
    };

    const handleSaveStage = async (e) => {
        e.preventDefault();
        try {
            if (isEditingStage) {
                await projectStageService.updateStage(editStageId, stageForm);
            } else {
                await projectStageService.createStage(projectId, stageForm);
            }
            setShowStageModal(false);
            fetchProjectData();
        } catch (err) {
            alert("Gagal menyimpan stage: " + (err.response?.data?.message || err.message));
        }
    };

    const handleDeleteStage = async (id) => {
        if (!window.confirm("Hapus tahapan pekerjaan ini?")) return;
        try {
            await projectStageService.deleteStage(id);
            fetchProjectData();
        } catch (err) {
            alert("Gagal menghapus stage: " + (err.response?.data?.message || err.message));
        }
    };

    if (!selectedAdminId) return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    if (loading) return <RoleDataState type="loading" message="Memuat detail proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchProjectData} />;
    
    if (project && project.adminId !== selectedAdminId) {
        return (
            <div className="p-8 text-center space-y-6 bg-white rounded-3xl border border-red-100 animate-fadeIn max-w-md mx-auto my-20 shadow-xl shadow-red-500/5">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2">
                    <FiAlertCircle size={40} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-slate-800">Akses Ditolak</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Forbidden Access</p>
                    <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                        Anda tidak memiliki izin untuk melihat detail proyek ini. Proyek ini bukan di bawah tanggung jawab persona Anda.
                    </p>
                </div>
                <button 
                    onClick={() => navigate("/admin/proyek")} 
                    className="w-full py-3 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-slate-800/20"
                >
                    Kembali ke Daftar Proyek
                </button>
            </div>
        );
    }

    if (!project) return <RoleDataState type="empty" message="Data proyek tidak tersedia." />;

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "customer", label: "Customer", icon: FiUser },
        { id: "tim", label: "Tim Project", icon: FiUsers },
        { id: "stages", label: "Stage / Jadwal", icon: FiLayers },
        { id: "rab", label: "RAB Ringkas", icon: FiFileText },
        { id: "readiness", label: "Readiness", icon: FiCheckCircle },
    ];

    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("pengerjaan")) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        if (s?.includes("persiapan") || s?.includes("plan") || s?.includes("planning")) return "bg-blue-500/10 text-blue-500 border-blue-500/20";
        if (s?.includes("finish") || s?.includes("selesai")) return "bg-purple-500/10 text-purple-500 border-purple-500/20";
        if (s?.includes("stop") || s?.includes("terhenti")) return "bg-red-500/10 text-red-500 border-red-500/20";
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    // Readiness Logic
    const readinessChecks = [
        { label: "Customer terhubung", status: !!project.customerId },
        { label: "Admin ditugaskan", status: !!project.adminId },
        { label: "Pengawas ditugaskan", status: !!project.supervisorId },
        { label: "Mandor ditugaskan", status: !!project.foremanId },
        { label: "RAB Plan dibuat", status: (project._count?.rabPlans || 0) > 0 },
        { label: "Tahapan (Stages) dibuat", status: (project._count?.stages || 0) > 0 },
        { label: "Total RAB > 0", status: parseFloat(project.rabPlans?.[0]?.totalAmount || 0) > 0 },
        { label: "Tanggal mulai tersedia", status: !!project.startDate },
        { label: "Estimasi selesai tersedia", status: !!project.estimatedEndDate },
    ];
    const readyCount = readinessChecks.filter(c => c.status).length;
    const isReady = readyCount === readinessChecks.length;

    return (
        <div className="animate-fadeIn space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/admin/proyek")}
                        className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black tracking-tight">{project.projectCode}</h2>
                            <span className={`px-3 py-0.5 text-[10px] font-black uppercase rounded-full border ${getStatusColor(project.status)}`}>
                                {project.status}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide">{project.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {(project.status !== 'active' && project.status !== 'ongoing') && isReady && (
                        <Link 
                            to="/admin/proyek/aktivasi"
                            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 mr-2 animate-pulse"
                        >
                            Aktifkan Proyek
                        </Link>
                    )}
                    <Link 
                        to={`/admin/proyek/edit/${project.id}`}
                        className="px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold hover:bg-[var(--dashboard-border)] transition-all"
                    >
                        Edit Proyek
                    </Link>
                    <button disabled title="Menu tambahan (Hold)" className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-300 cursor-not-allowed">
                        <FiMoreVertical />
                    </button>
                </div>
            </div>

            {/* TABS NAVIGATION */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 border-b border-[var(--dashboard-border)]">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                            ${activeTab === tab.id 
                                ? "bg-[var(--dashboard-primary)] text-white shadow-lg shadow-[var(--dashboard-primary)]/20 translate-y-0.5" 
                                : "text-[var(--dashboard-text-soft)] hover:bg-[var(--dashboard-surface-soft)] hover:text-[var(--dashboard-text)]"}
                        `}
                    >
                        <tab.icon size={14} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card min-h-[400px]">
                        {/* OVERVIEW TAB */}
                        {activeTab === "overview" && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)] flex items-center gap-2">
                                            <FiInfo /> Informasi Utama
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <InfoItem label="Kode Proyek" value={project.projectCode} />
                                            <InfoItem label="Nama Proyek" value={project.name} />
                                            <InfoItem label="Tipe Pekerjaan" value={project.type || "Pembangunan"} />
                                            <InfoItem label="Status Saat Ini" value={project.status} isBadge color={getStatusColor(project.status)} />
                                            <InfoItem label="Lokasi" value={project.location || "-"} icon={<FiMapPin />} />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)] flex items-center gap-2">
                                            <FiDollarSign /> Finansial & Jadwal
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <InfoItem label="Budget Total" value={formatCurrency(project.budgetTotal)} isBold />
                                            <InfoItem label="Sudah Dibayar" value={formatCurrency(project.paidAmount)} color="text-blue-600" />
                                            <InfoItem label="Sisa Pembayaran" value={formatCurrency(project.remainingAmount)} color="text-orange-600" />
                                            <InfoItem label="Tanggal Mulai" value={formatDate(project.startDate)} icon={<FiCalendar />} />
                                            <InfoItem label="Estimasi Selesai" value={formatDate(project.estimatedEndDate)} icon={<FiCalendar />} />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-[var(--dashboard-border)]">
                                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)] mb-6">Progres Lapangan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Verified Progress (Resmi)</span>
                                                <span className="text-2xl font-black text-[var(--dashboard-primary)]">{project.verifiedProgress}%</span>
                                            </div>
                                            <div className="w-full h-3 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden border border-[var(--dashboard-border)] p-0.5">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-[var(--dashboard-primary)] to-emerald-400 rounded-full transition-all duration-1000" 
                                                    style={{ width: `${project.verifiedProgress}%` }}
                                                />
                                            </div>
                                            <p className="text-[10px] text-[var(--dashboard-text-soft)] italic">
                                                Diverifikasi terakhir: {project.verifiedProgressUpdatedAt ? formatDate(project.verifiedProgressUpdatedAt) : "-"}
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-4">
                                            <FiAlertCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                                            <div>
                                                <h4 className="text-xs font-bold text-blue-700 uppercase">Catatan Admin</h4>
                                                <p className="text-[10px] text-blue-600 mt-1 leading-relaxed">
                                                    Verified progress hanya bisa diubah oleh Pengawas melalui modul Verifikasi Progres. Admin tidak memiliki wewenang mengubah angka progres resmi.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CUSTOMER TAB */}
                        {activeTab === "customer" && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="flex items-center gap-4 border-b border-[var(--dashboard-border)] pb-4">
                                    <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                                        <FiUser size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black">{project.customer?.name}</h3>
                                        <p className="text-xs font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest">
                                            {project.customer?.customerType} Customer
                                        </p>
                                    </div>
                                </div>

                                {project.customer ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                        <InfoItem label="Email" value={project.customer.email} icon={<FiMail />} />
                                        <InfoItem label="Telepon" value={project.customer.phone} icon={<FiPhone />} />
                                        <InfoItem label="Alamat" value={project.customer.address} icon={<FiMapPin />} className="md:col-span-2" />
                                        
                                        {project.customer.customerType === "Corporate" && (
                                            <>
                                                <div className="md:col-span-2 pt-4 border-t border-[var(--dashboard-border)]">
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-primary)] mb-4">Informasi Korporat</h4>
                                                </div>
                                                <InfoItem label="Nama Perusahaan" value={project.customer.companyName} icon={<FiBriefcase />} />
                                                <InfoItem label="PIC Proyek" value={project.customer.picName} />
                                                <InfoItem label="Jabatan PIC" value={project.customer.picPosition} />
                                            </>
                                        )}

                                        <div className="md:col-span-2 pt-4 border-t border-[var(--dashboard-border)]">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-primary)] mb-2">Catatan Konsumen</h4>
                                            <p className="text-sm text-[var(--dashboard-text-soft)] italic bg-[var(--dashboard-surface-soft)] p-4 rounded-xl border border-[var(--dashboard-border)]">
                                                {project.customer.notes || "Tidak ada catatan khusus."}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <RoleDataState type="empty" message="Data customer tidak ditemukan." />
                                )}
                            </div>
                        )}

                        {/* TIM PROJECT TAB */}
                        {activeTab === "tim" && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Penugasan Personel</h3>
                                    <Link 
                                        to="/admin/penugasan-tim"
                                        className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
                                    >
                                        Kelola Penugasan
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <TeamCard 
                                        role="Admin Penanggung Jawab" 
                                        name={project.admin?.name} 
                                        email={project.admin?.email} 
                                        icon={<FiUser />} 
                                        color="blue"
                                    />
                                    <TeamCard 
                                        role="Pengawas Lapangan (Supervisor)" 
                                        name={project.supervisor?.name} 
                                        email={project.supervisor?.email} 
                                        icon={<FiUsers />} 
                                        color="purple"
                                    />
                                    <TeamCard 
                                        role="Mandor Utama (Foreman)" 
                                        name={project.foreman?.name} 
                                        email={project.foreman?.email} 
                                        icon={<FiUsers />} 
                                        color="orange"
                                    />
                                </div>
                            </div>
                        )}

                        {/* STAGES TAB */}
                        {activeTab === "stages" && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Daftar Tahap Pekerjaan (Stages)</h3>
                                    <button 
                                        onClick={() => {
                                            setStageForm({ code: "", title: "", description: "", week: 1, status: "planning", startDate: "", endDate: "", durationDays: 7, order: stages.length + 1, note: "" });
                                            setIsEditingStage(false);
                                            setShowStageModal(true);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-bold shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-105 transition-all"
                                    >
                                        <FiPlus /> Tambah Stage
                                    </button>
                                </div>

                                {stages.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-[var(--dashboard-border)]">
                                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Order</th>
                                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Stage</th>
                                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-center">Minggu</th>
                                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stages.map((stg) => (
                                                    <tr key={stg.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-all">
                                                        <td className="py-4 px-2 text-xs font-black text-[var(--dashboard-text-soft)]">#{stg.order}</td>
                                                        <td className="py-4 px-2">
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-black uppercase tracking-tight">{stg.code}</span>
                                                                <span className="text-sm font-bold">{stg.title}</span>
                                                                <div className="flex items-center gap-2 text-[9px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-tighter mt-0.5">
                                                                    <span>{stg.durationDays || 0} Hari</span>
                                                                    <span>•</span>
                                                                    <span>{formatDateShort(stg.startDate)} - {formatDateShort(stg.endDate)}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-2 text-xs font-bold text-center">W-{stg.week || 1}</td>
                                                        <td className="py-4 px-2">
                                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${getStatusColor(stg.status)}`}>
                                                                {stg.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-2 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <button 
                                                                    onClick={() => {
                                                                        setStageForm({ 
                                                                            code: stg.code, title: stg.title, description: stg.description || "", 
                                                                            week: stg.week, status: stg.status, startDate: stg.startDate?.split('T')[0] || "", 
                                                                            endDate: stg.endDate?.split('T')[0] || "", durationDays: stg.durationDays, 
                                                                            order: stg.order, note: stg.note || "" 
                                                                        });
                                                                        setIsEditingStage(true);
                                                                        setEditStageId(stg.id);
                                                                        setShowStageModal(true);
                                                                    }}
                                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                                                                >
                                                                    <FiEdit2 size={14} />
                                                                </button>
                                                                {!stg.isVerified && (
                                                                    <button 
                                                                        onClick={() => handleDeleteStage(stg.id)}
                                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                                    >
                                                                        <FiTrash2 size={14} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[var(--dashboard-border)] rounded-3xl">
                                        <FiLayers size={48} className="text-[var(--dashboard-text-soft)] opacity-20 mb-4" />
                                        <p className="text-sm font-bold text-[var(--dashboard-text-soft)]">Belum ada tahapan pekerjaan.</p>
                                        <button 
                                            onClick={() => {
                                                setStageForm({ code: "", title: "", description: "", week: 1, status: "planning", startDate: "", endDate: "", durationDays: 7, order: 1, note: "" });
                                                setIsEditingStage(false);
                                                setShowStageModal(true);
                                            }}
                                            className="mt-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-primary)] hover:underline"
                                        >
                                            Buat Stage Pertama
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* RAB TAB */}
                        {activeTab === "rab" && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Ringkasan RAB</h3>
                                    <Link 
                                        to={`/admin/rab/${project.id}`}
                                        className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-bold shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-105 transition-all"
                                    >
                                        Kelola RAB Detail
                                    </Link>
                                </div>

                                {rabPlan ? (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl shadow-sm">
                                                <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">Total RAB</p>
                                                <h4 className="text-xl font-black text-emerald-700">{formatCurrency(rabPlan.totalAmount)}</h4>
                                            </div>
                                            <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl shadow-sm">
                                                <p className="text-[10px] font-black uppercase text-blue-600 mb-1">Kategori / Item</p>
                                                <h4 className="text-xl font-black text-blue-700">{rabPlan.categories?.length || 0} / {rabPlan.categories?.reduce((sum, c) => sum + (c.items?.length || 0), 0)}</h4>
                                            </div>
                                            <div className="p-6 bg-purple-50 border border-purple-100 rounded-3xl shadow-sm">
                                                <p className="text-[10px] font-black uppercase text-purple-600 mb-1">Status RAB</p>
                                                <h4 className="text-xl font-black text-purple-700 uppercase tracking-widest">{rabPlan.status}</h4>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Struktur Kategori Utama</h4>
                                            <div className="space-y-3">
                                                {rabPlan.categories?.map(cat => (
                                                    <div key={cat.id} className="flex justify-between items-center p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] hover:border-[var(--dashboard-primary)] transition-all group">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[10px] font-black text-[var(--dashboard-text-soft)] bg-white px-2 py-1 rounded-lg border border-[var(--dashboard-border)] shadow-sm group-hover:text-[var(--dashboard-primary)] group-hover:border-[var(--dashboard-primary)]/30 transition-all">#{cat.code}</span>
                                                            <span className="text-sm font-bold group-hover:text-[var(--dashboard-primary)] transition-all">{cat.name}</span>
                                                        </div>
                                                        <span className="text-sm font-black text-emerald-600 group-hover:scale-105 transition-all">{formatCurrency(cat.subtotal)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[var(--dashboard-border)] rounded-3xl">
                                        <FiFileText size={48} className="text-[var(--dashboard-text-soft)] opacity-20 mb-4" />
                                        <p className="text-sm font-bold text-[var(--dashboard-text-soft)]">Belum ada RAB untuk proyek ini.</p>
                                        <Link 
                                            to={`/admin/rab/${project.id}`}
                                            className="mt-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-primary)] hover:underline"
                                        >
                                            Buat RAB Plan Baru
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* READINESS TAB */}
                        {activeTab === "readiness" && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Checklist Kesiapan Project</h3>
                                    <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${isReady ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-amber-500 text-white shadow-lg shadow-amber-500/30"}`}>
                                        {isReady ? "READY TO WORK" : "BELUM LENGKAP"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                    {readinessChecks.map((check, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] hover:border-blue-500/20 transition-all">
                                            <span className="text-xs font-bold">{check.label}</span>
                                            {check.status ? (
                                                <FiCheckCircle className="text-emerald-500" size={18} />
                                            ) : (
                                                <FiAlertCircle className="text-amber-500" size={18} />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] flex gap-6 items-start shadow-sm shadow-blue-100/50">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                                        <FiInfo size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-blue-700 uppercase tracking-widest">Analisis Kesiapan Sistem</h4>
                                        <p className="text-xs text-blue-600 mt-2 leading-relaxed font-bold">
                                            {isReady 
                                                ? "Proyek ini telah memenuhi seluruh kriteria administratif awal. Pengawas dan Mandor dapat mulai melakukan aktivitas pelaporan di lapangan secara sinkron."
                                                : `Masih ada ${readinessChecks.length - readyCount} kriteria yang belum terpenuhi. Mohon lengkapi seluruh data administratif (Tim & RAB) agar proyek dapat diproses oleh Pengawas.`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* SIDEBAR INFO */}
                <div className="space-y-6">
                    <div className="dashboard-card shadow-sm border-[var(--dashboard-border)]">
                        <h3 className="font-black text-[10px] uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-6">Aksi Cepat Admin</h3>
                        <div className="flex flex-col gap-3">
                            {(project.status !== 'active' && project.status !== 'ongoing') && (
                                <Link 
                                    to="/admin/proyek/aktivasi"
                                    className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl text-center flex items-center justify-center
                                        ${isReady 
                                            ? "bg-[var(--dashboard-primary)] text-white shadow-[var(--dashboard-primary)]/30 hover:scale-[1.02]" 
                                            : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"}
                                    `}
                                >
                                    Aktivasi Proyek
                                </Link>
                            )}
                            <button disabled className="w-full py-4 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] cursor-not-allowed">Ringkasan Dokumen (Hold)</button>
                            <button disabled className="w-full py-4 bg-slate-50 border border-slate-100 text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] cursor-not-allowed">Batalkan Proyek (Hold)</button>
                        </div>
                    </div>

                    <div className="dashboard-card bg-[var(--dashboard-primary)] text-white relative overflow-hidden shadow-xl shadow-[var(--dashboard-primary)]/20">
                        <div className="relative z-10">
                            <h3 className="font-black text-[10px] uppercase tracking-widest opacity-70 mb-2">Statistik Pengerjaan</h3>
                            <div className="space-y-5 mt-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Hari Berjalan</span>
                                    <span className="text-2xl font-black">0 <span className="text-[10px] opacity-70">Hari</span></span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Tahap Selesai</span>
                                    <span className="text-2xl font-black">0 <span className="text-[10px] opacity-70">/ {stages.length}</span></span>
                                </div>
                            </div>
                        </div>
                        <FiClock className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
                    </div>
                </div>
            </div>

            {/* STAGE MODAL */}
            {showStageModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-[var(--dashboard-border)]">
                        <div className="p-8 border-b border-[var(--dashboard-border)] flex justify-between items-center bg-[var(--dashboard-surface-soft)]">
                            <h3 className="font-black text-sm uppercase tracking-widest text-[var(--dashboard-primary)]">
                                {isEditingStage ? "Edit Stage" : "Tambah Stage Proyek"}
                            </h3>
                            <button onClick={() => setShowStageModal(false)} className="p-2.5 hover:bg-white rounded-2xl transition-all shadow-sm"><FiX /></button>
                        </div>
                        <form onSubmit={handleSaveStage} className="p-8 space-y-5">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Kode</label>
                                    <input type="text" value={stageForm.code} onChange={e => setStageForm({...stageForm, code: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-black uppercase shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="P01" required />
                                </div>
                                <div className="col-span-2 space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Judul Stage</label>
                                    <input type="text" value={stageForm.title} onChange={e => setStageForm({...stageForm, title: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Pekerjaan Pondasi" required />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Urutan (Order)</label>
                                    <input type="number" value={stageForm.order} onChange={e => setStageForm({...stageForm, order: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Minggu Ke (Week)</label>
                                    <input type="number" value={stageForm.week} onChange={e => setStageForm({...stageForm, week: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Status Rencana</label>
                                    <select value={stageForm.status} onChange={e => setStageForm({...stageForm, status: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                        <option value="planning">Planning</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="finished">Finished</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Durasi (Hari)</label>
                                    <input type="number" value={stageForm.durationDays} onChange={e => setStageForm({...stageForm, durationDays: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Rencana Mulai</label>
                                    <input type="date" value={stageForm.startDate ? stageForm.startDate.split('T')[0] : ""} onChange={e => setStageForm({...stageForm, startDate: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Rencana Selesai</label>
                                    <input type="date" value={stageForm.endDate ? stageForm.endDate.split('T')[0] : ""} onChange={e => setStageForm({...stageForm, endDate: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Deskripsi Tahapan</label>
                                <textarea value={stageForm.description} onChange={e => setStageForm({...stageForm, description: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[80px]" placeholder="Penjelasan singkat mengenai tahapan ini..." />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Catatan Tambahan</label>
                                <textarea value={stageForm.note} onChange={e => setStageForm({...stageForm, note: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Catatan untuk Pengawas/Mandor..." />
                            </div>

                            <button type="submit" className="w-full py-4 bg-[var(--dashboard-primary)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-4">
                                <FiSave /> {isEditingStage ? "Perbarui Tahapan" : "Simpan Tahapan"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// HELPER COMPONENTS
const InfoItem = ({ label, value, icon, isBadge, color, isBold, className }) => (
    <div className={`space-y-1.5 ${className}`}>
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] flex items-center gap-2">
            {icon} {label}
        </p>
        {isBadge ? (
            <span className={`inline-block px-3 py-0.5 text-[10px] font-black uppercase rounded-full border ${color}`}>
                {value}
            </span>
        ) : (
            <p className={`text-sm ${isBold ? "font-black" : "font-bold"} ${color || "text-[var(--dashboard-text)]"}`}>
                {value || "-"}
            </p>
        )}
    </div>
);

const TeamCard = ({ role, name, email, icon, color }) => {
    const colors = {
        blue: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        purple: "bg-purple-500/10 text-purple-600 border-purple-500/20",
        orange: "bg-orange-500/10 text-orange-600 border-orange-500/20"
    };
    
    return (
        <div className="flex items-center gap-4 p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] hover:border-blue-500/30 transition-all group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colors[color]}`}>
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">{role}</p>
                <h4 className="text-sm font-black group-hover:text-blue-600 transition-colors">{name || "BELUM DITUGASKAN"}</h4>
                {email && <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)]">{email}</p>}
            </div>
        </div>
    );
};

export default DetailProyekAdminPage;
