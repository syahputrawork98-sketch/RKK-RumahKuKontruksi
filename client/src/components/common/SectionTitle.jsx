const SectionTitle = ({
    title,
    subtitle,
    align = "center",
    color = "teal",
    className = "",
}) => {
    const colorClasses = {
        teal: "text-teal-700",
        white: "text-white",
        gray: "text-gray-800",
    };

    return (
        <div className={`space-y-3 max-w-3xl mx-auto text-${align} ${className}`}>
            <h2 className={`text-4xl md:text-5xl font-bold ${colorClasses[color]}`}>
                {title}
            </h2>

            {subtitle && (
                <p className="text-gray-600 text-lg leading-relaxed">{subtitle}</p>
            )}
        </div>
    );
};

export default SectionTitle;
