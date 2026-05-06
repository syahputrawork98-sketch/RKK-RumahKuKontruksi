import React from "react";
import { motion } from "framer-motion";

const TentangIntro = () => {
    return (
        <section className="py-8">
            <motion.div
                className="max-w-5xl mx-auto text-center px-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                    Tentang Rumahku Konstruksi
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Rumahku Konstruksi adalah platform konstruksi modern yang membantu
                    konsumen, perusahaan, mandor, dan pengawas terhubung dalam satu sistem
                    yang profesional, transparan, dan efektif.
                </p>
            </motion.div>
        </section>
    );
};

export default TentangIntro;
