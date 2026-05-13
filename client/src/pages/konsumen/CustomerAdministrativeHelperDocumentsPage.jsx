import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    FiFileText, 
    FiDownload, 
    FiCheckCircle,
    FiInfo,
    FiExternalLink
} from "react-icons/fi";
import administrativeHelperDocumentService from "../../services/administrativeHelperDocumentService";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";

const CustomerAdministrativeHelperDocumentsPage = () => {
    const { selectedCustomerId } = useCustomerPersona();
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (selectedCustomerId) {
            fetchDocuments();
        }
    }, [selectedCustomerId]);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            // Only show RELEASED documents for customers
            const response = await administrativeHelperDocumentService.getDocuments({ 
                status: 'released',
                customerId: selectedCustomerId 
            });
            setDocuments(response.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching helper documents:", error);
            setLoading(false);
        }
    };

    if (loading) return <RoleDataState type="loading" message="Menyiapkan dokumen Anda..." />;

    return (
        <div className="animate-fadeIn space-y-10 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black tracking-tighter text-neutral-900 uppercase">
                    Pusat <span className="text-teal-600">Dokumen Digital</span>
                </h1>
                <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed mt-2 font-bold uppercase italic tracking-tighter">
                    Akses draft dokumen, referensi administratif, dan helper digital proyek Anda untuk fase Local Development.
                </p>
            </div>

            {/* Released Documents List */}
            {documents.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-neutral-200">
                    <div className="w-20 h-20 bg-neutral-100 rounded-3xl flex items-center justify-center text-neutral-300 mx-auto mb-6">
                        <FiFileText size={40} />
                    </div>
                    <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Belum Ada Dokumen Dirilis</h3>
                    <p className="text-sm text-neutral-500 mt-2 max-w-sm mx-auto font-bold uppercase italic tracking-tighter">
                        Admin belum merilis draft dokumen atau helper administrasi untuk Anda saat ini.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {documents.map((doc, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={doc.id}
                            className="bg-white p-8 rounded-[40px] border border-neutral-100 shadow-xl hover:shadow-teal-600/5 transition-all group border-l-8 border-l-teal-600"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{doc.documentCode}</p>
                                    <h3 className="text-xl font-black text-neutral-900 group-hover:text-teal-600 transition-colors">{doc.title}</h3>
                                </div>
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                                    <FiCheckCircle size={20} />
                                </div>
                            </div>

                            <p className="text-xs font-bold text-neutral-500 mb-8 leading-relaxed italic uppercase tracking-tight">
                                {doc.summaryData || "Ringkasan dokumen tidak tersedia."}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                                <div className="flex flex-col">
                                    <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Tanggal Rilis</p>
                                    <p className="text-xs font-black text-neutral-700">
                                        {new Date(doc.releasedAt || doc.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        disabled={!doc.fileUrl}
                                        onClick={() => doc.fileUrl ? window.open(doc.fileUrl, '_blank') : alert("File belum diunggah dalam fase simulasi lokal ini.")}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                            doc.fileUrl 
                                            ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20 hover:scale-105" 
                                            : "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                                        }`}
                                    >
                                        <FiDownload /> {doc.fileUrl ? "Download" : "Belum Tersedia"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Informational Note */}
            <div className="p-8 bg-teal-50 rounded-[40px] border border-teal-100 flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm border border-teal-200 shrink-0">
                    <FiInfo size={24} />
                </div>
                <div>
                    <h4 className="text-sm font-black text-neutral-900 uppercase tracking-widest mb-2">Informasi Transparansi Dokumen</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed font-bold uppercase italic tracking-tighter">
                        Seluruh dokumen di halaman ini adalah <span className="text-teal-600">Administrative Helper Draft</span> untuk mempermudah monitoring lokal. Dokumen ini <strong>bukan merupakan dokumen legal final</strong>. Pengesahan hukum, tanda tangan basah/digital resmi, dan invoice pajak tetap mengikuti prosedur offline/manual di luar sistem simulasi ini.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerAdministrativeHelperDocumentsPage;
