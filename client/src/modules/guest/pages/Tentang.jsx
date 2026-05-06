import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TentangIntro from "../components/tentang/TentangIntro";
import TentangVisi from "../components/tentang/TentangVisi";
import TentangMisi from "../components/tentang/TentangMisi";
import TentangNilai from "../components/tentang/TentangNilai";
import TentangTim from "../components/tentang/TentangTim";

const Tentang = () => {
    return (
        <main className="pb-24 space-y-24">
            <TentangIntro />
            <div className="space-y-24">
                <TentangVisi />
                <TentangMisi />
                <TentangNilai />
                <TentangTim />
            </div>

            {/* Final CTA Section */}
            <section className="py-24 px-6 bg-neutral-20">
                <div className="container mx-auto text-center max-w-4xl">
                    <motion.h2 
                        className="text-heading-l-bold md:text-display mb-8 text-neutral-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Ingin Membangun Rumah <br /> dengan Tenang?
                    </motion.h2>
                    <motion.p 
                        className="text-l-regular text-neutral-80 mb-12 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Mari diskusikan rencana hunian Anda bersama tim profesional kami. 
                        Kami siap memberikan solusi konstruksi yang terencana dan transparan.
                    </motion.p>
                    <motion.div 
                        className="flex flex-wrap justify-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link 
                            to="/contact" 
                            className="bg-primary-main text-white text-l-bold py-4 px-12 rounded-2xl transition-all shadow-xl hover:bg-primary-hover hover:scale-105"
                        >
                            Hubungi Kami
                        </Link>
                        <Link 
                            to="/proyek" 
                            className="border-2 border-primary-main text-primary-main text-l-bold py-4 px-12 rounded-2xl transition-all hover:bg-primary-main hover:text-white"
                        >
                            Lihat Portfolio
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default Tentang;
