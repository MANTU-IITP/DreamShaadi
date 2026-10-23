import { useState } from "react";
import Modal from "./Modal";

const ImageLightbox = ({ images = [], open, onClose, startIndex = 0 }) => {
  const [index, setIndex] = useState(startIndex);
  if (!images.length) return null;
  const previous = () => setIndex((current) => (current - 1 + images.length) % images.length);
  const next = () => setIndex((current) => (current + 1) % images.length);

  return (
    <Modal open={open} onClose={onClose} title="Vendor gallery" size="large">
      <div className="lightbox">
        <button type="button" onClick={previous} aria-label="Previous image">‹</button>
        <img src={images[index]} alt={`Gallery ${index + 1}`} />
        <button type="button" onClick={next} aria-label="Next image">›</button>
      </div>
    </Modal>
  );
};

export default ImageLightbox;
