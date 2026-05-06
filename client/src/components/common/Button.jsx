// client/src/components/common/Button.jsx
import React from "react";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer text-primary-main px-5 py-2 border rounded-lg hover:bg-slate-50 ${className}`}
    >
      {children}
    </button>
  );
}
