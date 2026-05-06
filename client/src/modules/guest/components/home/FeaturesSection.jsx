// client/src/modules/guest/components/home/FeaturesSection.jsx
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/fadeUpVariant";

const features = [
    {
        title: "Perencanaan Matang",
        desc: "Penyusunan RAB dan jadwal yang detail di awal untuk meminimalkan risiko pembengkakan biaya di kemudian hari.",
        icon: "📋",
    },
    {
        title: "Monitoring Real-Time",
        desc: "Pantau progres pembangunan harian langsung dari gadget Anda lengkap dengan dokumentasi foto lapangan.",
        icon: "📱",
    },
    {
        title: "Laporan Terpusat",
        desc: "Semua data proyek, mulai dari material hingga absensi tukang, tercatat rapi dan dapat diakses kapan saja.",
        icon: "📂",
    },
    {
        title: "Alur Kerja Teruji",
        desc: "Sistem approval berjenjang memastikan setiap tahapan pekerjaan telah diverifikasi oleh pengawas ahli.",
        icon: "🛡️",
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
