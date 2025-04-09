import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 Medicine Tracker. All Rights Reserved.</p>
      <div className="social-icons">
        <a href="#" className="icon">
          <FaFacebook />
        </a>
        <a href="#" className="icon">
          <FaTwitter />
        </a>
        <a href="#" className="icon">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
