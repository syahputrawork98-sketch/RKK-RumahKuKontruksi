import React, { useState, useEffect } from "react";
import { 
    FiPlus, 
    FiSearch, 
    FiEdit2, 
    FiTrash2, 
    FiUser, 
    FiBriefcase, 
    FiPhone, 
    FiMail, 
    FiMapPin, 
    FiX, 
    FiCheck,
    FiMoreVertical
} from "react-icons/fi";
import customerService from "../../services/customerService";
import RoleDataState from "../../components/common/RoleDataState";

const CustomerAdminPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        customerType: "Individual",
        name: "",
        email: "",
        phone: "",
        address: "",
        companyName: "",
        picName: "",
        picPosition: "",
        taxNumber: "",
        businessField: "",
        notes: ""
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const res = await customerService.getAllCustomers();
            setCustomers(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching customers:", err);
            setError("Gagal memuat daftar konsumen. Silakan coba lagi.");
            setLoading(false);
        }
    };

    const handleOpenModal = (customer = null) => {
        if (customer) {
            setCurrentCustomer(customer);
            setFormData({
                customerType: customer.customerType || "Individual",
                name: customer.name || "",
                email: customer.email || "",
                phone: customer.phone || "",
                address: customer.address || "",
                companyName: customer.companyName || "",
                picName: customer.picName || "",
                picPosition: customer.picPosition || "",
                taxNumber: customer.taxNumber || "",
                businessField: customer.businessField || "",
                notes: customer.notes || ""
            });
        } else {
            setCurrentCustomer(null);
            setFormData({
                customerType: "Individual",
                name: "",
                email: "",
                phone: "",
                address: "",
                companyName: "",
                picName: "",
                picPosition: "",
                taxNumber: "",
                businessField: "",
                notes: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            if (currentCustomer) {
                await customerService.updateCustomer(currentCustomer.id, formData);
            } else {
                await customerService.createCustomer(formData);
            }
            setIsModalOpen(false);
            fetchCustomers();
        } catch (err) {
            console.error("Error saving customer:", err);
            alert("Gagal menyimpan data konsumen: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menonaktifkan konsumen ini?")) {
            try {
                await customerService.deleteCustomer(id);
                fetchCustomers();
            } catch (err) {
                console.error("Error deleting customer:", err);
                alert("Gagal menghapus konsumen: " + (err.response?.data?.message || err.message));
            }
        }
    };

    const filteredCustomers = (Array.isArray(customers) ? customers : []).filter(c => {
        if (!c) return false;
        return (c.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
               (c.companyName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
               (c.email?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    });

    if (loading) return <RoleDataState type="loading" message="Memuat data konsumen..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchCustomers} />;

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Data Konsumen</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Manajemen profil konsumen retail dan korporat untuk koordinasi proyek.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                >
                    <FiPlus size={18} />
                    Tambah Konsumen
                </button>
            </div>

            {/* AUTHORITY BOUNDARY DISCLAIMER */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                    <FiAlertCircle size={20} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Local Data Management Boundary</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                        Modul ini digunakan untuk **pengelolaan profil data konsumen** guna keperluan administrasi proyek RKK. Sistem ini **tidak mengelola kredensial akun**, password, atau autentikasi konsumen. Perubahan data di sini bersifat administratif lokal dan tidak mempengaruhi sistem akses global.
                    </p>
                </div>
            </div>

            <div className="dashboard-card">
                {/* FILTERS */}
                <div className="mb-6">
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari nama, perusahaan, atau email..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    {filteredCustomers.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)]">
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Konsumen</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Tipe</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Kontak</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Lokasi</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((c) => (
                                    <tr key={c.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                        <td className="py-4 px-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600 font-bold">
                                                    {c.customerType === "Corporate" ? <FiBriefcase /> : <FiUser />}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-[var(--dashboard-text)]">
                                                        {c.customerType === "Corporate" ? c.companyName : c.name}
                                                    </span>
                                                    {c.customerType === "Corporate" && (
                                                        <span className="text-[10px] text-[var(--dashboard-text-soft)] uppercase font-bold tracking-tight">
                                                            PIC: {c.picName || "-"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                                c.customerType === "Corporate" ? "bg-purple-500/10 text-purple-600" : "bg-blue-500/10 text-blue-600"
                                            }`}>
                                                {c.customerType}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-xs text-[var(--dashboard-text-soft)]">
                                                    <FiMail className="shrink-0" />
                                                    <span className="truncate max-w-[150px]">{c.email || "-"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-[var(--dashboard-text-soft)]">
                                                    <FiPhone className="shrink-0" />
                                                    <span>{c.phone || "-"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex items-center gap-2 text-xs text-[var(--dashboard-text-soft)] max-w-[200px]">
                                                <FiMapPin className="shrink-0" />
                                                <span className="truncate">{c.address || "-"}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => handleOpenModal(c)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(c.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Hapus"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <RoleDataState type="empty" message="Belum ada konsumen yang terdaftar." />
                    )}
                </div>
            </div>

            {/* MODAL FORM */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-scaleIn">
                        <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                            <h3 className="text-xl font-extrabold text-[var(--dashboard-text)]">
                                {currentCustomer ? "Edit Konsumen" : "Tambah Konsumen Baru"}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                                <FiX size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Tipe Konsumen */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Tipe Konsumen</label>
                                <div className="flex gap-4">
                                    {["Individual", "Corporate"].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setFormData({...formData, customerType: type})}
                                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                                                formData.customerType === type 
                                                ? "bg-teal-500 border-teal-500 text-white shadow-md shadow-teal-500/20" 
                                                : "bg-white border-gray-200 text-gray-600 hover:border-teal-500/30"
                                            }`}
                                        >
                                            {formData.customerType === type && <FiCheck />}
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {formData.customerType === "Individual" ? (
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Nama Lengkap</label>
                                        <input 
                                            required
                                            type="text" 
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                            placeholder="Nama Konsumen..."
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Nama Perusahaan</label>
                                            <input 
                                                required
                                                type="text" 
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                                placeholder="PT. Contoh Perusahaan..."
                                                value={formData.companyName}
                                                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Nama PIC</label>
                                            <input 
                                                type="text" 
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                                placeholder="Nama PIC..."
                                                value={formData.picName}
                                                onChange={(e) => setFormData({...formData, picName: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Jabatan PIC</label>
                                            <input 
                                                type="text" 
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                                placeholder="Jabatan PIC..."
                                                value={formData.picPosition}
                                                onChange={(e) => setFormData({...formData, picPosition: e.target.value})}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email</label>
                                    <input 
                                        required
                                        type="email" 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                        placeholder="email@contoh.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Telepon</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                        placeholder="0812xxxx"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Alamat Lengkap</label>
                                    <textarea 
                                        rows="3"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                        placeholder="Alamat penagihan/domisili..."
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Catatan / Keterangan</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                        placeholder="Catatan tambahan..."
                                        value={formData.notes}
                                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 border border-gray-200 text-gray-500 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className={`px-8 py-3 bg-teal-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-teal-600/20 hover:scale-[1.02] transition-all flex items-center gap-2 ${
                                        submitting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                >
                                    <FiCheck />
                                    {submitting ? "Menyimpan..." : "Simpan Data"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerAdminPage;
