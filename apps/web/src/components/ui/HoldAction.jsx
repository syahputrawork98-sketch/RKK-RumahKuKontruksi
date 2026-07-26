export default function HoldAction({ children, reason, variant = 'primary', className = '', ...props }) {
  return (
    <div className={`hold-action-wrapper ${className}`}>
      <button 
        className={`btn btn-${variant}`} 
        disabled 
        aria-disabled="true"
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
