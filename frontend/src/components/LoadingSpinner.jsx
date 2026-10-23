const LoadingSpinner = ({
  label = "Preparing something beautiful...",
  size = "default",
}) => (
  <div
    className={`loading-state loading-state--${size}`}
    role="status"
    aria-live="polite"
  >
    <div className="loading-emblem" aria-hidden="true">
      <span className="loading-emblem-ring" />
      <span className="loading-emblem-flower">✳</span>
      <span className="loading-emblem-center" />
    </div>
    
    <p className="loading-label">{label}</p>
    
    <div className="loading-progress" aria-hidden="true">
      <span />
    </div>
    
    <span className="loading-sr-only">Loading</span>
  </div>
);

export default LoadingSpinner;
