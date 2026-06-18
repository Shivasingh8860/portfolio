import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="logo">
              Shiva
            </a>
            <p className="footer-desc">
              Full-Stack Software Engineer specializing in building scalable web architectures and robust systems.
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h4>Presence</h4>
            <div className="social-icons">
              <a href="https://github.com/Shivasingh8860" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub size={20} /></a>
              <a href="https://www.linkedin.com/in/shiva-singh-47590b371?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Shiva. All rights reserved.</p>
          <p className="made-with">
            Curated with <FiHeart size={14} className="heart-icon" /> by Shiva
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
