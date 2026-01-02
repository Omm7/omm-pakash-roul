import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition, useIsOverInteractive } from '../../hooks/useMousePosition';
import './CustomCursor.css';

/**
 * Custom Cursor Component
 * Premium animated cursor with interactive feedback
 * 
 * Features:
 * - Smooth spring physics
 * - Interactive element detection
 * - Blend mode effects
 * - Theme-aware colors
 * - Performance optimized
 */
const CustomCursor = ({ enabled = true, showOnMobile = false }) => {
  const { springX, springY } = useMousePosition({ enabled });
  const isOverInteractive = useIsOverInteractive();
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Hide cursor on mobile by default
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if ((isMobile || hasTouch) && !showOnMobile) {
      setIsVisible(false);
      return;
    }

    setIsVisible(enabled);
  }, [enabled, showOnMobile]);

  // Track mouse enter/leave
  useEffect(() => {
    if (!enabled) return;

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  // Track mouse clicks
  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled]);

  // Hide default cursor
  useEffect(() => {
    if (enabled && isVisible) {
      document.body.style.cursor = 'none';
      // Apply to all elements
      const style = document.createElement('style');
      style.id = 'custom-cursor-style';
      style.innerHTML = '* { cursor: none !important; }';
      document.head.appendChild(style);

      return () => {
        document.body.style.cursor = '';
        const styleEl = document.getElementById('custom-cursor-style');
        if (styleEl) styleEl.remove();
      };
    }
  }, [enabled, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-container">
      {/* Cursor Dot (Small inner circle) */}
      <motion.div
        className={`cursor-dot ${isOverInteractive ? 'cursor-dot-hover' : ''} ${isClicking ? 'cursor-dot-click' : ''}`}
        style={{
          left: springX,
          top: springY,
        }}
        animate={{
          scale: isClicking ? 0.8 : isOverInteractive ? 0.5 : 1,
        }}
        transition={{
          scale: { duration: 0.15, ease: 'easeOut' }
        }}
      />

      {/* Cursor Outline (Large outer ring) */}
      <motion.div
        className={`cursor-outline ${isOverInteractive ? 'cursor-outline-hover' : ''} ${isClicking ? 'cursor-outline-click' : ''}`}
        style={{
          left: springX,
          top: springY,
        }}
        animate={{
          scale: isClicking ? 0.85 : isOverInteractive ? 1.5 : 1,
          opacity: isClicking ? 0.6 : isOverInteractive ? 0.8 : 1,
        }}
        transition={{
          scale: { duration: 0.2, ease: 'easeOut' },
          opacity: { duration: 0.15 }
        }}
      />

      {/* Cursor Glow (Subtle glow effect) */}
      <motion.div
        className="cursor-glow"
        style={{
          left: springX,
          top: springY,
        }}
        animate={{
          scale: isOverInteractive ? 1.8 : 1,
          opacity: isOverInteractive ? 0.6 : 0.3,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut'
        }}
      />
    </div>
  );
};

export default CustomCursor;
