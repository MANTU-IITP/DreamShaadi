import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Vendors.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const VENUE_OPTIONS = ["Banquet Hall", "Resort", "Garden", "Hotel", "Destination Wedding"];

const Vendors = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState("");
  const selectedCategory = searchParams.get("category") || "All";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = searchParams.get("q")?.trim() || "";
        const city = searchParams.get("city")?.trim().toLowerCase() || "";
        const state = searchParams.get("state")?.trim().toLowerCase() || "";
        const category = searchParams.get("category")?.trim().toLowerCase() || "";
        const maxBudget = Number(searchParams.get("maxBudget") || 0);
        const url = query
          ? `http://localhost:3000/vendor/post/search?q=${encodeURIComponent(query)}`
          : "http://localhost:3000/vendor/post/getall";
        const response = await axios.get(url);
        const all = response.data || [];
        const filtered = all.filter((item) => {
          const cityOk = city ? String(item.city || "").toLowerCase().includes(city) : true;
          const stateOk = state ? String(item.state || "").toLowerCase().includes(state) : true;
          const categoryOk = category ? String(item.category || "").toLowerCase().includes(category) : true;
          const budgetOk = maxBudget ? Number(item.price || 0) <= maxBudget : true;
          return cityOk && stateOk && categoryOk && budgetOk;
        });
        setVendors(filtered);
        setError("");
      } catch (err) {
        console.error("Vendors fetch error:", err.response ?? err);
        setVendors([]);
        setError("Unable to load vendors right now.");
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <div className="vendor-container">
      <div className="vendor-chip-row">
        <button
          type="button"
          className={`vendor-chip ${selectedCategory === "All" ? "active" : ""}`}
          onClick={() => navigate("/vendor")}
        >
          All
        </button>
        {VENUE_OPTIONS.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`vendor-chip ${selectedCategory === chip ? "active" : ""}`}
            onClick={() => navigate(`/vendor?category=${encodeURIComponent(chip)}`)}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="vendor-venue-container">
        {error && <p>{error}</p>}
        {!error && vendors.length === 0 && <p>No vendors found.</p>}
        {vendors.map((data) => (
          <div key={data._id} className="vendor-venue-card">
            <div className="vendor-img-container">
              <img src={data.image1} alt={data.businessname} className="vendor-venue-img" />
              <span className="vendor-venue-badge">{data.category}</span>
            </div>

              <div className="vendor-venue-details">
                <h3 className="vendor-venue-name">{data.businessname}</h3>
                <div className="vendor-venue-meta">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{data.city}{data.state ? `, ${data.state}` : ""}</span>
                </div>
              <div className="vendor-venue-price">
                <span>Starting from:</span>
                <strong>Rs. {Number(data.price || 0).toLocaleString("en-IN")}</strong>
              </div>

              <Link to={`/vendorpost/${data._id}`} className="vendor-venue-button">
                View Details <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Vendors;
