import React from 'react';
import illustrationAsset from '../../assets/illustrations/public-states/service-publication-gate.svg';

export default function ServicePublicationGateIllustration({ className = '', size = 200 }) {
  return (
    <img
      src={illustrationAsset}
      alt=""
      aria-hidden="true"
      width={size}
      height={(size * 3) / 4}
      className={className}
      data-illustration="service-publication-gate"
    />
  );
}
