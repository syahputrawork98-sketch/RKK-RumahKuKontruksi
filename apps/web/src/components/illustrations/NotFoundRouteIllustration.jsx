import React from 'react';

export default function NotFoundRouteIllustration({ className = '', size = 200 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 3) / 4}
      viewBox="0 0 240 180"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="40" y="30" width="160" height="120" rx="12" fill="#F7F9F8" stroke="#E2E6E5" strokeWidth="2" />
      <path d="M70 110L100 70L130 95L170 55" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      <circle cx="170" cy="55" r="6" fill="#D38320" />
      <circle cx="110" cy="90" r="32" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2" />
      <path d="M100 80L120 100M120 80L100 100" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
