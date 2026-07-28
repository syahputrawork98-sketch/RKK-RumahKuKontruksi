import React from 'react';

export default function ProjectEmptyStateIllustration({ className = '', size = 200 }) {
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
      <rect x="35" y="35" width="170" height="110" rx="10" fill="#F7F9F8" stroke="#E2E6E5" strokeWidth="2" />
      <path d="M55 55H185M55 125H185M95 35V145M145 35V145" stroke="#E2E6E5" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M70 70L120 110L170 70" stroke="#2AA99D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="120" cy="90" r="18" fill="#DDF4F1" stroke="#0F766E" strokeWidth="2" />
      <path d="M112 90H128M120 82V98" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
