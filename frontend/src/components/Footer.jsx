import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-grid">
      <div>
        <div className="footer-brand">Dream<span>Shaadi</span></div>
        <p>India's trusted marketplace for finding wedding professionals who make every celebration unforgettable.</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <Link to="/vendor">Find Vendors</Link>
        <Link to="/vendor/join">List Your Business</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <div>
        <h3>Categories</h3>
        <Link to="/vendor?category=Photographer">Photographers</Link>
        <Link to="/vendor?category=Venue">Wedding Venues</Link>
        <Link to="/vendor?category=Caterer">Caterers</Link>
        <Link to="/vendor?category=Makeup">Makeup Artists</Link>
      </div>
      <div>
        <h3>Contact</h3>
        <a href="mailto:hello@dreamshaadi.in">hello@dreamshaadi.in</a>
        <p>Grievance Officer<br />grievance@dreamshaadi.in</p>
        <p>New Delhi, India</p>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 DreamShaadi. Made with care in India.</span>
      <span><Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></span>
    </div>
  </footer>
);

export default Footer;
