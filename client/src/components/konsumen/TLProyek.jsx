import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiClock, FiAlertCircle, FiImage, FiChevronRight, FiMessageSquare, FiCalendar } from "react-icons/fi";
import DetailPekerjaanProyek from "./DetailPekerjaanProyek";

const TLProyek = ({ timeline = [] }) => {
  const [selectedDetail, setSelectedDetail] = useState(null);

  if (selectedDetail) {
    // Mapping for legacy DetailPekerjaanProyek compatibility if not updated
    const legacyData = {
      minggu: selectedDetail.week,
      kode: selectedDetail.code,
      judul: selectedDetail.title,
      pekerjaan: selectedDetail.tasks,
      tanggalMulai: selectedDetail.startDate,
      tanggalSelesai: selectedDetail.endDate,
      durasiHari: selectedDetail.durationDays,
      foto: selectedDetail.images,
      biaya: {
        harusDibayar: selectedDetail.payment.amount,
        terbayar: selectedDetail.payment.paid
      },
      verifikasi: selectedDetail.verification.isVerified,
      catatan: selectedDetail.note
    };

    return (
      <DetailPekerjaanProyek
        data={legacyData}
        onBack={() => setSelectedDetail(null)}
      />
    );
  }

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-neutral-30 -translate-x-1/2 rounded-full"></div>

      <div className="space-y-16 relative">
        {timeline.map((stage, idx) => {
          const isEven = idx % 2 === 0;
          const isVerified = stage.verification?.isVerified;
          
          return (
            <motion.div 
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white shadow-lg z-20 flex items-center justify-center ${
                stage.status === 'verified' ? 'bg-success-main' : 
                stage.status === 'in_progress' ? 'bg-primary-main' : 'bg-neutral-40'
              }`}>
                {stage.status === 'verified' ? <FiCheckCircle className="text-white" /> : 
                 stage.status === 'in_progress' ? <FiClock className="text-white animate-spin-slow" /> : 
                 <span className="text-white text-xs-bold">{stage.code}</span>}
              </div>

              {/* Card Container */}
              <div className="w-full md:w-[45%] ml-12 md:ml-0">
                <div className="public-card group hover:shadow-xl transition-all duration-500 !p-0 overflow-hidden">
                  {/* Status Strip */}
                  <div className={`h-1.5 w-full ${
                    stage.status === 'verified' ? 'bg-success-main' : 
                    stage.status === 'in_progress' ? 'bg-primary-main' : 'bg-neutral-40'
                  }`}></div>

                  <div className="p-6 md:p-8 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="public-eyebrow !mb-1">Tahap {stage.code} — Minggu {stage.week}</span>
                        <h3 className="text-heading-s-bold md:text-heading-m-bold text-neutral-100 group-hover:text-primary-main transition-colors">
                          {stage.title}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs-bold shadow-sm ${
                        stage.status === 'verified' ? 'bg-success-main/10 text-success-main' : 
                        stage.status === 'in_progress' ? 'bg-primary-main/10 text-primary-main' : 'bg-neutral-20 text-neutral-60'
                      }`}>
                        {stage.status === 'verified' ? 'Verified' : 
                         stage.status === 'in_progress' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-s-regular text-neutral-60">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="text-primary-main" /> {stage.startDate} - {stage.endDate}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiClock className="text-primary-main" /> {stage.durationDays} Hari
                      </div>
                    </div>

                    {/* Image Gallery Preview */}
                    {stage.images && stage.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-4 h-48 rounded-2xl overflow-hidden relative group/img">
                          <img src={stage.images[0]} alt={stage.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-neutral-100/20 group-hover/img:bg-transparent transition-colors"></div>
                        </div>
                        {stage.images.slice(1, 4).map((img, i) => (
                          <div key={i} className="h-16 rounded-lg overflow-hidden border border-neutral-30">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {stage.images.length > 4 && (
                          <div className="h-16 rounded-lg bg-neutral-20 border border-neutral-30 flex items-center justify-center text-xs-bold text-neutral-60">
                            +{stage.images.length - 4}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Task List Preview */}
                    <div className="space-y-3">
                      <p className="text-s-bold text-neutral-90">Pekerjaan Utama:</p>
                      <ul className="space-y-2">
                        {stage.tasks.slice(0, 3).map((task, i) => (
                          <li key={i} className="flex items-start gap-2 text-m-regular text-neutral-70">
                            <FiCheckCircle className={`mt-1 shrink-0 ${stage.status === 'verified' ? 'text-success-main' : 'text-neutral-40'}`} />
                            {task}
                          </li>
                        ))}
                        {stage.tasks.length > 3 && (
                          <li className="text-s-medium text-primary-main pl-6">+{stage.tasks.length - 3} Pekerjaan lainnya...</li>
                        )}
                      </ul>
                    </div>

                    {/* Stage Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs-bold">
                        <span className="text-neutral-60">Progres Tahap Ini</span>
                        <span className="text-neutral-90">{stage.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-20 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            stage.status === 'verified' ? 'bg-success-main' : 'bg-primary-main'
                          }`}
                          style={{ width: `${stage.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Footer Info & Actions */}
                    <div className="pt-6 border-t border-neutral-30 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {isVerified && (
                          <div className="flex items-center gap-1.5 text-xs-bold text-success-main">
                            <FiCheckCircle /> Verified by {stage.verification.verifiedBy}
                          </div>
                        )}
                        {stage.note && (
                          <div className="text-xs-regular text-neutral-60 italic max-w-[200px] truncate">
                            "{stage.note}"
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setSelectedDetail(stage)}
                          className="px-4 py-2 bg-primary-main text-white text-s-bold rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2"
                        >
                          Lihat Detail <FiChevronRight />
                        </button>
                        <button className="w-10 h-10 border border-neutral-30 text-neutral-60 rounded-xl flex items-center justify-center hover:bg-neutral-20 hover:text-primary-main transition-all">
                          <FiMessageSquare />
                        </button>
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
