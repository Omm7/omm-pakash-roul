import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Card3D.css';

/**
 * Card3D - Reusable 3D Perspective Hover Card Component
 * 
 * Features:
 * - Cursor-driven 3D tilt (rotateX, rotateY based on mouse position)
 * - Smooth spring animations
 * - Floating lift effect on hover
 * - Border glow reveal on hover
 * - Layered depth with translateZ
 * 
 * @param {React.ReactNode} children - Content to render inside the card
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler
 * @param {object} style - Additional inline styles
 */
const Card3D = ({ children, className = '', onClick, style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Get mouse position relative to card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation angles (max ±12 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setMousePosition({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div className="card3d-wrapper" style={{ perspective: '1000px', ...style }}>
      <motion.div
        className={`card3d ${className} ${isHovered ? 'card3d-hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{
          rotateX: mousePosition.rotateX,
          rotateY: mousePosition.rotateY,
          scale: isHovered ? 1.03 : 1,
          y: isHovered ? -15 : 0,
          z: isHovered ? 60 : 0
        }}
        transition={{
          rotateX: {
            type: 'spring',
            stiffness: 150,
            damping: 25,
            mass: 0.8
          },
          rotateY: {
            type: 'spring',
            stiffness: 150,
            damping: 25,
            mass: 0.8
          },
          scale: {
            type: 'spring',
            stiffness: 200,
            damping: 20
          },
          y: {
            type: 'spring',
            stiffness: 200,
            damping: 20
          },
          z: {
            type: 'spring',
            stiffness: 150,
            damping: 20
          }
        }}
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Border Glow Layer */}
        <motion.div
          className="card3d-border-glow"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Content Layer with depth */}
        <div className="card3d-content" style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Card3D;
