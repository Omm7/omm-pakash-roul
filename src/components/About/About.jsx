import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiAward, FiUsers, FiTrendingUp, FiMapPin, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Stats data
  const stats = [
    { icon: <FiCode />, value: 8, suffix: '+', label: 'Projects Completed' },
    { icon: <FiAward />, value: 3, suffix: '+', label: 'Years Learning' },
    { icon: <FiUsers />, value: 7, suffix: '', label: 'Tech Skills' },

  ];

  // Timeline data
  const timeline = [
    {
      year: '2023-26',
      title: 'B.Tech Computer Science Engineering',
      description: 'GITA Autonomous College, Bhubaneswar',
      icon: <FiAward />,
      color: 'var(--accent-primary)'
    },
    {
      year: '2025',
      title: 'Web Developer Intern',
      description: 'Wayspire Ed-Tech Pvt. Ltd. - Developed responsive portfolio websites with HTML, CSS, JavaScript',
      icon: <FiCode />,
      color: 'var(--accent-secondary)'
    },
    {
      year: '2020-23',
      title: 'Diploma in Computer Science',
      description: 'Einstein School of Engineering, Bhubaneswar',
      icon: <FiTrendingUp />,
      color: 'var(--accent-tertiary)'
    },
    {
      year: '2020',
      title: 'Matriculation (10th)',
      description: 'Saraswati Shishu Vidya Mandir, Cuttack',
      icon: <FiUsers />,
      color: 'var(--accent-primary)'
    },
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        {/* Section Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get To Know Me</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-description">
            Passionate developer crafting exceptional digital experiences
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="about-grid">
          {/* Profile Card */}
          <motion.div
            className="about-profile-card"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="profile-image-wrapper">
              <div className="profile-image-border"></div>
              <img
                src="/assets/omm prakash roul.jpg"
                alt="Omm Prakash Roul"
                className="profile-image"
              />
              <div className="profile-status">
                <span className="status-dot"></span>
                <span className="status-text">Available for work</span>
              </div>
            </div>

            <div className="profile-info">
              <h3 className="profile-name">Omm Prakash Roul</h3>
              <p className="profile-title">Full-Stack Developer</p>

              <div className="profile-details">
                <div className="profile-detail">
                  <span className="profile-icon" style={{ display: 'inline-flex', alignItems: 'center', color: '#58a6ff' }}>
                    <FiMapPin style={{ width: '20px', height: '20px', display: 'block' }} />
                  </span>
                  <span>Odisha, India</span>
                </div>
                <div className="profile-detail">
                  <span className="profile-icon" style={{ display: 'inline-flex', alignItems: 'center', color: '#58a6ff' }}>
                    <FiMail style={{ width: '20px', height: '20px', display: 'block' }} />
                  </span>
                  <span>roulommprakash5@gmail.com</span>
                </div>
              </div>

              <div className="profile-social">
                <a href="https://github.com/Omm7" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                  <span className="social-icon-wrapper" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiGithub style={{ width: '24px', height: '24px', display: 'block' }} />
                  </span>
                </a>
                <a href="https://www.linkedin.com/in/omm-prakash-roul" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                  <span className="social-icon-wrapper" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiLinkedin style={{ width: '24px', height: '24px', display: 'block' }} />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="about-bio"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="bio-title">Hello! I'm a Developer</h3>
            <div className="bio-content">
              <p>
                I'm a final-year <strong>Computer Science Engineering student</strong> at GITA Autonomous College, Bhubaneswar,
                with strong hands-on experience in full-stack web development. I specialize in building database-driven applications,
                API-integrated platforms, and AI-powered web solutions.
              </p>
              <p>
                My technical expertise spans across <strong>Java backend systems, React.js frontends</strong>, and modern web frameworks.
                I'm comfortable working across the complete development lifecycle — from UI design to backend logic and deployment.
                I love working with <strong>React, Java, Node.js, MySQL</strong>, and integrating AI capabilities.
              </p>
              <p>
                When I'm not coding, you'll find me travelling, reading books, or gaming. I believe in <strong>continuous learning</strong>
                and applying my skills to build scalable and impactful software solutions. My goal is to work in challenging environments
                where I can grow and contribute meaningfully.
              </p>
            </div>

            <div className="bio-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">💡</span>
                <span>Problem Solver</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🚀</span>
                <span>Fast Learner</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🎯</span>
                <span>Detail Oriented</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🤝</span>
                <span>Team Player</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} delay={index * 0.1} isInView={isInView} />
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="about-timeline-section"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="timeline-title">My Journey</h3>
          <div className="timeline">
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Animated stat card component
const StatCard = ({ stat, delay, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.05 }}
    >
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-value">
        {count}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </motion.div>
  );
};

// Timeline item component
const TimelineItem = ({ item, index, isInView }) => {
  return (
    <motion.div
      className="timeline-item"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="timeline-dot" style={{ background: item.color }}>
        {item.icon}
      </div>
      <div className="timeline-content">
        <span className="timeline-year">{item.year}</span>
        <h4 className="timeline-item-title">{item.title}</h4>
        <p className="timeline-description">{item.description}</p>
      </div>
    </motion.div>
  );
};

export default About;
