import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./VendorMediaManager.css";

const VendorMediaManager = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchVendor = async () => {
    const token = localStorage.getItem("token") || "";
    const res = await axios.get(`http://localhost:3000/vendor/post/getone/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVendor(res.data);
  };

  useEffect(() => {
    fetchVendor().catch(() => {});
  }, [id]);

  const upload = async () => {
    if (!files.length) return alert("Please select files first.");
    setUploading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const fd = new FormData();
      files.forEach((file) => fd.append("files", file));
      await axios.post(`http://localhost:3000/vendor/post/${id}/media`, fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setFiles([]);
      await fetchVendor();
      alert("Media uploaded.");
    } catch (error) {
      alert(error?.response?.data?.error || "Unable to upload media.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="vendor-media-page">
      <header className="vendor-media-head">
        <div>
          <h1>Portfolio Media Manager</h1>
          <p>Upload photos/videos anytime and keep your listing portfolio fresh.</p>
        </div>
        <button onClick={() => navigate(`/vendorpost/${id}`)}>View Post</button>
      </header>

      <div className="vendor-media-toolbar">
        <input type="file" accept="image/*,video/*" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} />
        <button onClick={upload} disabled={uploading}>{uploading ? "Uploading..." : "Upload Media"}</button>
        <p>{files.length} file(s) selected</p>
      </div>

      <div className="vendor-media-grid">
        {(vendor?.galleryImages || []).map((url, i) => (
          <article key={`${url}-${i}`} className="vendor-media-item">
            <img src={url} alt="gallery" />
          </article>
        ))}
        {(vendor?.galleryVideos || []).map((url, i) => (
          <article key={`${url}-${i}`} className="vendor-media-item">
            <video controls>
              <source src={url} />
            </video>
          </article>
        ))}
      </div>
    </div>
  );
};

export default VendorMediaManager;
