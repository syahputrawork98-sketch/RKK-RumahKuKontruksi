import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaDraftingCompass, FaHammer, FaArrowRight } from "react-icons/fa";

const ServiceChoiceSection = () => {
  return (
    <section className="public-section bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-surface/30 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <div className="public-container">
        <div className="text-center mb-16">
          <motion.span 
            className="public-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Layanan Terintegrasi
          </motion.span>
          <motion.h2 
            className="public-title"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Mulai dari Kebutuhan Anda
          </motion.h2>
          <motion.p 
            className="public-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Pilih jalur yang paling sesuai: mulai dari desain rumah atau langsung ke tahap konstruksi lapangan.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Design */}
          <motion.div 
            className="public-card public-card-hover group border-2 border-transparent hover:border-primary-main/20 flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-primary-surface rounded-[24px] flex items-center justify-center text-primary-main text-3xl mb-8 group-hover:bg-primary-main group-hover:text-white transition-all duration-500">
              <FaDraftingCompass />
            </div>
            <h3 className="text-heading-m-bold text-neutral-100 mb-4 group-hover:text-primary-main transition-colors">Belum Punya Desain?</h3>
            <p className="text-l-regular text-neutral-70 leading-relaxed mb-10 flex-grow">
              Mulai dari konsultasi konsep, desain arsitektur, gambar kerja, revisi, hingga file desain final bersama tim arsitek RKK.
            </p>
            <Link 
              to="/layanan" 
              className="inline-flex items-center gap-3 text-primary-main text-m-bold hover:gap-5 transition-all"
            >
              Lihat Layanan Desain <FaArrowRight />
            </Link>
          </motion.div>

          {/* Card 2: Construction */}
          <motion.div 
            className="public-card public-card-hover group border-2 border-transparent hover:border-primary-main/20 flex flex-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-neutral-20 rounded-[24px] flex items-center justify-center text-neutral-60 text-3xl mb-8 group-hover:bg-primary-main group-hover:text-white transition-all duration-500">
              <FaHammer />
            </div>
            <h3 className="text-heading-m-bold text-neutral-100 mb-4 group-hover:text-primary-main transition-colors">Siap Bangun / Renovasi?</h3>
            <p className="text-l-regular text-neutral-70 leading-relaxed mb-10 flex-grow">
              Jika sudah punya desain atau ingin langsung renovasi, RKK siap membantu survey, RAB, eksekusi lapangan, monitoring progress, hingga serah terima.
            </p>
            <Link 
              to="/cara-kerja" 
              className="inline-flex items-center gap-3 text-primary-main text-m-bold hover:gap-5 transition-all"
            >
              Lihat Cara Kerja Konstruksi <FaArrowRight />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-m-regular text-neutral-50 italic">
            "Anda bisa mulai dari desain terlebih dahulu, lalu melanjutkan ke tahap konstruksi bersama RKK jika sudah siap."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceChoiceSection;
