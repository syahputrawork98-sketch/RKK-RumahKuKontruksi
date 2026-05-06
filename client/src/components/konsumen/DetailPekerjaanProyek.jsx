import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPackage, FiCamera, FiCreditCard, FiCheckCircle, FiInfo } from "react-icons/fi";

const DetailPekerjaanProyek = ({ data, onBack }) => {
  if (!data) return <p>Tidak ada data pekerjaan untuk ditampilkan.</p>;

  const {
    minggu,
    kode,
    judul,
    pekerjaan,
    tanggalMulai,
    tanggalSelesai,
    durasiHari,
    foto,
    biaya,
    verifikasi,
    catatan,
  } = data;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Header with Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white border border-neutral-30 flex items-center justify-center text-neutral-60 hover:text-primary-main hover:border-primary-main transition-all shadow-sm"
          >
            <FiArrowLeft size={24} />
          </button>
          <div>
            <span className="public-eyebrow !mb-0.5">Detail Tahap {kode}</span>
            <h2 className="text-heading-m-bold md:text-heading-l-bold text-neutral-100">
              {judul}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 rounded-xl text-s-bold shadow-sm ${
            verifikasi ? "bg-success-main/10 text-success-main" : "bg-error-main/10 text-error-main"
          }`}>
            {verifikasi ? "Diverifikasi Pengawas" : "Menunggu Verifikasi"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: General Info & Tasks */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary Card */}
          <div className="public-card bg-primary-main text-white p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-s-bold text-white/60 uppercase tracking-widest mb-1">Minggu Ke</p>
              <p className="text-heading-s-bold">{minggu}</p>
            </div>
            <div>
              <p className="text-s-bold text-white/60 uppercase tracking-widest mb-1">Durasi</p>
              <p className="text-heading-s-bold">{durasiHari} Hari</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-s-bold text-white/60 uppercase tracking-widest mb-1">Rentang Waktu</p>
              <p className="text-m-bold">{tanggalMulai} - {tanggalSelesai}</p>
            </div>
          </div>

          {/* Task List */}
          <div className="public-card space-y-6">
            <h3 className="text-heading-s-bold text-neutral-100 flex items-center gap-3">
              <FiPackage className="text-primary-main" /> Daftar Pekerjaan
            </h3>
            <ul className="space-y-4">
              {pekerjaan.map((p, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-20 border border-neutral-30">
                  <span className="w-8 h-8 rounded-full bg-white border border-neutral-30 flex items-center justify-center text-s-bold text-primary-main shrink-0 shadow-sm">
                    {i + 1}
                  </span>
                  <p className="text-m-medium text-neutral-80 pt-1">{p}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation Gallery */}
          <div className="public-card space-y-6">
            <h3 className="text-heading-s-bold text-neutral-100 flex items-center gap-3">
              <FiCamera className="text-primary-main" /> Dokumentasi Pekerjaan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foto.map((f, i) => (
                <div key={i} className="rounded-[24px] overflow-hidden border border-neutral-30 shadow-sm">
                  <img
                    src={f}
                    alt={`Dokumentasi ${judul} #${i + 1}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Costs & Notes */}
        <div className="space-y-8">
          {/* Cost Card */}
          <div className="public-card space-y-6">
            <h3 className="text-heading-s-bold text-neutral-100 flex items-center gap-3">
              <FiCreditCard className="text-primary-main" /> Rincian Biaya
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-20 border border-neutral-30">
                <p className="text-s-bold text-neutral-60 uppercase mb-1">Harus Dibayar</p>
                <p className="text-heading-s-bold text-neutral-100">{formatCurrency(biaya.harusDibayar)}</p>
              </div>
              <div className="p-4 rounded-2xl bg-success-main/5 border border-success-main/20">
                <p className="text-s-bold text-success-main uppercase mb-1">Sudah Terbayar</p>
                <p className="text-heading-s-bold text-success-main">{formatCurrency(biaya.terbayar)}</p>
              </div>
              {biaya.harusDibayar - biaya.terbayar > 0 && (
                <div className="p-4 rounded-2xl bg-error-main/5 border border-error-main/20">
                  <p className="text-s-bold text-error-main uppercase mb-1">Sisa Tagihan</p>
                  <p className="text-heading-s-bold text-error-main">{formatCurrency(biaya.harusDibayar - biaya.terbayar)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes & Verification */}
          <div className="public-card space-y-6">
            <h3 className="text-heading-s-bold text-neutral-100 flex items-center gap-3">
              <FiInfo className="text-primary-main" /> Catatan & Verifikasi
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                {verifikasi ? (
                  <FiCheckCircle className="text-success-main text-xl mt-1 shrink-0" />
                ) : (
                  <FiInfo className="text-error-main text-xl mt-1 shrink-0" />
                )}
                <p className="text-m-medium text-neutral-80">
                  {verifikasi 
                    ? "Pekerjaan ini telah diverifikasi oleh pengawas lapangan dan dinyatakan sesuai standar."
                    : "Pekerjaan ini sedang menunggu proses verifikasi oleh pengawas lapangan."}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-20 border border-neutral-30 italic text-m-regular text-neutral-60">
                "{catatan || "Tidak ada catatan tambahan untuk tahap ini."}"
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailPekerjaanProyek;
