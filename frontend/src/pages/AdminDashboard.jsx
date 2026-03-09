import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const STATUS_OPTIONS = ["pending", "approved", "rejected"];

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [noteByVendor, setNoteByVendor] = useState({});

  const token = localStorage.getItem("token") || "";
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchAll = async (status = statusFilter) => {
    setLoading(true);
    setError("");
    try {
      const [dashRes, vendorRes, userRes] = await Promise.all([
        axios.get("http://localhost:3000/admin/dashboard", authHeaders),
        axios.get(`http://localhost:3000/admin/vendors?status=${status}`, authHeaders),
        axios.get("http://localhost:3000/admin/users", authHeaders),
      ]);
      setDashboard(dashRes.data);
      setVendors(vendorRes.data || []);
      setUsers(userRes.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data?.error || "Unable to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const updateApproval = async (vendorId, status) => {
    setActionLoadingId(vendorId + status);
    try {
      await axios.patch(
        `http://localhost:3000/admin/vendors/${vendorId}/approval`,
        { status, note: noteByVendor[vendorId] || "" },
        authHeaders
      );
      await fetchAll(statusFilter);
    } catch (err) {
      alert(err?.response?.data?.error || "Unable to update approval");
    } finally {
      setActionLoadingId("");
    }
  };

  const onFilterChange = async (next) => {
    setStatusFilter(next);
    await fetchAll(next);
  };

  const stats = useMemo(() => dashboard?.stats || {}, [dashboard]);

  return (
    <div className="admin-page">
      <header className="admin-hero">
        <div>
          <p className="admin-eyebrow">Platform Control Room</p>
          <h1>Main Admin Panel</h1>
          <p className="admin-subtitle">Moderate vendor submissions, monitor growth, and control what goes live.</p>
        </div>
      </header>

      <section className="admin-stat-grid">
        <article>
          <p>Total Users</p>
          <h3>{stats.usersCount || 0}</h3>
        </article>
        <article>
          <p>Total Vendors</p>
          <h3>{stats.vendorsCount || 0}</h3>
        </article>
        <article className="accent pending">
          <p>Pending</p>
          <h3>{stats.pendingCount || 0}</h3>
        </article>
        <article className="accent approved">
          <p>Approved</p>
          <h3>{stats.approvedCount || 0}</h3>
        </article>
        <article className="accent rejected">
          <p>Rejected</p>
          <h3>{stats.rejectedCount || 0}</h3>
        </article>
      </section>

      <section className="admin-moderation">
        <div className="admin-section-head">
          <h2>Vendor Request Queue</h2>
          <div className="admin-status-tabs">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                className={statusFilter === status ? "active" : ""}
                onClick={() => onFilterChange(status)}
                type="button"
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="admin-info">Loading moderation queue...</p>}
        {error && <p className="admin-error">{error}</p>}

        {!loading && !error && (
          <div className="admin-vendor-grid">
            {vendors.map((vendor) => (
              <article key={vendor._id} className="admin-vendor-card">
                <img src={vendor.image1} alt={vendor.businessname} />
                <div className="admin-vendor-body">
                  <h3>{vendor.businessname}</h3>
                  <p>{vendor.city} | {vendor.category}</p>
                  <p className={`badge ${vendor.approvalStatus}`}>{vendor.approvalStatus}</p>
                  <p>Owner: {vendor.user?.name || "Unknown"} ({vendor.user?.email || "N/A"})</p>
                  <p>Price: Rs. {Number(vendor.price || 0).toLocaleString("en-IN")}</p>
                  <textarea
                    placeholder="Optional approval/rejection note for this vendor"
                    value={noteByVendor[vendor._id] || ""}
                    onChange={(e) => setNoteByVendor((prev) => ({ ...prev, [vendor._id]: e.target.value }))}
                  />
                  <div className="admin-card-actions">
                    <button
                      className="approve"
                      onClick={() => updateApproval(vendor._id, "approved")}
                      disabled={actionLoadingId === vendor._id + "approved"}
                    >
                      {actionLoadingId === vendor._id + "approved" ? "Approving..." : "Approve"}
                    </button>
                    <button
                      className="reject"
                      onClick={() => updateApproval(vendor._id, "rejected")}
                      disabled={actionLoadingId === vendor._id + "rejected"}
                    >
                      {actionLoadingId === vendor._id + "rejected" ? "Rejecting..." : "Reject"}
                    </button>
                    <button
                      className="reset"
                      onClick={() => updateApproval(vendor._id, "pending")}
                      disabled={actionLoadingId === vendor._id + "pending"}
                    >
                      {actionLoadingId === vendor._id + "pending" ? "Resetting..." : "Set Pending"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {vendors.length === 0 && <p className="admin-info">No vendors in this status.</p>}
          </div>
        )}
      </section>

      <section className="admin-users">
        <div className="admin-section-head">
          <h2>Recent Users</h2>
          <p>{users.length} users loaded</p>
        </div>
        <div className="admin-user-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 30).map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="3">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
