// client/src/pages/Tentang.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaLightbulb, FaHandsHelping, FaUsersCog } from "react-icons/fa";

const Tentang = () => {
  return (
    <div className="bg-gradient-to-b from-teal-700 via-teal-600 to-teal-500 text-white overflow-hidden">
      {/* ================= HERO / INTRO ================= */}
      <section className="py-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-5xl font-bold mb-4">Tentang RumahKu Konstruksi</h1>
          <p className="text-lg leading-relaxed text-teal-50">
            RumahKu Konstruksi adalah platform digital yang menghadirkan cara baru
            dalam membangun dan mengelola proyek konstruksi. Kami menghubungkan
            pemilik proyek, mandor, dan pengawas dalam satu ekosistem kerja yang
            efisien, transparan, dan profesional.
          </p>
          <p className="text-teal-100">
            Dengan teknologi, kami menghadirkan kemudahan komunikasi, pemantauan
            progres real-time, serta akses ke tenaga ahli terverifikasi.
          </p>
        </motion.div>
      </section>

      {/* ================= VISI & MISI ================= */}
      <section className="bg-white text-gray-800 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-600 to-teal-400"></div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-teal-700 mb-6">Visi & Misi Kami</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kami hadir untuk memperkuat ekosistem konstruksi di Indonesia melalui teknologi digital yang transparan, efisien, dan berorientasi hasil.
          </p>
        </motion.div>

        {/* ====== VISI DAN MISI CARD ====== */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Visi Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-br from-teal-600 to-teal-500 shadow-xl text-white"
          >
            <div className="card-body">
              <div className="flex items-center mb-4">
                <FaBullseye className="text-3xl mr-3" />
                <h3 className="text-3xl font-bold">Visi Kami</h3>
              </div>
              <p className="leading-relaxed text-teal-50">
                Menjadi platform konstruksi digital terpercaya di Indonesia yang
                mempertemukan semua pihak dalam proses pembangunan secara cepat,
                efisien, dan transparan.
              </p>
            </div>
          </motion.div>

          {/* Misi Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="card bg-base-100 border border-teal-200 shadow-lg"
          >
            <div className="card-body">
              <div className="flex items-center mb-4 text-teal-700">
                <FaLightbulb className="text-3xl mr-3" />
                <h3 className="text-3xl font-bold">Misi Kami</h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <FaHandsHelping className="text-teal-600 mt-1" />
                  Meningkatkan efisiensi kerja antara pemilik proyek dan mandor.
                </li>
                <li className="flex items-start gap-3">
                  <FaUsersCog className="text-teal-600 mt-1" />
                  Menyediakan sistem pemantauan proyek berbasis data dan real-time.
                </li>
                <li className="flex items-start gap-3">
                  <FaLightbulb className="text-teal-600 mt-1" />
                  Memberdayakan tenaga konstruksi lokal dengan teknologi digital.
                </li>
                <li className="flex items-start gap-3">
                  <FaBullseye className="text-teal-600 mt-1" />
                  Mewujudkan proyek berkualitas dengan waktu dan biaya yang tepat.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= TIMELINE PROSES ================= */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-white py-24 px-6 border-t border-teal-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-700 mb-12">
            Timeline Proses
          </h2>

          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {[
              {
                title: "Konsultasi Awal",
                desc: "Kami mendengarkan kebutuhan, anggaran, dan visi Anda untuk menciptakan rencana terbaik.",
              },
              {
                title: "Perencanaan & Desain",
                desc: "Tim arsitek dan engineer kami menyusun desain serta perencanaan detail sesuai kesepakatan.",
              },
              {
                title: "Pembangunan Dimulai",
                desc: "Proses konstruksi dimulai dengan pengawasan ketat dari tenaga ahli berpengalaman.",
              },
              {
                title: "Pengawasan Berjalan",
                desc: "Setiap tahap dipantau dan dilaporkan secara berkala untuk memastikan kualitas hasil.",
              },
              {
                title: "Serah Terima Kunci",
                desc: "Setelah pembangunan selesai, proyek diserahkan dengan hasil akhir sesuai harapan Anda.",
              },
            ].map((step, index) => (
              <li key={index}>
                {index !== 0 && <hr className="bg-teal-500" />}
                <div className={`timeline-${index % 2 === 0 ? "start" : "end"}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-md border border-teal-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="font-semibold text-lg text-teal-700 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </motion.div>
                </div>
                <div className="timeline-middle">
                  <div className="bg-teal-600 text-white p-2 rounded-full shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <hr className="bg-teal-500" />
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ================= PENUTUP ================= */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24 text-center bg-gradient-to-br from-teal-600 to-teal-500"
      >
        <div className="max-w-3xl mx-auto space-y-6 px-6">
          <h2 className="text-4xl font-bold mb-4">Bersama Membangun Impian</h2>
          <p className="text-teal-50 leading-relaxed text-lg">
            Kami percaya bahwa setiap bangunan memiliki cerita — dan kami ingin
            menjadi bagian dari cerita keberhasilan Anda. Bersama RumahKu
            Konstruksi, wujudkan rumah, kantor, atau proyek impian dengan
            kepercayaan dan profesionalisme.
          </p>
          <button className="btn bg-white text-teal-700 hover:bg-teal-100 font-semibold mt-4">
            Mulai Proyek Sekarang
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Tentang;
