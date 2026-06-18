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
        background: '#ffffff',
        border: '3px solid #000000',
        borderRadius: isCircle ? '50%' : '12px',
        padding: text ? '0.5rem 1rem' : '0.75rem',
        boxShadow: '4px 4px 0px #000000',
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
      whileHover={{ scale: 1.1, rotate: rotate + 5, boxShadow: '6px 6px 0px #000' }}
      whileTap={{ scale: 0.95, cursor: 'grabbing' }}
    >
      {text ? text : children}
    </motion.div>
  );
}

export default Sticker;
