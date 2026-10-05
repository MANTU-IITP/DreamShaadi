const Toast = ({ message, type, onClose }) => (
  <div className={`toast toast-${type}`} role="status">
    <span>{message}</span>
    <button type="button" onClick={onClose} aria-label="Close notification">×</button>
  </div>
);

export default Toast;
