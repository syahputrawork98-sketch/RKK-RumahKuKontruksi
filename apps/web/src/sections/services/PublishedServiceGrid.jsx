import PublishedServiceCard from './PublishedServiceCard';

export default function PublishedServiceGrid({ services }) {
  return (
    <ul className="published-service-grid">
      {services.map((service) => (
        <li key={service.serviceCode || service.detailRoute}>
          <PublishedServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
}
