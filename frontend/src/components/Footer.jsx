import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faLinkedinIn, 
  faPinterestP 
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Vendors</h4>
          <ul>
            <li><a href="#">Join as Vendor</a></li>
            <li><a href="#">Vendor Login</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Vendor Resources</a></li>
            <li><a href="#">Success Stories</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Feedback</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Stay Connected</h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="#" aria-label="Pinterest">
              <FontAwesomeIcon icon={faPinterestP} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 YourWeddingBrand. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;