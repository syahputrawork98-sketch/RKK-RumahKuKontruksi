const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'apps/web/src/styles/home.css');
let css = fs.readFileSync(cssPath, 'utf8');

css += `
/* Editorial Layouts */
.editorial-split {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  margin-top: var(--spacing-10);
}
@media (min-width: 1024px) {
  .editorial-split {
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-16);
  }
  .editorial-split.reverse {
    flex-direction: row-reverse;
  }
  .editorial-visual, .editorial-content {
    flex: 1;
  }
}
.rounded-image {
  border-radius: var(--radius-panel);
  width: 100%;
  height: auto;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

/* Context List */
.context-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}
.context-list-item {
  display: flex;
  gap: var(--spacing-4);
  padding-bottom: var(--spacing-6);
  border-bottom: 1px solid var(--color-neutral-200);
}
.context-list-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.context-list-marker {
  font-family: var(--font-family-mono);
  font-weight: 700;
  color: var(--color-brand-600);
}
.context-list-title {
  font-size: var(--font-size-h3-mobile);
  margin-bottom: var(--spacing-2);
}
@media (min-width: 1024px) {
  .context-list-title {
    font-size: var(--font-size-h3-desktop);
  }
}
.context-list-desc {
  color: var(--color-neutral-700);
}

/* Timeline updated */
.editorial-timeline {
  flex-direction: column;
}
@media (min-width: 768px) {
  .editorial-timeline {
    flex-direction: row;
  }
}
.timeline-step {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-4);
  position: relative;
}
@media (min-width: 768px) {
  .timeline-step {
    flex-direction: column;
    flex: 1;
  }
}
.timeline-marker-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
@media (min-width: 768px) {
  .timeline-marker-wrapper {
    flex-direction: row;
    justify-content: flex-start;
  }
}
.timeline-icon-bg {
  background: var(--color-brand-100);
  color: var(--color-brand-700);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  flex-shrink: 0;
}
.timeline-connector {
  width: 2px;
  height: 100%;
  background: var(--color-neutral-200);
  position: absolute;
  top: 48px;
  left: 23px;
  z-index: 1;
}
@media (min-width: 768px) {
  .timeline-connector {
    width: 100%;
    height: 2px;
    top: 23px;
    left: 48px;
  }
}
.timeline-content {
  padding-bottom: var(--spacing-8);
}
@media (min-width: 768px) {
  .timeline-content {
    padding-bottom: 0;
    padding-right: var(--spacing-4);
  }
}
.timeline-title {
  margin: var(--spacing-2) 0;
  font-size: var(--font-size-h3-mobile);
}
@media (min-width: 1024px) {
  .timeline-title {
    font-size: var(--font-size-h3-desktop);
  }
}

/* Services Hold State */
.services-hold-state {
  background: var(--color-neutral-0);
  border-radius: var(--radius-panel);
  padding: var(--spacing-12) var(--spacing-6);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}
.hold-icon-wrapper {
  background: var(--color-neutral-100);
  color: var(--color-neutral-500);
  padding: var(--spacing-4);
  border-radius: 50%;
  margin-bottom: var(--spacing-6);
}
.hold-title {
  margin-bottom: var(--spacing-2);
}
.hold-desc {
  color: var(--color-neutral-700);
  margin-bottom: var(--spacing-6);
}

/* Principles List */
.principles-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  margin-top: var(--spacing-8);
}
.principle-row {
  display: flex;
  gap: var(--spacing-4);
}
.principle-icon {
  color: var(--color-brand-600);
  margin-top: 4px;
}
.principle-title {
  margin-bottom: var(--spacing-1);
}
.principle-desc {
  color: var(--color-neutral-700);
}

/* Closing CTA */
.closing-section {
  padding-bottom: var(--spacing-12);
}
.closing-card {
  background: var(--color-brand-900);
  color: var(--color-neutral-0);
  border-radius: var(--radius-panel);
  padding: var(--spacing-12) var(--spacing-6);
  text-align: center;
  background-image: radial-gradient(circle at 100% 0%, var(--color-brand-800) 0%, transparent 40%);
}
.closing-title {
  color: var(--color-neutral-0);
  margin-bottom: var(--spacing-4);
}
.closing-desc {
  color: var(--color-neutral-200);
  margin-bottom: var(--spacing-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.closing-actions {
  display: flex;
  justify-content: center;
}
`;

css = css.replace(/\.hero-visual \{[\s\S]*?\}/g, '');
css = css.replace(/\.hero-grid \{[\s\S]*?\}/g, '');
css = css.replace(/@media \(min-width: 1024px\) \{[\s\S]*?\.hero-grid \{[\s\S]*?\}[\s\S]*?\}/g, '');

css += `
.hero-visual {
  position: relative;
  background-color: transparent;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}
.hero-image-wrapper {
  position: relative;
  border-radius: var(--radius-panel);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  aspect-ratio: 3/2;
}
.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.hero-overlay-system {
  position: absolute;
  bottom: var(--spacing-6);
  right: var(--spacing-6);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-card);
  padding: var(--spacing-4);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
.hero-content-col {
  order: 2;
}
@media (min-width: 1024px) {
  .hero-content-col {
    order: 1;
  }
  .hero-visual {
    order: 2;
  }
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);
  align-items: center;
}
@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-16);
  }
}
`;

fs.writeFileSync(cssPath, css);
console.log('Updated css successfully');
