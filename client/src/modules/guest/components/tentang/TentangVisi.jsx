import React from "react";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { FaBullseye } from "react-icons/fa";

const TentangVisi = () => {
    return (
        <section className="py-16 bg-gray-50">
            <SectionHeading
                title="Visi Kami"
                subtitle="Tujuan utama kami dalam membangun ekosistem konstruksi modern"
            />

            <motion.div
                className="max-w-4xl mx-auto text-center text-gray-700"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-3 text-xl font-semibold">
                    <FaBullseye className="text-red-500" />
                    Mewujudkan layanan konstruksi yang transparan, profesional, dan aman.
                </div>
            </motion.div>
        </section>
    );
};

export default TentangVisi;
