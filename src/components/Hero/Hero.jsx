import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import InteractiveTerminal from '../Utilities/InteractiveTerminal';
import './Hero.css';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef(null);
  
  const roles = [
    'Full Stack Developer',
    'Creative Problem Solver',
    'UI/UX Enthusiast',
    'Tech Innovator'
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Typing effect with glitch
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  const handleScroll = () => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      ref={heroRef}
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background Particles */}
      <div className="particles-container">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className="container hero-content">
        <motion.div
          className="hero-text-container"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Small greeting */}
          <motion.div
            className="hero-greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="wave">👋</span> Hey there, I'm
          </motion.div>

          {/* Name with glitch effect */}
          <motion.h1
            className="hero-name glitch"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            data-text="Omm Prakash Roul"
          >
            <span className="gradient-text">Omm Prakash Roul</span>
          </motion.h1>

          {/* Dynamic role with typing effect */}
          <motion.div
            className="hero-role"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <span className="role-label">{'< '}</span>
            <span className="role-text glitch-subtle" data-text={displayText}>
              {displayText}
            </span>
            <span className="cursor-blink">|</span>
            <span className="role-label">{' />'}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Final-year Computer Science student with expertise in full-stack development, Java backend systems, and modern web frameworks.
            <br />
            Passionate about building database-driven applications, API-integrated platforms, and AI-powered solutions.
          </motion.p>

          {/* CTA Buttons with magnetic effect */}
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.button
              className="btn btn-primary btn-magnetic"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>View My Work</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.button>

            <motion.button
              className="btn btn-outline btn-magnetic"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Get In Touch</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 8L10 13L17 8M3 4H17C17.5523 4 18 4.44772 18 5V15C18 15.5523 17.5523 16 17 16H3C2.44772 16 2 15.5523 2 15V5C2 4.44772 2.44772 4 3 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {[
              { icon: 'github', url: 'https://github.com/Omm7', label: 'GitHub', iconClass: 'fab' },
              { icon: 'linkedin', url: 'https://www.linkedin.com/in/omm-prakash-roul', label: 'LinkedIn', iconClass: 'fab' },
              { icon: 'dev', url: 'https://lnkd.in/gYePAYaQ', label: 'DEV Community', iconClass: 'fab' },
              { icon: 'envelope', url: 'mailto:roulommprakash5@gmail.com', label: 'Email', iconClass: 'fas' }
            ].map((social, index) => (
              <motion.a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                aria-label={social.label}
              >
                <i className={`${social.iconClass} fa-${social.icon}`}></i>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Interactive Terminal */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            rotateX: useTransform(rotateX, v => v * 0.3),
            rotateY: useTransform(rotateY, v => v * 0.3),
            transformStyle: 'preserve-3d'
          }}
        >
          <InteractiveTerminal />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.6 },
          y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        onClick={handleScroll}
      >
        <div className="scroll-line" />
        <div className="scroll-text">Scroll Down</div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
