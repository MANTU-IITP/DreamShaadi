import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [decision, setDecision] = useState(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const load = async () => {
    try {
      setLoading(true);
      const requests = [api.get("/admin/dashboard"), api.get("/admin/users")];
      if (tab !== "users") requests.push(api.get("/admin/vendors", { params: tab === "all" ? {} : { status: tab } }));
      const [dashboardResponse, usersResponse, vendorsResponse] = await Promise.all(requests);
      setDashboard(dashboardResponse.data);
      setUsers(usersResponse.data || []);
      setVendors(vendorsResponse?.data || []);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // `load` intentionally follows the selected moderation tab.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const submitDecision = async () => {
    if (decision.status === "rejected" && !note.trim()) return setError("A rejection reason is required.");
    try {
      await api.patch(`/admin/vendors/${decision.vendor._id}/approval`, { status: decision.status, note: note.trim() });
      showToast(`Listing ${decision.status}. The vendor has been notified.`, "success");
      setDecision(null);
      setNote("");
      setError("");
      await load();
    } catch (requestError) {
      setError(requestError.response?.data?.error || "Unable to update approval.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="admin-page">
        <header className="admin-header"><div><span className="eyebrow">Platform moderation</span><h1>Admin Dashboard</h1><p>Review vendor quality, monitor growth, and keep the marketplace trusted.</p></div></header>
        {loading ? <LoadingSpinner label="Loading platform activity..." /> : (
          <>
            <div className="dashboard-stats admin-stats">{[["Total Users", dashboard?.stats.usersCount || 0], ["Total Vendors", dashboard?.stats.vendorsCount || 0], ["Pending Approvals", dashboard?.stats.pendingCount || 0], ["Approved", dashboard?.stats.approvedCount || 0], ["Rejected", dashboard?.stats.rejectedCount || 0]].map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>
            <div className="admin-tabs">{[["pending", "Pending"], ["approved", "Approved"], ["rejected", "Rejected"], ["all", "All Vendors"], ["users", "All Users"]].map(([value, label]) => <button type="button" key={value} className={tab === value ? "active" : ""} onClick={() => setTab(value)}>{label}</button>)}</div>
            {error && !decision && <p className="form-error">{error}</p>}
            {tab === "users" ? (
              <div className="admin-table"><div className="admin-row admin-row-head"><span>Name</span><span>Email</span><span>Joined</span></div>{users.map((user) => <div className="admin-row" key={user._id}><span>{user.name}</span><span>{user.email}</span><span>{new Date(user.createdAt).toLocaleDateString("en-IN")}</span></div>)}</div>
            ) : (
              <div className="admin-table vendor-admin-table"><div className="admin-row admin-row-head"><span>Vendor</span><span>Category</span><span>City</span><span>Submitted by</span><span>Date</span><span>Actions</span></div>{vendors.map((vendor) => <div className="admin-row" key={vendor._id}><span className="admin-vendor"><img src={vendor.image1} alt={vendor.businessname} /><strong>{vendor.businessname}</strong></span><span>{vendor.category}</span><span>{vendor.city}</span><span>{vendor.user?.email || "—"}</span><span>{new Date(vendor.createdAt).toLocaleDateString("en-IN")}</span><span className="admin-actions"><button type="button" className="approve-button" onClick={() => setDecision({ vendor, status: "approved" })}>Approve</button><button type="button" className="reject-button" onClick={() => setDecision({ vendor, status: "rejected" })}>Reject</button></span></div>)}</div>
            )}
          </>
        )}
      </main>
      <Footer />
      <Modal open={Boolean(decision)} title={`${decision?.status === "approved" ? "Approve" : "Reject"} ${decision?.vendor.businessname || "listing"}`} onClose={() => { setDecision(null); setNote(""); setError(""); }}>
        <div className="modal-form"><p>{decision?.status === "approved" ? "This listing will become visible to all couples immediately." : "Explain what the vendor should correct before submitting again."}</p><label>{decision?.status === "approved" ? "Optional note" : "Rejection reason *"}<textarea value={note} onChange={(event) => setNote(event.target.value)} /></label>{error && <p className="form-error">{error}</p>}<button type="button" className={`btn ${decision?.status === "approved" ? "btn-primary" : "btn-danger"}`} onClick={submitDecision}>Confirm {decision?.status}</button></div>
      </Modal>
    </>
  );
};

export default AdminDashboard;
