// client/src/modules/guest/components/home/FeaturesSection.jsx
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/fadeUpVariant";

const features = [
    {
        title: "Cari & Hubungkan",
        desc: "Temukan mandor, tukang, dan pengawas proyek terpercaya di sekitar Anda hanya dengan beberapa klik.",
        icon: "🔍",
    },
    {
        title: "Kelola Proyek",
        desc: "Pantau progres pembangunan, laporan harian, jadwal, dan anggaran dalam satu dasbor terpadu.",
        icon: "📅",
    },
    {
        title: "Kolaborasi Mudah",
        desc: "Komunikasi antar tim proyek jadi lebih efisien tanpa perlu berpindah aplikasi — semua di satu tempat.",
        icon: "💬",
    },
    {
        title: "Transparansi Biaya",
        desc: "Setiap pengeluaran tercatat otomatis, sehingga Anda tahu ke mana setiap rupiah digunakan.",
        icon: "📈",
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto text-center">

                <motion.h2
                    className="text-heading-l-bold mb-12 text-primary-main"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Fitur Unggulan Kami
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-neutral-20"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            custom={index * 0.3}
                        >
                            <div className="text-display mb-5 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>

                            <h3 className="text-heading-s-bold mb-3 text-primary-main">
                                {item.title}
                            </h3>
                            <p className="text-l-regular text-neutral-90">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
