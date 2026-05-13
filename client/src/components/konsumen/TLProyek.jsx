import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiChevronRight, FiMessageSquare, FiCalendar, FiActivity } from "react-icons/fi";

const TLProyek = ({ timeline = [], layout = "left" }) => {
  const isLeft = layout === "left";

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className={`absolute ${isLeft ? "left-4" : "left-4 md:left-1/2"} top-0 bottom-0 w-1 bg-neutral-30 -translate-x-1/2 rounded-full`} />

      <div className="space-y-16 relative">
        {timeline.map((stage, idx) => {
          const isVerified = stage.verification?.isVerified;
          const detailId = stage.id || `stage-${String(idx + 1).padStart(2, "0")}`;

          return (
            <motion.div
              key={detailId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex items-center ${isLeft ? "gap-0" : "gap-8"}`}
            >
              {/* Timeline Dot */}
              <div className={`absolute ${isLeft ? "left-4" : "left-4 md:left-1/2"} -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white shadow-lg z-20 flex items-center justify-center ${
                stage.status === "verified" ? "bg-success-main" :
                stage.status === "in_progress" ? "bg-primary-main" : "bg-neutral-40"
              }`}>
                {stage.status === "verified"
                  ? <FiCheckCircle className="text-white" />
                  : stage.status === "in_progress"
                  ? <FiClock className="text-white" />
                  : <span className="text-white text-xs font-bold">{stage.code}</span>}
              </div>

              {/* Card */}
              <div className={`w-full ${isLeft ? "ml-12" : "md:w-[45%] ml-12 md:ml-0"} ${!isLeft && idx % 2 !== 0 ? "md:translate-x-[110%]" : ""}`}>
                <div className="public-card group hover:shadow-xl transition-all duration-500 !p-0 overflow-hidden">
                  {/* Status Strip */}
                  <div className={`h-1.5 w-full ${
                    stage.status === "verified" ? "bg-success-main" :
                    stage.status === "in_progress" ? "bg-primary-main" : "bg-neutral-40"
                  }`} />

                  <div className="p-6 md:p-8 space-y-5">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="public-eyebrow !mb-1">Tahap {stage.code} — Minggu {stage.week}</span>
                        <h3 className="text-heading-s-bold md:text-heading-m-bold text-neutral-100 group-hover:text-primary-main transition-colors">
                          {stage.title}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm shrink-0 text-center ${
                          stage.status === "verified" ? "bg-success-main/10 text-success-main" :
                          stage.status === "in_progress" ? "bg-primary-main/10 text-primary-main" : "bg-neutral-20 text-neutral-60"
                        }`}>
                          {stage.status === "verified" ? "Verified" :
                           stage.status === "in_progress" ? "In Progress" : "Pending"}
                        </span>
                        {stage.hasEvidence && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-md text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                            <FiActivity size={10} /> {stage.evidenceCount} Update Lapangan
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-60">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar size={13} className="text-primary-main" />
                        {stage.startDate} – {stage.endDate}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiClock size={13} className="text-primary-main" />
                        {stage.durationDays} Hari
                      </div>
                    </div>

                    {/* Image preview */}
                    {Array.isArray(stage.images) && stage.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-4 h-44 rounded-2xl overflow-hidden relative group/img">
                          <img
                            src={stage.images[0]}
                            alt={stage.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-neutral-100/20 group-hover/img:bg-transparent transition-colors" />
                        </div>
                        {stage.images.slice(1, 4).map((img, i) => (
                          <div key={i} className="h-14 rounded-lg overflow-hidden border border-neutral-30">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {stage.images.length > 4 && (
                          <div className="h-14 rounded-lg bg-neutral-20 border border-neutral-30 flex items-center justify-center text-xs font-bold text-neutral-60">
                            +{stage.images.length - 4}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Task preview */}
                    <div className="space-y-3 bg-neutral-10/50 p-5 rounded-2xl border border-neutral-30/50 shadow-inner">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-neutral-50 uppercase tracking-[0.2em]">Item Pekerjaan Terdaftar</p>
                        {stage.tasks?.length > 0 && (
                          <span className="text-[10px] font-black bg-neutral-20 px-2 py-0.5 rounded-lg text-neutral-60 uppercase tracking-tighter">
                            {stage.tasks.length} Item
                          </span>
                        )}
                      </div>
                      <ul className="space-y-2.5">
                        {Array.isArray(stage.tasks) && stage.tasks.length > 0 ? (
                          stage.tasks.slice(0, 4).map((task, i) => (
                            <li key={i} className="flex items-start gap-3 text-xs text-neutral-80 leading-relaxed font-bold">
                              <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${stage.status === "verified" ? "bg-success-main shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-primary-main/30"}`} />
                              <span>{task}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-xs text-neutral-50 italic pl-4 border-l-2 border-neutral-20 py-1">
                            {stage.description || "Kategori tersedia, tetapi rincian item teknis belum dimuat dari RAB."}
                          </li>
                        )}
                        {Array.isArray(stage.tasks) && stage.tasks.length > 4 && (
                          <li className="text-[10px] font-black text-primary-main pl-4 flex items-center gap-1 uppercase tracking-widest pt-1">
                            <FiChevronRight size={12} /> {stage.tasks.length - 4} Item lainnya pada detail
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black bg-neutral-100 text-neutral-50 px-2 py-0.5 rounded border border-neutral-20 uppercase tracking-widest flex items-center gap-1">
                              <FiCheckCircle size={10} className="text-success-main" /> Progres Rill (SOT)
                            </span>
                          </div>
                          <p className="text-[10px] font-black text-neutral-90 italic">
                            {stage.status === 'verified' ? 'Tervalidasi 100% (Final)' : 'Verified by Pengawas'}
                          </p>
                        </div>
                        <span className={`text-2xl font-black ${stage.status === 'verified' ? 'text-success-main' : 'text-primary-main'}`}>{stage.progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-neutral-20 rounded-full overflow-hidden p-0.5 border border-neutral-30/50 shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stage.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full relative overflow-hidden ${stage.status === "verified" ? "bg-success-main shadow-[0_0_12px_rgba(16,185,129,0.3)]" : "bg-primary-main shadow-[0_0_12px_rgba(13,148,136,0.3)]"}`}
                        >
                           <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                        </motion.div>
                      </div>
                      <div className="pt-2">
                        <p className="text-[9px] text-neutral-40 font-medium italic leading-relaxed">
                          * Update harian/mingguan adalah informasi pendukung. Progres rill hanya diperbarui melalui verifikasi kualitas resmi oleh Pengawas.
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-5 border-t border-neutral-30 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex-1 min-w-[200px]">
                        {isVerified && (
                          <div className="flex items-center gap-2 text-xs font-black text-success-main uppercase tracking-tight">
                            <div className="w-6 h-6 rounded-full bg-success-main/10 flex items-center justify-center">
                              <FiCheckCircle size={14} />
                            </div>
                            Diverifikasi oleh {stage.verification.verifiedBy}
                          </div>
                        )}
                        {!isVerified && stage.note && (
                          <p className="text-xs text-neutral-50 italic max-w-[200px] truncate font-medium">"{stage.note}"</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/konsumen/timeline-proyek/${detailId}`}
                          className="px-5 py-2.5 bg-teal-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2 shadow-lg shadow-teal-600/20"
                        >
                          Buka Diskusi & Detail <FiChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TLProyek;
