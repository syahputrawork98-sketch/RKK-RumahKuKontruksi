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

            {/* Dummy download buttons - LOCAL HOLD */}
            <button
              type="button"
              onClick={() => alert("Mode Simulasi: Download Laporan Resmi (Production) belum dibuka.")}
              className="px-4 py-2 rounded-xl border border-neutral-30 text-neutral-40 hover:bg-neutral-20 text-s-bold transition-colors flex items-center gap-2 opacity-50 cursor-not-allowed"
              title="Fitur Production Belum Tersedia"
            >
              <FiDownload size={14} /> Laporan (Demo)
            </button>
            <button
              type="button"
              onClick={() => alert("Mode Simulasi: Download Dokumen RAB Resmi (Production) belum dibuka.")}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-400 hover:bg-slate-300 text-s-bold transition-colors flex items-center gap-2 cursor-not-allowed"
              title="Fitur Production Belum Tersedia"
            >
              <FiDownload size={14} /> Download RAB (Demo)
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
                    <th className="px-4 py-3 text-right border-b border-neutral-30">Total RAB</th>
                    <th className="px-4 py-3 text-center border-b border-neutral-30">Progress</th>
                    <th className="px-4 py-3 text-right border-b border-neutral-30">Nilai Selesai</th>
                  </tr>
                </thead>
                <tbody>
                  {rabItems.length > 0 ? (
                    rabItems.map((item, idx) => (
                      <React.Fragment key={item.id}>
                        <tr
                          className={`border-b border-neutral-20 hover:bg-neutral-20/50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-neutral-20/30"}`}
                        >
                          <td className="px-4 py-3 text-neutral-50 text-xs">{idx + 1}</td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-neutral-90">{item.uraian || item.description}</p>
                            {item.keterangan && (
                              <p className="text-xs text-neutral-50 mt-0.5 italic">{item.keterangan}</p>
                            )}
                            {(item.activities?.length > 0 || item.notes?.length > 0) && (
                              <div className="mt-2 flex gap-2">
                                <span className="px-2 py-0.5 bg-primary-surface text-primary-main text-[9px] font-black uppercase rounded-md border border-primary-main/20">
                                  {item.activities?.length || 0} Update Mandor
                                </span>
                                <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-black uppercase rounded-md border border-amber-200">
                                  {item.notes?.length || 0} Review Pengawas
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-neutral-60">{item.lokasi}</td>
                          <td className="px-4 py-3 text-right text-neutral-80 font-mono">{item.volume}</td>
                          <td className="px-4 py-3 text-center text-neutral-60">{item.unit || item.satuan}</td>
                          <td className="px-4 py-3 text-right text-neutral-80 font-mono">
                            {typeof item.unitPrice === "number" || typeof item.hargaSatuan === "number"
                              ? formatCurrency(item.unitPrice || item.hargaSatuan)
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
                            <span className={item.completedValue > 0 || item.nilaiSelesai > 0 ? "text-success-main" : "text-neutral-40"}>
                              {formatCurrency(item.completedValue || item.nilaiSelesai || 0)}
                            </span>
                          </td>
                        </tr>
                        {/* Evidence Thread Row */}
                        {(item.activities?.length > 0 || item.notes?.length > 0) && (
                          <tr className="bg-neutral-10/50">
                            <td colSpan={9} className="px-8 py-6">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-neutral-20 pb-3">
                                <h4 className="text-[10px] font-black text-neutral-50 uppercase tracking-[0.2em] flex items-center gap-2">
                                  <FiActivity size={12} className="text-primary-main" /> Kronologi Bukti Pekerjaan
                                </h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-widest">
                                    Customer-Visible Update
                                  </span>
                                  <span className="text-[9px] font-black text-neutral-40 uppercase bg-neutral-20 px-2 py-0.5 rounded border border-neutral-30 tracking-widest">
                                    Local Thread
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-30">
                                  {/* Mandor Activities */}
                                  {item.activities?.map((act) => (
                                    <div key={act.id} className="relative pl-8">
                                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                                        <img src={act.weeklyJournal?.foreman?.avatar || `https://ui-avatars.com/api/?name=${act.weeklyJournal?.foreman?.name || 'M'}&background=3B82F6&color=fff`} className="w-full h-full object-cover" alt="Mandor" />
                                      </div>
                                      <div className="bg-white p-4 rounded-2xl border-l-4 border-l-blue-500 border-y border-r border-neutral-30 shadow-sm max-w-2xl group/evidence transition-all hover:shadow-md">
                                        <div className="flex justify-between items-start mb-2">
                                          <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Bukti Lapangan</span>
                                            <span className="text-[9px] font-bold bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded uppercase tracking-tighter">Mandor</span>
                                          </div>
                                          <span className="text-[9px] text-neutral-40 font-bold">{new Date(act.createdAt).toLocaleDateString('id-ID')}</span>
                                        </div>
                                        <p className="text-xs font-black text-neutral-80 group-hover/evidence:text-blue-700 transition-colors">{act.workTitle}</p>
                                        <p className="text-xs text-neutral-60 mt-1.5 leading-relaxed">{act.description}</p>
                                        
                                        {act.photos?.length > 0 && (
                                          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                            {act.photos.map((photo, pi) => (
                                              <div key={pi} className="w-24 h-16 rounded-xl bg-neutral-20 border border-neutral-30 shrink-0 overflow-hidden group/img relative shadow-inner">
                                                <img src={photo.photoUrl} className="w-full h-full object-cover transition-transform group-hover/img:scale-110" alt="Foto bukti" />
                                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
 
                                  {/* Supervisor Notes */}
                                  {item.notes?.map((note) => (
                                    <div key={note.id} className="relative pl-8">
                                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                                        <img src={note.report?.supervisor?.avatar || `https://ui-avatars.com/api/?name=${note.report?.supervisor?.name || 'P'}&background=F59E0B&color=fff`} className="w-full h-full object-cover" alt="Pengawas" />
                                      </div>
                                      <div className="bg-amber-50/30 p-4 rounded-2xl border-l-4 border-l-amber-500 border-y border-r border-amber-200 shadow-sm max-w-2xl group/review transition-all hover:shadow-md">
                                        <div className="flex justify-between items-start mb-2">
                                          <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase text-amber-700 tracking-widest">Review Kualitas</span>
                                            <span className="text-[9px] font-bold bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">Pengawas</span>
                                          </div>
                                          <span className="text-[9px] text-amber-600/60 font-bold">{new Date(note.createdAt).toLocaleDateString('id-ID')}</span>
                                        </div>
                                        <p className="text-xs font-bold text-amber-900 leading-relaxed italic">"{note.content}"</p>
                                        
                                        {note.progress !== null && (
                                          <div className="mt-3 flex items-center gap-3 bg-white/50 p-2 rounded-xl border border-amber-100/50">
                                            <div className="flex-1 h-1 bg-amber-200 rounded-full overflow-hidden">
                                              <div className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" style={{ width: `${note.progress}%` }} />
                                            </div>
                                            <span className="text-[10px] font-black text-amber-700 whitespace-nowrap">{note.progress}% Verified</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}

                                  {(item.activities?.length === 0 && item.notes?.length === 0) && (
                                    <div className="pl-8 flex items-center gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-30"></div>
                                      <p className="text-[10px] text-neutral-40 font-bold italic">Item pekerjaan ini sudah terdaftar di RAB, tetapi belum memiliki update lapangan yang dipublikasikan untuk Konsumen.</p>
                                    </div>
                                  )}
                                  
                                  <div className="pl-8 pt-2">
                                    <p className="text-[9px] text-neutral-40 font-medium italic leading-relaxed">
                                      * Evidence item ini adalah laporan aktivitas lapangan dan tidak mengubah Progress Resmi proyek secara otomatis. Progress resmi tetap diperbarui secara manual oleh Pengawas melalui Verifikasi Resmi.
                                    </p>
                                  </div>
                               </div>
                             </td>
                           </tr>
                         )}
                       </React.Fragment>
                     ))
                   ) : (
                     <tr>
                       <td colSpan={9} className="px-4 py-16 text-center space-y-3 bg-neutral-10/30">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto text-neutral-30 shadow-sm border border-neutral-30/50">
                           <FiFileText size={24} />
                         </div>
                         <div>
                           <p className="text-xs font-black text-neutral-60 uppercase tracking-widest">Belum Ada Rincian Item</p>
                           <p className="text-[10px] text-neutral-50 italic mt-1 max-w-xs mx-auto leading-relaxed font-bold">
                             Kategori pekerjaan tersedia, namun rincian item teknis dan bukti lapangan belum dipublikasikan ke timeline publik.
                           </p>
                         </div>
                       </td>
                     </tr>
                   )}
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

            {/* General Stage Thread (Unlinked evidence) */}
            {(data.unlinkedActivities?.length > 0 || data.unlinkedNotes?.length > 0) && (
              <div className="mt-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-30 pb-4">
                  <h3 className="text-s-bold text-neutral-70 flex items-center gap-3 uppercase tracking-widest">
                    <FiActivity size={16} className="text-primary-main" />
                    Update Lapangan & Ulasan Umum
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-widest">
                      Customer-Visible
                    </span>
                    <span className="text-[9px] font-black text-neutral-40 uppercase bg-neutral-20 px-2 py-0.5 rounded border border-neutral-30 tracking-widest">
                      Local Sync
                    </span>
                  </div>
                </div>
                
                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-20">
                  {data.unlinkedActivities?.map((act) => (
                    <div key={act.id} className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                        <img src={act.weeklyJournal?.foreman?.avatar || `https://ui-avatars.com/api/?name=${act.weeklyJournal?.foreman?.name || 'M'}&background=3B82F6&color=fff`} className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-white p-5 rounded-[28px] border-l-4 border-l-blue-500 border-y border-r border-neutral-30 shadow-sm max-w-3xl hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Update Lapangan</span>
                            <span className="text-[9px] font-bold bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded">MANDOR</span>
                          </div>
                          <span className="text-[10px] text-neutral-40">{new Date(act.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <p className="text-sm font-bold text-neutral-90 leading-tight">{act.workTitle}</p>
                        <p className="text-sm text-neutral-60 mt-1.5 leading-relaxed">{act.description}</p>
                        {act.notes && (
                          <div className="mt-3 bg-blue-50/30 p-3 rounded-xl border border-blue-100/50">
                            <p className="text-xs text-blue-600/70 italic flex items-center gap-2">
                              <FiInfo size={12} /> {act.notes}
                            </p>
                          </div>
                        )}
                        {act.photos?.length > 0 && (
                          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {act.photos.map((photo, pi) => (
                              <div key={pi} className="w-40 h-28 rounded-2xl bg-neutral-20 border border-neutral-30 shrink-0 overflow-hidden shadow-inner group/img relative">
                                <img src={photo.photoUrl} className="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt="Bukti kerja" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {data.unlinkedNotes?.map((note) => (
                    <div key={note.id} className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                        <img src={note.report?.supervisor?.avatar || `https://ui-avatars.com/api/?name=${note.report?.supervisor?.name || 'P'}&background=F59E0B&color=fff`} className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-amber-50/20 p-5 rounded-[28px] border-l-4 border-l-amber-500 border-y border-r border-amber-200 shadow-sm max-w-3xl hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-amber-700 tracking-widest">Tinjauan Pengawas</span>
                            <span className="text-[9px] font-bold bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded">PENGAWAS</span>
                          </div>
                          <span className="text-[10px] text-amber-600/60">{new Date(note.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <p className="text-sm font-bold text-amber-900 leading-relaxed italic">"{note.content}"</p>
                        {note.progress !== null && (
                          <div className="mt-4 p-4 bg-white/60 rounded-2xl border border-amber-100 flex items-center gap-5">
                            <div className="flex-1">
                              <p className="text-[9px] font-black uppercase text-amber-600 mb-1 tracking-widest">Klaim Verifikasi Lapangan</p>
                              <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" style={{ width: `${note.progress}%` }} />
                              </div>
                            </div>
                            <span className="text-xl font-black text-amber-700">{note.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-neutral-40 italic text-center border-t border-neutral-20 pt-4">
                   * Catatan internal teknis tidak ditampilkan pada timeline publik Konsumen.
                </p>
              </div>
            )}
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
