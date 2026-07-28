import { Link } from 'react-router-dom';

export default function ActionLink({
  to,
  variant = 'primary',
  children,
  className = '',
  isExternal,
  ...props
}) {
  const baseClass = `btn btn-${variant} ${className}`.trim();

  if (isExternal || to.startsWith('http')) {
    return (
      <a
        href={to}
        className={baseClass} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={baseClass} {...props}>
      {children}
    </Link>
  );
}
