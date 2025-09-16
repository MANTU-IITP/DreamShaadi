import React from 'react';
import './WeddingCategories.css';

const WeddingCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Venues",
      description: "Banquet Halls, Marriage Garden / Lawn, Farmhouses, and more beautiful venues",
      image: "https://i.pinimg.com/originals/7b/09/c9/7b09c9e4fad820e6b1688fd6351ef39f.jpg",
      colorClass: "purple"
    },
    {
      id: 2,
      title: "Photographers",
      description: "Professional photographers to capture your precious moments",
      image: "https://images.pexels.com/photos/5759215/pexels-photo-5759215.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "peach"
    },
    {
      id: 3,
      title: "Makeup",
      description: "Bridal Makeup, Family Makeup, and professional beauty services",
      image: "https://images.pexels.com/photos/31732991/pexels-photo-31732991/free-photo-of-elegant-bride-in-traditional-indian-attire.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "rose"
    },
    {
      id: 4,
      title: "Pre Wedding Shoot",
      description: "Pre Wedding Shoot Locations and professional photography services",
      image: "https://images.pexels.com/photos/29545399/pexels-photo-29545399/free-photo-of-bengali-couple-in-traditional-attire-at-santiniketan.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "purple"
    },
    {
      id: 5,
      title: "Planning & Decor",
      description: "Wedding Planners, Decorators, and complete event management",
      image: "https://images.pexels.com/photos/30184621/pexels-photo-30184621/free-photo-of-vibrant-outdoor-wedding-ceremony-with-floral-decor.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "orange"
    },
    {
      id: 6,
      title: "Bridal Wear",
      description: "Bridal Lehengas, Kanjeevaram / Silk Sarees, and designer collections",
      image: "https://images.pexels.com/photos/2218558/pexels-photo-2218558.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "olive"
    },
    {
      id: 7,
      title: "Groom Wear",
      description: "Sherwani, Wedding Suits / Tuxes, and traditional groom attire",
      image: "https://images.pexels.com/photos/27998980/pexels-photo-27998980/free-photo-of-best-groom-dress-for-wedding.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "mint"
    },
    {
      id: 8,
      title: "Mehendi",
      description: "Mehendi Artists and traditional henna services",
      image: "https://images.pexels.com/photos/13102907/pexels-photo-13102907.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "beige"
    },
    {
      id: 9,
      title: "Foods",
      description: "Catering Services, Cake, Chaat & Food Stalls for your wedding",
      image: "https://i.pinimg.com/originals/73/c5/6f/73c56fcd60b5df9be4a6ea7748594aaa.jpg",
      colorClass: "rose"
    },
    {
      id: 10,
      title: "Music & Dance",
      description: "DJs, Sangeet Choreographers, and Wedding Entertainment",
      image: "https://images.pexels.com/photos/28987832/pexels-photo-28987832/free-photo-of-traditional-rajasthani-dancer-performing-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "olive"
    }
  ];

  return (
    <div className="container">
      <section className="wedding-categories">
        <div className="section-header">
          <h2>Wedding Categories</h2>
          <p>Discover everything you need to make your special day perfect</p>
        </div>
        
        <div className="category-grid">
          {categories.map(category => (
            <div className={`category-card ${category.colorClass}`} key={category.id}>
              <div className="card-image">
                <img src={category.image} alt={category.title} />
                <span className="card-badge"></span>
              </div>
              <div className="card-content">
                <h3>{category.title} <i className="fas fa-chevron-right"></i></h3>
                <p>{category.description}</p>
                <div className="card-footer">
                  <a href="#" className="explore-btn">Explore <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WeddingCategories;