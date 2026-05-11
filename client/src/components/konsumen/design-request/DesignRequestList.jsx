import React from 'react';
import { FiSearch, FiPlus } from "react-icons/fi";
import DesignRequestCard from "./DesignRequestCard";

const DesignRequestList = ({ 
    requests, 
    searchQuery, 
    onSearchChange, 
    onOpenDetail
}) => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <div className="mb-8 relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Cari judul pengajuan..." 
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
            </div>

            {requests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requests.map((r) => (
                        <DesignRequestCard 
                            key={r.id} 
                            request={r} 
                            onOpenDetail={onOpenDetail} 
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                        <FiPlus size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700">Belum Ada Pengajuan Desain</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                        Ingin mensimulasikan rancangan rumah impian? Klik tombol di atas untuk membuat draf pengajuan desain pertama Anda.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DesignRequestList;
