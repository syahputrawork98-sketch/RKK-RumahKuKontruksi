import React from "react";
import { FaHandshake, FaShieldAlt, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

const TentangNilai = () => {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <motion.span 
                        className="text-primary-main text-m-bold uppercase tracking-widest mb-4 block"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Nilai & Komitmen
                    </motion.span>
                    <motion.h2 
                        className="text-heading-l-bold md:text-display text-neutral-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Pondasi Utama Kami
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "Transparan", desc: "Setiap detail biaya dan progres dibuka secara jujur kepada klien.", icon: <FaShieldAlt /> },
                        { title: "Terencana", desc: "Pekerjaan dimulai hanya setelah perencanaan teknis dan biaya matang.", icon: <FaTools /> },
                        { title: "Terdokumentasi", desc: "Setiap tahap memiliki catatan dan arsip digital yang rapi.", icon: <FaHandshake /> },
                        { title: "Profesional", desc: "Didukung tim ahli yang berdedikasi dan sistem kerja terstandar.", icon: <FaShieldAlt /> },
                        { title: "Terpantau", desc: "Klien memiliki akses penuh untuk memantau progres secara real-time.", icon: <FaTools /> },
                    ].map((item, index) => (
                        <motion.div 
                            key={index}
                            className="bg-neutral-20/30 p-10 rounded-[40px] border border-neutral-30 hover:border-primary-main/30 hover:bg-white transition-all duration-500 hover:shadow-xl group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-16 h-16 bg-primary-surface rounded-2xl flex items-center justify-center text-primary-main text-2xl mb-8 group-hover:bg-primary-main group-hover:text-white transition-colors duration-500">
                                {item.icon}
                            </div>
                            <h3 className="text-heading-m-bold mb-4 text-neutral-100 group-hover:text-primary-main transition-colors">{item.title}</h3>
                            <p className="text-l-regular text-neutral-70 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TentangNilai;
