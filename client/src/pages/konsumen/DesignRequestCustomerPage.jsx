import React, { useState, useEffect } from "react";
import { 
    FiPlus, 
    FiSearch, 
    FiClock, 
    FiCheckCircle, 
    FiMapPin,
    FiInfo,
    FiArrowRight,
    FiX,
    FiFileText,
    FiDollarSign,
    FiType
} from "react-icons/fi";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import designRequestService from "../../services/designRequestService";
import RoleDataState from "../../components/common/RoleDataState";

const DesignRequestCustomerPage = () => {
    const { selectedCustomerId } = useCustomerPersona();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Create Form State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        buildingType: "",
        location: "",
        estimatedBudget: ""
    });

    const fetchRequests = async () => {
        if (!selectedCustomerId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const res = await designRequestService.getAllDesignRequests({ customerId: selectedCustomerId });
            setRequests(res.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching customer design requests:", err);
            setError("Gagal memuat daftar permintaan desain.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [selectedCustomerId]);

    const handleOpenForm = () => {
        setFormData({
            title: "",
            description: "",
            buildingType: "",
            location: "",
            estimatedBudget: ""
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCustomerId) return;

        try {
            setSubmitting(true);
            const payload = {
                ...formData,
                estimatedBudget: formData.estimatedBudget ? Number(formData.estimatedBudget) : null,
                customerId: selectedCustomerId
            };
            await designRequestService.createDesignRequest(payload);
            setIsFormOpen(false);
            fetchRequests(); // Refresh list
        } catch (err) {
            console.error("Error creating design request:", err);
            alert("Gagal mengirimkan permintaan desain. Silakan coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredRequests = requests.filter(r => 
        r.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusLabel = (status) => {
        const labels = {
            submitted: "Diajukan",
            assigned: "Arsitek Dipilih",
            in_review: "Sedang Direview",
            approved: "Disetujui",
            rejected: "Ditolak",
            draft: "Draft"
        };
        return labels[status] || status;
    };

    if (loading && selectedCustomerId && requests.length === 0) return <RoleDataState type="loading" message="Memuat data pengajuan desain..." />;
    if (!selectedCustomerId) return <RoleDataState type="empty" message="Pilih persona konsumen terlebih dahulu." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchRequests} />;

    return (
        <div className="animate-fadeIn space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-800">Permintaan Desain (Local Draft)</h2>
                    <p className="text-sm text-gray-500 mt-1">Simulasikan pengajuan brief desain arsitektur Anda dalam fase Local Development.</p>
                </div>
                <button 
                    onClick={handleOpenForm}
                    className="flex items-center justify-center gap-3 px-6 py-3.5 bg-teal-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-teal-600/20 hover:scale-[1.02] transition-all"
                >
                    <FiPlus size={20} />
                    Buat Draft Permintaan
                </button>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm">
                <div className="mb-8 relative max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Cari judul pengajuan..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                </div>

                {filteredRequests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredRequests.map((r) => (
                            <div key={r.id} className="p-6 border border-gray-100 rounded-3xl hover:border-teal-500/30 transition-all bg-white shadow-sm group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: {r.id.slice(-8)}</p>
                                        <h3 className="text-lg font-black text-gray-800 group-hover:text-teal-700 transition-colors">{r.title}</h3>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                                        r.status === 'submitted' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                        r.status === 'assigned' ? "bg-purple-50 text-purple-600 border-purple-100" :
                                        r.status === 'in_review' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                        r.status === 'approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                        "bg-gray-50 text-gray-600 border-gray-100"
                                    }`}>
                                        {getStatusLabel(r.status)}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <FiMapPin className="shrink-0" />
                                        <span className="truncate">{r.location || "Lokasi belum ditentukan"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <FiClock className="shrink-0" />
                                        <span>Update: {new Date(r.updatedAt).toLocaleDateString("id-ID")}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                                            <FiCheckCircle size={14} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Arsitek</p>
                                            <p className="text-[11px] font-bold text-gray-700">{r.architect?.name || "Menunggu Penugasan"}</p>
                                        </div>
                                    </div>
                                    <div 
                                        onClick={() => alert("Fitur chat/kontak arsitek sedang disiapkan (Phase Local CRUD). Silakan hubungi Admin RKK.")}
                                        className="text-[10px] font-black text-teal-600 uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                                    >
                                        Hubungi Admin <FiArrowRight />
                                    </div>
                                </div>
                            </div>
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

            {/* CREATE FORM MODAL */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsFormOpen(false)}></div>
                    <div className="bg-white rounded-[32px] w-full max-w-xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-scaleIn">
                        <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                            <div>
                                <h3 className="text-xl font-black text-gray-800">Buat Draft Brief Desain</h3>
                                <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest mt-0.5">Simulasi pengajuan brief lokal</p>
                            </div>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><FiX size={24} /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                                    <FiFileText /> Judul Pengajuan / Nama Proyek
                                </label>
                                <input 
                                    required 
                                    type="text" 
                                    placeholder="Contoh: Desain Rumah Minimalis Modern Tropis"
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" 
                                    value={formData.title} 
                                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                                        <FiType /> Tipe Bangunan
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Rumah Tinggal, Ruko, dsb"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" 
                                        value={formData.buildingType} 
                                        onChange={(e) => setFormData({...formData, buildingType: e.target.value})} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                                        <FiDollarSign /> Estimasi Budget
                                    </label>
                                    <input 
                                        type="number" 
                                        placeholder="Dalam Rupiah"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" 
                                        value={formData.estimatedBudget} 
                                        onChange={(e) => setFormData({...formData, estimatedBudget: e.target.value})} 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                                    <FiMapPin /> Lokasi Pembangunan
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Alamat lengkap atau kota"
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" 
                                    value={formData.location} 
                                    onChange={(e) => setFormData({...formData, location: e.target.value})} 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                                    <FiInfo /> Deskripsi Brief / Keinginan
                                </label>
                                <textarea 
                                    rows="4" 
                                    placeholder="Jelaskan detail kebutuhan Anda (jumlah kamar, gaya arsitektur, dsb)..."
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none" 
                                    value={formData.description || ""} 
                                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                                />
                                <p className="text-[10px] text-amber-600 font-bold italic mt-2">
                                    * Ini adalah formulir simulasi lokal. Data akan disimpan di database pengembangan.
                                </p>
                            </div>
                            </div>

                            <div className="pt-6 flex flex-col md:flex-row gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsFormOpen(false)} 
                                    className="flex-1 px-6 py-3.5 border border-gray-100 text-gray-400 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={submitting} 
                                    className="flex-[2] px-8 py-3.5 bg-teal-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {submitting ? "Mengirimkan..." : "Kirim Pengajuan Desain"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DesignRequestCustomerPage;
