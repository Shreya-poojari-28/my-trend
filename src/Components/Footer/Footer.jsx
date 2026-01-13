import React from 'react';
import './Footer.css';

const Footer = ({ theme = "dark" }) => {
  return (
    <footer className={`footer ${theme}`}>
      <div className="particles"></div>

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h3>myTrend</h3>
          <p>Your daily fashion destination.</p>

          <div className="footer-social">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-x-twitter"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Join our newsletter for latest drops & offers</p>

          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Sale</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-links">
          <h4>Categories</h4>
          <ul>
            <li><a href="#">Men</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Kids</a></li>
            <li><a href="#">Accessories</a></li>
          </ul>
        </div>

        {/* Language & Payments */}
        <div className="footer-bottom-right">
          <div className="language-select">
            <i className="fa-solid fa-globe"></i>
            <select>
              <option>English (IN)</option>
              <option>English (US)</option>
              <option>Hindi</option>
            </select>
          </div>

          <div className="payment-icons">
            <i className="fa-brands fa-cc-visa"></i>
            <i className="fa-brands fa-cc-mastercard"></i>
            <i className="fa-brands fa-cc-amex"></i>
            <i className="fa-brands fa-cc-paypal"></i>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          <p>© {new Date().getFullYear()} myTrend — All rights reserved.</p>
        </div>

        <div className="footer-legal">
          <a href="#">Terms & Conditions</a>
          <span>•</span>
          <a href="#">Privacy Policy</a>
          <span>•</span>
          <a href="#">Returns & Refunds</a>
          <span>•</span>
          <a href="#">Shipping Policy</a>
          <span>•</span>
          <a href="#">Cookies Policy</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
