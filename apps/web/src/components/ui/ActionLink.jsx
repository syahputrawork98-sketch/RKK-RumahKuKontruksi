import { Link } from 'react-router-dom';

export default function ActionLink({
  to,
  href,
  variant = 'primary',
  children,
  className = '',
  isExternal,
  ...props
}) {
  const target = to || href || '';
  const baseClass = `btn btn-${variant} ${className}`.trim();

  if (isExternal || target.startsWith('http')) {
    return (
      <a
        href={target}
        className={baseClass} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={target} className={baseClass} {...props}>
      {children}
    </Link>
  );
}
