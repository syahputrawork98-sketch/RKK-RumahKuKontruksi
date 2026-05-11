import React from 'react';
import { FiMapPin, FiClock, FiCheckCircle, FiArrowRight } from "react-icons/fi";

const DesignRequestCard = ({ request, onOpenDetail }) => {
    const getStatusLabel = (status) => {
        const labels = {
            submitted: "Diajukan",
            open: "Tender Terbuka",
            assigned: "Arsitek Terpilih",
            in_review: "Proses Review",
            approved: "Desain Disetujui",
            rejected: "Ditolak",
            draft: "Draft"
        };
        return labels[status] || status;
    };

    return (
        <div className="p-6 border border-gray-100 rounded-3xl hover:border-teal-500/30 transition-all bg-white shadow-sm group">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: {request.id.slice(-8)}</p>
                    <h3 className="text-lg font-black text-gray-800 transition-colors">{request.title}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                    request.status === 'submitted' ? "bg-blue-50 text-blue-600 border-blue-100" :
                    request.status === 'open' ? "bg-teal-50 text-teal-600 border-teal-100" :
                    request.status === 'assigned' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                    request.status === 'in_review' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    request.status === 'approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    "bg-gray-50 text-gray-600 border-gray-100"
                }`}>
                    {getStatusLabel(request.status)}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FiMapPin className="shrink-0" />
                    <span className="truncate">{request.location || "Lokasi belum ditentukan"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FiClock className="shrink-0" />
                    <span>Update: {new Date(request.updatedAt).toLocaleDateString("id-ID")}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                        <FiCheckCircle size={14} />
                    </div>
                    <div className="text-left">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Arsitek</p>
                        <p className="text-[11px] font-bold text-gray-700">{request.architect?.name || "Menunggu Penugasan"}</p>
                    </div>
                </div>
                {['approved', 'project_created', 'finished'].includes(request.status) ? (
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100">
                        <FiCheckCircle /> Selesai
                    </div>
                ) : (
                    <button 
                        onClick={() => onOpenDetail(request)}
                        className="text-[10px] font-black text-teal-600 uppercase tracking-widest flex items-center gap-1 hover:translate-x-1 transition-transform"
                    >
                        Lihat Progress <FiArrowRight />
                    </button>
                )}
            </div>
        </div>
    );
};

export default DesignRequestCard;
