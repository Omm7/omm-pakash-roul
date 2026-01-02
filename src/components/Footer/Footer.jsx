import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const [typedText, setTypedText] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const fullText = '> Thank you for visiting! Built with ❤️ and React';

  // Typing animation
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
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

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/Omm7', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/omm-prakash-roul', label: 'LinkedIn' },
    { icon: <FiTwitter />, href: 'https://lnkd.in/gYePAYaQ', label: 'DEV Community' },
    { icon: <FiMail />, href: 'mailto:roulommprakash5@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Terminal Section */}
        <div className="footer-terminal">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-btn red"></span>
              <span className="terminal-btn yellow"></span>
              <span className="terminal-btn green"></span>
            </div>
            <span className="terminal-title">portfolio.sh</span>
          </div>
          <div className="terminal-body">
            <p className="terminal-text">
              {typedText}
              <span className="cursor-blink">|</span>
            </p>
          </div>
        </div>

        {/* Footer Content */}
        <div className="footer-content">
          {/* About Column */}
          <div className="footer-column">
            <h3 className="footer-heading">
              <span className="logo-bracket">{'<'}</span>
              Portfolio
              <span className="logo-bracket">{'/>'}</span>
            </h3>
            <p className="footer-about">
              Full-Stack Developer passionate about creating exceptional digital experiences.
              Let's build something amazing together!
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Connect</h4>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="footer-cta">
              Open to opportunities and collaborations
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Omm Prakash Roul. All rights reserved.
          </p>
          <p className="footer-made">
            Designed & Built with <span className="heart">♥</span> using React + Framer Motion
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          className="scroll-top-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
