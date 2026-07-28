export default function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <div className="section-heading" id={id}>
      {eyebrow && <div className="section-heading__eyebrow">{eyebrow}</div>}
      <h2 className="section-heading__title">{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  );
}
