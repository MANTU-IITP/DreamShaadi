import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./EditorialPages.css";

const stories = [
  {
    id: 1,
    title: "A Celebration in Shades of Red",
    subtitle: "Tradition, family and timeless details",
    location: "Traditional wedding inspiration",
    category: "Traditional",
    vendorCategory: "Decorator",
    image:
      "https://www.velasweddings.com/resourcefiles/otherimages/specialized-staff-vendors-hindu-weddings-grand-velas-riviera-maya.jpg",
    alt: "Wedding couple beneath a delicate floral mandap",
    number: "01",
  },
  {
    id: 2,
    title: "A Palace Made for Romance",
    subtitle: "Grand architecture and unforgettable settings",
    location: "Destination wedding inspiration",
    category: "Destination",
    vendorCategory: "Venue",
    image: "https://themangalamtours.com/blog-3.webp",
    alt: "Floral wedding ceremony setup in a palace courtyard",
    number: "02",
  },
  {
    id: 3,
    title: "The Beauty of Every Little Detail",
    subtitle: "Thoughtful flowers, textures and soft light",
    location: "Wedding styling inspiration",
    category: "Style & Décor",
    vendorCategory: "Decorator",
    image: "https://virukshaaevents.in/assets/work/wedding-decoration.jpg",
    alt: "Elegant wedding mandap decorated with flowers",
    number: "03",
  },
  {
    id: 4,
    title: "The Moments That Feel Like Forever",
    subtitle: "Natural smiles and joyful celebrations",
    location: "Wedding photography inspiration",
    category: "Intimate",
    vendorCategory: "Photographer",
    image: "https://www.ppa.com/assets/images/ppmag_articles/201910sonam_0871.jpg",
    alt: "Wedding couple celebrating beneath a floral canopy",
    number: "04",
  },
  {
    id: 5,
    title: "Colour, Culture and Celebration",
    subtitle: "A joyful gathering filled with tradition",
    location: "Celebration inspiration",
    category: "Traditional",
    vendorCategory: "Photographer",
    image: "https://cdn0.weddingwire.in/vendor/3367/3_2/960/jpg/post_15_193367.jpeg",
    alt: "Couple sharing a lively moment during a wedding celebration",
    number: "05",
  },
];

const filters = [
  "All stories",
  "Traditional",
  "Destination",
  "Intimate",
  "Style & Décor",
];

const Stories = () => {
  const [activeFilter, setActiveFilter] = useState("All stories");
  
  const filteredStories =
    activeFilter === "All stories"
      ? stories
      : stories.filter((story) => story.category === activeFilter);
  
  return (
    <>
      <Navbar />
      
      <main className="editorial-page stories-page">
        <section className="editorial-hero stories-hero">
          <div className="editorial-hero-copy">
            <span className="editorial-eyebrow">
              <span className="eyebrow-line" />
              THE DREAMSHAADI JOURNAL
            </span>
            
            <h1>
              Every wedding
              <br />
              tells a <em>story.</em>
            </h1>
            
            <p>
              Discover thoughtful details, beautiful traditions and
              celebrations that inspire you to make your own wedding
              unmistakably yours.
            </p>
            
            <div className="editorial-hero-actions">
              <a href="#wedding-stories" className="editorial-button">
                Explore the stories <span aria-hidden="true">↘</span>
              </a>
              
              <Link to="/vendor" className="editorial-text-link">
                Find your vendors <span aria-hidden="true">↗</span>
              </Link>
            </div>
            
            <div className="editorial-hero-note">
              <span className="note-star">✳</span>
              <span>For the moments that become memories.</span>
            </div>
          </div>
          
          <div className="stories-hero-visual">
            <img
              className="stories-hero-image"
              src={stories[0].image}
              alt="Floral wedding ceremony with an elegant mandap"
              fetchPriority="high"
            />
            
            <div className="hero-image-caption">
              <span>THE WEDDING EDIT</span>
              <span>01 / INSPIRATION</span>
            </div>
            
            <div className="hero-image-seal" aria-hidden="true">
              <span>MADE</span>
              <span>WITH</span>
              <strong>♡</strong>
              <span>LOVE</span>
            </div>
          </div>
        </section>
        
        <section className="stories-intro">
          <span className="editorial-eyebrow">A LITTLE INSPIRATION GOES A LONG WAY</span>
          <h2>
            Not just a beautiful day.
            <br />
            <em>A feeling that stays.</em>
          </h2>
          <p>
            From meaningful rituals to the smallest finishing touches,
            explore ideas for a celebration shaped around your people,
            your traditions and your kind of love.
          </p>
        </section>
        
        <section
          className="stories-gallery editorial-section"
          id="wedding-stories"
        >
          <div className="editorial-section-heading">
            <div>
              <span className="editorial-eyebrow">THE INSPIRATION EDIT</span>
              <h2>Find your kind of beautiful.</h2>
            </div>
            <p>
              Different traditions. Different dreams.
              <br />
              One celebration that feels like you.
            </p>
          </div>
          
          <div className="stories-filters" aria-label="Filter wedding stories">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`stories-filter ${
                  activeFilter === filter ? "is-active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="stories-card-grid">
            {filteredStories.map((story) => (
              <article className="story-card" key={story.id}>
                <Link
                  to={`/vendor?category=${encodeURIComponent(
                    story.vendorCategory
                  )}`}
                  className="story-card-image-link"
                  aria-label={`Explore ${story.vendorCategory.toLowerCase()}s for ${story.title}`}
                >
                  <div className="story-card-image-wrap">
                    <img
                      src={story.image}
                      alt={story.alt}
                      loading="lazy"
                    />
                    <span className="story-card-number">{story.number}</span>
                    <span className="story-card-image-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </Link>
                
                <div className="story-card-content">
                  <div className="story-card-meta">
                    <span>{story.category}</span>
                    <span className="story-meta-dot">✳</span>
                  </div>
                  
                  <h3>{story.title}</h3>
                  <p>{story.subtitle}</p>
                  
                  <Link
                    to={`/vendor?category=${encodeURIComponent(
                      story.vendorCategory
                    )}`}
                    className="story-card-link"
                  >
                    Explore the possibilities
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          {filteredStories.length === 0 && (
            <p className="stories-empty">
              More inspiration is on its way. Try another category.
            </p>
          )}
        </section>
        
        <section className="stories-quote-band">
          <span className="quote-decoration" aria-hidden="true">
            "
          </span>
          <p>
            The best weddings don't follow a formula.
            <br />
            They tell a story only you could tell.
          </p>
          <span className="quote-credit">THE DREAMSHAADI PHILOSOPHY</span>
        </section>
        
        <section className="editorial-cta">
          <div className="editorial-cta-mark" aria-hidden="true">
            ✳
          </div>
          <span className="editorial-eyebrow">YOUR STORY STARTS HERE</span>
          <h2>
            Dream it.
            <br />
            <em>Then bring it to life.</em>
          </h2>
          <p>
            Discover photographers, venues, decorators and more to help
            shape your celebration, your way.
          </p>
          <Link to="/vendor" className="editorial-button">
            Explore wedding vendors <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Stories;
