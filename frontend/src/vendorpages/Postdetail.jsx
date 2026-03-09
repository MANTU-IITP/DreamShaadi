import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Postdetail.css";

function Postdetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendorData, setVendorData] = useState({
    businessname: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    galleryImages: [],
    galleryVideos: [],
    reviews: [],
    rating: 0,
    category: "",
    price: "",
    city: "",
    state: "",
    landMark: "",
    viewsCount: 0,
    contactLocked: true,
  });

  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const [checkInForm, setCheckInForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guests: "",
    message: "",
  });

  const fetchVendor = async () => {
    const token = localStorage.getItem("token") || "";
    const res = await axios.get(`http://localhost:3000/vendor/post/getone/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    setVendorData(res.data);
  };

  useEffect(() => {
    fetchVendor().catch(() => {});
  }, [id]);

  useEffect(() => {
    const viewerName = JSON.parse(localStorage.getItem("loggedInUser") || "null") || "";
    const viewerEmail = localStorage.getItem("loggedInEmail") || "";
    axios.post(`http://localhost:3000/vendor/post/${id}/view`, { viewerName, viewerEmail }).catch(() => {});
  }, [id]);

  const gallery = useMemo(() => {
    const images = [vendorData.image1, vendorData.image2, vendorData.image3, ...(vendorData.galleryImages || [])]
      .filter(Boolean)
      .map((url) => ({ type: "image", url }));
    const videos = (vendorData.galleryVideos || [])
      .filter(Boolean)
      .map((url) => ({ type: "video", url }));
    return [...new Map([...images, ...videos].map((item) => [item.url, item])).values()];
  }, [vendorData]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await axios.delete(`http://localhost:3000/vendor/post/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      });
      navigate("/vendor");
    } catch {
      alert("Delete failed.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/vendor/post/${id}/reviews`, reviewForm);
      setReviewForm({ name: "", rating: 5, comment: "" });
      await fetchVendor();
    } catch {
      alert("Unable to submit review.");
    }
  };

  const renderStars = (value) => {
    const rating = Number(value || 0);
    return "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);
  };

  const handleCheckInSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/vendor/post/${id}/checkin`, {
        ...checkInForm,
        guests: Number(checkInForm.guests || 0),
      });
      alert("Availability check sent to vendor.");
      setCheckInForm({ name: "", email: "", phone: "", eventDate: "", guests: "", message: "" });
    } catch {
      alert("Unable to submit check-in.");
    }
  };

  return (
    <div className="detail-page">
      <header className="detail-head">
        <h1>{vendorData.businessname}</h1>
        <p>{vendorData.category} | {vendorData.city}{vendorData.state ? `, ${vendorData.state}` : ""}</p>
      </header>

      <div className="detail-layout">
        <section className="detail-left">
          <div className="media-grid">
            {gallery.map((item, index) => (
              <article key={`${item.url}-${index}`} className={`media-tile ${index === 0 ? "hero" : ""}`}>
                {item.type === "video" ? (
                  <video controls preload="metadata">
                    <source src={item.url} />
                  </video>
                ) : (
                  <img src={item.url} alt={`Gallery ${index + 1}`} />
                )}
              </article>
            ))}
            {gallery.length === 0 && <p>No media uploaded yet.</p>}
          </div>

          <div className="description-card">
            <h3>About This Venue</h3>
            <p>{vendorData.description || "No description yet."}</p>
            <div className="description-meta">
              <span>Location: {vendorData.landMark || "N/A"}</span>
              <span>Rating: {vendorData.rating || 0}/5</span>
              <span>Views: {vendorData.viewsCount || 0}</span>
            </div>
          </div>
        </section>

        <aside className="detail-right">
          <div className="price-card">
            <p>Starting Price</p>
            <h2>{vendorData.price ? `Rs. ${Number(vendorData.price).toLocaleString("en-IN")}` : "Not set"}</h2>
          </div>

          <div className="checkin-card">
            <h3>Check Availability</h3>
            <form onSubmit={handleCheckInSubmit} className="checkin-form">
              <input placeholder="Your Name" value={checkInForm.name} onChange={(e) => setCheckInForm({ ...checkInForm, name: e.target.value })} required />
              <input type="email" placeholder="Email" value={checkInForm.email} onChange={(e) => setCheckInForm({ ...checkInForm, email: e.target.value })} required />
              <input placeholder="Phone" value={checkInForm.phone} onChange={(e) => setCheckInForm({ ...checkInForm, phone: e.target.value })} required />
              <input type="date" value={checkInForm.eventDate} onChange={(e) => setCheckInForm({ ...checkInForm, eventDate: e.target.value })} required />
              <input type="number" placeholder="Guests" value={checkInForm.guests} onChange={(e) => setCheckInForm({ ...checkInForm, guests: e.target.value })} />
              <textarea placeholder="Message" value={checkInForm.message} onChange={(e) => setCheckInForm({ ...checkInForm, message: e.target.value })} />
              <button type="submit">Send Inquiry</button>
            </form>
          </div>

          {!vendorData.contactLocked && (
            <div className="owner-actions">
              <button onClick={() => navigate(`/vendorpost/edit/${id}`)}>Edit</button>
              <button className="danger" onClick={handleDelete}>Delete</button>
            </div>
          )}
        </aside>
      </div>

      <section className="review-section">
        <h3>Reviews</h3>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <input placeholder="Your Name" value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} required />
          <div className="review-rating-picker">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${Number(reviewForm.rating) >= star ? "active" : ""}`}
                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                aria-label={`Rate ${star} star`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea placeholder="Write your review" value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} required />
          <button type="submit" className="review-submit-btn">Submit Review</button>
        </form>

        <div className="review-list">
          {vendorData.reviews?.map((review, idx) => (
            <article key={`${review.name}-${idx}`} className="review-item">
              <div className="review-row">
                <strong>{review.name}</strong>
                <span className="review-stars">{renderStars(review.rating)}</span>
              </div>
              <p className="review-date">
                {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recent review"}
              </p>
              <p>{review.comment}</p>
            </article>
          ))}
          {vendorData.reviews?.length === 0 && <p>No reviews yet.</p>}
        </div>
      </section>
    </div>
  );
}

export default Postdetail;
