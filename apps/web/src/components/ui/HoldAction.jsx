export default function HoldAction({ children, reason, variant = 'primary', className = '', ...props }) {
  return (
    <div className={`hold-action-wrapper ${className}`}>
      <button 
        className={`btn btn-${variant}`} 
        aria-disabled="true"
        onClick={(e) => e.preventDefault()}
        {...props}
      >
        {children}
      </button>
      {reason && (
        <span className="hold-reason" aria-live="polite">
          {reason}
        </span>
      )}
    </div>
  );
}
