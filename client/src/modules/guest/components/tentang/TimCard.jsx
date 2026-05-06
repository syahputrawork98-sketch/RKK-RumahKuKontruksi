import React from "react";
import { motion } from "framer-motion";

const TimCard = ({ name, role, img }) => {
    return (
        <motion.div
            className="bg-white shadow rounded-xl p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <img
                src={img}
                alt={name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h4 className="font-bold text-lg">{name}</h4>
            <p className="text-gray-600 text-sm">{role}</p>
        </motion.div>
    );
};

export default TimCard;
