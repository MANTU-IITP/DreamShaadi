import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import StarRating from "../components/StarRating";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";

const tabs = ["Overview", "My Listings", "Leads & Enquiries", "Bookings", "Media Manager", "Reviews", "Settings"];

const VendorDashboard = ({ initialTab = "Overview" }) => {
  const { id: routeId } = useParams();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState(routeId || "");
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState({ checkIns: [], viewLogs: [], reviews: [], viewsCount: 0 });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [blockedDate, setBlockedDate] = useState("");
  const { showToast } = useToast();

  const selected = useMemo(() => vendors.find((vendor) => vendor._id === vendorId) || vendors[0], [vendors, vendorId]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const mineResponse = await api.get("/vendor/post/mine");
      const mine = mineResponse.data || [];
      setVendors(mine);
      const activeId = routeId || vendorId || mine[0]?._id;
      if (!activeId) return;
      setVendorId(activeId);
      const [statsResponse, leadsResponse, bookingsResponse] = await Promise.all([
        api.get(`/vendor/post/${activeId}/stats`),
        api.get(`/vendor/post/${activeId}/leads`),
        api.get(`/vendor/post/${activeId}/bookings`),
      ]);
      setStats(statsResponse.data);
      setLeads(leadsResponse.data);
      setBookings(bookingsResponse.data || []);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.error || "Unable to load your vendor dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
    // Dashboard data is keyed by the active listing selected below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeId, vendorId]);

  const updateLead = async (checkInId, status) => {
    await api.patch(`/vendor/post/${selected._id}/checkin/${checkInId}/status`, { status });
    setLeads((current) => ({ ...current, checkIns: current.checkIns.map((lead) => lead._id === checkInId ? { ...lead, status } : lead) }));
    showToast("Lead status updated.", "success");
  };

  const updateBooking = async (bookingId, status) => {
    await api.patch(`/vendor/post/${selected._id}/bookings/${bookingId}/status`, { status });
    setBookings((current) => current.map((booking) => booking._id === bookingId ? { ...booking, status } : booking));
    showToast(`Booking ${status}.`, "success");
  };

  const uploadMedia = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    try {
      setUploading(true);
      const data = new FormData();
      files.forEach((file) => data.append("files", file));
      await api.post(`/vendor/post/${selected._id}/media`, data, { headers: { "Content-Type": "multipart/form-data" } });
      showToast("Media added to your portfolio.", "success");
      await loadDashboard();
    } catch {
      showToast("Unable to upload media.", "error");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (url) => {
    const galleryImages = (selected.galleryImages || []).filter((image) => image !== url);
    await api.put(`/vendor/post/update/${selected._id}`, { galleryImages });
    setVendors((current) => current.map((vendor) => vendor._id === selected._id ? { ...vendor, galleryImages } : vendor));
    showToast("Image removed from gallery.", "success");
  };

  const addBlockedDate = async () => {
    if (!blockedDate) return;
    const dates = [...new Set([...(selected.bookedDates || []).map((date) => new Date(date).toISOString().slice(0, 10)), blockedDate])];
    await api.put(`/vendor/post/update/${selected._id}`, { bookedDates: dates });
    setVendors((current) => current.map((vendor) => vendor._id === selected._id ? { ...vendor, bookedDates: dates } : vendor));
    setBlockedDate("");
    showToast("Availability calendar updated.", "success");
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries());
    payload.price = Number(payload.price);
    await api.put(`/vendor/post/update/${selected._id}`, payload);
    showToast("Vendor settings saved.", "success");
    await loadDashboard();
  };

  if (loading) return <><Navbar /><main className="dashboard-loading"><LoadingSpinner label="Loading your business dashboard..." /></main></>;
  if (!vendors.length) return <><Navbar /><main className="simple-page"><EmptyState title="Create your first listing" message="Build your portfolio to start receiving enquiries and bookings." actionLabel="Create listing" onAction={() => window.location.assign("/vendor/join")} /></main><Footer /></>;
  if (error) return <><Navbar /><main className="simple-page"><EmptyState title="Dashboard unavailable" message={error} actionLabel="Retry" onAction={loadDashboard} /></main><Footer /></>;

  return (
    <>
      <Navbar />
      <main className="vendor-dashboard">
        <aside className="dashboard-sidebar">
          <div><span className="eyebrow">Vendor workspace</span><h2>{selected?.businessname}</h2><select value={selected?._id} onChange={(event) => setVendorId(event.target.value)}>{vendors.map((vendor) => <option value={vendor._id} key={vendor._id}>{vendor.businessname}</option>)}</select></div>
          <nav>{tabs.map((tab) => <button type="button" key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}</nav>
          <Link to={`/vendorpost/${selected._id}`} className="btn btn-outline">View Public Listing</Link>
        </aside>

        <section className="dashboard-content">
          <header className="dashboard-title"><div><span className="eyebrow">Manage your business</span><h1>{activeTab}</h1></div><span className={`status-badge status-${selected.approvalStatus}`}>{selected.approvalStatus}</span></header>

          {activeTab === "Overview" && (
            <>
              <div className="dashboard-stats">{[["Total Views", stats?.totalViews || 0], ["Total Leads", stats?.totalLeads || 0], ["Bookings", stats?.totalBookings || 0], ["Avg Rating", Number(stats?.avgRating || 0).toFixed(1)]].map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>
              <div className="dashboard-grid">
                <article className="dashboard-panel"><h2>Views over the last 7 days</h2><div className="mini-chart">{["h3", "h5", "h4", "h7", "h6", "h8", "h9"].map((height, index) => <div key={height}><span className={height} /><small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small></div>)}</div></article>
                <article className="dashboard-panel"><h2>Approval status</h2><span className={`status-badge status-${selected.approvalStatus}`}>{selected.approvalStatus}</span><p>{selected.approvalStatus === "pending" ? "Your listing is being reviewed by our team." : selected.approvalStatus === "approved" ? "Your listing is live and visible to couples." : selected.approvalNote || "Update your listing and submit again."}</p></article>
              </div>
              <article className="dashboard-panel table-panel"><h2>Recent leads</h2><LeadTable leads={leads.checkIns.slice(0, 5)} onUpdate={updateLead} /></article>
            </>
          )}

          {activeTab === "My Listings" && <div className="listing-management">{vendors.map((vendor) => <article key={vendor._id}><img src={vendor.image1} alt={vendor.businessname} /><div><h2>{vendor.businessname}</h2><p>{vendor.category} · {vendor.city}</p><span className={`status-badge status-${vendor.approvalStatus}`}>{vendor.approvalStatus}</span></div><Link to={`/vendorpost/edit/${vendor._id}`} className="btn btn-outline">Edit</Link></article>)}<Link to="/vendor/join" className="btn btn-primary">Add New Listing</Link></div>}

          {activeTab === "Leads & Enquiries" && <article className="dashboard-panel table-panel"><LeadTable leads={leads.checkIns} onUpdate={updateLead} /></article>}

          {activeTab === "Bookings" && <article className="dashboard-panel table-panel"><div className="data-table"><div className="table-row table-head"><span>Name</span><span>Event Date</span><span>Package</span><span>Status</span><span>Actions</span></div>{bookings.map((booking) => <div className="table-row" key={booking._id}><span><strong>{booking.name}</strong><small>{booking.phone}</small></span><span>{new Date(booking.eventDate).toLocaleDateString("en-IN")}</span><span>{booking.packageName || "Custom"}</span><span className={`status-badge status-${booking.status}`}>{booking.status}</span><span className="table-actions"><button type="button" onClick={() => updateBooking(booking._id, "confirmed")}>Confirm</button><button type="button" className="danger-link" onClick={() => updateBooking(booking._id, "cancelled")}>Cancel</button></span></div>)}</div>{!bookings.length && <p className="muted">No booking requests yet.</p>}</article>}

          {activeTab === "Media Manager" && <><label className="media-dropzone"><input type="file" accept="image/*,video/*" multiple onChange={uploadMedia} /><strong>{uploading ? "Uploading..." : "Drop or choose portfolio media"}</strong><span>Images and videos, up to 20 files at a time</span></label><div className="media-manager-grid">{[selected.image1, selected.image2, selected.image3, ...(selected.galleryImages || [])].filter(Boolean).map((image) => <article key={image}><img src={image} alt={`${selected.businessname} portfolio`} />{selected.galleryImages?.includes(image) && <button type="button" onClick={() => removeImage(image)}>Delete</button>}</article>)}</div></>}

          {activeTab === "Reviews" && <div className="dashboard-panel review-list">{leads.reviews?.map((review) => <article key={review._id}><div><strong>{review.name}</strong><StarRating value={review.rating} label={false} /></div><p>{review.comment}</p><small>{new Date(review.createdAt).toLocaleDateString("en-IN")}</small></article>)}{!leads.reviews?.length && <p className="muted">No reviews yet.</p>}</div>}

          {activeTab === "Settings" && <div className="settings-grid"><form className="dashboard-panel settings-form" onSubmit={saveSettings}><h2>Listing details</h2><label>Business name<input name="businessname" defaultValue={selected.businessname} /></label><label>Description<textarea name="description" defaultValue={selected.description} /></label><div className="form-grid"><label>City<input name="city" defaultValue={selected.city} /></label><label>State<input name="state" defaultValue={selected.state} /></label><label>Starting price<input name="price" type="number" defaultValue={selected.price} /></label><label>Phone<input name="phone" defaultValue={selected.phone} /></label></div><button className="btn btn-primary">Save Changes</button></form><article className="dashboard-panel availability-panel"><h2>Availability calendar</h2><p>Block dates when you are unavailable.</p><div><input type="date" min={new Date().toISOString().slice(0, 10)} value={blockedDate} onChange={(event) => setBlockedDate(event.target.value)} /><button type="button" className="btn btn-primary" onClick={addBlockedDate}>Block Date</button></div><ul>{selected.bookedDates?.map((date) => <li key={date}>{new Date(date).toLocaleDateString("en-IN")}</li>)}</ul></article></div>}
        </section>
      </main>
      <Footer />
    </>
  );
};

const LeadTable = ({ leads, onUpdate }) => (
  <div className="data-table">
    <div className="table-row table-head"><span>Name</span><span>Event</span><span>Guests</span><span>Message</span><span>Status</span></div>
    {leads.map((lead) => <div className="table-row" key={lead._id}><span><strong>{lead.name}</strong><small>{lead.phone}</small></span><span>{new Date(lead.eventDate).toLocaleDateString("en-IN")}</span><span>{lead.guests || "—"}</span><span>{lead.message || "—"}</span><span><select value={lead.status} onChange={(event) => onUpdate(lead._id, event.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></span></div>)}
    {!leads.length && <p className="muted">No enquiries yet.</p>}
  </div>
);

export default VendorDashboard;
