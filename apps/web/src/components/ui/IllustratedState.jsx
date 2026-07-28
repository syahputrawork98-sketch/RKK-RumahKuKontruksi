import ActionLink from './ActionLink';

export default function IllustratedState({
  illustration,
  statusLabel,
  title,
  description,
  actionText,
  actionHref = '/',
  className = ''
}) {
  return (
    <div className={`illustrated-state ${className}`.trim()}>
      {illustration && (
        <div className="state-illustration">
          {illustration}
        </div>
      )}
      {statusLabel && (
        <span className="state-status-badge">{statusLabel}</span>
      )}
      {title && <h2 className="state-title">{title}</h2>}
      {description && <p className="state-description">{description}</p>}
      {actionText && (
        <div className="state-action">
          <ActionLink to={actionHref} variant="primary">
            {actionText}
          </ActionLink>
        </div>
      )}
    </div>
  );
}
