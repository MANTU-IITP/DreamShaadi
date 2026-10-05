import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import StarRating from "../components/StarRating";
import ImageLightbox from "../components/ImageLightbox";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";

const emptyEnquiry = { name: "", email: "", phone: "", eventDate: "", guests: "", message: "" };
const emptyBooking = { name: "", email: "", phone: "", eventDate: "", packageName: "", tokenAmount: "", notes: "" };
const formatPrice = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const VendorDetail = () => {
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const { ids, toggle } = useWishlist();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState("");
  const [lightbox, setLightbox] = useState(false);
  const [enquiry, setEnquiry] = useState(emptyEnquiry);
  const [booking, setBooking] = useState(emptyBooking);
  const [review, setReview] = useState({ name: "", rating: 5, comment: "" });
  const [formError, setFormError] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [otp, setOtp] = useState({ target: "", code: "", sent: false, phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const loadVendor = async () => {
    try {
      setLoading(true);
      const [vendorResponse, availabilityResponse] = await Promise.all([
        api.get(`/vendor/post/getone/${id}`),
        api.get(`/vendor/post/${id}/availability`).catch(() => ({ data: { bookedDates: [] } })),
      ]);
      setVendor(vendorResponse.data);
      setBookedDates(availabilityResponse.data.bookedDates || []);
      const identity = { name: user?.name || "", email: user?.email || "" };
      setEnquiry((current) => ({ ...current, ...identity }));
      setBooking((current) => ({ ...current, ...identity }));
      setReview((current) => ({ ...current, name: identity.name }));
    } catch (requestError) {
      setError(requestError.response?.data?.msg || "This vendor is currently unavailable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendor();
    // Reload when the route changes; user defaults are read at that time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const images = useMemo(() => {
    if (!vendor) return [];
    return [...new Set([vendor.image1, vendor.image2, vendor.image3, ...(vendor.galleryImages || [])].filter(Boolean))];
  }, [vendor]);

  const validateContactForm = (values) => {
    if (!values.name || !values.email || !values.phone || !values.eventDate) return "Please complete all required fields.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) return "Please enter a valid email address.";
    if (String(values.phone).replace(/\D/g, "").length < 10) return "Please enter a valid phone number.";
    if (bookedDates.includes(values.eventDate)) return "This date is already booked. Please choose another date.";
    return "";
  };

  const submitEnquiry = async (event) => {
    event.preventDefault();
    const validation = validateContactForm(enquiry);
    if (validation) return setFormError(validation);
    try {
      setSubmitting(true);
      await api.post(`/vendor/post/${id}/checkin`, enquiry);
      showToast("Your enquiry has been sent to the vendor.", "success");
      setModal("");
      setEnquiry({ ...emptyEnquiry, name: user?.name || "", email: user?.email || "" });
      setFormError("");
    } catch (requestError) {
      setFormError(requestError.response?.data?.error || "Unable to send your enquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    const validation = validateContactForm(booking);
    if (validation) return setFormError(validation);
    try {
      setSubmitting(true);
      await api.post(`/vendor/post/${id}/book`, booking);
      showToast("Booking request sent! The vendor will confirm within 24 hours.", "success");
      setModal("booking-success");
      setFormError("");
    } catch (requestError) {
      setFormError(requestError.response?.data?.error || "Unable to send your booking request.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitReview = async (event) => {
    event.preventDefault();
    if (!review.name || !review.comment) return setFormError("Please add your name and review.");
    try {
      setSubmitting(true);
      await api.post(`/vendor/post/${id}/reviews`, review);
      showToast("Thank you for sharing your experience.", "success");
      setModal("");
      setFormError("");
      await loadVendor();
    } catch (requestError) {
      setFormError(requestError.response?.data?.error || "Unable to add your review.");
    } finally {
      setSubmitting(false);
    }
  };

  const requestOtp = async () => {
    if (!otp.target) return setFormError("Enter your phone number or email first.");
    try {
      const payload = otp.target.includes("@") ? { viewerEmail: otp.target } : { viewerPhone: otp.target };
      const response = await api.post(`/vendor/post/${id}/contact/request-otp`, payload);
      setOtp((current) => ({ ...current, sent: true }));
      setFormError("");
      if (response.data.developmentOtp) showToast(`Development OTP: ${response.data.developmentOtp}`, "info");
    } catch (requestError) {
      setFormError(requestError.response?.data?.error || "Unable to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const payload = otp.target.includes("@")
        ? { viewerEmail: otp.target, otp: otp.code }
        : { viewerPhone: otp.target, otp: otp.code };
      const response = await api.post(`/vendor/post/${id}/contact/verify-otp`, payload);
      setOtp((current) => ({ ...current, phone: response.data.phone }));
      setFormError("");
    } catch (requestError) {
      setFormError(requestError.response?.data?.error || "OTP verification failed.");
    }
  };

  if (loading) return <><Navbar /><main className="detail-loading"><LoadingSpinner label="Preparing the vendor portfolio..." /></main></>;
  if (error || !vendor) return <><Navbar /><main className="simple-page"><EmptyState title="Vendor unavailable" message={error} actionLabel="Browse vendors" onAction={() => window.location.assign("/vendor")} /></main><Footer /></>;

  const saved = ids.includes(vendor._id);
  return (
    <>
      <Navbar />
      <main className="vendor-detail-page">
        <nav className="breadcrumbs"><Link to="/">Home</Link><span>›</span><Link to="/vendor">Vendors</Link><span>›</span><Link to={`/vendor?category=${vendor.category}`}>{vendor.category}</Link><span>›</span><span>{vendor.businessname}</span></nav>

        <section className="detail-gallery">
          <button type="button" className="gallery-main" onClick={() => setLightbox(true)}><img src={images[0]} alt={`${vendor.businessname} main portfolio`} /></button>
          <div>
            {images.slice(1, 3).map((image, index) => <button type="button" key={image} onClick={() => setLightbox(true)}><img src={image} alt={`${vendor.businessname} portfolio ${index + 2}`} /></button>)}
          </div>
          <button type="button" className="gallery-count" onClick={() => setLightbox(true)}>View all {images.length} photos</button>
        </section>

        <div className="detail-layout">
          <div className="detail-content">
            <section className="vendor-intro">
              <div className="detail-badges"><span className="category-badge">{vendor.category}</span><span>{vendor.city}{vendor.state ? `, ${vendor.state}` : ""}</span>{vendor.contactVerified && <span className="verified-badge">✓ Verified</span>}</div>
              <h1>{vendor.businessname}</h1>
              <div className="detail-rating"><StarRating value={vendor.rating} /><span>{vendor.reviews?.length || 0} reviews</span></div>
              <p className="detail-description">{vendor.description}</p>
            </section>

            <section className="detail-section">
              <div className="section-heading left"><span className="eyebrow">Choose what fits</span><h2>Packages</h2></div>
              <div className="package-grid">
                {(vendor.packages?.length ? vendor.packages : [{ name: "Custom Celebration", price: vendor.price, description: "A tailored package based on your event requirements.", inclusions: ["Personal consultation", "Custom quotation"] }]).map((pack) => (
                  <article className="package-card" key={`${pack.name}-${pack.price}`}><h3>{pack.name}</h3><strong>{formatPrice(pack.price)}</strong><p>{pack.description}</p><ul>{pack.inclusions?.map((item) => <li key={item}>✓ {item}</li>)}</ul><button type="button" className="text-link" onClick={() => { setBooking((current) => ({ ...current, packageName: pack.name })); setModal("booking"); }}>Choose package</button></article>
                ))}
              </div>
            </section>

            <section className="detail-section">
              <div className="section-heading left"><span className="eyebrow">Recent work</span><h2>Gallery</h2></div>
              <div className="masonry-gallery">{images.map((image, index) => <button type="button" key={image} onClick={() => setLightbox(true)}><img src={image} alt={`${vendor.businessname} gallery ${index + 1}`} /></button>)}</div>
            </section>

            <section className="detail-section reviews-section">
              <div className="section-heading left"><span className="eyebrow">Couple experiences</span><h2>Reviews</h2></div>
              <div className="review-summary"><strong>{Number(vendor.rating || 0).toFixed(1)}</strong><div><StarRating value={vendor.rating} /><span>Based on {vendor.reviews?.length || 0} reviews</span></div>{isLoggedIn && <button type="button" className="btn btn-outline" onClick={() => setModal("review")}>Write a Review</button>}</div>
              <div className="review-list">{vendor.reviews?.length ? vendor.reviews.map((item) => <article key={item._id}><div><strong>{item.name}</strong><StarRating value={item.rating} label={false} /></div><p>{item.comment}</p><small>{new Date(item.createdAt).toLocaleDateString("en-IN")}</small></article>) : <p className="muted">No reviews yet. Be the first to share your experience.</p>}</div>
            </section>
          </div>

          <aside className="booking-sidebar">
            <div className="contact-card">
              <span className="eyebrow">Starting from</span><h2>{formatPrice(vendor.price)}</h2><p>Final pricing depends on your date, package, and requirements.</p>
              <button type="button" className="btn btn-primary book-button" onClick={() => setModal("booking")}>Book Now</button>
              <button type="button" className="btn btn-outline" onClick={() => setModal("enquiry")}>Send Enquiry</button>
              <button type="button" className={`btn wishlist-wide ${saved ? "saved" : ""}`} onClick={() => toggle(vendor)}>{saved ? "♥ Saved to Wishlist" : "♡ Save to Wishlist"}</button>
              <button type="button" className="phone-reveal" onClick={() => setModal("otp")}>{otp.phone || "View Phone Number"}</button>
            </div>
            <div className="quick-info">
              <h3>Quick Information</h3>
              <dl><div><dt>Category</dt><dd>{vendor.category}</dd></div><div><dt>Cities served</dt><dd>{vendor.availableCities?.join(", ") || vendor.city}</dd></div><div><dt>Location</dt><dd>{[vendor.landMark, vendor.city, vendor.state].filter(Boolean).join(", ")}</dd></div></dl>
              <div className="social-links">{vendor.socialLinks?.instagram && <a href={vendor.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>}{vendor.socialLinks?.facebook && <a href={vendor.socialLinks.facebook} target="_blank" rel="noreferrer">Facebook</a>}{vendor.socialLinks?.website && <a href={vendor.socialLinks.website} target="_blank" rel="noreferrer">Website</a>}</div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />

      <ImageLightbox images={images} open={lightbox} onClose={() => setLightbox(false)} />
      <Modal open={modal === "enquiry"} title="Send an Enquiry" onClose={() => { setModal(""); setFormError(""); }}>
        <form className="modal-form" onSubmit={submitEnquiry}>
          <div className="form-grid"><label>Name *<input value={enquiry.name} onChange={(event) => setEnquiry({ ...enquiry, name: event.target.value })} /></label><label>Email *<input type="email" value={enquiry.email} onChange={(event) => setEnquiry({ ...enquiry, email: event.target.value })} /></label><label>Phone *<input value={enquiry.phone} onChange={(event) => setEnquiry({ ...enquiry, phone: event.target.value })} /></label><label>Event date *<input type="date" min={new Date().toISOString().slice(0, 10)} value={enquiry.eventDate} onChange={(event) => setEnquiry({ ...enquiry, eventDate: event.target.value })} /></label><label>Guest count<input type="number" min="0" value={enquiry.guests} onChange={(event) => setEnquiry({ ...enquiry, guests: event.target.value })} /></label></div>
          <label>Message<textarea value={enquiry.message} onChange={(event) => setEnquiry({ ...enquiry, message: event.target.value })} /></label>
          {formError && <p className="form-error">{formError}</p>}<button className="btn btn-primary" disabled={submitting}>{submitting ? "Sending..." : "Send Enquiry"}</button>
        </form>
      </Modal>

      <Modal open={modal === "booking"} title="Request Your Date" onClose={() => { setModal(""); setFormError(""); }}>
        <form className="modal-form" onSubmit={submitBooking}>
          <div className="form-grid"><label>Name *<input value={booking.name} onChange={(event) => setBooking({ ...booking, name: event.target.value })} /></label><label>Email *<input type="email" value={booking.email} onChange={(event) => setBooking({ ...booking, email: event.target.value })} /></label><label>Phone *<input value={booking.phone} onChange={(event) => setBooking({ ...booking, phone: event.target.value })} /></label><label>Event date *<input type="date" min={new Date().toISOString().slice(0, 10)} value={booking.eventDate} onChange={(event) => setBooking({ ...booking, eventDate: event.target.value })} /></label><label>Package<select value={booking.packageName} onChange={(event) => setBooking({ ...booking, packageName: event.target.value })}><option value="">Custom package</option>{vendor.packages?.map((pack) => <option key={pack.name}>{pack.name}</option>)}</select></label><label>Token amount<input type="number" min="0" value={booking.tokenAmount} onChange={(event) => setBooking({ ...booking, tokenAmount: event.target.value })} /></label></div>
          <label>Notes<textarea value={booking.notes} onChange={(event) => setBooking({ ...booking, notes: event.target.value })} /></label>
          {bookedDates.length > 0 && <p className="field-help">Unavailable dates: {bookedDates.map((date) => new Date(date).toLocaleDateString("en-IN")).join(", ")}</p>}
          {formError && <p className="form-error">{formError}</p>}<button className="btn btn-primary" disabled={submitting}>{submitting ? "Sending..." : "Send Booking Request"}</button>
        </form>
      </Modal>

      <Modal open={modal === "booking-success"} title="Booking Request Sent" onClose={() => setModal("")}><div className="success-state"><span>✓</span><h3>Your date request is on its way.</h3><p>The vendor will review your details and confirm within 24 hours.</p><button type="button" className="btn btn-primary" onClick={() => setModal("")}>Done</button></div></Modal>

      <Modal open={modal === "review"} title="Write a Review" onClose={() => { setModal(""); setFormError(""); }}>
        <form className="modal-form" onSubmit={submitReview}><label>Your name<input value={review.name} onChange={(event) => setReview({ ...review, name: event.target.value })} /></label><label>Rating<StarRating value={review.rating} onChange={(rating) => setReview({ ...review, rating })} label={false} /></label><label>Your experience<textarea value={review.comment} onChange={(event) => setReview({ ...review, comment: event.target.value })} /></label>{formError && <p className="form-error">{formError}</p>}<button className="btn btn-primary" disabled={submitting}>Submit Review</button></form>
      </Modal>

      <Modal open={modal === "otp"} title="Reveal Contact Number" onClose={() => { setModal(""); setFormError(""); }}>
        <div className="modal-form"><p>Verify your phone number or email before viewing the vendor's contact details.</p><label>Phone or email<input value={otp.target} onChange={(event) => setOtp({ ...otp, target: event.target.value })} /></label>{!otp.sent ? <button type="button" className="btn btn-primary" onClick={requestOtp}>Send OTP</button> : <><label>Enter OTP<input value={otp.code} onChange={(event) => setOtp({ ...otp, code: event.target.value })} /></label><button type="button" className="btn btn-primary" onClick={verifyOtp}>Verify & Reveal</button></>}{otp.phone && <a className="revealed-phone" href={`tel:${otp.phone}`}>{otp.phone}</a>}{formError && <p className="form-error">{formError}</p>}</div>
      </Modal>
    </>
  );
};

export default VendorDetail;
