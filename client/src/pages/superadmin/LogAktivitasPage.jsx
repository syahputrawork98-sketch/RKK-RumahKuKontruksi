import React, { useState } from "react";
import { FiSearch, FiFilter, FiDownload, FiInfo, FiUser, FiClock, FiActivity, FiLock } from "react-icons/fi";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";

const LogAktivitasPage = () => {
    const { selectedSuperadminId } = useSuperadminPersona();
    const [search, setSearch] = useState("");

    if (!selectedSuperadminId) {
        return <RoleDataState type="empty" message="Pilih persona Superadmin untuk mengakses log aktivitas." />;
    }

    return (
        <div className="animate-fadeIn">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="dashboard-title text-4xl">Pusat Audit & Approval Lokal</h1>
                    <p className="dashboard-subtitle text-lg italic font-medium text-amber-600 underline decoration-amber-200">Rencana alur Audit Trail dan Profile Change Approval. *Fase Local CRUD - Local Hold*</p>
                </div>
                <button 
                    disabled 
                    title="Fitur Ekspor Log akan aktif pada workflow Audit Trail"
                    className="dashboard-primary-button flex items-center gap-2 !bg-neutral-100 !text-neutral-400 border border-neutral-200 shadow-none cursor-not-allowed opacity-60"
                >
                    <FiDownload size={18} />
                    <span>Ekspor Log (Planned)</span>
                </button>
            </div>

            {/* HOLD STATE CARD */}
            <div className="dashboard-card flex flex-col items-center justify-center py-20 text-center border-dashed border-2 border-neutral-200 bg-neutral-50/30">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-neutral-300 mb-8 shadow-sm border border-neutral-100">
                    <FiLock size={40} />
                </div>
                <h2 className="text-2xl font-black text-neutral-800 mb-3 tracking-tighter uppercase">Modul Audit & Approval Lokal</h2>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">— Planned Workflow / Local Hold —</p>
                
                <div className="max-w-2xl mx-auto space-y-6 mb-10">
                    <p className="text-sm text-neutral-500 leading-relaxed">
                        Sistem **Audit Trail** (pencatatan otomatis aktivitas database) dan **Profile Change Approval** (antrian persetujuan untuk data sensitif) saat ini berada dalam tahap **Local Hold**. Workflow ini akan mengarahkan setiap perubahan profil penting dari Mandor, Arsitek, atau Pengawas ke panel review Admin/Superadmin sebelum data tersebut diperbarui secara permanen.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="p-4 bg-white rounded-2xl border border-neutral-100 space-y-2">
                            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Data Butuh Approval (Planned):</h4>
                            <ul className="text-[11px] font-bold text-neutral-600 space-y-1.5">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-400 rounded-full"></div> Nomor Telepon & Email</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-400 rounded-full"></div> Alamat & Domisili</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-400 rounded-full"></div> Nama Perusahaan / Instansi</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-400 rounded-full"></div> Sertifikat Keahlian & Portfolio</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-white rounded-2xl border border-neutral-100 space-y-2">
                            <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Audit Trail Scope (Planned):</h4>
                            <ul className="text-[11px] font-bold text-neutral-600 space-y-1.5">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-400 rounded-full"></div> Pembuatan/Penghapusan RAB</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-400 rounded-full"></div> Perubahan Status Proyek</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-400 rounded-full"></div> Distribusi Material Logistik</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-400 rounded-full"></div> Verifikasi Progres SOT</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 px-6 py-2.5 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm">
                        <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse"></span>
                        <span className="text-xs font-black text-amber-700 uppercase tracking-widest">Status: Local Hold (Next Iteration)</span>
                    </div>
                    <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest italic opacity-60">
                        * Antrian approval dan log aktivitas belum menyimpan data ke database rill pada batch ini.
                    </p>
                </div>
            </div>

            {/* PLACEHOLDER FOR FUTURE UI */}
            <div className="mt-10 opacity-30 pointer-events-none grayscale">
                <div className="dashboard-card p-6 mb-8 flex items-center justify-between">
                    <div className="h-10 w-64 bg-neutral-200 rounded-xl"></div>
                    <div className="h-10 w-32 bg-neutral-200 rounded-xl"></div>
                </div>
                <div className="dashboard-table-card h-64 bg-neutral-100"></div>
            </div>
        </div>
    );
};

export default LogAktivitasPage;
