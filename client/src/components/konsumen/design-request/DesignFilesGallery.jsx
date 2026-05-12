import React, { useState, useEffect } from 'react';
import { FiFileText, FiDownload, FiExternalLink, FiClock, FiMaximize2 } from "react-icons/fi";
import projectDocumentService from "../../../services/projectDocumentService";

const DesignFilesGallery = ({ designRequestId }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDocuments = async () => {
        if (!designRequestId) return;
        try {
            setLoading(true);
            const res = await projectDocumentService.getDocuments({ 
                designRequestId,
                visibility: 'customer_visible'
            });
            if (res.success) {
                setDocuments(res.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch customer design documents:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [designRequestId]);

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-32 bg-gray-50 rounded-2xl"></div>
                    <div className="h-32 bg-gray-50 rounded-2xl"></div>
                </div>
            </div>
        );
    }

    if (documents.length === 0) return null;

    return (
        <div className="space-y-6 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-gray-800 flex items-center gap-2">
                    <FiFileText className="text-emerald-600" />
                    Paket Desain & Gambar Kerja
                </h4>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-tighter border border-emerald-100">
                    Official Release
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                    <div key={doc.id} className="p-5 bg-white border border-gray-100 rounded-3xl hover:border-emerald-200 transition-all shadow-sm hover:shadow-md group">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <FiFileText size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-black text-gray-800 truncate mb-1">{doc.title}</h5>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mb-4">{doc.fileName}</p>
                                
                                <div className="flex items-center gap-3">
                                    <a 
                                        href={doc.fileUrl ? `http://localhost:4000${doc.fileUrl}` : "#"} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-[9px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all"
                                    >
                                        <FiExternalLink size={12} /> Buka File
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DesignFilesGallery;
