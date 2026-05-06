import React from "react";

const SectionHeading = ({ title, subtitle }) => {
    return (
        <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
    );
};

export default SectionHeading;
