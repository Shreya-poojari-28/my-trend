import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h3>myTrend</h3>
          <p>Your daily fashion destination.</p>
        </div>

        <div className="footer-copy">
          <p>© {new Date().getFullYear()} myTrend. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
