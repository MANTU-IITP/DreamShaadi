import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./VendorAdmin.css";

const VendorAdmin = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchMyVendors = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || "";
      const response = await axios.get("http://localhost:3000/vendor/post/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors(response.data);
    } catch (err) {
      console.error("Fetch my vendors error:", err.response ?? err);
      setError("Unable to load your vendor posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyVendors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vendor post?")) return;

    try {
      const token = localStorage.getItem("token") || "";
      await axios.delete(`http://localhost:3000/vendor/post/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete vendor error:", err.response ?? err);
      alert("Delete failed. Please try again.");
    }
  };

  const stats = useMemo(() => {
    const total = vendors.length;
    const booked = vendors.filter((item) => item.isBooked).length;
    const active = total - booked;
    const totalViews = vendors.reduce((sum, item) => sum + Number(item.viewsCount || 0), 0);
    const totalLeads = vendors.reduce((sum, item) => sum + Number(item.checkIns?.length || 0), 0);
    return { total, booked, active, totalViews, totalLeads };
  }, [vendors]);

  return (
    <div className="vendor-admin-page">
      <div className="vendor-admin-header">
        <h1>Vendor Admin</h1>
        <div className="vendor-admin-actions">
          <button onClick={() => navigate("/vendors/wedding-venues/addpost")}>Add New Venue</button>
          <Link to="/vendor">Back to Vendors</Link>
        </div>
      </div>

      <div className="vendor-admin-stats">
        <div className="vendor-admin-stat">
          <p>Total Posts</p>
          <strong>{stats.total}</strong>
        </div>
        <div className="vendor-admin-stat">
          <p>Active</p>
          <strong>{stats.active}</strong>
        </div>
        <div className="vendor-admin-stat">
          <p>Booked</p>
          <strong>{stats.booked}</strong>
        </div>
        <div className="vendor-admin-stat">
          <p>Total Views</p>
          <strong>{stats.totalViews}</strong>
        </div>
        <div className="vendor-admin-stat">
          <p>Total Leads</p>
          <strong>{stats.totalLeads}</strong>
        </div>
      </div>

      {loading && <p className="vendor-admin-info">Loading your posts...</p>}
      {error && <p className="vendor-admin-error">{error}</p>}

      {!loading && !error && vendors.length === 0 && (
        <div className="vendor-admin-empty">
          <p>You have not added any vendor post yet.</p>
          <button onClick={() => navigate("/vendors/wedding-venues/addpost")}>Create First Post</button>
        </div>
      )}

      {!loading && !error && vendors.length > 0 && (
        <div className="vendor-admin-grid">
          {vendors.map((item) => (
            <article key={item._id} className="vendor-admin-card">
              <img src={item.image1} alt={item.businessname} />
              <div className="vendor-admin-card-body">
                <h3>{item.businessname}</h3>
                <p>{item.city}</p>
                <p>Contact: {item.phone || "N/A"}</p>
                <p>{item.category}</p>
                <p className="vendor-admin-price">Rs. {Number(item.price || 0).toLocaleString("en-IN")}</p>
                <p>Approval: {item.approvalStatus || "pending"}</p>
                <p>Views: {item.viewsCount || 0}</p>
                <p>Leads: {item.checkIns?.length || 0}</p>
                <p>Reviews: {item.reviews?.length || 0}</p>
                <p>Media: {(item.galleryImages?.length || 0) + (item.galleryVideos?.length || 0)}</p>
                {item.galleryImages?.length > 0 && (
                  <div className="vendor-admin-media-strip">
                    {item.galleryImages.slice(0, 4).map((url, idx) => (
                      <img key={`${url}-${idx}`} src={url} alt="media" />
                    ))}
                  </div>
                )}
                <div className="vendor-admin-card-actions">
                  <Link to={`/vendorpost/${item._id}`}>View</Link>
                  <button onClick={() => navigate(`/vendorpost/edit/${item._id}`)}>Edit</button>
                  <button onClick={() => navigate(`/vendor/admin/${item._id}/media`)}>Media</button>
                  <button onClick={() => navigate(`/vendor/admin/${item._id}/leads`)}>Leads</button>
                  <button className="danger" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorAdmin;
