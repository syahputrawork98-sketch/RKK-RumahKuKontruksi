import { motion } from "framer-motion";

const MotionFadeIn = ({
    children,
    y = 40,
    duration = 0.8,
    delay = 0,
    once = true,
    className = "",
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration, delay }}
            viewport={{ once }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default MotionFadeIn;
