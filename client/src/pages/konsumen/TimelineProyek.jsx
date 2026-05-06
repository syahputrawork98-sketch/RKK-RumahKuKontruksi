import React from "react";
import { motion } from "framer-motion";
import TLProyek from "../../components/konsumen/TLProyek";
import { activeCustomerProject } from "../../data/mock/projects";
import { FiMapPin, FiCalendar, FiClock, FiDollarSign, FiCheckCircle, FiUser } from "react-icons/fi";

const TimelineProyek = () => {
  const project = activeCustomerProject;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-neutral-20 pb-20">
      {/* 1. Project Hero Section */}
      <section className="relative h-[450px] overflow-hidden rounded-b-[40px] md:rounded-b-[60px] shadow-2xl">
        <img 
          src={project.heroImage} 
          alt={project.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-100 via-neutral-100/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-6xl mx-auto space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="px-4 py-1.5 bg-primary-main text-white text-s-bold rounded-full shadow-lg">
                Proyek {project.status}
              </span>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-s-bold rounded-full border border-white/20">
                {project.type}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-heading-l-bold md:text-display leading-tight"
            >
              {project.name}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-m-medium text-white/90"
            >
              <div className="flex items-center gap-2">
                <FiMapPin className="text-primary-main" /> {project.location}
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-primary-main" /> Mulai: {project.startDate}
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-primary-main" /> Estimasi: {project.estimatedEndDate}
              </div>
            </motion.div>

            {/* Overall Progress Bar */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="pt-4"
            >
              <div className="flex justify-between items-end mb-2">
                <span className="text-m-bold text-white">Progres Keseluruhan</span>
                <span className="text-heading-s-bold text-primary-main">{project.progress}%</span>
              </div>
              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/20 backdrop-blur-sm">
                <motion.div 
                  className="h-full bg-primary-main rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10 space-y-12">
        {/* 2. Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[32px] shadow-lg border border-neutral-30 flex items-center gap-5"
          >
            <div className="w-14 h-14 bg-primary-surface rounded-2xl flex items-center justify-center text-primary-main">
              <FiDollarSign size={28} />
            </div>
            <div>
              <p className="text-s-bold text-neutral-60 uppercase tracking-widest">Nilai Proyek</p>
              <p className="text-heading-s-bold text-neutral-100">{formatCurrency(project.budget.total)}</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[32px] shadow-lg border border-neutral-30 flex items-center gap-5"
          >
            <div className="w-14 h-14 bg-success-main/10 rounded-2xl flex items-center justify-center text-success-main">
              <FiCheckCircle size={28} />
            </div>
            <div>
              <p className="text-s-bold text-neutral-60 uppercase tracking-widest">Total Terbayar</p>
              <p className="text-heading-s-bold text-neutral-100">{formatCurrency(project.budget.paid)}</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[32px] shadow-lg border border-neutral-30 flex items-center gap-5"
          >
            <div className="w-14 h-14 bg-error-main/10 rounded-2xl flex items-center justify-center text-error-main">
              <FiDollarSign size={28} />
            </div>
            <div>
              <p className="text-s-bold text-neutral-60 uppercase tracking-widest">Sisa Pembayaran</p>
              <p className="text-heading-s-bold text-neutral-100">{formatCurrency(project.budget.remaining)}</p>
            </div>
          </motion.div>
        </div>

        {/* 3. Team Cards Section */}
        <section className="space-y-6">
          <h2 className="text-heading-m-bold text-neutral-100 flex items-center gap-3">
            <FiUser className="text-primary-main" /> Tim Proyek Anda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(project.team).map(([key, member]) => (
              <div key={key} className="bg-white p-6 rounded-[32px] shadow-md border border-neutral-30 flex items-center gap-4">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-primary-surface" />
                <div>
                  <p className="text-m-bold text-neutral-100">{member.name}</p>
                  <p className="text-s-regular text-neutral-60">{member.role}</p>
                  <span className="inline-flex items-center gap-1.5 mt-1 text-xs-bold text-success-main">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-main"></span> {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Timeline Section */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-heading-m-bold text-neutral-100">Timeline Pelaksanaan</h2>
              <p className="text-m-regular text-neutral-60 mt-1">Pantau perkembangan pekerjaan tahap demi tahap.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white border border-neutral-30 rounded-lg text-s-bold text-neutral-70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-main"></span> Verified
              </span>
              <span className="px-3 py-1 bg-white border border-neutral-30 rounded-lg text-s-bold text-neutral-70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-main"></span> In Progress
              </span>
            </div>
          </div>
          
          <TLProyek timeline={project.timeline} />
        </section>
      </div>
    </div>
  );
};

export default TimelineProyek;
