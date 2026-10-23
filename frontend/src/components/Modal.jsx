import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ open, title, onClose, children, size = "medium" }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`modal-panel modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <span className="modal-header-flower" aria-hidden="true">✳</span>
          <div className="modal-header-copy">
            <span className="modal-kicker">DREAMSHAADI</span>
            <h2 id="modal-title">{title}</h2>
          </div>
          <button type="button" className="icon-button modal-close" onClick={onClose} aria-label="Close dialog">×</button>
        </header>
        <div className="modal-body">{children}</div>
      </section>
    </div>
  );
};

export default Modal;
