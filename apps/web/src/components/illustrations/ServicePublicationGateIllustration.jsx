import React from 'react';

export default function ServicePublicationGateIllustration({ className = '', size = 200 }) {
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
      <path d="M60 60H140M60 84H120M60 108H100" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <rect x="150" y="70" width="40" height="50" rx="8" fill="#DDF4F1" stroke="#0F766E" strokeWidth="2" />
      <path d="M162 70V60A8 8 0 0 1 178 60V70" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="170" cy="92" r="4" fill="#0F766E" />
      <path d="M170 96V104" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
