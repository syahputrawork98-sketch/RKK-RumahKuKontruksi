const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'apps/web/src/sections/home');

const homeHero = `import ActionLink from '../../components/ui/ActionLink';
import HoldAction from '../../components/ui/HoldAction';
import heroImageWebp from '../../assets/images/home/hero-h1.webp';

export default function HomeHero({ content }) {
  return (
    <section className="home-hero">
      <div className="public-container">
        <div className="hero-grid">
          <div className="hero-content-col">
            <div className="hero-eyebrow">{content.eyebrow}</div>
            <h1 className="hero-title">{content.title}</h1>
            <p className="hero-desc">{content.description}</p>
            <div className="hero-actions">
              <HoldAction 
                reason={content.primaryAction.reason} 
                variant="primary"
              >
                {content.primaryAction.label}
              </HoldAction>
              <ActionLink 
                to={content.secondaryAction.href} 
                variant="outline"
              >
                {content.secondaryAction.label}
              </ActionLink>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img 
                src={heroImageWebp}
                alt="Arsitek meninjau denah di lokasi konstruksi"
                width="630"
                height="420"
                decoding="async"
                fetchPriority="high"
                className="hero-image"
              />
              <div className="hero-overlay-system" aria-hidden="true">
                <div className="system-node">
                  <div className="node-icon"></div>
                  <div className="node-content">
                    <span className="node-stage">{content.visualNodes[0].stage}</span>
                    <span className="node-outcome">{content.visualNodes[0].outcome}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

const homeContext = `import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import secImageWebp from '../../assets/images/home/sec-s1.webp';

export default function HomeContext({ content }) {
  return (
    <PublicSection bg="white" id="konteks">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="editorial-split">
          <div className="editorial-visual">
             <img src={secImageWebp} alt="Arsitek merancang" width="500" height="333" loading="lazy" decoding="async" className="rounded-image" />
          </div>
          <div className="editorial-content">
            <div className="context-list">
              {content.points.map((point, index) => (
                <div className="context-list-item" key={index}>
                  <div className="context-list-marker">0{index + 1}</div>
                  <div className="context-list-text">
                    <h3 className="context-list-title">{point.title}</h3>
                    <p className="context-list-desc">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
`;

const homeApproach = `import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import InfoCard from '../../components/ui/InfoCard';
import PublicIcon from '../../components/icons/PublicIcon';

const icons = ['map', 'shield-check', 'eye', 'check-circle'];

export default function HomeApproach({ content }) {
  return (
    <PublicSection bg="muted" id="pendekatan">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="approach-grid">
          {content.items.map((item, index) => (
            <InfoCard 
              key={index}
              title={item.title}
              description={item.description}
              icon={<PublicIcon name={icons[index % icons.length]} />}
            />
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
`;

const homeWorkflow = `import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import PublicIcon from '../../components/icons/PublicIcon';

const icons = ['message-circle', 'pen-tool', 'hammer', 'home'];

export default function HomeWorkflow({ content }) {
  return (
    <PublicSection bg="white" id="proses">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="timeline-grid editorial-timeline">
          {content.steps.map((step, index) => (
            <div key={index} className="timeline-step">
              <div className="timeline-marker-wrapper">
                <div className="timeline-icon-bg">
                   <PublicIcon name={icons[index % icons.length]} size={20} />
                </div>
                {index < content.steps.length - 1 && <div className="timeline-connector"></div>}
              </div>
              <div className="timeline-content">
                <span className="timeline-number">Tahap 0{index + 1}</span>
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
`;

const homeServices = `import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import ActionLink from '../../components/ui/ActionLink';
import PublicIcon from '../../components/icons/PublicIcon';

export default function HomeServices({ content }) {
  return (
    <PublicSection bg="muted" id="layanan">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="services-hold-state">
          <div className="hold-icon-wrapper">
            <PublicIcon name="lock" size={32} />
          </div>
          <h3 className="hold-title">Layanan Segera Hadir</h3>
          <p className="hold-desc">Kami sedang mempersiapkan katalog layanan yang dapat Anda lihat secara transparan.</p>
          <div className="hold-actions">
             <ActionLink to="/tentang" variant="outline">Pelajari Cara Kami Bekerja</ActionLink>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
`;

const homePrinciples = `import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import secImageWebp from '../../assets/images/home/sec-s2.webp';
import PublicIcon from '../../components/icons/PublicIcon';

export default function HomePrinciples({ content }) {
  return (
    <PublicSection bg="white" id="prinsip">
      <PublicContainer>
        <div className="editorial-split reverse">
           <div className="editorial-visual">
             <img src={secImageWebp} alt="Prinsip kerja profesional" width="500" height="333" loading="lazy" decoding="async" className="rounded-image" />
           </div>
           <div className="editorial-content">
             <SectionHeading 
                eyebrow={content.eyebrow}
                title={content.title}
                description={content.description}
             />
             <div className="principles-list">
                {content.items.map((item, index) => (
                  <div key={index} className="principle-row">
                    <div className="principle-icon">
                       <PublicIcon name="check-circle" size={20} />
                    </div>
                    <div className="principle-text">
                       <h4 className="principle-title">{item.title}</h4>
                       <p className="principle-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
`;

const homeClosing = `import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import HoldAction from '../../components/ui/HoldAction';

export default function HomeClosingCTA({ content }) {
  return (
    <PublicSection bg="white" className="closing-section">
      <PublicContainer>
        <div className="closing-card">
          <h2 className="closing-title">{content.title}</h2>
          <p className="closing-desc">{content.description}</p>
          <div className="closing-actions">
            <HoldAction reason={content.primaryAction.reason} variant="primary">
              {content.primaryAction.label}
            </HoldAction>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
`;

fs.writeFileSync(path.join(srcDir, 'HomeHero.jsx'), homeHero);
fs.writeFileSync(path.join(srcDir, 'HomeContext.jsx'), homeContext);
fs.writeFileSync(path.join(srcDir, 'HomeApproach.jsx'), homeApproach);
fs.writeFileSync(path.join(srcDir, 'HomeWorkflow.jsx'), homeWorkflow);
fs.writeFileSync(path.join(srcDir, 'HomeServices.jsx'), homeServices);
fs.writeFileSync(path.join(srcDir, 'HomePrinciples.jsx'), homePrinciples);
fs.writeFileSync(path.join(srcDir, 'HomeClosingCTA.jsx'), homeClosing);

const cssPath = path.join(__dirname, 'apps/web/src/styles/home.css');
let css = fs.readFileSync(cssPath, 'utf8');

css += \`
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
\`;

css = css.replace(/\\.hero-visual \\{[\\s\\S]*?\\}/, '');
css = css.replace(/\\.hero-grid \\{[\\s\\S]*?\\}/, '');

css += \`
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
\`;

fs.writeFileSync(cssPath, css);
console.log('Updated sections and css');
