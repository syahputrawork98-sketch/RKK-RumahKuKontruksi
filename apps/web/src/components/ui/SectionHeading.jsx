export default function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <div className="section-heading" id={id}>
      {eyebrow && <div className="hero-eyebrow">{eyebrow}</div>}
      <h2 className="hero-title">{title}</h2>
      {description && <p className="hero-desc">{description}</p>}
    </div>
  );
}
