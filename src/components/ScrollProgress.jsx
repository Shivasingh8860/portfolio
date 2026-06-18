import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '2px',
        backgroundColor: 'var(--accent-primary)',
        scaleY,
        transformOrigin: 'top',
        zIndex: 10000,
        opacity: 0.3
      }}
    />
  );
};

export default ScrollProgress;
