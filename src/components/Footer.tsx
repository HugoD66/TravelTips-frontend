import React from 'react';
import '../styles/footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <p>Nous nous engageons à partager les meilleurs conseils et itinéraires de voyage pour vous aider à explorer le monde.</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Travel Tips | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
