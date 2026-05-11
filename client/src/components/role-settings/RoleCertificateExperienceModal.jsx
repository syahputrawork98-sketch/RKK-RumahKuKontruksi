import React from 'react';
import { FiAward, FiBriefcase, FiX, FiAlertCircle } from "react-icons/fi";

const RoleCertificateExperienceModal = ({ 
    isOpen, 
    onClose, 
    modalType, 
    isEditing, 
    formData, 
    onFormChange, 
    onSubmit, 
    isActionLoading 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}></div>
            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-zoomIn flex flex-col border border-slate-100">
                <div className="p-8 border-b flex items-center justify-between bg-white relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[var(--dashboard-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--dashboard-primary)]">
                            {modalType === 'certificate' ? <FiAward size={24} /> : <FiBriefcase size={24} />}
                        </div>
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-slate-800">
                                {isEditing ? 'Ubah' : 'Tambah'} {modalType === 'certificate' ? 'Sertifikat' : 'Pengalaman'}
                            </h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5 italic">
                                Data Lokal (Unverified)
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-800 transition-all border border-slate-100"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh] scrollbar-hide">
                    {modalType === 'certificate' ? (
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Sertifikat *</label>
                                <input required name="title" value={formData.title || ''} onChange={onFormChange} placeholder="Contoh: Ahli Pengawas Konstruksi" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[var(--dashboard-primary)]/5 transition-all outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Penerbit</label>
                                    <input name="issuer" value={formData.issuer || ''} onChange={onFormChange} placeholder="LPJK, PII, dll" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</label>
                                    <input name="category" value={formData.category || ''} onChange={onFormChange} placeholder="Keahlian" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nomor Sertifikat</label>
                                <input name="certificateNumber" value={formData.certificateNumber || ''} onChange={onFormChange} placeholder="No. Reg / Seri" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tgl Terbit</label>
                                    <input type="date" name="issuedAt" value={formData.issuedAt || ''} onChange={onFormChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tgl Kadaluarsa</label>
                                    <input type="date" name="expiredAt" value={formData.expiredAt || ''} onChange={onFormChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Catatan</label>
                                <textarea name="notes" value={formData.notes || ''} onChange={onFormChange} placeholder="Keterangan tambahan..." className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none h-24 resize-none" />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Proyek *</label>
                                <input required name="projectName" value={formData.projectName || ''} onChange={onFormChange} placeholder="Contoh: Pengawasan Gedung Perkantoran" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instansi / Owner</label>
                                    <input name="companyName" value={formData.companyName || ''} onChange={onFormChange} placeholder="Nama Perusahaan / Dinas" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jabatan / Role</label>
                                    <input name="role" value={formData.role || ''} onChange={onFormChange} placeholder="Contoh: Site Supervisor" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi Proyek</label>
                                <input name="location" value={formData.location || ''} onChange={onFormChange} placeholder="Contoh: Surabaya, Jawa Timur" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tahun Mulai</label>
                                    <input type="number" name="startYear" value={formData.startYear || ''} onChange={onFormChange} placeholder="2018" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tahun Selesai</label>
                                    <input type="number" name="endYear" value={formData.endYear || ''} onChange={onFormChange} placeholder="2020 (Kosongkan jika aktif)" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deskripsi Pekerjaan</label>
                                <textarea name="description" value={formData.description || ''} onChange={onFormChange} placeholder="Ceritakan lingkup pengawasan Anda..." className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none h-24 resize-none" />
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={isActionLoading}
                            className="w-full py-5 bg-slate-800 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-900 active:scale-95 transition-all shadow-xl shadow-slate-800/20 disabled:opacity-50"
                        >
                            {isActionLoading ? 'Memproses...' : (isEditing ? 'SIMPAN PERUBAHAN' : 'TAMBAH DATA LOKAL')}
                        </button>
                        <p className="text-[9px] text-slate-400 font-bold text-center mt-4 uppercase tracking-widest italic">
                            <FiAlertCircle className="inline mr-1" /> Data akan tersimpan sebagai riwayat lokal unverified.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoleCertificateExperienceModal;
