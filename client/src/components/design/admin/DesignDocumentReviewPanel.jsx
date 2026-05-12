import React, { useState, useEffect } from 'react';
import { FiFileText, FiEye, FiEyeOff, FiDownload, FiExternalLink, FiClock, FiCheckCircle } from "react-icons/fi";
import projectDocumentService from "../../../services/projectDocumentService";
import notificationService from "../../../services/notificationService";

const DesignDocumentReviewPanel = ({ designRequestId, customerId }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchDocuments = async () => {
        if (!designRequestId) return;
        try {
            setLoading(true);
            const res = await projectDocumentService.getDocuments({ designRequestId });
            if (res.success) {
                setDocuments(res.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch design documents:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [designRequestId]);

    const handleToggleVisibility = async (doc) => {
        const newVisibility = doc.visibility === 'customer_visible' ? 'internal' : 'customer_visible';
        try {
            setUpdatingId(doc.id);
            await projectDocumentService.updateDocumentVisibility(doc.id, newVisibility);
            
            // If making visible to customer, trigger notification
            if (newVisibility === 'customer_visible') {
                await notificationService.createNotification({
                    recipientRole: 'customer',
                    recipientId: customerId,
                    actorRole: 'admin',
                    actorId: 'admin-001', // Simulation
                    eventType: 'DESIGN_FILE_RELEASED',
                    title: 'File Desain Baru Dirilis',
                    message: `Admin telah merilis file desain "${doc.title}" untuk Anda tinjau.`,
                    linkPath: '/konsumen/permintaan-desain'
                });
            }

            // Update local state
            setDocuments(prev => prev.map(d => d.id === doc.id ? { ...d, visibility: newVisibility } : d));
        } catch (err) {
            console.error("Failed to update visibility:", err);
            alert("Gagal memperbarui visibilitas file.");
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <div className="p-6 bg-white border border-gray-100 rounded-[2rem] animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-12 bg-gray-50 rounded-2xl"></div>
                    <div className="h-12 bg-gray-50 rounded-2xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white border border-gray-100 rounded-[2rem] space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-600 text-white rounded-lg"><FiFileText size={14} /></div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-900">Design Documents Review</h4>
                </div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                    {documents.length} Files
                </span>
            </div>

            {documents.length > 0 ? (
                <div className="space-y-3">
                    {documents.map((doc) => (
                        <div key={doc.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-indigo-200 transition-all group">
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 bg-white rounded-xl text-indigo-500 shadow-sm">
                                    <FiFileText size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-gray-800 truncate mb-0.5">{doc.title}</p>
                                    <p className="text-[9px] text-gray-400 font-medium truncate mb-2 italic">{doc.fileName}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border ${
                                            doc.visibility === 'customer_visible' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}>
                                            {doc.visibility === 'customer_visible' ? 'Released to Customer' : 'Internal Only'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleToggleVisibility(doc)}
                                        disabled={updatingId === doc.id}
                                        className={`p-2 rounded-xl border transition-all ${
                                            doc.visibility === 'customer_visible' 
                                            ? 'bg-amber-50 border-amber-100 text-amber-600 hover:bg-amber-100' 
                                            : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100'
                                        }`}
                                        title={doc.visibility === 'customer_visible' ? "Hide from Customer" : "Release to Customer"}
                                    >
                                        {updatingId === doc.id ? (
                                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                        ) : doc.visibility === 'customer_visible' ? (
                                            <FiEyeOff size={16} />
                                        ) : (
                                            <FiEye size={16} />
                                        )}
                                    </button>
                                    <a 
                                        href={doc.fileUrl ? `http://localhost:4000${doc.fileUrl}` : "#"} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="p-2 bg-white border border-gray-100 text-gray-400 rounded-xl hover:text-indigo-600 hover:border-indigo-600 transition-all"
                                    >
                                        <FiExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-8 text-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Belum ada file desain dari Arsitek.</p>
                </div>
            )}
        </div>
    );
};

export default DesignDocumentReviewPanel;
