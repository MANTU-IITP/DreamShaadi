import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VendorCard from "../components/VendorCard";
import LoadingSpinner from "../components/LoadingSpinner";
import WeddingTraditions from "../components/WeddingTraditions";
import "./Home.css";
import api from "../utils/api";

const categories = [
  { icon: "📷", name: "Photographer", image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=85" },
  { icon: "🏛", name: "Venue", image: "https://images.unsplash.com/photo-1519167758481-83f29da8c8a0?auto=format&fit=crop&w=800&q=85" },
  { icon: "🍽", name: "Caterer", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85" },
  { icon: "🌸", name: "Decorator", image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=800&q=85" },
  { icon: "🌿", name: "Mehendi", image: "https://images.unsplash.com/photo-1610019475194-aa5ad0d80c3b?auto=format&fit=crop&w=800&q=85" },
  { icon: "✨", name: "Makeup", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=85" },
  { icon: "🎵", name: "Music/DJ", image: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=800&q=85" },
  { icon: "🪔", name: "Pandit", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85" },
];

const destinations = [
  { name: "Jaipur", region: "Rajasthan", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=85" },
  { name: "Goa", region: "Beach Paradise", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85" },
  { name: "Udaipur", region: "City of Lakes", image: "https://images.unsplash.com/photo-1608378687221-e8199a3f1b5e?auto=format&fit=crop&w=900&q=85" },
];

const Home = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ city: "", category: "" });

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const response = await api.get("/vendor/post/getall");
        const vendors = response.data || [];
        setFeatured([...vendors].sort((a, b) => Number(b.isPremium) - Number(a.isPremium)).slice(0, 6));
      } catch {
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (search.city) params.set("city", search.city);
    if (search.category) params.set("category", search.category);
    navigate(`/vendor?${params.toString()}`);
  };

  return (
    <>
      <Navbar />
      <main className="home-main">
        {/* Premium Hero Section */}
        <section className="premium-hero">
          <div className="premium-hero-overlay" />
          <div className="premium-hero-content">
            <span className="premium-eyebrow">India's Premier Wedding Marketplace</span>
            <h1 className="premium-hero-title">
              Your Love Story,
              <br />
              <span className="premium-hero-accent">Beautifully Told</span>
            </h1>
            <p className="premium-hero-subtitle">
              Discover exceptional photographers, stunning venues, and artisans who understand
              <br />
              the magic of Indian weddings
            </p>
            
            <form className="premium-search" onSubmit={submitSearch}>
              <div className="premium-search-field">
                <label htmlFor="search-city">Where</label>
                <select 
                  id="search-city"
                  value={search.city} 
                  onChange={(e) => setSearch({ ...search, city: e.target.value })}
                >
                  <option value="">Select city</option>
                  {["Delhi", "Mumbai", "Kolkata", "Jaipur", "Bengaluru", "Goa", "Udaipur"].map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div className="premium-search-divider" />
              
              <div className="premium-search-field">
                <label htmlFor="search-category">What</label>
                <select 
                  id="search-category"
                  value={search.category} 
                  onChange={(e) => setSearch({ ...search, category: e.target.value })}
                >
                  <option value="">Select service</option>
                  {categories.map(({ name }) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              
              <button type="submit" className="premium-search-button">
                <span>Search</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M14 10L6 6v8l8-4z" fill="currentColor" />
                </svg>
              </button>
            </form>
            
            <div className="popular-searches">
              <span>Popular:</span>
              {["Photographers in Delhi", "Beach Venues in Goa", "Makeup Artists"].map((term, i) => (
                <button key={i} type="button" onClick={() => navigate("/vendor")}>
                  {term}
                </button>
              ))}
            </div>
          </div>
          
          <div className="premium-hero-scroll">
            <span>Explore</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="trust-strip">
          <div className="trust-item">
            <strong>Verified Vendors</strong>
            <span>Handpicked professionals</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <strong>Real Reviews</strong>
            <span>From real couples</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <strong>Transparent Pricing</strong>
            <span>No hidden costs</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <strong>Secure Booking</strong>
            <span>Protected transactions</span>
          </div>
        </section>

        {/* Editorial Categories */}
        <section className="editorial-categories">
          <div className="editorial-categories-header">
            <span className="editorial-eyebrow">FIND YOUR PERFECT MATCH</span>
            <h2>Every Detail, Thoughtfully Curated</h2>
            <p>From photographers who capture your story to venues that set the stage—discover vendors who understand what matters most.</p>
          </div>
          
          <div className="editorial-categories-grid">
            {categories.map(({ icon, name, image }) => (
              <Link 
                key={name}
                to={`/vendor?category=${encodeURIComponent(name)}`}
                className="editorial-category-card"
              >
                <div className="editorial-category-image">
                  <img src={image} alt={`${name} services`} loading="lazy" />
                  <div className="editorial-category-overlay" />
                </div>
                <div className="editorial-category-content">
                  <span className="editorial-category-icon">{icon}</span>
                  <h3>{name}</h3>
                  <span className="editorial-category-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Wedding Traditions */}
        <WeddingTraditions />

        {/* Destination Discovery */}
        <section className="destination-section">
          <div className="destination-header">
            <div>
              <span className="editorial-eyebrow">DESTINATION WEDDINGS</span>
              <h2>Where Love Meets Landscape</h2>
              <p>From royal palaces to beachside serenity, discover India's most enchanting wedding destinations.</p>
            </div>
            <Link to="/vendor?destination=true" className="destination-view-all">
              View all destinations <span>→</span>
            </Link>
          </div>
          
          <div className="destination-grid">
            {destinations.map(({ name, region, image }) => (
              <Link 
                key={name}
                to={`/vendor?city=${name}`}
                className="destination-card"
              >
                <div className="destination-image">
                  <img src={image} alt={`${name} wedding destination`} loading="lazy" />
                  <div className="destination-overlay" />
                </div>
                <div className="destination-content">
                  <h3>{name}</h3>
                  <span>{region}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Vendors */}
        <section className="featured-vendors-section">
          <div className="featured-vendors-header">
            <div>
              <span className="editorial-eyebrow">HANDPICKED FOR YOU</span>
              <h2>Exceptional Vendors</h2>
            </div>
            <Link to="/vendor" className="featured-view-all">
              Explore all vendors <span>→</span>
            </Link>
          </div>
          
          {loading ? (
            <LoadingSpinner label="Finding exceptional vendors..." />
          ) : featured.length > 0 ? (
            <div className="featured-vendors-grid">
              {featured.map((vendor) => (
                <VendorCard key={vendor._id} vendor={vendor} />
              ))}
            </div>
          ) : (
            <div className="featured-vendors-empty">
              <p>Curated vendors will appear here as our marketplace grows.</p>
            </div>
          )}
        </section>

        {/* Inspiration Gallery */}
        <section className="inspiration-section">
          <div className="inspiration-header">
            <span className="editorial-eyebrow">WEDDING INSPIRATION</span>
            <h2>Real Weddings, Real Moments</h2>
            <p>Browse beautiful celebrations and discover ideas for your own special day.</p>
          </div>
          
          <div className="inspiration-gallery">
            {[
              "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1591604466107-ec97de7fba76?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
            ].map((src, i) => (
              <div key={i} className="inspiration-item">
                <img src={src} alt="Wedding inspiration" loading="lazy" />
              </div>
            ))}
          </div>
          
          <div className="inspiration-cta">
            <Link to="/vendor" className="inspiration-button">
              Find your vendors <span>→</span>
            </Link>
          </div>
        </section>

        {/* Vendor CTA */}
        <section className="premium-vendor-cta">
          <div className="premium-vendor-cta-content">
            <span className="editorial-eyebrow">FOR WEDDING PROFESSIONALS</span>
            <h2>Grow Your Wedding Business</h2>
            <p>Join India's most trusted wedding marketplace and connect with couples planning their dream celebration.</p>
            <Link to="/vendor/join" className="premium-cta-button">
              Become a Vendor <span>→</span>
            </Link>
          </div>
          <div className="premium-vendor-cta-image">
            <img 
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85" 
              alt="Wedding vendor workspace" 
              loading="lazy"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
