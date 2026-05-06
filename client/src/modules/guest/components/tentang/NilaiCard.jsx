import React from "react";
import { motion } from "framer-motion";

const NilaiCard = ({ icon: Icon, title, desc }) => {
    return (
        <motion.div
            className="p-6 bg-white rounded-2xl shadow text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex justify-center mb-4">
                <Icon className="text-4xl text-blue-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
        </motion.div>
    );
};

export default NilaiCard;
