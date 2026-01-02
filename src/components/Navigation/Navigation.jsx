import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiCommand, FiSun, FiMoon, FiZap } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useCommandPalette } from '../../contexts/CommandPaletteContext';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, cycleTheme, themeConfig } = useTheme();
  const { open: openCommandPalette } = useCommandPalette();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Navigation height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'neo-dark':
        return <FiMoon />;
      case 'minimal-light':
        return <FiSun />;
      case 'aurora':
        return <FiZap />;
      default:
        return <FiMoon />;
    }
  };

  return (
    <>
      <motion.nav
        className={`navigation ${isScrolled ? 'navigation-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="navigation-container">
          {/* Logo */}
          <motion.a
            href="#home"
            className="navigation-logo"
            onClick={(e) => handleNavClick(e, '#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="logo-text">
              <span className="logo-bracket">{'<'}</span>
              Portfolio
              <span className="logo-bracket">{'/>'}</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="navigation-links desktop-only">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="navigation-actions">
            {/* Theme Toggle */}
            <motion.button
              className="nav-action-btn"
              onClick={cycleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              title={`Theme: ${themeConfig?.name || 'Neo Dark'}`}
            >
              {getThemeIcon()}
            </motion.button>

            {/* Command Palette */}
            <motion.button
              className="nav-action-btn desktop-only"
              onClick={openCommandPalette}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Command Palette (⌘K)"
            >
              <FiCommand />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="nav-action-btn mobile-only"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="navigation-progress"
          style={{
            scaleX: isScrolled ? 1 : 0,
            transformOrigin: 'left'
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">Menu</span>
                <button
                  className="mobile-menu-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX />
                </button>
              </div>

              <div className="mobile-menu-content">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="mobile-nav-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="mobile-nav-label">{item.label}</span>
                  </motion.a>
                ))}
              </div>

              <div className="mobile-menu-footer">
                <button
                  className="mobile-menu-action"
                  onClick={() => {
                    openCommandPalette();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <FiCommand />
                  <span>Command Palette</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
