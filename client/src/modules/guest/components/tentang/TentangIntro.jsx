import React from "react";
import { motion } from "framer-motion";

const TentangIntro = () => {
    return (
        <section className="public-section relative bg-neutral-100 overflow-hidden border-b border-neutral-30">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-main/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-hover/10 rounded-full -ml-36 -mb-36 blur-2xl"></div>

            <motion.div
                className="public-container text-center px-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.span 
                    className="public-badge !bg-white/10 !text-white !border-white/20 mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    Tentang RumahKu Kontruksi
                </motion.span>
                <h1 className="public-hero-title">
                    Membangun Rumah dengan Proses yang <br className="hidden md:block" /> Lebih Jelas dan Terpercaya
                </h1>
                <p className="public-hero-subtitle !text-white/80">
                    <strong>RumahKu Kontruksi</strong> didirikan untuk menjawab tantangan industri konstruksi yang seringkali tidak terencana dan sulit dipantau. Kami hadir untuk membantu Anda memahami, memantau, dan mengelola proses bangun atau renovasi rumah dengan lebih transparan, profesional, dan akuntabel di setiap jengkal proyek Anda.
                </p>
            </motion.div>
        </section>
    );
};

export default TentangIntro;
