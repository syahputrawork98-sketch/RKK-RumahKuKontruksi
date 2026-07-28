import React from 'react';
import illustrationAsset from '../../assets/illustrations/public-states/project-empty-state.svg';

export default function ProjectEmptyStateIllustration({ className = '', size = 200 }) {
  return (
    <img
      src={illustrationAsset}
      alt=""
      aria-hidden="true"
      width={size}
      height={(size * 3) / 4}
      className={className}
      data-illustration="project-empty-state"
    />
  );
}
