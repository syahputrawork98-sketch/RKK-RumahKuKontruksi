// client/src/components/common/IconButton.jsx

import React from "react";

export default function IconButton({ icon, onClick, className = "" }) {
    return (
        <button onClick={onClick} className={`p-1 ${className}`}>
            {icon}
        </button>
    );
}
