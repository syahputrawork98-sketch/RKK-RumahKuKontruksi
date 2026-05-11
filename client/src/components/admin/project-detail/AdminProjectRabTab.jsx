import React from "react";
import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi";
import { formatCurrency } from "./ProjectDetailUIHelpers";

const AdminProjectRabTab = ({ project, rabPlan }) => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Ringkasan RAB</h3>
                <Link 
                    to={`/admin/rab/${project.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-bold shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-105 transition-all"
                >
                    Kelola RAB
                </Link>
            </div>

            {rabPlan ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl shadow-sm">
                            <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">Total RAB</p>
                            <h4 className="text-xl font-black text-emerald-700">{formatCurrency(rabPlan.totalAmount)}</h4>
                        </div>
                        <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl shadow-sm">
                            <p className="text-[10px] font-black uppercase text-blue-600 mb-1">Kategori / Item</p>
                            <h4 className="text-xl font-black text-blue-700">{rabPlan.categories?.length || 0} / {rabPlan.categories?.reduce((sum, c) => sum + (c.items?.length || 0), 0)}</h4>
                        </div>
                        <div className="p-6 bg-purple-50 border border-purple-100 rounded-3xl shadow-sm">
                            <p className="text-[10px] font-black uppercase text-purple-600 mb-1">Status RAB</p>
                            <h4 className="text-xl font-black text-purple-700 uppercase tracking-widest">{rabPlan.status}</h4>
                        </div>
                    </div>

                    <div className="pt-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Struktur Kategori Utama</h4>
                        <div className="space-y-3">
                            {rabPlan.categories?.map(cat => (
                                <div key={cat.id} className="flex justify-between items-center p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] hover:border-[var(--dashboard-primary)] transition-all group">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-[var(--dashboard-text-soft)] bg-white px-2 py-1 rounded-lg border border-[var(--dashboard-border)] shadow-sm group-hover:text-[var(--dashboard-primary)] group-hover:border-[var(--dashboard-primary)]/30 transition-all">#{cat.code}</span>
                                        <span className="text-sm font-bold group-hover:text-[var(--dashboard-primary)] transition-all">{cat.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-emerald-600 group-hover:scale-105 transition-all">{formatCurrency(cat.subtotal)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[var(--dashboard-border)] rounded-3xl">
                    <FiFileText size={48} className="text-[var(--dashboard-text-soft)] opacity-20 mb-4" />
                    <p className="text-sm font-bold text-[var(--dashboard-text-soft)]">Belum ada RAB untuk proyek ini.</p>
                    <Link 
                        to={`/admin/rab/${project.id}`}
                        className="mt-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-primary)] hover:underline"
                    >
                        Buat RAB Plan Baru
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AdminProjectRabTab;
