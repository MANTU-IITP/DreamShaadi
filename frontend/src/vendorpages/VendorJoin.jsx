import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VendorJoin.css";

const VendorJoin = () => {
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    city: "",
    phone: "",
    about: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const uploadProfileImage = async () => {
    if (!file) return "";
    const token = localStorage.getItem("token") || "";
    const fd = new FormData();
    fd.append("files", file);
    const res = await axios.post("http://localhost:3000/vendor/post/upload-media", fd, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });
    return res.data?.images?.[0] || "";
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }
      const profileImage = await uploadProfileImage();
      await axios.post(
        "http://localhost:3000/auth/vendor-onboarding",
        { ...form, profileImage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Vendor basic profile saved. Now create your first listing.");
      navigate("/vendors/wedding-venues/addpost");
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to save vendor onboarding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vendor-join">
      <h1>Join As Vendor</h1>
      <p>Step 1: Add your basic business profile. Step 2: Create listing and portfolio.</p>
      <form onSubmit={submit}>
        <input placeholder="Business Name" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} required />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
          <option value="">Select category</option>
          <option value="Banquet Hall">Banquet Hall</option>
          <option value="Resort">Resort</option>
          <option value="Garden">Garden</option>
          <option value="Hotel">Hotel</option>
          <option value="Destination Wedding">Destination Wedding</option>
        </select>
        <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <textarea placeholder="About your service" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
        <label>Upload business profile image</label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save & Continue"}</button>
      </form>
    </div>
  );
};

export default VendorJoin;
