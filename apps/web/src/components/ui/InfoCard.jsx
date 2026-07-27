export default function InfoCard({ title, description, marker, icon, className = '' }) {
  return (
    <div className={`info-card ${className}`}>
      {(marker || icon) && (
        <div className="card-indicator" aria-hidden="true">
          {marker && <span className="card-marker">{marker}</span>}
          {icon && <span className="card-icon">{icon}</span>}
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
