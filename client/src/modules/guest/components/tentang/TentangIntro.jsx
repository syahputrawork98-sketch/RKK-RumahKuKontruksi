import React from "react";
import { motion } from "framer-motion";

const TentangIntro = () => {
    return (
        <section className="relative bg-neutral-100 text-neutral-10 py-24 px-4 overflow-hidden border-b border-neutral-30">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-main/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-hover/10 rounded-full -ml-36 -mb-36 blur-2xl"></div>

            <motion.div
                className="max-w-5xl mx-auto text-center px-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.span 
                    className="inline-block bg-primary-main/10 text-primary-main text-s-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest border border-primary-main/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    Tentang RumahKu Kontruksi
                </motion.span>
                <h1 className="text-heading-l-bold md:text-display text-neutral-100 mb-8 leading-tight">
                    Membangun Rumah dengan Proses yang <br className="hidden md:block" /> Lebih Jelas dan Terpercaya
                </h1>
                <p className="text-l-regular md:text-heading-s-regular text-neutral-80 max-w-4xl mx-auto leading-relaxed">
                    <strong>RumahKu Kontruksi</strong> didirikan untuk menjawab tantangan industri konstruksi yang seringkali tidak terencana dan sulit dipantau. Kami hadir untuk membantu Anda memahami, memantau, dan mengelola proses bangun atau renovasi rumah dengan lebih transparan, profesional, dan akuntabel di setiap jengkal proyek Anda.
                </p>
            </motion.div>
        </section>
    );
};

export default TentangIntro;
