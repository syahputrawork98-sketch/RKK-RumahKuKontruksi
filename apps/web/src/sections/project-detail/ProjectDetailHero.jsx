import React from 'react';

export function ProjectDetailHero({ project }) {
  const {
    category,
    title,
    summary,
    coverMedia,
    locationGeneral,
    periodGeneral,
    publicStatus,
    completionYear,
  } = project;

  return (
    <section className="project-detail-hero">
      <div className="hero-content">
        <span className="hero-category">{category}</span>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-summary">{summary}</p>
        
        {(locationGeneral || periodGeneral || publicStatus || completionYear) && (
          <div className="hero-meta-pills">
            {locationGeneral && <span className="meta-pill">{locationGeneral}</span>}
            {periodGeneral && <span className="meta-pill">{periodGeneral}</span>}
            {completionYear && <span className="meta-pill">Tahun {completionYear}</span>}
            {publicStatus && <span className="meta-pill status-pill">{publicStatus}</span>}
          </div>
        )}
      </div>

      {coverMedia && (
        <div className="hero-cover">
          <img
            src={coverMedia.src}
            alt={coverMedia.alt}
            className="cover-image"
            loading="eager"
          />
        </div>
      )}
    </section>
  );
}
