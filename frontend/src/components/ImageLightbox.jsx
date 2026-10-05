import { useState } from "react";
import Modal from "./Modal";
import "./ImageLightbox.css";

const ImageLightbox = ({ images = [], open, onClose, startIndex = 0 }) => {
  const [index, setIndex] = useState(startIndex);
  if (!images.length) return null;
  const previous = () => setIndex((current) => (current - 1 + images.length) % images.length);
  const next = () => setIndex((current) => (current + 1) % images.length);

  return (
    <Modal open={open} onClose={onClose} title="Vendor gallery" size="large">
      <div className="lightbox">
        <div className="lightbox-topline">
          <span>THE PORTFOLIO EDIT</span>
          <span>{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        </div>
        <div className="lightbox-stage">
          {images.length > 1 && (
            <button type="button" className="lightbox-arrow lightbox-previous" onClick={previous} aria-label="Previous image">‹</button>
          )}
          <img src={images[index]} alt={`Vendor gallery image ${index + 1}`} />
          {images.length > 1 && (
            <button type="button" className="lightbox-arrow lightbox-next" onClick={next} aria-label="Next image">›</button>
          )}
        </div>
        {images.length > 1 && (
          <div className="lightbox-thumbnails" aria-label="Choose a gallery image">
            {images.map((image, imageIndex) => (
              <button
                type="button"
                key={`${image}-${imageIndex}`}
                className={imageIndex === index ? "is-active" : ""}
                onClick={() => setIndex(imageIndex)}
                aria-label={`View image ${imageIndex + 1}`}
                aria-pressed={imageIndex === index}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImageLightbox;
