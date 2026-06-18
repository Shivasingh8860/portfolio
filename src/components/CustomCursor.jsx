import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'explore', 'type'
  const [isVisible, setIsVisible] = useState(false);

  // High performance MotionValues bypassing React state for mousemove
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Outer ring spring physics (adds smooth delay/inertia follow)
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 24, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 24, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Explore state inside projects
      if (target.closest('.project-card')) {
        setCursorType('explore');
        return;
      }

      // Typing state in code elements/inputs
      if (
        target.closest('.terminal-content') || 
        target.closest('.terminal-input') || 
        target.closest('textarea') ||
        target.closest('input')
      ) {
        setCursorType('type');
        return;
      }

      // Hover link state
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('window-tab')
      ) {
        setCursorType('hover');
        return;
      }

      setCursorType('default');
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Core High-Precision Center Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'var(--accent-primary)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: cursorType === 'explore' || cursorType === 'type' ? 0 : 1,
          opacity: cursorType === 'explore' || cursorType === 'type' ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 2. Spring Inertial Outer Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid var(--accent-primary)',
          pointerEvents: 'none',
          zIndex: 9998,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
        animate={{
          width: cursorType === 'explore' ? 56 : cursorType === 'type' ? 40 : cursorType === 'hover' ? 48 : 36,
          height: cursorType === 'explore' ? 56 : cursorType === 'type' ? 40 : cursorType === 'hover' ? 48 : 36,
          backgroundColor: cursorType === 'explore' ? 'rgba(99, 102, 241, 0.08)' : cursorType === 'type' ? 'rgba(99, 102, 241, 0.03)' : cursorType === 'hover' ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
          borderColor: cursorType === 'hover' ? 'var(--accent-secondary)' : 'var(--accent-primary)',
          boxShadow: cursorType === 'explore' ? '0 0 15px rgba(99, 102, 241, 0.15)' : 'none'
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 24,
          mass: 0.3
        }}
      >
        <AnimatePresence>
          {cursorType === 'explore' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'var(--accent-primary)'
              }}
            >
              View
            </motion.span>
          )}
          {cursorType === 'type' && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent-secondary)'
              }}
            >
              &gt;_
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;
