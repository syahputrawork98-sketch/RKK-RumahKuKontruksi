import { motion } from "framer-motion";

const CardBase = ({
    children,
    hover = true,
    className = "",
    duration = 0.3,
    ...props
}) => {
    return (
        <motion.div
            whileHover={hover ? { scale: 1.03 } : {}}
            transition={{ duration }}
            className={`rounded-2xl border border-teal-100 shadow-md bg-white p-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default CardBase;
