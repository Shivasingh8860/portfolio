import React from 'react';
import { motion } from 'framer-motion';

const Sticker = ({ children, top, left, right, bottom, rotate = 0, color = '#e23636', text, isCircle = false }) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: rotate - 20 }}
      whileInView={{ scale: 1, rotate: rotate }}
      transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
      viewport={{ once: true }}
      style={{
        position: 'absolute',
        top, left, right, bottom,
        background: 'rgba(10, 10, 12, 0.9)',
        backdropFilter: 'blur(5px)',
        border: `2px solid ${color}`,
        borderRadius: isCircle ? '50%' : '8px',
        padding: text ? '0.5rem 1rem' : '0.75rem',
        boxShadow: `0 0 15px ${color}`,
        zIndex: 20,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
        fontSize: text ? '1.5rem' : '2.5rem',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 800,
        textTransform: 'uppercase',
        fontStyle: 'italic',
        cursor: 'grab'
      }}
      drag
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      whileHover={{ scale: 1.1, rotate: rotate + 5, boxShadow: `0 0 25px ${color}, 0 0 40px ${color}` }}
      whileTap={{ scale: 0.95, cursor: 'grabbing' }}
    >
      {text ? text : children}
    </motion.div>
  );
}

export default Sticker;
