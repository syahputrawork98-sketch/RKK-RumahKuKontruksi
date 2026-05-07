import React from "react";
import { FiFileText, FiDownload, FiSearch, FiUpload } from "react-icons/fi";

const FileDesainArsitekPage = () => {
    const files = [
        { id: 1, name: "Denah_Lantai_1_Rev2.pdf", request: "DR-003", type: "PDF", size: "2.4 MB", date: "06 Mei 2026", status: "Approved" },
        { id: 2, name: "Konsep_3D_Exterior.jpg", request: "DR-004", type: "Image", size: "5.1 MB", date: "07 Mei 2026", status: "Pending" },
        { id: 3, name: "Gambar_Kerja_ME.dwg", request: "DR-002", type: "AutoCAD", size: "12.8 MB", date: "04 Mei 2026", status: "Handover" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">File Desain</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pusat penyimpanan dokumen dan gambar hasil desain.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">
                    <FiUpload />
                    Upload File Baru
                </button>
            </div>

            <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari nama file atau ID permintaan..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Nama File</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Permintaan</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Ukuran</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Tanggal</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => (
                                <tr key={file.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[var(--dashboard-surface-soft)] rounded-lg text-[var(--dashboard-primary)]"><FiFileText /></div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold">{file.name}</span>
                                                <span className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase">{file.type}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-xs font-black text-[var(--dashboard-primary)]">{file.request}</td>
                                    <td className="py-4 px-2 text-xs font-medium text-[var(--dashboard-text-soft)]">{file.size}</td>
                                    <td className="py-4 px-2 text-xs font-bold">{file.date}</td>
                                    <td className="py-4 px-2">
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                            file.status === "Approved" ? "bg-emerald-500/10 text-emerald-500" :
                                            file.status === "Handover" ? "bg-purple-500/10 text-purple-500" : "bg-amber-500/10 text-amber-500"
                                        }`}>
                                            {file.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <button className="p-2 hover:bg-[var(--dashboard-surface-soft)] rounded-lg text-[var(--dashboard-primary)] transition-all">
                                            <FiDownload />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FileDesainArsitekPage;
