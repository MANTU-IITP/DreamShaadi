import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VendorLeads.css";

const VendorLeads = () => {
  const { id } = useParams();
  const [data, setData] = useState({ viewsCount: 0, viewLogs: [], checkIns: [], reviews: [] });
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const response = await axios.get(`http://localhost:3000/vendor/post/${id}/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      alert(error?.response?.data?.msg || "Unable to fetch leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [id]);

  const updateLeadStatus = async (checkInId, status) => {
    try {
      const token = localStorage.getItem("token") || "";
      await axios.patch(
        `http://localhost:3000/vendor/post/${id}/checkin/${checkInId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchLeads();
    } catch (error) {
      alert(error?.response?.data?.error || "Unable to update lead status.");
    }
  };

  const exportCsv = () => {
    const headers = ["Name", "Email", "Phone", "EventDate", "Guests", "Status", "Message", "CreatedAt"];
    const rows = data.checkIns.map((item) => [
      item.name,
      item.email,
      item.phone,
      item.eventDate,
      item.guests,
      item.status,
      (item.message || "").replaceAll(",", " "),
      item.createdAt,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "vendor-leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = useMemo(
    () => ({
      views: data.viewsCount || 0,
      leads: data.checkIns?.length || 0,
      reviews: data.reviews?.length || 0,
      newLeads: data.checkIns?.filter((item) => item.status === "new").length || 0,
      contacted: data.checkIns?.filter((item) => item.status === "contacted").length || 0,
      closed: data.checkIns?.filter((item) => item.status === "closed").length || 0,
    }),
    [data]
  );

  const filteredLeads = useMemo(() => {
    if (activeFilter === "all") return data.checkIns || [];
    return (data.checkIns || []).filter((item) => item.status === activeFilter);
  }, [data.checkIns, activeFilter]);

  if (loading) return <div className="vendor-leads-page">Loading leads...</div>;

  return (
    <div className="vendor-leads-page">
      <div className="vendor-leads-head">
        <div>
          <h1>Leads Dashboard</h1>
          <p>Track leads, response pipeline, and engagement quality from one place.</p>
        </div>
        <button onClick={exportCsv}>Export CSV</button>
      </div>

      <div className="vendor-leads-stats">
        <article><p>Total Views</p><strong>{stats.views}</strong></article>
        <article><p>Total Leads</p><strong>{stats.leads}</strong></article>
        <article><p>New</p><strong>{stats.newLeads}</strong></article>
        <article><p>Contacted</p><strong>{stats.contacted}</strong></article>
        <article><p>Closed</p><strong>{stats.closed}</strong></article>
        <article><p>Reviews</p><strong>{stats.reviews}</strong></article>
      </div>

      <div className="vendor-lead-filters">
        {["all", "new", "contacted", "closed"].map((item) => (
          <button
            key={item}
            type="button"
            className={activeFilter === item ? "active" : ""}
            onClick={() => setActiveFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="vendor-leads-grid">
        {filteredLeads.map((lead) => (
          <div key={lead._id} className="vendor-lead-card">
            <div className="vendor-lead-top">
              <strong>{lead.name}</strong>
              <span className={`lead-status ${lead.status}`}>{lead.status}</span>
            </div>
            <p>{lead.email}</p>
            <p>{lead.phone}</p>
            <p>Event Date: {new Date(lead.eventDate).toLocaleDateString()}</p>
            <p>Guests: {lead.guests}</p>
            <p>{lead.message || "No message provided."}</p>
            <div className="vendor-lead-actions">
              <button onClick={() => updateLeadStatus(lead._id, "new")}>New</button>
              <button onClick={() => updateLeadStatus(lead._id, "contacted")}>Contacted</button>
              <button onClick={() => updateLeadStatus(lead._id, "closed")}>Closed</button>
            </div>
          </div>
        ))}
        {filteredLeads.length === 0 && <p>No leads in this filter.</p>}
      </div>

      <h2>Recent View Logs</h2>
      <div className="vendor-views-box">
        {data.viewLogs?.slice(-25).reverse().map((item, idx) => (
          <p key={`${item.viewedAt}-${idx}`}>
            {item.viewerName || "Anonymous"} ({item.viewerEmail || "N/A"}) - {new Date(item.viewedAt).toLocaleString()}
          </p>
        ))}
      </div>
    </div>
  );
};

export default VendorLeads;
