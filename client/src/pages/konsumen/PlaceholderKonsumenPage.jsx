import React from "react";
import { motion } from "framer-motion";
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaHourglassHalf } from "react-icons/fa";

const PlaceholderKonsumenPage = ({ 
  title = "Halaman Portal Konsumen", 
  description = "Informasi detail mengenai proyek Anda akan ditampilkan di sini.", 
  status = "Planned", 
  dos = [], 
  donts = [],
  notes = ""
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-teal-50 overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-10 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <FaHourglassHalf className="text-2xl" />
            </div>
            <span className="bg-teal-700/50 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20">
              {status} / Customer Portal
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          <p className="text-teal-50 text-lg max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          {/* Status Alert */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg flex gap-4">
            <FaExclamationTriangle className="text-amber-500 text-xl flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-amber-800 font-semibold mb-1">Status Pengembangan: UI Placeholder</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                Halaman ini sedang dalam tahap perancangan antarmuka. Saat ini data yang ditampilkan masih bersifat simulasi untuk menunjukkan alur informasi kepada Konsumen.
              </p>
            </div>
          </div>

          {/* Do's and Don'ts Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* What Customer Can See */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-teal-700 font-bold uppercase tracking-wider text-sm">
                <FaCheckCircle /> Apa yang Akan Anda Lihat
              </div>
              <ul className="space-y-3">
                {dos.length > 0 ? dos.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                )) : (
                  <>
                    <li className="flex gap-3 text-gray-600 text-sm leading-relaxed italic">Daftar informasi yang akan tersedia sedang disusun...</li>
                  </>
                )}
              </ul>
            </div>

            {/* What is Restricted */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-wider text-sm">
                <FaInfoCircle /> Batasan Akses
              </div>
              <ul className="space-y-3">
                {donts.length > 0 ? donts.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-500 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                )) : (
                  <>
                    <li className="flex gap-3 text-gray-500 text-sm leading-relaxed italic">Batasan akses internal sedang didefinisikan...</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Important Notes for Customer */}
          {notes && (
            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-gray-800 font-bold mb-3 flex items-center gap-2 italic">
                <FaInfoCircle className="text-teal-500" /> Catatan Penting untuk Konsumen:
              </h4>
              <div className="bg-gray-50 p-4 rounded-xl text-gray-600 text-sm leading-relaxed">
                {notes}
              </div>
            </div>
          )}
          
          <div className="pt-4 text-center">
             <p className="text-gray-400 text-xs italic">
               RKK Customer Portal v1.0 - Transparansi & Keamanan Data Konstruksi
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlaceholderKonsumenPage;
