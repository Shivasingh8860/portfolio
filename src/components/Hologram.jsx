import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import './Hologram.css';

const Hologram = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 5;
    const y = (clientY - top - height / 2) / 5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const transform = useMotionTemplate`perspective(1200px) rotateX(${-mouseY.get()}deg) rotateY(${mouseX.get()}deg)`;

  return (
    <div 
      className="hologram-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="hologram-core" style={{ transform }}>
        {/* Core glowing orb */}
        <div className="holo-orb"></div>
        
        {/* 3D Tesseract Faces */}
        <div className="holo-face front"></div>
        <div className="holo-face back"></div>
        <div className="holo-face left"></div>
        <div className="holo-face right"></div>
        <div className="holo-face top"></div>
        <div className="holo-face bottom"></div>
        
        {/* Outer Rings */}
        <div className="holo-ring ring-1"></div>
        <div className="holo-ring ring-2"></div>
        <div className="holo-ring ring-3"></div>
      </motion.div>
    </div>
  );
};

export default Hologram;
