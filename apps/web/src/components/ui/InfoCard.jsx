export default function InfoCard({ title, description, className = '' }) {
  return (
    <div className={`info-card ${className}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
