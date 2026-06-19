import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'glass scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo">
        Shiva Portfolio
        </a>

        <div className="nav-actions">
          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="nav-link">{link.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Spiderman Light Mode' : 'Switch to Spider-Verse Dark Mode'}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Mobile Nav Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu glass"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="mobile-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
