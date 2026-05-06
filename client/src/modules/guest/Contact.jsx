// client/src/pages/Contact.jsx
import React from "react";
import { motion } from "framer-motion"; // ✅ Import motion
import { FiMapPin, FiClock, FiMail, FiInstagram } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="bg-gray-50 text-gray-800 py-16 px-6 md:px-16 overflow-hidden">
      {/* ====== HERO / HEADER SECTION ====== */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-teal-700 mb-3">
          Hubungi Kami
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Siap membantu Anda untuk konsultasi proyek, laporan mandor, kerjasama,
          atau pertanyaan umum. Ceritakan kebutuhan Anda, kami akan menanggapinya
          secepat mungkin.
        </p>
      </motion.div>

      {/* ====== MAIN CONTENT (FORM + INFO) ====== */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* ====== FORM KONTAK ====== */}
        <motion.form
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          action="#"
          method="POST"
          className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
        >
          {/* ====== INPUTS ====== */}
          <div>
            <label htmlFor="name" className="block font-semibold mb-2">
              Nama Lengkap*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nama Anda"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold mb-2">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="nama@contoh.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-semibold mb-2">
              Nomor Telepon / WhatsApp*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+62 8xx-xxxx-xxxx"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block font-semibold mb-2">
              Peran
            </label>
            <select
              id="role"
              name="role"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Pilih peran Anda</option>
              <option value="pelanggan">Pelanggan</option>
              <option value="mandor">Mandor</option>
              <option value="kontraktor">Kontraktor</option>
              <option value="pengawas">Pengawas</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block font-semibold mb-2">
              Judul Pesan*
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Permintaan penawaran / Pertanyaan"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-semibold mb-2">
              Pesan*
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              placeholder="Deskripsikan kebutuhan atau pertanyaan Anda..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="attachment" className="block font-semibold mb-2">
              Lampiran (opsional)
            </label>
            <input
              type="file"
              id="attachment"
              name="attachment"
              accept=".pdf,.jpg,.png"
              className="w-full text-gray-600"
            />
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" required />
            <p className="text-sm text-gray-600">
              Saya setuju dengan{" "}
              <a
                href="/privacy"
                className="text-teal-600 hover:underline font-medium"
              >
                Kebijakan Privasi
              </a>
              .
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Kirim Pesan
          </motion.button>

          <p className="text-sm text-center text-gray-500 mt-2">
            Atau hubungi langsung via{" "}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              className="text-teal-600 font-semibold hover:underline"
            >
              WhatsApp
            </a>{" "}
            atau telepon di{" "}
            <a
              href="tel:+6281234567890"
              className="text-teal-600 font-semibold"
            >
              +62 812-3456-7890
            </a>
          </p>
        </motion.form>

        {/* ====== INFO KONTAK & PETA ====== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* ====== CARD INFO KONTAK ====== */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-teal-700 mb-6">
              Informasi Kantor
            </h2>

            <div className="flex items-start gap-3 mb-4">
              <FiMapPin className="text-teal-600 text-xl mt-1" />
              <p className="text-gray-700 leading-relaxed">
                <strong>Alamat:</strong> <br />
                Jl. Merdeka No. 12, Katapang, Bandung, Jawa Barat
              </p>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <FiClock className="text-teal-600 text-xl mt-1" />
              <p className="text-gray-700">
                <strong>Jam Kerja:</strong> <br />
                Senin–Jumat, 08:00–17:00 WIB
              </p>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <FiMail className="text-teal-600 text-xl mt-1" />
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:kontak@rumahku-kontruksi.id"
                  className="text-teal-600 hover:underline"
                >
                  kontak@rumahku-kontruksi.id
                </a>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FiInstagram className="text-teal-600 text-xl mt-1" />
              <p className="text-gray-700">
                <strong>Instagram:</strong>{" "}
                <a
                  href="https://instagram.com/RumahKuKonstruksi"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  @RumahKuKonstruksi
                </a>
              </p>
            </div>
          </div>

          {/* ====== EMBED MAP ====== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-md"
          >
            <iframe
              src="https://www.google.com/maps?q=Jl.+Merdeka+No+12,+Katapang,+Bandung&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Lokasi RumahKu Konstruksi"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
