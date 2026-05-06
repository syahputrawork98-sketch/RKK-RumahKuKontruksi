// [ACTIVE] src/modules/guest/pages/Tentang.jsx - Digunakan oleh App.jsx
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
        <main className="pt-24 pb-24 space-y-24">
            <TentangIntro />
            <div className="space-y-24">
                <TentangVisi />
                <TentangMisi />
                <TentangNilai />
                <TentangTim />
            </div>

            {/* Final CTA Section */}
            <section className="public-section bg-neutral-20">
                <div className="public-container text-center max-w-4xl">
                    <motion.h2 
                        className="public-title mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Ingin Membangun Rumah <br /> dengan Tenang?
                    </motion.h2>
                    <motion.p 
                        className="public-subtitle mb-12"
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
                            to="/kontak" 
                            className="btn-public-primary"
                        >
                            Hubungi Kami
                        </Link>
                        <Link 
                            to="/proyek" 
                            className="btn-public-outline"
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
