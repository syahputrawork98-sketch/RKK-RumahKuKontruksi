import { Link } from 'react-router-dom';

export default function PublishedServiceCard({ service }) {
  if (!service) return null;

  return (
    <article className="published-service-card">
      <h3>{service.name}</h3>
      <Link to={service.detailRoute}>Lihat Detail</Link>
    </article>
  );
}
