import React from "react";
import TLProyek from "../../components/konsumen/TLProyek";
import { mockTimelineProyekKonsumen, nilaiProyek, totalTerbayar, sisaUang } from "../../data/mockTimelineProyekKonsumen";

const TimelineProyek = () => {
  return (
    <div className="container mx-auto px-6 py-10 space-y-10">
      {/* Section 1 — Gambar 3D */}
      <div className="rounded-lg overflow-hidden shadow-lg">
        <img src="https://placehold.co/1200x500" alt="proyek" className="w-full h-auto object-cover" />
      </div>

      {/* Section 2 — Info Tim + Nilai Proyek */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-6 flex-col md:flex-row">
          {/* Mandor */}
          <div className="flex items-center gap-4">
            <img src="https://img.daisyui.com/images/profile/demo/distracted1@192.webp" alt="mandor" className="w-20 h-20 rounded-full border-2 border-teal-600" />
            <div>
              <div className="text-sm text-teal-700 font-semibold">Mandor</div>
              <div className="text-gray-700">Budi Santoso</div>
            </div>
          </div>

          {/* Pengawas */}
          <div className="flex items-center gap-4">
            <img src="https://img.daisyui.com/images/profile/demo/distracted3@192.webp" alt="pengawas" className="w-20 h-20 rounded-full border-2 border-teal-600" />
            <div>
              <div className="text-sm text-teal-700 font-semibold">Pengawas</div>
              <div className="text-gray-700">Ahmad Fauzi</div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Info Nilai */}
          <div className="text-right space-y-1">
            <div className="text-sm text-gray-600">Nilai Proyek</div>
            <div className="text-lg font-bold text-teal-700">Rp {nilaiProyek.toLocaleString()}</div>
            <div className="text-sm text-gray-700">Terbayar: <span className="font-semibold text-green-600">Rp {totalTerbayar.toLocaleString()}</span></div>
            <div className="text-sm text-gray-700">Sisa: <span className="font-semibold text-red-600">Rp {sisaUang.toLocaleString()}</span></div>
          </div>
        </div>
      </div>

      {/* Section 3 — Timeline */}
      <TLProyek timeline={mockTimelineProyekKonsumen} />
    </div>
  );
};

export default TimelineProyek;
