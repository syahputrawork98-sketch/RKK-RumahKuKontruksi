import React from "react";
import { Link, useParams } from "react-router-dom";
import DetailPekerjaanProyek from "../../components/konsumen/DetailPekerjaanProyek";
import { mockProjectStages } from "../../data/mock/projectStages";
import { FiArrowLeft } from "react-icons/fi";

const DetailTimelineProyek = () => {
  const { stageId } = useParams();

  const stage = mockProjectStages.find((item) => item.id === stageId);

  if (!stage) {
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
            to="/konsumen/TimelineProyek"
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
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <DetailPekerjaanProyek
          data={stage}
          backPath="/konsumen/TimelineProyek"
        />
      </div>
    </div>
  );
};

export default DetailTimelineProyek;
