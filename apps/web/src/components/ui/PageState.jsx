import { Link } from 'react-router-dom';

export default function PageState({ title, description, label }) {
  return (
    <div className="page-state">
      {label && <span className="state-label">{label}</span>}
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to="/" className="btn btn-primary">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
