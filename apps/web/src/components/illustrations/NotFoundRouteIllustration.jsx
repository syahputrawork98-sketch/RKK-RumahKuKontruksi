import React from 'react';
import illustrationAsset from '../../assets/illustrations/public-states/not-found-route.svg';

export default function NotFoundRouteIllustration({ className = '', size = 200 }) {
  return (
    <img
      src={illustrationAsset}
      alt=""
      aria-hidden="true"
      width={size}
      height={(size * 3) / 4}
      className={className}
      data-illustration="not-found-route"
    />
  );
}
