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
            // Fetch all documents for this customer to show transparency
            const response = await administrativeHelperDocumentService.getDocuments({ 
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

            {/* Documents List */}
            {documents.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-neutral-200">
                    <div className="w-20 h-20 bg-neutral-100 rounded-3xl flex items-center justify-center text-neutral-300 mx-auto mb-6">
                        <FiFileText size={40} />
                    </div>
                    <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Belum Ada Dokumen Terdaftar</h3>
                    <p className="text-sm text-neutral-500 mt-2 max-w-sm mx-auto font-bold uppercase italic tracking-tighter">
                        Admin belum menyiapkan draft dokumen atau helper administrasi untuk Anda saat ini.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {documents.map((doc, idx) => {
                        const isReleased = doc.status === 'released';
                        const isReviewed = doc.status === 'reviewed';
                        
                        return (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={doc.id}
                                className={`bg-white p-8 rounded-[40px] border shadow-xl hover:shadow-teal-600/5 transition-all group border-l-8 ${
                                    isReleased ? 'border-neutral-100 border-l-teal-600' : 
                                    isReviewed ? 'border-amber-100 border-l-amber-500' : 'border-slate-100 border-l-slate-400'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className={`text-[10px] font-black uppercase tracking-widest ${isReleased ? 'text-teal-600' : 'text-neutral-400'}`}>
                                                {doc.documentCode}
                                            </p>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                                                isReleased ? 'bg-teal-50 text-teal-600 border-teal-100' :
                                                isReviewed ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                'bg-slate-100 text-slate-500 border-slate-200'
                                            }`}>
                                                {doc.status}
                                            </span>
                                        </div>
                                        <h3 className={`text-xl font-black text-neutral-900 ${isReleased ? 'group-hover:text-teal-600' : ''} transition-colors`}>
                                            {doc.title}
                                        </h3>
                                    </div>
                                    <div className={`p-3 rounded-2xl border ${
                                        isReleased ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                        'bg-neutral-50 text-neutral-300 border-neutral-100'
                                    }`}>
                                        <FiCheckCircle size={20} />
                                    </div>
                                </div>

                                <p className="text-xs font-bold text-neutral-500 mb-8 leading-relaxed italic uppercase tracking-tight">
                                    {doc.summaryData || "Ringkasan dokumen sedang disiapkan."}
                                </p>

                                {!isReleased && (
                                    <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                                        <FiInfo className="text-amber-600 shrink-0 mt-0.5" size={14} />
                                        <p className="text-[10px] font-black text-amber-800 uppercase tracking-tighter leading-tight italic">
                                            Dokumen ini masih dalam tahap {doc.status === 'reviewed' ? 'Review Admin' : 'Draft Internal'} dan belum dirilis secara resmi untuk Konsumen.
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Pembaruan Terakhir</p>
                                        <p className="text-xs font-black text-neutral-700">
                                            {new Date(doc.updatedAt || doc.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            disabled={!isReleased || !doc.fileUrl}
                                            onClick={() => doc.fileUrl ? window.open(doc.fileUrl, '_blank') : alert("File belum diunggah dalam fase simulasi lokal ini.")}
                                            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                isReleased && doc.fileUrl 
                                                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20 hover:scale-105" 
                                                : "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                                            }`}
                                        >
                                            <FiDownload /> {isReleased && doc.fileUrl ? "Download" : "Belum Tersedia"}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
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
