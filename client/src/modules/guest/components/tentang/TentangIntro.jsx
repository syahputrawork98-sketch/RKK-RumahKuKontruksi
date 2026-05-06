import React from "react";
import { motion } from "framer-motion";

const TentangIntro = () => {
    return (
        <section className="py-16">
            <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Tentang Rumahku Konstruksi
                </h1>
                <p className="text-gray-600 text-lg">
                    Rumahku Konstruksi adalah platform konstruksi modern yang membantu
                    konsumen, perusahaan, mandor, dan pengawas terhubung dalam satu sistem
                    yang profesional, transparan, dan efektif.
                </p>
            </motion.div>
        </section>
    );
};

export default TentangIntro;
