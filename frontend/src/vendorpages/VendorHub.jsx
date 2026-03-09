import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VendorHub.css";

const categories = ["Banquet Hall", "Resort", "Garden", "Hotel", "Destination Wedding"];

const VendorHub = () => {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const navigate = useNavigate();

  const searchListings = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city.trim()) params.set("city", city.trim());
    if (category) params.set("category", category);
    if (maxBudget) params.set("maxBudget", maxBudget);
    navigate(`/vendor?${params.toString()}`);
  };

  return (
    <div className="vendor-hub">
      <section className="vendor-hub-hero">
        <h1>Find Vendors With Smart Filters</h1>
        <p>Search by city, category, and budget before you explore full listing cards.</p>
        <form onSubmit={searchListings} className="vendor-hub-form">
          <input
            type="text"
            placeholder="City (e.g. Delhi, Goa)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Max budget (INR)"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
          />
          <button type="submit">Search Vendors</button>
        </form>
      </section>

      <section className="vendor-hub-actions">
        <button onClick={() => navigate("/vendor")}>Browse All Listings</button>
        <button onClick={() => navigate("/vendor/join")}>Join As Vendor</button>
        <button onClick={() => navigate("/vendor/admin")}>Manage Vendor Portfolio</button>
      </section>
    </div>
  );
};

export default VendorHub;
