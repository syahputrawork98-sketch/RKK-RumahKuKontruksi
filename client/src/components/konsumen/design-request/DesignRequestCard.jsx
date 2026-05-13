import React from 'react';
import { FiMapPin, FiClock, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import StatusBadge from '../../common/StatusBadge';

const DesignRequestCard = ({ request, onOpenDetail }) => {
    return (
        <div className="p-6 border border-gray-100 rounded-3xl hover:border-teal-500/30 transition-all bg-white shadow-sm group">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: {request.id.slice(-8)}</p>
                    <h3 className="text-lg font-black text-gray-800 transition-colors">{request.title}</h3>
                </div>
                <StatusBadge type="design" status={request.status} />
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
