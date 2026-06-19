import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpider } from 'react-icons/fa';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const bootSequence = [
    'Initializing Shiva OS v2.0...',
    'Loading distributed systems...',
    'Mounting WebSockets...',
    'Establishing neural connection...',
    'System ready.'
  ];

  useEffect(() => {
    let delay = 0;
    bootSequence.forEach((line, idx) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (idx === bootSequence.length - 1) {
          setTimeout(onComplete, 400); // Wait a bit after last line before completing
        }
      }, delay);
      delay += 250; // Delay between lines
    });
  }, [onComplete]);

  return (
    <motion.div 
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="loader-content">
        <motion.div 
          className="loader-logo"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FaSpider size={60} color="#e23636" />
        </motion.div>
        
        <div className="loader-terminal">
          {lines.map((line, idx) => (
            <div key={idx} className="loader-line">
              <span className="loader-prompt">{'>'}</span> {line}
            </div>
          ))}
          <motion.div 
            className="loader-cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
