import React from 'react';

export default function PortalUnavailableIllustration({ className = '', size = 200 }) {
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
      <circle cx="120" cy="90" r="60" fill="#F7F9F8" stroke="#E2E6E5" strokeWidth="2" />
      <path d="M120 45C100 45 85 60 85 80V105C85 120 100 135 120 135C140 135 155 120 155 105V80C155 60 140 45 120 45Z" fill="#DDF4F1" stroke="#0F766E" strokeWidth="2" />
      <rect x="105" y="85" width="30" height="26" rx="4" fill="#0F766E" />
      <path d="M112 85V77A8 8 0 0 1 128 77V85" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="120" cy="96" r="3" fill="#FFFFFF" />
    </svg>
  );
}
