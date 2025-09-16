

import React, { useRef, useEffect, useState } from 'react';
import './Popoularvenue.css';

const Popoularvenue = () => {
  const carouselRef = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.venue-card').offsetWidth;
      const scrollAmount = (cardWidth + 30) * direction; // 30px gap
      
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const updateButtonVisibility = () => {
    if (carouselRef.current) {
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      
      setShowLeftBtn(carouselRef.current.scrollLeft > 10);
      setShowRightBtn(carouselRef.current.scrollLeft < maxScroll - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      updateButtonVisibility();
      carousel.addEventListener('scroll', updateButtonVisibility);
      window.addEventListener('resize', updateButtonVisibility);
      
      return () => {
        carousel.removeEventListener('scroll', updateButtonVisibility);
        window.removeEventListener('resize', updateButtonVisibility);
      };
    }
  }, []);

  const venuesData = [
    {
      id: 1,
      title: "Banquet Halls",
      image: "https://images.pexels.com/photos/14716282/pexels-photo-14716282.jpeg?auto=compress&cs=tinysrgb&w=600",
      localities: ["North Goa", "South Goa", "Calangute"],
      linkText: "All Localities"
    },
    {
      id: 2,
      title: "Marriage Gardens",
      image: "https://images.pexels.com/photos/16555584/pexels-photo-16555584/free-photo-of-woman-in-traditional-clothing-with-man-in-suit.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      localities: ["North Goa", "South Goa", "Panaji"],
      linkText: "All Localities"
    },
    {
      id: 3,
      title: "Hotels with Banquets",
      image: "https://images.pexels.com/photos/31045373/pexels-photo-31045373/free-photo-of-elegant-wedding-stage-decor-in-makassar.jpeg?auto=compress&cs=tinysrgb&w=600",
      localities: ["5-star Hotels", "Beach Resorts", "Boutique Hotels"],
      linkText: "All Options"
    },
    {
      id: 4,
      title: "Beach Weddings",
      image: "https://images.unsplash.com/photo-1720811103534-3ddbc993ddd0?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      localities: ["Palolem", "Vagator", "Colva"],
      linkText: "All Beaches"
    },
    {
      id: 5,
      title: "Farmhouses",
      image: "https://images.unsplash.com/photo-1708133302586-2ffca3db5553?q=80&w=1485&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      localities: ["North Goa", "South Goa", "Interior"],
      linkText: "All Properties"
    },
    {
      id: 6,
      title: "Destination Weddings",
      image: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      localities: ["Full Packages", "International", "Theme Weddings"],
      linkText: "All Packages"
    }
  ];

  return (
    <div className="container">
      <section className="venues-section">
        <div className="section-header">
          <h2>Popular Wedding Venues</h2>
          <p>Discover the perfect location for your dream wedding in Goa</p>
        </div>
        
        <div className="carousel-container">
          {showLeftBtn && (
            <button 
              className="carousel-btn left" 
              onClick={() => scrollCarousel(-1)} 
              aria-label="Previous venues"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}
          
          <div className="venues-carousel" ref={carouselRef}>
            {venuesData.map(venue => (
              <div className="venue-card" key={venue.id}>
                <div className="venue-image">
                  <img src={venue.image} alt={venue.title} />
                </div>
                <div className="venue-content">
                  <h3>{venue.title}</h3>
                  <div className="localities">
                    {venue.localities.map((locality, index) => (
                      <a href="#" key={index}>{locality}</a>
                    ))}
                  </div>
                  <a href="#" className="all-localities">
                    {venue.linkText} <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {showRightBtn && (
            <button 
              className="carousel-btn right" 
              onClick={() => scrollCarousel(1)} 
              aria-label="Next venues"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Popoularvenue;