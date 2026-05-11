import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import projectStageService from "../../services/projectStageService";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";
import { FiInfo, FiLayers, FiPackage, FiFileText } from "react-icons/fi";

// MODULAR COMPONENTS
import MandorProjectHeader from "../../components/mandor/project-detail/MandorProjectHeader";
import MandorProjectTabs from "../../components/mandor/project-detail/MandorProjectTabs";
import MandorProjectOverviewTab from "../../components/mandor/project-detail/MandorProjectOverviewTab";
import MandorProjectScopeTab from "../../components/mandor/project-detail/MandorProjectScopeTab";
import MandorProjectMaterialTab from "../../components/mandor/project-detail/MandorProjectMaterialTab";
import MandorProjectJournalTab from "../../components/mandor/project-detail/MandorProjectJournalTab";
import MandorProjectSidebar from "../../components/mandor/project-detail/MandorProjectSidebar";

const DetailProyekAktifMandorPage = () => {
    const { projectId } = useParams();
    const { selectedForemanId } = useForemanPersona();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const [stages, setStages] = useState([]);

    useEffect(() => {
        if (projectId) {
            fetchProjectData();
        }
    }, [projectId]);

    const fetchProjectData = async () => {
        try {
            setLoading(true);
            const [projRes, stagesRes] = await Promise.all([
                projectService.getProjectById(projectId),
                projectStageService.getStagesByProject(projectId)
            ]);
            
            setProject(projRes.data);
            setStages(stagesRes.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching project data:", err);
            setError("Gagal memuat data proyek. Pastikan server backend berjalan.");
            setLoading(false);
        }
    };

    if (!selectedForemanId) return <RoleDataState type="empty" message="Pilih Mandor persona terlebih dahulu di Topbar." />;
    if (loading) return <RoleDataState type="loading" message="Memuat detail proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchProjectData} />;
    
    // Safety guard: ensure this project is assigned to this mandor
    if (project && project.foremanId !== selectedForemanId) {
        return (
            <RoleDataState 
                type="error" 
                title="Akses Ditolak" 
                description="Anda tidak memiliki izin untuk melihat detail proyek ini. Proyek ini bukan di bawah tanggung jawab persona Anda."
            />
        );
    }

    if (!project) return <RoleDataState type="empty" message="Data proyek tidak tersedia." />;

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "scope", label: "Scope / Tahapan", icon: FiLayers },
        { id: "material", label: "Logistik / Material", icon: FiPackage },
        { id: "journal", label: "Laporan Jurnal", icon: FiFileText },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <MandorProjectHeader project={project} onBack={() => navigate("/mandor/proyek-aktif")} />

            <MandorProjectTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card min-h-[400px]">
                        {activeTab === "overview" && <MandorProjectOverviewTab project={project} />}
                        {activeTab === "scope" && <MandorProjectScopeTab stages={stages} />}
                        {activeTab === "material" && <MandorProjectMaterialTab project={project} />}
                        {activeTab === "journal" && <MandorProjectJournalTab project={project} />}
                    </div>
                </div>

                <MandorProjectSidebar project={project} stages={stages} />
            </div>
        </div>
    );
};

export default DetailProyekAktifMandorPage;
