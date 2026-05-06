import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheckCircle, FiClock, FiFileText, FiCamera, FiCreditCard } from "react-icons/fi";

const DetailPekerjaanProyek = ({ data, onBack }) => {
  if (!data) return <p className="p-10 text-center text-neutral-60">Tidak ada data laporan untuk ditampilkan.</p>;

  // Normalisasi Data agar mendukung format lama dan baru
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
    note: data.note ?? data.catatan ?? ""
  };

  const remaining = normalized.amount - normalized.paid;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value || 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* 1. Header Dokumen Laporan */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-30 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-neutral-20 flex items-center justify-center text-neutral-60 hover:text-primary-main transition-colors border border-neutral-30"
            title="Kembali ke Timeline"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <p className="text-xs-bold text-primary-main uppercase tracking-widest">Laporan Progres Tahap Pekerjaan</p>
            <h2 className="text-heading-s-bold md:text-heading-m-bold text-neutral-100">
              Tahap {normalized.code} — {normalized.title}
            </h2>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-xl text-s-bold flex items-center gap-2 border ${
          normalized.isVerified ? "bg-success-main/5 text-success-main border-success-main/20" : "bg-warning-main/5 text-warning-main border-warning-main/20"
        }`}>
          {normalized.isVerified ? <FiCheckCircle /> : <FiClock />}
          {normalized.isVerified ? "Diverifikasi" : "Menunggu Verifikasi"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Identitas & Daftar Pekerjaan */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 2. Identitas Tahap (Tabel Ringkas) */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-30 shadow-sm space-y-4">
            <h3 className="text-s-bold text-neutral-90 flex items-center gap-2 uppercase tracking-wider">
              <FiFileText className="text-primary-main" /> Identitas Tahap
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 text-sm">
              <div>
                <p className="text-neutral-50 mb-0.5">Kode Tahap</p>
                <p className="font-semibold text-neutral-100">{normalized.code}</p>
              </div>
              <div>
                <p className="text-neutral-50 mb-0.5">Minggu Ke</p>
                <p className="font-semibold text-neutral-100">{normalized.week}</p>
              </div>
              <div>
                <p className="text-neutral-50 mb-0.5">Durasi</p>
                <p className="font-semibold text-neutral-100">{normalized.durationDays} Hari Kalender</p>
              </div>
              <div>
                <p className="text-neutral-50 mb-0.5">Tanggal Mulai</p>
                <p className="font-semibold text-neutral-100">{normalized.startDate}</p>
              </div>
              <div>
                <p className="text-neutral-50 mb-0.5">Tanggal Selesai</p>
                <p className="font-semibold text-neutral-100">{normalized.endDate}</p>
              </div>
              <div>
                <p className="text-neutral-50 mb-0.5">Status Laporan</p>
                <p className={`font-semibold ${normalized.isVerified ? 'text-success-main' : 'text-warning-main'}`}>
                  {normalized.isVerified ? 'Final / Verified' : 'Draft / Progress'}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Daftar Pekerjaan (Checklist) */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-30 shadow-sm space-y-4">
            <h3 className="text-s-bold text-neutral-90 flex items-center gap-2 uppercase tracking-wider">
              <FiCheckCircle className="text-primary-main" /> Item Pekerjaan Terlaksana
            </h3>
            <div className="space-y-3">
              {normalized.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-20/50 border border-neutral-30/50 text-neutral-80">
                  <div className="w-6 h-6 rounded-full bg-white border border-neutral-30 flex items-center justify-center text-xs-bold text-primary-main">
                    {i + 1}
                  </div>
                  <span className="text-m-medium">{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Dokumentasi Foto */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-30 shadow-sm space-y-4">
            <h3 className="text-s-bold text-neutral-90 flex items-center gap-2 uppercase tracking-wider">
              <FiCamera className="text-primary-main" /> Lampiran Dokumentasi Visual
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {normalized.images.slice(0, 6).map((img, i) => {
                const url = typeof img === 'string' ? img : img.url;
                const caption = typeof img === 'string' ? null : img.caption;
                return (
                  <div key={i} className="space-y-2">
                    <div className="aspect-video rounded-xl overflow-hidden border border-neutral-30 bg-neutral-20">
                      <img
                        src={url}
                        alt={`Dokumentasi ${normalized.title} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {caption && <p className="text-xs-regular text-neutral-60 text-center italic">{caption}</p>}
                  </div>
                );
              })}
            </div>
            {normalized.images.length === 0 && (
              <p className="text-sm text-neutral-50 italic py-4 text-center">Belum ada dokumentasi foto untuk tahap ini.</p>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Biaya & Verifikasi */}
        <div className="space-y-6">
          {/* 4. RAB / Rincian Pembayaran */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-30 shadow-sm space-y-4">
            <h3 className="text-s-bold text-neutral-90 flex items-center gap-2 uppercase tracking-wider">
              <FiCreditCard className="text-primary-main" /> Rincian Biaya Tahap
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-neutral-20">
                <span className="text-sm text-neutral-60">Biaya Tahap (RAB)</span>
                <span className="text-m-bold text-neutral-100">{formatCurrency(normalized.amount)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-20">
                <span className="text-sm text-neutral-60">Telah Dibayar</span>
                <span className="text-m-bold text-success-main">{formatCurrency(normalized.paid)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-neutral-60">Sisa Pembayaran</span>
                <span className={`text-m-bold ${remaining > 0 ? 'text-error-main' : 'text-neutral-100'}`}>
                  {formatCurrency(remaining)}
                </span>
              </div>
            </div>
            {remaining > 0 && (
              <p className="text-xs-regular text-error-main bg-error-main/5 p-2 rounded-lg border border-error-main/10">
                * Terdapat sisa tagihan yang harus diselesaikan untuk tahap ini.
              </p>
            )}
          </div>

          {/* 6. Catatan Lapangan */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-30 shadow-sm space-y-3">
            <h3 className="text-s-bold text-neutral-90 flex items-center gap-2 uppercase tracking-wider text-xs">
              Catatan Lapangan
            </h3>
            <div className="p-4 bg-neutral-20 rounded-xl border border-neutral-30/50 text-sm text-neutral-70 leading-relaxed italic">
              {normalized.note || "Tidak ada catatan tambahan dari pengawas atau mandor."}
            </div>
          </div>

          {/* 7. Blok Verifikasi Formal */}
          <div className={`p-6 rounded-2xl border shadow-sm space-y-3 ${
            normalized.isVerified ? "bg-success-main/5 border-success-main/20" : "bg-neutral-20 border-neutral-30"
          }`}>
            <h3 className="text-s-bold text-neutral-90 uppercase tracking-widest text-xs">Verifikasi Laporan</h3>
            {normalized.isVerified ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-success-main text-sm font-bold">
                  <FiCheckCircle /> Dokumen Telah Diverifikasi
                </div>
                <div className="text-xs-regular text-neutral-60">
                  <p>Verified by: {normalized.verifiedBy}</p>
                  {normalized.verifiedAt && <p>Date: {normalized.verifiedAt}</p>}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-neutral-50 text-sm font-bold uppercase tracking-wide">
                  <FiClock /> Belum Diverifikasi
                </div>
                <p className="text-xs-regular text-neutral-50 italic">
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
