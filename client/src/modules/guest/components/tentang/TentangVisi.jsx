import React from "react";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { FaBullseye } from "react-icons/fa";

const TentangVisi = () => {
    return (
        <section className="py-16 bg-gray-50/50 rounded-3xl mx-4 md:mx-10 shadow-sm border border-gray-100">
            <SectionHeading
                title="Visi Kami"
                subtitle="Tujuan utama kami dalam membangun ekosistem konstruksi modern"
            />

            <motion.div
                className="max-w-4xl mx-auto text-center text-gray-700 px-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center justify-center gap-4 text-xl md:text-2xl font-medium text-gray-800 italic">
                    <FaBullseye className="text-red-500 text-3xl shrink-0" />
                    <span>"Mewujudkan layanan konstruksi yang transparan, profesional, dan aman."</span>
                </div>
            </motion.div>
        </section>
    );
};

export default TentangVisi;
