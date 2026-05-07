import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPrinter, FiDownload, FiPlus } from "react-icons/fi";

const DetailRabAdminPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const rabData = {
        prjKode: projectId || "PRJ-001",
        prjName: "Renovasi Rumah Bpk. Budi",
        total: "Rp 750.000.000",
        categories: [
            {
                name: "I. PEKERJAAN PERSIAPAN",
                items: [
                    { name: "Pembersihan Lokasi", vol: 1, sat: "ls", price: 2500000, total: 2500000 },
                    { name: "Direksi Keet & Gudang", vol: 1, sat: "ls", price: 7500000, total: 7500000 },
                    { name: "Pasang Bouwplank", vol: 45, sat: "m1", price: 85000, total: 3825000 },
                ]
            },
            {
                name: "II. PEKERJAAN TANAH & PONDASI",
                items: [
                    { name: "Galian Tanah Pondasi", vol: 32, sat: "m3", price: 95000, total: 3040000 },
                    { name: "Pasangan Batu Kali", vol: 28, sat: "m3", price: 850000, total: 23800000 },
                    { name: "Urugan Pasir Pondasi", vol: 8, sat: "m3", price: 220000, total: 1760000 },
                ]
            }
        ]
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/admin/rab")}
                        className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-xl font-black tracking-tight">Detail RAB: {rabData.prjKode}</h2>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold uppercase tracking-wide">{rabData.prjName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold"><FiPrinter /> Cetak</button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-bold shadow-lg shadow-[var(--dashboard-primary)]/20"><FiDownload /> Export Excel</button>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="flex justify-between items-center mb-8 bg-[var(--dashboard-surface-soft)] p-6 rounded-2xl border border-[var(--dashboard-border)]">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Total Estimasi RAB</p>
                        <h3 className="text-3xl font-black text-emerald-600 mt-1">{rabData.total}</h3>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                        <FiPlus /> Tambah Kategori
                    </button>
                </div>

                <div className="space-y-10">
                    {rabData.categories.map((cat, idx) => (
                        <div key={idx} className="space-y-4">
                            <div className="flex items-center justify-between border-b-2 border-[var(--dashboard-primary)]/20 pb-2">
                                <h4 className="text-sm font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{cat.name}</h4>
                                <span className="text-xs font-black">Subtotal: Rp {cat.items.reduce((a, b) => a + b.total, 0).toLocaleString("id-ID")}</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-black uppercase tracking-tighter text-[var(--dashboard-text-soft)]">
                                            <th className="py-2 px-2">Nama Item Pekerjaan</th>
                                            <th className="py-2 px-2 text-center">Volume</th>
                                            <th className="py-2 px-2 text-center">Satuan</th>
                                            <th className="py-2 px-2 text-right">Harga Satuan</th>
                                            <th className="py-2 px-2 text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cat.items.map((item, iidx) => (
                                            <tr key={iidx} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/30 transition-colors">
                                                <td className="py-3 px-2 text-xs font-bold">{item.name}</td>
                                                <td className="py-3 px-2 text-xs text-center font-bold">{item.vol}</td>
                                                <td className="py-3 px-2 text-xs text-center uppercase font-bold text-[var(--dashboard-text-soft)]">{item.sat}</td>
                                                <td className="py-3 px-2 text-xs text-right font-medium">Rp {item.price.toLocaleString("id-ID")}</td>
                                                <td className="py-3 px-2 text-xs text-right font-black">Rp {item.total.toLocaleString("id-ID")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailRabAdminPage;
