import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheckCircle, FiClock, FiFileText, FiCamera, FiCreditCard, FiDownload, FiAlertCircle } from "react-icons/fi";

const DetailPekerjaanProyek = ({ data, onBack, backPath }) => {
  if (!data) return (
    <p className="p-10 text-center text-neutral-60">Tidak ada data laporan untuk ditampilkan.</p>
  );

  // ── Normalisasi: support format lama dan baru ─────────────────────
  const normalized = {
    week: data.week ?? data.minggu,
    code: data.code ?? data.kode,
    title: data.title ?? data.judul,
    tasks: data.tasks ?? data.pekerjaan ?? [],
    startDate: data.startDate ?? data.tanggalMulai,
    endDate: data.endDate ?? data.tanggalSelesai,
    durationDays: data.durationDays ?? data.durasiHari,
    images: data.images ?? data.foto ?? [],
    amount: data.payment?.amount ?? data.biaya?.harusDibayar ?? data.biaya?.harursDibayar ?? 0,
    paid: data.payment?.paid ?? data.biaya?.terbayar ?? 0,
    isVerified: data.verification?.isVerified ?? data.verifikasi ?? false,
    verifiedBy: data.verification?.verifiedBy || (data.verifikasi ? "Pengawas Lapangan" : ""),
    verifiedAt: data.verification?.verifiedAt || "",
    note: data.note ?? data.catatan ?? "",
    status: data.status ?? "pending",
    progress: data.progress ?? 0,
  };

  const remaining = normalized.amount - normalized.paid;

  // ── RAB: gunakan rabItems jika ada, fallback dari tasks ─────────────
  const rabItems = data.rabItems ?? normalized.tasks.map((task, i) => ({
    id: `fallback-rab-${i + 1}`,
    uraian: typeof task === "string" ? task : (task.name ?? "-"),
    lokasi: "-",
    volume: "-",
    satuan: "-",
    hargaSatuan: 0,
    total: 0,
    progress: normalized.isVerified ? 100 : (normalized.progress ?? 0),
    nilaiSelesai: 0,
    keterangan: ""
  }));

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value || 0);

  // ── Tombol Kembali: mendukung onBack, backPath, atau default ────────
  const BackButton = () => {
    if (onBack) {
      return (
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-neutral-20 flex items-center justify-center text-neutral-60 hover:text-primary-main transition-colors border border-neutral-30"
          title="Kembali"
        >
          <FiArrowLeft size={20} />
        </button>
      );
    }
    const href = backPath || "/konsumen/TimelineProyek";
    return (
      <Link
        to={href}
        className="w-10 h-10 rounded-xl bg-neutral-20 flex items-center justify-center text-neutral-60 hover:text-primary-main transition-colors border border-neutral-30"
        title="Kembali ke Timeline"
      >
        <FiArrowLeft size={20} />
      </Link>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* ── 1. Header Laporan ───────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-30 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <p className="text-xs-bold text-primary-main uppercase tracking-widest">
                Laporan Progres Tahap Pekerjaan
              </p>
              <h2 className="text-heading-s-bold md:text-heading-m-bold text-neutral-100">
                Tahap {normalized.code} — {normalized.title}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Badge status */}
            <span className={`px-4 py-2 rounded-xl text-s-bold flex items-center gap-2 border ${
              normalized.isVerified
                ? "bg-success-main/5 text-success-main border-success-main/20"
                : normalized.status === "in_progress"
                ? "bg-primary-main/5 text-primary-main border-primary-main/20"
                : "bg-neutral-20 text-neutral-50 border-neutral-30"
            }`}>
              {normalized.isVerified ? <FiCheckCircle size={14} /> : <FiClock size={14} />}
              {normalized.isVerified ? "Diverifikasi" : normalized.status === "in_progress" ? "In Progress" : "Belum Dimulai"}
            </span>

            {/* Dummy download buttons */}
            <button
              type="button"
              onClick={() => alert("Fitur download laporan masih demo.")}
              className="px-4 py-2 rounded-xl border border-neutral-30 text-neutral-70 hover:bg-neutral-20 text-s-bold transition-colors flex items-center gap-2"
            >
              <FiDownload size={14} /> Laporan
            </button>
            <button
              type="button"
              onClick={() => alert("Fitur download RAB masih demo.")}
              className="px-4 py-2 rounded-xl bg-primary-main text-white hover:bg-primary-hover text-s-bold transition-colors flex items-center gap-2"
            >
              <FiDownload size={14} /> Download RAB
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Kolom Kiri: Identitas, RAB, Foto ───────────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── 2. Identitas Tahap ────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-neutral-30 shadow-sm p-6 space-y-4">
            <h3 className="text-s-bold text-neutral-70 flex items-center gap-2 uppercase tracking-widest">
              <FiFileText size={14} className="text-primary-main" /> Identitas Tahap
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-8 text-sm">
              {[
                { label: "Kode Tahap", value: normalized.code },
                { label: "Minggu Ke", value: normalized.week },
                { label: "Durasi", value: `${normalized.durationDays} Hari Kalender` },
                { label: "Tanggal Mulai", value: normalized.startDate },
                { label: "Tanggal Selesai", value: normalized.endDate },
                {
                  label: "Status Laporan",
                  value: normalized.isVerified ? "Final / Verified" : "Draft / Progress",
                  className: normalized.isVerified ? "text-success-main font-semibold" : "text-warning-main font-semibold"
                },
              ].map(({ label, value, className }) => (
                <div key={label}>
                  <p className="text-neutral-50 mb-0.5">{label}</p>
                  <p className={className || "font-semibold text-neutral-90"}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 3. Tabel RAB Teknis ───────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-neutral-30 shadow-sm p-6 space-y-4">
            <h3 className="text-s-bold text-neutral-70 flex items-center gap-2 uppercase tracking-widest">
              <FiCreditCard size={14} className="text-primary-main" /> Rencana Anggaran Biaya (RAB) — Detail Item
            </h3>

            <div className="overflow-x-auto rounded-xl border border-neutral-30">
              <table className="w-full min-w-[860px] text-sm border-collapse">
                <thead>
                  <tr className="bg-neutral-20 text-neutral-60 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 text-left border-b border-neutral-30 w-8">No</th>
                    <th className="px-4 py-3 text-left border-b border-neutral-30">Uraian Pekerjaan</th>
                    <th className="px-4 py-3 text-left border-b border-neutral-30">Lokasi</th>
                    <th className="px-4 py-3 text-right border-b border-neutral-30">Vol</th>
                    <th className="px-4 py-3 text-center border-b border-neutral-30">Sat</th>
                    <th className="px-4 py-3 text-right border-b border-neutral-30">Harga Sat</th>
                    <th className="px-4 py-3 text-right border-b border-neutral-30">Total RAB</th>
                    <th className="px-4 py-3 text-center border-b border-neutral-30">Progress</th>
                    <th className="px-4 py-3 text-right border-b border-neutral-30">Nilai Selesai</th>
                  </tr>
                </thead>
                <tbody>
                  {rabItems.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`border-b border-neutral-20 hover:bg-neutral-20/50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-neutral-20/30"}`}
                    >
                      <td className="px-4 py-3 text-neutral-50 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-neutral-90">{item.uraian}</p>
                        {item.keterangan && (
                          <p className="text-xs text-neutral-50 mt-0.5 italic">{item.keterangan}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-neutral-60">{item.lokasi}</td>
                      <td className="px-4 py-3 text-right text-neutral-80 font-mono">{item.volume}</td>
                      <td className="px-4 py-3 text-center text-neutral-60">{item.satuan}</td>
                      <td className="px-4 py-3 text-right text-neutral-80 font-mono">
                        {typeof item.hargaSatuan === "number" && item.hargaSatuan > 0
                          ? formatCurrency(item.hargaSatuan)
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-neutral-100 font-mono">
                        {typeof item.total === "number" && item.total > 0
                          ? formatCurrency(item.total)
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-16 h-2 bg-neutral-20 rounded-full overflow-hidden border border-neutral-30">
                            <div
                              className={`h-full rounded-full ${item.progress === 100 ? "bg-success-main" : item.progress > 0 ? "bg-primary-main" : "bg-neutral-30"}`}
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span className={`text-xs font-bold ${item.progress === 100 ? "text-success-main" : item.progress > 0 ? "text-primary-main" : "text-neutral-40"}`}>
                            {item.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold font-mono">
                        <span className={item.nilaiSelesai > 0 ? "text-success-main" : "text-neutral-40"}>
                          {typeof item.nilaiSelesai === "number" && item.nilaiSelesai > 0
                            ? formatCurrency(item.nilaiSelesai)
                            : "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-neutral-20 font-bold text-neutral-90 border-t-2 border-neutral-40">
                    <td colSpan={6} className="px-4 py-3 text-right uppercase tracking-wide text-xs">Subtotal</td>
                    <td className="px-4 py-3 text-right font-mono">{formatCurrency(normalized.amount)}</td>
                    <td className="px-4 py-3 text-center text-xs text-neutral-50">—</td>
                    <td className="px-4 py-3 text-right font-mono text-success-main">
                      {formatCurrency(rabItems.reduce((sum, r) => sum + (r.nilaiSelesai || 0), 0))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* ── 4. Dokumentasi Foto ───────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-neutral-30 shadow-sm p-6 space-y-4">
            <h3 className="text-s-bold text-neutral-70 flex items-center gap-2 uppercase tracking-widest">
              <FiCamera size={14} className="text-primary-main" /> Lampiran Dokumentasi Visual
            </h3>
            {normalized.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {normalized.images.slice(0, 6).map((img, i) => {
                  const url = typeof img === "string" ? img : img.url;
                  const caption = typeof img === "string" ? null : img.caption;
                  return (
                    <div key={i} className="space-y-1">
                      <div className="aspect-video rounded-xl overflow-hidden border border-neutral-30 bg-neutral-20">
                        <img
                          src={url}
                          alt={`Dokumentasi ${normalized.title} ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {caption && (
                        <p className="text-xs text-neutral-50 text-center italic">{caption}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-neutral-50 text-sm italic border border-dashed border-neutral-30 rounded-xl">
                Belum ada dokumentasi foto untuk tahap ini.
              </div>
            )}
          </div>
        </div>

        {/* ── Kolom Kanan: Biaya, Catatan, Verifikasi ─────────────────── */}
        <div className="space-y-6">

          {/* ── 5. Ringkasan Pembayaran ───────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-neutral-30 shadow-sm p-6 space-y-4">
            <h3 className="text-s-bold text-neutral-70 flex items-center gap-2 uppercase tracking-widest">
              <FiCreditCard size={14} className="text-primary-main" /> Ringkasan Pembayaran
            </h3>
            <div className="divide-y divide-neutral-20">
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-neutral-60">Biaya Tahap (RAB)</span>
                <span className="font-semibold text-neutral-100 font-mono">{formatCurrency(normalized.amount)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-neutral-60">Telah Dibayar</span>
                <span className="font-semibold text-success-main font-mono">{formatCurrency(normalized.paid)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-neutral-60">Sisa Pembayaran</span>
                <span className={`font-semibold font-mono ${remaining > 0 ? "text-error-main" : "text-neutral-80"}`}>
                  {formatCurrency(remaining)}
                </span>
              </div>
            </div>
            {remaining > 0 && (
              <div className="flex items-start gap-2 p-3 bg-error-main/5 rounded-xl border border-error-main/15 text-xs text-error-main">
                <FiAlertCircle size={14} className="shrink-0 mt-0.5" />
                Terdapat sisa tagihan yang harus diselesaikan.
              </div>
            )}
          </div>

          {/* ── 6. Catatan Lapangan ───────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-neutral-30 shadow-sm p-6 space-y-3">
            <h3 className="text-s-bold text-neutral-70 uppercase tracking-widest text-xs">
              Catatan Lapangan
            </h3>
            <div className="p-4 bg-neutral-20 rounded-xl border border-neutral-30/50 text-sm text-neutral-70 leading-relaxed italic">
              {normalized.note || "Tidak ada catatan tambahan dari pengawas atau mandor."}
            </div>
          </div>

          {/* ── 7. Blok Verifikasi Formal ─────────────────────────────── */}
          <div className={`rounded-2xl border p-6 space-y-4 ${
            normalized.isVerified
              ? "bg-success-main/5 border-success-main/20"
              : "bg-neutral-20 border-neutral-30"
          }`}>
            <h3 className="text-s-bold text-neutral-70 uppercase tracking-widest text-xs">
              Verifikasi Laporan
            </h3>
            {normalized.isVerified ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-success-main text-sm font-bold">
                  <FiCheckCircle size={16} /> Dokumen Telah Diverifikasi
                </div>
                <div className="text-xs text-neutral-60 space-y-1 pl-6">
                  <p>Diverifikasi oleh: <strong>{normalized.verifiedBy}</strong></p>
                  {normalized.verifiedAt && <p>Tanggal: <strong>{normalized.verifiedAt}</strong></p>}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-neutral-50 text-sm font-semibold">
                  <FiClock size={16} /> Belum Diverifikasi
                </div>
                <p className="text-xs text-neutral-50 italic pl-6">
                  Menunggu pengecekan akhir oleh tim pengawas lapangan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailPekerjaanProyek;
