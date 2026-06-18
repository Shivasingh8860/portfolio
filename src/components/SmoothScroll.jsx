import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    // Disable smooth scrolling hook on touch devices (they already have natural momentum scrolling)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    const speed = 0.08; // Damping factor (lower = smoother, higher = faster response)
    let isScrolling = false;
    let animationFrameId = null;

    const onWheel = (e) => {
      // Don't intercept scroll if hovering over scrollable items (terminal, textareas)
      if (
        e.target.closest('.terminal-content') || 
        e.target.closest('textarea') || 
        e.target.closest('input') ||
        e.target.closest('select')
      ) {
        return;
      }

      e.preventDefault();

      // Normalize deltaY to handle lines/pages (Firefox) vs pixels (Chrome/Safari)
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        // deltaMode 1 = line scrolling (usually 3 lines per wheel click)
        delta *= 24;
      } else if (e.deltaMode === 2) {
        // deltaMode 2 = page scrolling
        delta *= window.innerHeight;
      }

      targetY += delta;

      // Clamp target within document boundaries
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(targetY, maxScroll));

      if (!isScrolling) {
        isScrolling = true;
        animate();
      }
    };

    const animate = () => {
      const diff = targetY - currentY;
      currentY += diff * speed;

      window.scrollTo(0, currentY);

      // Continue animating until the difference is negligible
      if (Math.abs(diff) > 0.3) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isScrolling = false;
        currentY = targetY;
      }
    };

    // Keep state in sync if scrolled by scrollbar dragging, keys, or mobile emulator
    const onScroll = () => {
      if (!isScrolling) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return null;
};

export default SmoothScroll;
