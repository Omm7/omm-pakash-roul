import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './PremiumCursor.css';

/**
 * PremiumCursor Component
 * 
 * Classic mouse pointer design with smooth animations.
 */

const PremiumCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('interactive') ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive');
      
      setIsHovering(isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <motion.div
      className="cursor-pointer"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isClicking ? 0.9 : isHovering ? 1.2 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`cursor-svg ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      >
        {/* Mouse pointer shape */}
        <path
          d="M3 3 L3 17 L8 12 L11 18 L13 17 L10 11 L16 11 Z"
          fill="url(#cursorGradient)"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="cursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d9ff" />
            <stop offset="100%" stopColor="#0099ff" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default PremiumCursor;
