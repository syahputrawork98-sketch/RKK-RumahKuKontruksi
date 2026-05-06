import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaTools, FaDraftingCompass, FaCalculator, FaEye, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

const Layanan = () => {
    const services = [
        {
            title: "Bangun Rumah Baru",
            desc: "Membantu Anda mewujudkan rumah impian dari nol dengan perencanaan matang dan konstruksi berkualitas.",
            icon: <FaHome className="text-4xl text-primary-main" />,
        },
        {
            title: "Renovasi Rumah",
            desc: "Transformasi hunian lama Anda menjadi lebih modern, fungsional, dan nyaman sesuai kebutuhan keluarga.",
            icon: <FaTools className="text-4xl text-primary-main" />,
        },
        {
            title: "Desain & Perencanaan",
            desc: "Layanan desain arsitektural dan interior yang mengedepankan estetika serta efisiensi ruang.",
            icon: <FaDraftingCompass className="text-4xl text-primary-main" />,
        },
        {
            title: "Estimasi Biaya / RAB",
            desc: "Penyusunan Rencana Anggaran Biaya yang transparan dan akurat untuk menghindari pembengkakan biaya.",
            icon: <FaCalculator className="text-4xl text-primary-main" />,
        },
        {
            title: "Pengawasan Proyek",
            desc: "Memastikan setiap tahapan pembangunan berjalan sesuai spesifikasi, jadwal, dan standar kualitas.",
            icon: <FaEye className="text-4xl text-primary-main" />,
        },
        {
            title: "Manajemen Proyek",
            desc: "Koordinasi menyeluruh antara tukang, material, dan jadwal untuk kelancaran proyek Anda.",
            icon: <FaTasks className="text-4xl text-primary-main" />,
        },
    ];

    return (
        <main className="pt-24 pb-16">
            {/* Hero Section */}
            <section className="bg-primary-main text-neutral-10 py-20 px-4">
                <div className="container mx-auto text-center">
                    <motion.h1 
                        className="text-heading-l-bold md:text-display mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Layanan RumahKu Kontruksi
                    </motion.h1>
                    <motion.p 
                        className="text-l-regular md:text-heading-s-regular max-w-3xl mx-auto opacity-90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Kami membantu proses bangun dan renovasi rumah Anda lebih terencana, 
                        transparan, dan terpantau dalam satu sistem profesional.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div 
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-md border border-neutral-30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-6 bg-primary-surface w-16 h-16 rounded-xl flex items-center justify-center">
                                    {service.icon}
                                </div>
                                <h3 className="text-heading-m-bold mb-4 text-neutral-100">{service.title}</h3>
                                <p className="text-l-regular text-neutral-90 leading-relaxed">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-neutral-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-heading-l-bold mb-8 text-neutral-100">Siap Mewujudkan Hunian Impian Anda?</h2>
                    <Link 
                        to="/contact" 
                        className="inline-block bg-primary-main hover:bg-primary-hover text-neutral-10 text-l-bold py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Konsultasikan Kebutuhan Anda
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Layanan;
