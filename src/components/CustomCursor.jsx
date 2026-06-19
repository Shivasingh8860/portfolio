import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'explore', 'type'
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // High performance MotionValues bypassing React state for mousemove
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Outer ring spring physics (adds smooth delay/inertia follow)
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 24, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 24, mass: 0.5 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) ||
        ('ontouchstart' in window || navigator.maxTouchPoints > 0)
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
  }, [isVisible, mouseX, mouseY, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* 1. Spiderman Silhouette Center Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          pointerEvents: 'none',
          zIndex: 9999,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: cursorType === 'explore' || cursorType === 'type' ? 0.7 : cursorType === 'hover' ? 1.3 : 1,
          rotate: cursorType === 'hover' ? 15 : 0
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Spider Icon SVG */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 5px var(--accent-primary))' }}>
          {/* Spider Body */}
          <ellipse cx="50" cy="52" rx="7" ry="14" fill="var(--accent-primary)" />
          <circle cx="50" cy="34" r="5.5" fill="var(--accent-primary)" />
          
          {/* Left Legs */}
          <path d="M 45 36 C 35 25, 20 28, 12 40 C 20 32, 35 30, 45 38" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 45 44 C 30 32, 12 40, 6 56 C 14 46, 30 40, 45 46" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 45 52 C 30 50, 10 65, 8 82 C 14 68, 30 56, 45 54" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 45 60 C 35 68, 18 85, 20 94 C 24 85, 38 72, 45 62" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Right Legs */}
          <path d="M 55 36 C 65 25, 80 28, 88 40 C 80 32, 65 30, 55 38" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 55 44 C 70 32, 88 40, 94 56 C 86 46, 70 40, 55 46" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 55 52 C 70 50, 90 65, 92 82 C 86 68, 70 56, 55 54" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 55 60 C 65 68, 82 85, 80 94 C 76 85, 62 72, 55 62" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

      {/* 2. Concentric Spider-Web Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 50,
          height: 50,
          pointerEvents: 'none',
          zIndex: 9998,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        animate={{
          width: cursorType === 'explore' ? 70 : cursorType === 'type' ? 30 : cursorType === 'hover' ? 80 : 50,
          height: cursorType === 'explore' ? 70 : cursorType === 'type' ? 30 : cursorType === 'hover' ? 80 : 50,
          rotate: cursorType === 'hover' ? 90 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 26,
          mass: 0.3
        }}
      >
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          {/* Radial Axis Lines */}
          <line x1="50" y1="10" x2="50" y2="90" stroke={cursorType === 'hover' ? 'var(--accent-secondary)' : 'var(--border-light)'} strokeWidth="1" strokeDasharray={cursorType === 'type' ? '3' : 'none'} />
          <line x1="10" y1="50" x2="90" y2="50" stroke={cursorType === 'hover' ? 'var(--accent-secondary)' : 'var(--border-light)'} strokeWidth="1" strokeDasharray={cursorType === 'type' ? '3' : 'none'} />
          
          {cursorType !== 'type' && (
            <>
              <line x1="22" y1="22" x2="78" y2="78" stroke="var(--border-light)" strokeWidth="0.8" />
              <line x1="22" y1="78" x2="78" y2="22" stroke="var(--border-light)" strokeWidth="0.8" />

              {/* Web Rings (Concentric Octagons) */}
              {/* Outer Web Ring */}
              <path d="M 50 15 L 75 25 L 85 50 L 75 75 L 50 85 L 25 75 L 15 50 L 25 25 Z" 
                stroke={cursorType === 'hover' ? 'var(--accent-secondary)' : 'var(--accent-primary)'} 
                strokeWidth="1" 
                fill="none" 
                style={{ opacity: 0.6, filter: cursorType === 'hover' ? 'drop-shadow(0 0 3px var(--accent-secondary))' : 'none' }}
              />

              {/* Middle Web Ring */}
              <path d="M 50 28 L 66 34 L 72 50 L 66 66 L 50 72 L 34 66 L 28 50 L 34 34 Z" 
                stroke={cursorType === 'hover' ? 'var(--accent-secondary)' : 'var(--border-light)'} 
                strokeWidth="0.8" 
                fill="none"
                style={{ opacity: 0.8 }}
              />

              {/* Inner Web Ring */}
              <path d="M 50 38 L 59 41 L 62 50 L 59 59 L 50 62 L 41 59 L 38 50 L 41 41 Z" 
                stroke="var(--border-light)" 
                strokeWidth="0.6" 
                fill="none"
                style={{ opacity: 0.9 }}
              />
            </>
          )}

          {/* Type State Simple Reticle Indicators */}
          {cursorType === 'type' && (
            <>
              <line x1="50" y1="20" x2="50" y2="30" stroke="var(--accent-secondary)" strokeWidth="2" />
              <line x1="50" y1="70" x2="50" y2="80" stroke="var(--accent-secondary)" strokeWidth="2" />
            </>
          )}
        </svg>

        {/* Text overlay for explore mode */}
        <AnimatePresence>
          {cursorType === 'explore' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              style={{
                position: 'absolute',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--accent-secondary)',
                textShadow: '0 0 5px rgba(0, 229, 255, 0.8)',
                pointerEvents: 'none'
              }}
            >
              WEB
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;
