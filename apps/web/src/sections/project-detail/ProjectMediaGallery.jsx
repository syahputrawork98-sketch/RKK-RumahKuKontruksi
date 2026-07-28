import React from 'react';
import { projectDetailContent } from '../../content/project-detail';

export function ProjectMediaGallery({ gallery }) {
  const { labels } = projectDetailContent.published;

  if (!Array.isArray(gallery) || gallery.length === 0) {
    return null;
  }

  return (
    <section className="project-gallery">
      <h2 className="section-title">{labels.galleryTitle}</h2>
      <ul className="gallery-grid">
        {gallery.map((item, index) => (
          <li key={index} className="gallery-item">
            <img
              src={item.src}
              alt={item.alt}
              className="gallery-image"
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
