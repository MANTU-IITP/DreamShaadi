import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import StarRating from "./StarRating";

const formatPrice = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const VendorCard = ({ vendor }) => {
  const { ids, toggle } = useWishlist();
  const saved = ids.includes(vendor._id);

  return (
    <article className="vendor-card">
      <div className="vendor-card-image">
        <img src={vendor.image1 || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80"} alt={vendor.businessname} />
        {vendor.isPremium && <span className="premium-badge">Premium</span>}
        <button
          type="button"
          className={`wishlist-button ${saved ? "saved" : ""}`}
          onClick={() => toggle(vendor)}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        >
          ♥
        </button>
      </div>
      <div className="vendor-card-body">
        <div className="vendor-card-meta">
          <span className="category-badge">{vendor.category}</span>
          <span>{vendor.city}{vendor.state ? `, ${vendor.state}` : ""}</span>
        </div>
        <h3>{vendor.businessname}</h3>
        <StarRating value={vendor.rating || 0} />
        <div className="vendor-card-footer">
          <p>From <strong>{formatPrice(vendor.price)}</strong></p>
          <Link className="text-link" to={`/vendorpost/${vendor._id}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};

export default VendorCard;
