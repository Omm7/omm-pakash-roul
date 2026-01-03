import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX, FiPlay, FiCode } from 'react-icons/fi';
import './Projects.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardRotations, setCardRotations] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Detect if device is mobile/tablet
  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024 || 
                    ('ontouchstart' in window) || 
                    (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e, cardId) => {
    // Disable 3D tilt on mobile devices
    if (isMobile) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation angles (max ±15 degrees)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setCardRotations(prev => ({
      ...prev,
      [cardId]: { rotateX, rotateY }
    }));
  };

  const handleMouseEnter = (cardId) => {
    if (!isMobile) {
      setHoveredCard(cardId);
    }
  };

  const handleMouseLeave = (cardId) => {
    if (!isMobile) {
      setHoveredCard(null);
      setCardRotations(prev => ({
        ...prev,
        [cardId]: { rotateX: 0, rotateY: 0 }
      }));
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Doctor-Patient Portal',
      category: 'fullstack',
      description: 'Full-stack web application to manage doctor and patient interactions',
      longDescription: 'Built a full-stack web application to manage doctor and patient interactions. Implemented patient registration, appointment booking, and role-based access. Integrated AI assistance using OpenAI API for user guidance. Designed dynamic JSP pages with responsive UI and database connectivity. Currently for some technical issues, live link is not working.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      tags: ['Java', 'JSP', 'JSTL', 'MySQL', 'OpenAI API', 'Bootstrap'],
      github: '',
      live: '',
      featured: true,
      size: 'large'
    },
    {
      id: 2,
      title: 'AI-Based Learning Platform',
      category: 'fullstack',
      description: 'AI-powered learning platform for interactive educational support',
      longDescription: 'Developed an AI-powered learning platform for interactive educational support. Implemented AI-generated explanations using Gemini API. Designed REST APIs for user and content management. Focused on scalability and real-time responses.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      tags: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Gemini API'],
      github: 'https://github.com/Omm7/Smart_Gita',
      live: 'https://smart-gita.vercel.app/',
      featured: true,
      size: 'large'
    },
    {
      id: 3,
      title: 'TrailerWave',
      category: 'frontend',
      description: 'Netflix-style movie browsing platform with trailer playback',
      longDescription: 'Built a Netflix-style movie browsing platform. Implemented trending, popular, and top-rated movie sections. Stored user search data in Appwrite to generate dynamic trending content. Integrated YouTube API for trailer playback.',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
      tags: ['React.js', 'Tailwind CSS', 'TMDB API', 'YouTube API', 'Appwrite'],
      github: 'https://github.com/Omm7/TrailerWave.git',
      live: 'https://trailer-wave.vercel.app/',
      featured: true,
      size: 'medium'
    },
    {
      id: 4,
      title: 'ATM Simulation System',
      category: 'fullstack',
      description: 'Desktop-based ATM simulation system with GUI',
      longDescription: 'Developed a desktop-based ATM simulation system. Implemented account creation, authentication, balance inquiry, deposits, withdrawals, and transaction history. Used MySQL for secure data storage and Java Swing for GUI. Currently for some technical issues, live link is not working.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      tags: ['Java', 'Swing/AWT', 'MySQL', 'JDBC'],
      github: '',
      live: '',
      featured: false,
      size: 'medium'
    },
    {
      id: 5,
      title: 'Music Player Application',
      category: 'frontend',
      description: 'Responsive music player with playlist management',
      longDescription: 'Built a responsive music player with playlist management and audio controls. Used Web Audio API for smooth playback and volume control. Stored user preferences and last played track using Local Storage. Designed a clean and interactive user interface. Currently for some technical issues, live link is not working.',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
      tags: ['React.js', 'JavaScript', 'Web Audio API', 'Local Storage'],
      github: 'https://github.com/Omm7/spotify_clone',
      live: '',
      featured: false,
      size: 'small'
    },
    {
      id: 6,
      title: 'Aesthetic Cafe Website',
      category: 'fullstack',
      description: 'Modern cafe website with animated UI and shopping cart',
      longDescription: 'Developed a modern cafe website with animated UI and responsive design. Implemented interactive menu and shopping cart functionality. Built backend services for managing menu and orders.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      tags: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
      github: 'https://github.com/Omm7/ekaiva-bakehouse',
      live: 'https://cafe-bakehouse.vercel.app/',
      featured: false,
      size: 'small'
    },
  ];

  const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Full-Stack', value: 'fullstack' },
    { label: 'Frontend', value: 'frontend' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <>
      <section id="projects" className="projects-section" ref={sectionRef}>
        <div className="projects-container">
          {/* Section Header */}
          <motion.div
            className="projects-header"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">My Work</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-description">
              A showcase of my recent work and side projects
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="projects-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filters.map((filterItem) => (
              <button
                key={filterItem.value}
                className={`filter-btn ${filter === filterItem.value ? 'active' : ''}`}
                onClick={() => setFilter(filterItem.value)}
              >
                {filterItem.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Bento Grid */}
          <motion.div
            className="projects-grid"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => {
                const rotation = cardRotations[project.id] || { rotateX: 0, rotateY: 0 };
                const isHovered = hoveredCard === project.id;
                
                return (
                  <motion.div
                    key={project.id}
                    className={`project-card project-${project.size}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: isHovered && !isMobile ? 1.02 : 1,
                      rotateX: isMobile ? 0 : rotation.rotateX,
                      rotateY: isMobile ? 0 : rotation.rotateY,
                      y: isHovered && !isMobile ? -12 : 0,
                      z: isHovered && !isMobile ? 50 : 0
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      opacity: { duration: 0.4, delay: index * 0.1 },
                      scale: { 
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      },
                      rotateX: { 
                        type: 'spring', 
                        stiffness: 200, 
                        damping: 30,
                        mass: 0.5
                      },
                      rotateY: { 
                        type: 'spring', 
                        stiffness: 200, 
                        damping: 30,
                        mass: 0.5
                      },
                      y: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      },
                      z: { 
                        type: 'spring', 
                        stiffness: 300, 
                        damping: 25 
                      }
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1200px'
                    }}
                    onMouseMove={(e) => handleMouseMove(e, project.id)}
                    onMouseEnter={() => handleMouseEnter(project.id)}
                    onMouseLeave={() => handleMouseLeave(project.id)}
                    onClick={() => setSelectedProject(project)}
                  >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <button className="view-details-btn">
                        <FiPlay /> View Details
                      </button>
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-tags">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-links">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiGithub /> Code
                        </a>
                      ) : (
                        <span
                          className="project-link disabled"
                          title="Currently for some technical issues, link is not working"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiCode /> Code
                        </span>
                      )}
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiExternalLink /> Live
                        </a>
                      ) : (
                        <span
                          className="project-link disabled"
                          title="Currently for some technical issues, link is not working"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiExternalLink /> Live
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
  return (
    <>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="project-modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%'
        }}
      >
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>
        
        <div className="modal-image">
          <img src={project.image} alt={project.title} />
        </div>

        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{project.title}</h2>
            <div className="modal-tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="modal-tag">{tag}</span>
              ))}
            </div>
          </div>

          <p className="modal-description">{project.longDescription}</p>

          <div className="modal-actions">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn modal-btn-secondary"
              >
                <FiGithub /> View Code
              </a>
            ) : (
              <button
                className="modal-btn modal-btn-secondary disabled"
                title="Currently for some technical issues, link is not working"
                disabled
              >
                <FiCode /> View Code
              </button>
            )}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn modal-btn-primary"
              >
                <FiExternalLink /> Live Demo
              </a>
            ) : (
              <button
                className="modal-btn modal-btn-primary disabled"
                title="Currently for some technical issues, link is not working"
                disabled
              >
                <FiExternalLink /> Live Demo
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Projects;
