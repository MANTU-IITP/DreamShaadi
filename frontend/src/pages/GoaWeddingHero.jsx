import React from 'react';
import './GoaWeddingHero.css'; // We'll create this CSS file

const GoaWeddingHero = () => {
  const handleExploreClick = () => {
    // You can add navigation logic here
    window.location.href = "vendors.html?city=goa";
  };

  return (
    <section className="location-hero">
      <div className="location-overlay"></div>
      <div className="location-content">
        <h1>PLAN A GOA WEDDING</h1>
        <button className="cta-button" onClick={handleExploreClick}>
          EXPLORE GOA VENDORS
        </button>
      </div>
    </section>
  );
};

export default GoaWeddingHero;

