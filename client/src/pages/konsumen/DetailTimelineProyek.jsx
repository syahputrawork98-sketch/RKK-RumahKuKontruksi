import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DetailPekerjaanProyek from "../../components/konsumen/DetailPekerjaanProyek";
import StageCommunicationPanel from "../../components/konsumen/StageCommunicationPanel";
import projectStageService from "../../services/projectStageService";
import { FiArrowLeft } from "react-icons/fi";
import RoleDataState from "../../components/common/RoleDataState";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";

const DetailTimelineProyek = () => {
  const { selectedCustomerId, loading: personaLoading } = useCustomerPersona();
  const { stageId } = useParams();
  const [stage, setStage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStageDetail = async () => {
      try {
        setLoading(true);
        const response = await projectStageService.getStageById(stageId, { actorRole: 'customer' });
        if (response.success) {
          setStage(response.data);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch stage detail:", err);
        setError("Gagal memuat detail tahapan pekerjaan.");
      } finally {
        setLoading(false);
      }
    };

    if (stageId) fetchStageDetail();
  }, [stageId]);

  if (!selectedCustomerId && !personaLoading) {
    return (
      <div className="container mx-auto px-6 py-10">
        <RolePersonaEmptyState 
          title="Detail Tahap Pekerjaan"
          description="Silakan pilih persona Konsumen terlebih dahulu untuk melihat detail dan progres tahapan pembangunan Anda."
          icon="🔍"
        />
      </div>
    );
  }

  if (personaLoading || (loading && !stage)) return <RoleDataState type="loading" message="Memuat detail tahapan..." />;

  if (error || !stage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="bg-white rounded-2xl border border-neutral-30 shadow-sm p-10 text-center max-w-md w-full space-y-4">
          <div className="w-16 h-16 bg-neutral-20 rounded-full flex items-center justify-center mx-auto">
            <FiArrowLeft className="text-neutral-50" size={28} />
          </div>
          <h1 className="text-heading-s-bold text-neutral-100">
            Detail Tahap Tidak Ditemukan
          </h1>
          <p className="text-m-regular text-neutral-60">
            Data tahap pekerjaan dengan ID <strong className="font-mono text-primary-main">{stageId}</strong> tidak tersedia atau sudah dihapus.
          </p>
          <Link
            to="/konsumen/timeline-proyek"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-main text-white text-s-bold rounded-xl hover:bg-primary-hover transition-colors"
          >
            <FiArrowLeft size={16} /> Kembali ke Timeline
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Stage Detail (2/3) */}
          <div className="lg:col-span-2">
            <DetailPekerjaanProyek
              data={stage}
              backPath="/konsumen/timeline-proyek"
            />
          </div>

          {/* Sidebar: Communication Panel (1/3) */}
          <div className="lg:col-span-1">
            <StageCommunicationPanel 
              stageId={stageId} 
              projectId={stage.projectId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTimelineProyek;
