// client/src/components/common/Drawer.jsx

import React from "react";

export default function Drawer({ isOpen, onClose, children, width = "max-w-md" }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
            <div className={`w-full ${width} bg-white h-full shadow-xl p-6 overflow-y-auto animate-in slide-in-from-right`}>
                {children}
            </div>
        </div>
    );
}
