const EmptyState = ({ title, message, actionLabel, onAction }) => (
  <div className="empty-state">
    <div className="empty-state-mark">✦</div>
    <h2>{title}</h2>
    <p>{message}</p>
    {actionLabel && (
      <button type="button" className="btn btn-primary" onClick={onAction}>{actionLabel}</button>
    )}
  </div>
);

export default EmptyState;
