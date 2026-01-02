import React from 'react';
import { motion } from 'framer-motion';
import './TextReveal.css';

/**
 * Animated text reveal with multiple effects
 * Effects: slide-up, fade, wave, glitch
 */
const TextReveal = ({ 
  children, 
  delay = 0, 
  effect = 'slide-up',
  className = '' 
}) => {
  const effects = {
    'slide-up': {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay }
    },
    'fade': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8, delay }
    },
    'slide-left': {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, delay }
    },
    'slide-right': {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, delay }
    },
    'scale': {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, delay }
    }
  };

  const selectedEffect = effects[effect] || effects['slide-up'];

  return (
    <motion.div
      className={`text-reveal ${className}`}
      {...selectedEffect}
    >
      {children}
    </motion.div>
  );
};

/**
 * Wave text animation - each character animates in sequence
 */
export const WaveText = ({ text, delay = 0 }) => {
  const letters = text.split('');

  return (
    <span className="wave-text">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
};

/**
 * Glitch text effect
 */
export const GlitchText = ({ children, className = '' }) => {
  return (
    <div className={`glitch-text ${className}`} data-text={children}>
      {children}
    </div>
  );
};

export default TextReveal;
