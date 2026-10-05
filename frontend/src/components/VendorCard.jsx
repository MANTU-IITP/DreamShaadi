import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import StarRating from "./StarRating";
import "./VendorCard.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80";

const formatPrice = (value) => {
  const price = Number(value);
  
  if (value == null || value === "" || !Number.isFinite(price) || price < 0) {
    return null;
  }
  
  return `₹${price.toLocaleString("en-IN")}`;
};

const VendorCard = ({ vendor }) => {
  const { ids = [], toggle } = useWishlist();
  const [imageSrc, setImageSrc] = useState(
    vendor.image1 || FALLBACK_IMAGE
  );
  const [imageFailed, setImageFailed] = useState(false);
  
  const saved = ids.some((id) => String(id) === String(vendor._id));
  const price = formatPrice(vendor.price);
  
  const businessName = vendor.businessname || "Wedding Professional";
  const location = [vendor.city, vendor.state].filter(Boolean).join(", ");
  
  const rating = Number(vendor.rating);
  const hasRating = Number.isFinite(rating) && rating > 0;
  
  const handleWishlist = () => {
    if (typeof toggle === "function") {
      toggle(vendor);
    }
  };
  
  return (
    <article className="ds-vendor-card">
      <Link
        to={`/vendorpost/${vendor._id}`}
        className="ds-vendor-image-link"
        aria-label={`View ${businessName} profile`}
        tabIndex={-1}
      >
        <div className="ds-vendor-image">
          {!imageFailed ? (
            <img
              src={imageSrc}
              alt={`${businessName}${vendor.category ? ` — ${vendor.category}` : ""}`}
              loading="lazy"
              decoding="async"
              onError={() => {
                if (imageSrc !== FALLBACK_IMAGE) {
                  setImageSrc(FALLBACK_IMAGE);
                } else {
                  setImageFailed(true);
                }
              }}
            />
          ) : (
            <div className="ds-vendor-image-fallback" aria-hidden="true">
              <span>✳</span>
              <span>Wedding inspiration</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="ds-vendor-image-shade" />
      
      <div className="ds-vendor-image-top">
        {vendor.isPremium && (
          <span className="ds-vendor-premium">
            <span aria-hidden="true">✦</span> Featured
          </span>
        )}
        
        <button
          type="button"
          className={`ds-vendor-wishlist ${saved ? "is-saved" : ""}`}
          onClick={handleWishlist}
          aria-label={
            saved
              ? `Remove ${businessName} from wishlist`
              : `Save ${businessName} to wishlist`
          }
          aria-pressed={saved}
        >
          <svg
            viewBox="0 0 24 24"
            fill={saved ? "currentColor" : "none"}
            aria-hidden="true"
          >
            <path
              d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.3 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      
      <Link
        to={`/vendorpost/${vendor._id}`}
        className="ds-vendor-card-content"
        aria-label={`Explore ${businessName}`}
      >
        <div className="ds-vendor-meta">
          {vendor.category && (
            <span className="ds-vendor-category">
              {vendor.category}
            </span>
          )}
          
          {location && (
            <span className="ds-vendor-location">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              <span>{location}</span>
            </span>
          )}
        </div>
        
        <h3 className="ds-vendor-name">{businessName}</h3>
        
        <div className="ds-vendor-rating">
          {hasRating ? (
            <>
              <StarRating value={rating} />
              <span className="ds-vendor-rating-value">
                {rating.toFixed(1)}
              </span>
            </>
          ) : (
            <span className="ds-vendor-unrated">
              New to the marketplace
            </span>
          )}
        </div>
        
        <div className="ds-vendor-divider" />
        
        <div className="ds-vendor-footer">
          <div className="ds-vendor-price">
            <span>{price ? "Packages from" : "Pricing"}</span>
            <strong>{price || "Contact for pricing"}</strong>
          </div>
          
          <span className="ds-vendor-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </Link>
    </article>
  );
};

export default VendorCard;
