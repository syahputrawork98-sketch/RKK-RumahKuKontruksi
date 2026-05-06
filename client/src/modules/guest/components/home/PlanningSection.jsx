// client/src/modules/guest/components/home/PlanningSection.jsx
import { motion } from "framer-motion";
import { FaEdit, FaCalculator, FaCube } from "react-icons/fa";

export default function PlanningSection() {
    const benefits = [
        {
            title: "Desain Sesuai Kebutuhan",
            desc: "Rancangan arsitektur yang mencerminkan gaya hidup dan efisiensi ruang.",
            icon: <FaEdit className="text-primary-main" />
        },
        {
            title: "Estimasi Biaya Terarah",
            desc: "Perhitungan RAB yang detail untuk menghindari pembengkakan biaya.",
            icon: <FaCalculator className="text-primary-main" />
        },
        {
            title: "Visualisasi Konsep",
            desc: "Simulasi 3D untuk melihat hasil akhir sebelum pembangunan dimulai.",
            icon: <FaCube className="text-primary-main" />
        }
    ];

    return (
        <section className="bg-primary-surface py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Visual Side */}
                    <motion.div 
                        className="lg:w-1/2 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-main/10 rounded-full blur-3xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1608303588026-884930af2559?q=80&w=703&auto=format&fit=crop"
                            alt="Perancangan dan Perencanaan"
                            className="relative z-10 w-full rounded-[40px] shadow-2xl border-4 border-white"
                        />
                        <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl z-20 hidden md:block max-w-[200px] border border-neutral-20">
                            <p className="text-heading-s-bold text-primary-main mb-1">100%</p>
                            <p className="text-xs-regular text-neutral-80">Rencana Terukur & Terperinci</p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary-main text-s-bold uppercase tracking-widest mb-4 block">Tahap 01: Perencanaan</span>
                        <h2 className="text-heading-l-bold md:text-display-s text-neutral-100 mb-6 leading-tight">
                            Perancangan Matang, <br /> <span className="text-primary-main">Hasil Lebih Maksimal</span>
                        </h2>

                        <p className="text-l-regular text-neutral-80 mb-10 leading-relaxed">
                            Kami memastikan setiap detail rumah Anda direncanakan secara sistematis 
                            untuk menghindari kesalahan konstruksi dan pemborosan biaya di masa depan.
                        </p>

                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <motion.div 
                                    key={index}
                                    className="flex items-start gap-5 p-5 bg-white rounded-2xl shadow-sm border border-neutral-30 hover:shadow-md transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-12 h-12 bg-primary-surface rounded-xl flex items-center justify-center shrink-0 text-xl">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-m-bold text-neutral-100 mb-1">{benefit.title}</h4>
                                        <p className="text-s-regular text-neutral-70">{benefit.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
