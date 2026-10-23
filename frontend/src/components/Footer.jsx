import { Link } from "react-router-dom";
import "./Footer.css";

const footerCategories = [
  { label: "Photographers", category: "Photographer" },
  { label: "Wedding Venues", category: "Venue" },
  { label: "Caterers", category: "Caterer" },
  { label: "Decorators", category: "Decorator" },
  { label: "Makeup Artists", category: "Makeup" },
  { label: "Mehendi Artists", category: "Mehendi" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="ds-footer">
      <div className="ds-footer-ornament" aria-hidden="true">
        <span />
        <span className="ds-footer-ornament-flower">✳</span>
        <span />
      </div>
      
      <div className="ds-footer-main">
        <div className="ds-footer-intro">
          <Link to="/" className="ds-footer-brand" aria-label="DreamShaadi home">
            <span className="ds-footer-brand-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="currentColor">
                <path d="M24 5c3 7 3 13 0 19-3-6-3-12 0-19Z" />
                <path d="M10 12c8 2 13 6 15 12-7-1-12-5-15-12Z" />
                <path d="M38 12c-3 7-8 11-15 12 2-6 7-10 15-12Z" />
                <path d="M6 28c7-3 13-2 18 3-6 4-13 3-18-3Z" />
                <path d="M42 28c-5 6-12 7-18 3 5-5 11-6 18-3Z" />
                <path d="M24 31c5 0 9 3 11 8H13c2-5 6-8 11-8Z" />
              </svg>
            </span>
            
            <span className="ds-footer-wordmark">
              Dream<span>Shaadi</span>
              <small>YOUR STORY. YOUR CELEBRATION.</small>
            </span>
          </Link>
          
          <p className="ds-footer-description">
            Every love story deserves a beautiful celebration. Discover
            wedding professionals, explore inspiration, and bring your
            dream wedding to life with DreamShaadi.
          </p>
          
          <Link to="/vendor" className="ds-footer-discover">
            Begin your wedding journey
            <span aria-hidden="true">↗</span>
          </Link>
          
          <div className="ds-footer-promise">
            <span aria-hidden="true">✳</span>
            Made for your forever moments.
          </div>
        </div>
        
        <nav className="ds-footer-column" aria-label="Explore DreamShaadi">
          <h2>Explore</h2>
          <span className="ds-footer-heading-line" />
          
          <Link to="/vendor">Find Vendors</Link>
          <Link to="/stories">Wedding Inspiration</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/vendor/join">List Your Business</Link>
          <Link to="/vendor/explore">Explore Vendors</Link>
        </nav>
        
        <nav className="ds-footer-column" aria-label="Wedding categories">
          <h2>Categories</h2>
          <span className="ds-footer-heading-line" />
          
          {footerCategories.map((item) => (
            <Link
              key={item.category}
              to={`/vendor?category=${encodeURIComponent(item.category)}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="ds-footer-column ds-footer-contact">
          <h2>Let's Connect</h2>
          <span className="ds-footer-heading-line" />
          
          <p className="ds-footer-contact-intro">
            Have a question or need help? We're here to help you take
            the next step.
          </p>
          
          <a href="mailto:hello@dreamshaadi.in" className="ds-footer-email">
            <span className="ds-footer-contact-icon" aria-hidden="true">
              ✉
            </span>
            <span>
              <small>GENERAL ENQUIRIES</small>
              hello@dreamshaadi.in
            </span>
          </a>
          
          <a
            href="mailto:grievance@dreamshaadi.in"
            className="ds-footer-email"
          >
            <span className="ds-footer-contact-icon" aria-hidden="true">
              ♧
            </span>
            <span>
              <small>GRIEVANCE SUPPORT</small>
              grievance@dreamshaadi.in
            </span>
          </a>
          
          <div className="ds-footer-location">
            <span aria-hidden="true">⌖</span>
            <span>New Delhi, India</span>
          </div>
        </div>
      </div>
      
      <div className="ds-footer-bottom">
        <p>
          © {currentYear} DreamShaadi. Made with
          <span className="ds-footer-heart" aria-label="love"> ♥ </span>
          in India.
        </p>
        
        <nav className="ds-footer-legal" aria-label="Legal information">
          <Link to="/privacy">Privacy Policy</Link>
          <span aria-hidden="true">·</span>
          <Link to="/terms">Terms of Service</Link>
        </nav>
        
        <Link to="/" className="ds-footer-back-top">
          Back to home <span aria-hidden="true">↑</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
