import React, { useRef, useEffect, useState } from 'react';
import './PopularSearches.css'; // We'll extract the CSS to this file

const PopularSearches = () => {
  const carouselRef = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    
    const handleScroll = () => {
      if (!carousel) return;
      
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      
      setShowLeftBtn(carousel.scrollLeft > 10);
      setShowRightBtn(carousel.scrollLeft < maxScroll - 10);
    };

    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const searchItems = [
    {
      id: 1,
      title: "Photographers in Chennai",
      image: "https://images.pexels.com/photos/19891767/pexels-photo-19891767/free-photo-of-model-photography.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: null,
      highlighted: false
    },
    {
      id: 2,
      title: "Bridal Makeup in Chennai",
      image: "https://images.pexels.com/photos/10954272/pexels-photo-10954272.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: null,
      highlighted: false
    },
    {
      id: 3,
      title: "Bridal Wear in Chennai",
      image: "https://images.pexels.com/photos/31731767/pexels-photo-31731767/free-photo-of-elegant-indian-bride-in-traditional-attire.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "Trending",
      highlighted: true
    },
    {
      id: 4,
      title: "Groom Wear in Chennai",
      image: "https://images.pexels.com/photos/18162909/pexels-photo-18162909/free-photo-of-smiling-man-in-a-costume.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: null,
      highlighted: false
    },
    {
      id: 5,
      title: "Decorators in Chennai",
      image: "https://images.pexels.com/photos/1042152/pexels-photo-1042152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      badge: null,
      highlighted: false
    },
    {
      id: 6,
      title: "Invitations in Chennai",
      image: "https://images.pexels.com/photos/30921925/pexels-photo-30921925/free-photo-of-traditional-indian-wedding-card-design-with-gold-details.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: null,
      highlighted: false
    },
    {
      id: 7,
      title: "Mehendi Artist in Chennai",
      image: "https://images.pexels.com/photos/18016523/pexels-photo-18016523/free-photo-of-henna-tattoos-on-woman-hands.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "Popular",
      highlighted: true
    }
  ];

  return (
    <div className="container">
      <section className="popular-searches">
        <div className="section-header">
          <h2>Popular Searches</h2>
          <p>Discover the most sought-after wedding services in your city</p>
        </div>
        
        <div className="carousel-container">
          {showLeftBtn && (
            <button className="carousel-btn left" onClick={() => scrollCarousel(-1)}>
              <i className="fas fa-chevron-left"></i>
            </button>
          )}
          
          <div className="carousel" ref={carouselRef} id="searchCarousel">
            {searchItems.map(item => (
              <div className="search-card" key={item.id}>
                {item.badge && <div className="popular-badge">{item.badge}</div>}
                <div className="card-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="card-content">
                  <p className={item.highlighted ? 'highlighted' : ''}>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
          
          {showRightBtn && (
            <button className="carousel-btn right" onClick={() => scrollCarousel(1)}>
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default PopularSearches;