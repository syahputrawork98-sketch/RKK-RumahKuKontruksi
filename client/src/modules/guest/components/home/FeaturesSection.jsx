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
        <section className="py-24 px-6 bg-white relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.span 
                        className="text-primary-main text-s-bold uppercase tracking-widest mb-4 block"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Layanan Utama
                    </motion.span>
                    <motion.h2
                        className="text-heading-l-bold md:text-display-s text-neutral-100 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Solusi Konstruksi <br className="hidden md:block" /> Terintegrasi & Profesional
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-neutral-30 flex flex-col items-center text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            custom={index * 0.1}
                        >
                            <div className="w-24 h-24 bg-primary-surface rounded-[32px] flex items-center justify-center mb-8 group-hover:bg-primary-main transition-colors duration-500">
                                <div className="group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                    {item.icon}
                                </div>
                            </div>

                            <h3 className="text-heading-s-bold mb-4 text-neutral-100 group-hover:text-primary-main transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-m-regular text-neutral-70 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className="mt-20 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Link 
                        to="/layanan" 
                        className="inline-flex items-center gap-3 bg-neutral-20 hover:bg-primary-surface text-primary-main text-l-bold px-8 py-4 rounded-2xl transition-all duration-300 group"
                    >
                        Lihat Semua Layanan 
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
