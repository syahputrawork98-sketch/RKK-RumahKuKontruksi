export default function HoldAction({ children, reason, variant = 'primary', className = '', ...props }) {
  return (
    <div className={`hold-action-wrapper ${className}`}>
      <button 
        {...props}
        type="button"
        className={`btn btn-${variant}`} 
        aria-disabled="true"
        onClick={(e) => e.preventDefault()}
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
