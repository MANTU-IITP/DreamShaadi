const LoadingSpinner = ({ label = "Loading..." }) => (
  <div className="loading-state" role="status">
    <span className="brand-spinner" />
    <span>{label}</span>
  </div>
);

export default LoadingSpinner;
