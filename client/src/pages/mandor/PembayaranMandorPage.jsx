import React, { useState, useEffect } from "react";
import { FiCreditCard, FiInfo, FiClock, FiCheckCircle, FiAlertCircle, FiTrendingUp } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import paymentService from "../../services/paymentService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

const PembayaranMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPayments = async () => {
        if (!selectedForemanId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            // In a real app, we filter by foremanId. 
            // In our dev/local mock, we'll fetch all and filter or just show what's available.
            const response = await paymentService.getPayments({ foremanId: selectedForemanId });
            setPayments(response.data || []);
        } catch (err) {
            console.error("Failed to fetch payments:", err);
            setError("Gagal memuat data pembayaran.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [selectedForemanId]);

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Mandor"
                description="Pilih mandor untuk melihat riwayat pembayaran operasional dan opname lapangan."
            />
        );
    }

    if (loading && payments.length === 0 && !error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return <RoleDataState type="error" title={error} onRetry={() => fetchPayments()} />;
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Pembayaran Mandor (Read-only Lokal)</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Catatan administrasi pembayaran opname dan biaya operasional lapangan.</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl flex items-center gap-2">
                    <FiInfo className="text-amber-500" size={16} />
                    <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest leading-none">Simulasi Lokal CRUD</p>
                </div>
            </div>

            {/* DISCLAIMER */}
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4">
                <FiInfo className="text-blue-500 mt-1 shrink-0" size={24} />
                <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-700">Penting: Catatan Pembayaran Lokal</h4>
                    <p className="text-[11px] text-blue-600 font-medium leading-relaxed italic">
                        Data yang tampil di halaman ini adalah <span className="font-black">pencatatan administratif lokal</span> untuk keperluan simulasi pengembangan. 
                        Halaman ini <span className="font-black underline">tidak terhubung</span> ke sistem bank, payment gateway, atau invoice produksi. 
                        Mandor tidak dapat melakukan transaksi finansial riil melalui dashboard ini.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {payments.length === 0 ? (
                    <RoleDataState 
                        type="empty" 
                        title="Belum ada data pembayaran" 
                        description="Belum ada catatan pembayaran atau opname yang divalidasi oleh Admin untuk akun Anda." 
                    />
                ) : (
                    payments.map((payment) => (
                        <div key={payment.id} className="dashboard-card hover:border-[var(--dashboard-primary)]/30 transition-all overflow-hidden border-l-4 border-l-[var(--dashboard-primary)]">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest bg-[var(--dashboard-primary)]/10 px-2 py-0.5 rounded">
                                                {payment.project?.projectCode || "PRJ-??"}
                                            </span>
                                            <span className="text-xs font-black text-slate-800">
                                                {payment.project?.name || "Proyek Lapangan"}
                                            </span>
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            Ref: {payment.paymentCode || payment.id.slice(0, 8)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Nilai Pembayaran</p>
                                            <p className="text-lg font-black text-[var(--dashboard-primary)]">
                                                Rp {new Intl.NumberFormat("id-ID").format(payment.amount)}
                                            </p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tujuan / Deskripsi</p>
                                            <p className="text-xs font-bold text-slate-700 truncate">
                                                {payment.description || "Opname Mingguan / Operasional Lapangan"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <FiClock className="text-slate-400" size={12} />
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                                Tanggal: {new Date(payment.paymentDate || payment.createdAt).toLocaleDateString("id-ID")}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                                Metode: {payment.paymentMethod || "Transfer Lokal (Manual)"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-48 flex flex-col justify-center items-center gap-2 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Verifikasi</p>
                                    <StatusBadge type="payment" status={payment.status} />
                                    {payment.status === "verified" && (
                                        <p className="text-[9px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                                            <FiCheckCircle /> Sudah Terverifikasi
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PembayaranMandorPage;
