import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Postdetail = () => {
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
    // Optional extended fields – if backend provides them
    services: [],
    experience: "",
    specialties: [],
    address: "",
    lat: null,
    lng: null,
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
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMedia, setModalMedia] = useState({ type: "", url: "" });
  const [activeMainImage, setActiveMainImage] = useState(null);

  // Fetch vendor details
  const fetchVendor = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const res = await axios.get(`http://localhost:3000/vendor/post/getone/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setVendorData(res.data);
      // Set first image as active main image
      const firstImage = res.data.image1 || (res.data.galleryImages?.[0] || null);
      setActiveMainImage(firstImage);
    } catch (error) {
      console.error("Failed to fetch vendor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendor();
  }, [id]);

  // Record view
  useEffect(() => {
    const viewerName = JSON.parse(localStorage.getItem("loggedInUser") || "null") || "";
    const viewerEmail = localStorage.getItem("loggedInEmail") || "";
    axios.post(`http://localhost:3000/vendor/post/${id}/view`, { viewerName, viewerEmail }).catch(() => {});
  }, [id]);

  // Build gallery array (all media)
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

  const openModal = (type, url) => {
    setModalMedia({ type, url });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMedia({ type: "", url: "" });
  };

  const renderStars = (value) => {
    const rating = Number(value || 0);
    return "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);
  };

  // Rating breakdown (optional)
  const ratingBreakdown = useMemo(() => {
    const reviews = vendorData.reviews || [];
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      const star = Math.floor(r.rating);
      if (star >= 1 && star <= 5) counts[star]++;
    });
    return counts;
  }, [vendorData.reviews]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  // Get first image for main display
  const mainImage = activeMainImage || vendorData.image1 || (gallery[0]?.url || null);
  const thumbnails = gallery.filter(item => item.url !== mainImage).slice(0, 6);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vendor Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase">{vendorData.businessname}</h1>
          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {vendorData.rating || 0} ({vendorData.reviews?.length || 0} reviews)
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {vendorData.city}{vendorData.state ? `, ${vendorData.state}` : ""}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {vendorData.price ? `₹${Number(vendorData.price).toLocaleString("en-IN")}` : "Price on request"}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg cursor-pointer" onClick={() => mainImage && openModal("image", mainImage)}>
              {mainImage ? (
                <img src={mainImage} alt="Main" className="w-full h-auto max-h-[500px] object-cover" />
              ) : (
                <div className="w-full h-80 flex items-center justify-center text-gray-500">No image available</div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {thumbnails.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {thumbnails.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-pink-500 transition"
                    onClick={() => openModal(item.type, item.url)}
                  >
                    {item.type === "video" ? (
                      <video src={item.url} className="w-full h-full object-cover" preload="metadata" />
                    ) : (
                      <img src={item.url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Vendor Info & CTA */}
          <div className="space-y-6">
            {/* Price & CTA Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-pink-100">
              <div className="text-center mb-4">
                <p className="text-gray-500 text-sm uppercase tracking-wide">Starting Price</p>
                <p className="text-3xl font-bold text-pink-600">
                  {vendorData.price ? `₹${Number(vendorData.price).toLocaleString("en-IN")}` : "Contact for Price"}
                </p>
              </div>
              <button
                onClick={() => document.getElementById("checkin-form").scrollIntoView({ behavior: "smooth" })}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-pink-600 hover:to-pink-700 transition duration-200 shadow-md"
              >
                Book Now
              </button>
            </div>

            {/* Short Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About {vendorData.businessname}</h3>
              <p className="text-gray-700">{vendorData.description?.substring(0, 150)}...</p>
            </div>

            {/* Additional Info Placeholder (if extended fields exist) */}
            {vendorData.services?.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {vendorData.services.map((s, i) => (
                    <span key={i} className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Left: Description & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{vendorData.description || "No description provided."}</p>
            </div>

            {/* Experience & Specialties */}
            {(vendorData.experience || vendorData.specialties?.length > 0) && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience & Specialties</h3>
                {vendorData.experience && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800">Experience</h4>
                    <p className="text-gray-700">{vendorData.experience}</p>
                  </div>
                )}
                {vendorData.specialties?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {vendorData.specialties.map((spec, i) => (
                        <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{spec}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Map & Address (placeholder) */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Address:</span> {vendorData.address || vendorData.landMark || `${vendorData.city}, ${vendorData.state || ""}`}
              </p>
              {/* Placeholder for Google Map - you can integrate later */}
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center text-gray-500">
                Map preview (integrate with Google Maps API)
              </div>
              <button className="mt-4 text-pink-600 hover:text-pink-700 font-medium">Get Directions →</button>
            </div>
          </div>

          {/* Right: Check Availability Form & Reviews */}
          <div className="space-y-6">
            {/* Check Availability Form */}
            <div id="checkin-form" className="bg-white rounded-xl shadow-md p-6 scroll-mt-20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Check Availability</h3>
              <form onSubmit={handleCheckInSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={checkInForm.name}
                  onChange={(e) => setCheckInForm({ ...checkInForm, name: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={checkInForm.email}
                  onChange={(e) => setCheckInForm({ ...checkInForm, email: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={checkInForm.phone}
                  onChange={(e) => setCheckInForm({ ...checkInForm, phone: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={checkInForm.eventDate}
                  onChange={(e) => setCheckInForm({ ...checkInForm, eventDate: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Guests"
                  value={checkInForm.guests}
                  onChange={(e) => setCheckInForm({ ...checkInForm, guests: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Message"
                  rows="3"
                  value={checkInForm.message}
                  onChange={(e) => setCheckInForm({ ...checkInForm, message: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-2 rounded-lg hover:from-pink-600 hover:to-pink-700 transition duration-200"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Reviews Section with Rating Breakdown */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h3>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{vendorData.rating || 0}</div>
                  <div className="text-yellow-400 text-lg">{renderStars(vendorData.rating)}</div>
                  <div className="text-sm text-gray-500">{vendorData.reviews?.length || 0} reviews</div>
                </div>
                {/* Rating Breakdown */}
                <div className="space-y-1 w-2/3">
                  {[5, 4, 3, 2, 1].map(star => {
                    const count = ratingBreakdown[star] || 0;
                    const total = vendorData.reviews?.length || 0;
                    const percentage = total ? (count / total) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2 text-sm">
                        <span className="w-8">{star}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-400 rounded-full h-2" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className="w-8 text-gray-600">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Write Review Form */}
              <form onSubmit={handleReviewSubmit} className="mb-8 space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className={`text-2xl ${Number(reviewForm.rating) >= star ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder="Write your review..."
                  rows="3"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
                >
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {vendorData.reviews?.map((review, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <strong className="text-gray-900">{review.name}</strong>
                      <span className="text-yellow-400">{renderStars(review.rating)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recent review"}
                    </p>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
                {vendorData.reviews?.length === 0 && (
                  <p className="text-gray-500 text-center py-6">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>

            {/* Owner Actions (if owner) */}
            {!vendorData.contactLocked && (
              <div className="bg-white rounded-xl shadow-md p-6 flex gap-3">
                <button
                  onClick={() => navigate(`/vendorpost/edit/${id}`)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition"
            >
              ✕
            </button>
            {modalMedia.type === "video" ? (
              <video controls autoPlay className="w-full rounded-lg shadow-2xl">
                <source src={modalMedia.url} />
              </video>
            ) : (
              <img src={modalMedia.url} alt="Full view" className="w-full rounded-lg shadow-2xl" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Postdetail;