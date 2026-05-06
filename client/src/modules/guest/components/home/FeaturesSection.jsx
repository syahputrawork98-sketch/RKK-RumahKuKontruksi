// client/src/modules/guest/components/home/FeaturesSection.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp } from "../../animations/fadeUpVariant";
import { FaHome, FaTools, FaDraftingCompass, FaCalculator } from "react-icons/fa";

const services = [
    {
        title: "Bangun Rumah Baru",
        desc: "Wujudkan hunian dari nol dengan perencanaan matang dan konstruksi berkualitas.",
        icon: <FaHome className="text-3xl text-primary-main" />,
    },
    {
        title: "Renovasi Rumah",
        desc: "Transformasi hunian lama menjadi modern dan fungsional sesuai kebutuhan.",
        icon: <FaTools className="text-3xl text-primary-main" />,
    },
    {
        title: "Desain Arsitektur",
        desc: "Layanan desain arsitektural yang mengedepankan estetika dan efisiensi ruang.",
        icon: <FaDraftingCompass className="text-3xl text-primary-main" />,
    },
    {
        title: "Estimasi RAB",
        desc: "Penyusunan anggaran yang transparan dan akurat untuk proyek Anda.",
        icon: <FaCalculator className="text-3xl text-primary-main" />,
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.span 
                        className="text-primary-main text-m-bold uppercase tracking-widest mb-4 block"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Layanan Utama
                    </motion.span>
                    <motion.h2
                        className="text-heading-l-bold md:text-display text-neutral-100"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Solusi Konstruksi Terintegrasi
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group bg-white p-10 rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-neutral-30 flex flex-col items-center text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            custom={index * 0.2}
                        >
                            <div className="w-20 h-20 bg-primary-surface rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform duration-300">
                                {item.icon}
                            </div>

                            <h3 className="text-heading-s-bold mb-4 text-neutral-100">
                                {item.title}
                            </h3>
                            <p className="text-m-regular text-neutral-70 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Link 
                        to="/layanan" 
                        className="inline-flex items-center gap-2 text-primary-main text-l-bold hover:gap-4 transition-all duration-300"
                    >
                        Lihat Semua Layanan <span>→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
