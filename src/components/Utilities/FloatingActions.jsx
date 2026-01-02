import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import './FloatingActions.css';

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme, changeTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleTheme = () => {
    changeTheme(theme === 'neo-dark' ? 'minimal-light' : 'neo-dark');
  };

  return (
    <div className="floating-actions">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="floating-button scroll-top"
            onClick={scrollToTop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Scroll to top"
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        className="floating-button theme-toggle"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        title={`Switch to ${theme === 'neo-dark' ? 'light' : 'dark'} theme`}
      >
        {theme === 'neo-dark' ? <FiSun /> : <FiMoon />}
      </motion.button>
    </div>
  );
};

export default FloatingActions;
