import React from 'react';
import { motion } from 'framer-motion';
import './SectionDivider.css';

/**
 * Animated section divider with multiple styles
 * Styles: line, dots, wave, gradient
 */
const SectionDivider = ({ style = 'line', color = 'var(--accent-primary)' }) => {
  if (style === 'dots') {
    return (
      <div className="section-divider dots">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="dot"
            style={{ backgroundColor: color }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
      </div>
    );
  }

  if (style === 'wave') {
    return (
      <div className="section-divider wave">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
          <motion.path
            d="M0,20 Q300,0 600,20 T1200,20"
            fill="none"
            stroke={color}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </div>
    );
  }

  if (style === 'gradient') {
    return (
      <motion.div
        className="section-divider gradient"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="gradient-line" />
      </motion.div>
    );
  }

  // Default: line
  return (
    <div className="section-divider line">
      <motion.div
        className="line-segment"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
};

export default SectionDivider;
