import React from "react";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { FaLightbulb } from "react-icons/fa";

const TentangMisi = () => {
    const misi = [
        "Menyediakan platform aman dan mudah digunakan.",
        "Menghubungkan konsumen dengan tenaga kerja profesional.",
        "Menghadirkan sistem pengawasan proyek real-time.",
        "Meningkatkan kualitas pekerjaan konstruksi di Indonesia.",
    ];

    return (
        <section className="py-16">
            <SectionHeading
                title="Misi Kami"
                subtitle="Langkah-langkah yang kami ambil untuk mencapai visi"
            />

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                {misi.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex items-start gap-4 p-5 bg-white rounded-xl shadow"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <FaLightbulb className="text-yellow-500 text-2xl mt-1" />
                        <p className="text-gray-700">{item}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TentangMisi;
