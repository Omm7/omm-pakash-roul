import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import './Experience.css';

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const experiences = [
    {
      id: 1,
      title: 'Web Developer Intern',
      company: 'Wayspire Ed-Tech Pvt. Ltd.',
      location: 'Remote',
      period: 'May 2025 - July 2025',
      type: 'Internship',
      description: 'Developed and deployed responsive portfolio websites. Worked with modern frontend technologies and learned Git collaboration and frontend best practices.',
      achievements: [
        'Developed responsive portfolio website from scratch',
        'Implemented modern UI/UX design principles',
        'Gained hands-on experience with Git version control',
        'Collaborated with team using agile methodologies'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Git', 'Responsive Design']
    },
    {
      id: 2,
      title: 'B.Tech in Computer Science Engineering',
      company: 'GITA Autonomous College, Bhubaneswar',
      location: 'Bhubaneswar, Odisha',
      period: '2023 - 2026',
      type: 'Education',
      description: 'Pursuing Bachelor of Technology with focus on full-stack development, data structures, and modern web technologies. Active in building practical projects.',
      achievements: [

        'Built 8+ full-stack projects including AI-integrated applications',
        'Gained expertise in Java, React, Node.js, and MySQL',
        'Developed projects using OpenAI, Gemini, TMDB, and YouTube APIs'
      ],
      technologies: ['Java', 'React', 'Node.js', 'MySQL', 'AI APIs', 'DSA']
    },
    {
      id: 3,
      title: 'Diploma in Computer Science Engineering',
      company: 'Einstein School of Engineering',
      location: 'Bhubaneswar, Odisha',
      period: '2020 - 2023',
      type: 'Education',
      description: 'Completed diploma with strong foundation in programming, databases, and web development. Developed strong passion for software development.',
      achievements: [

        'Built foundational knowledge in C, Java, and databases',
        'Learned core computer science concepts and algorithms',
        'Started journey in web development and GUI applications'
      ],
      technologies: ['C', 'Java', 'MySQL', 'HTML', 'CSS', 'Basic JavaScript']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="experience-header"
        >
          <span className="section-label">Career Path</span>
          <h2 className="section-title">My Journey & Work Experience</h2>
          <p className="section-description">
            My professional journey and key accomplishments
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="timeline"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="timeline-item"
            >
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
                {index !== experiences.length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </div>

              <div className="experience-card">
                <div className="experience-header-info">
                  <div className="experience-title-group">
                    <h3 className="experience-title">{exp.title}</h3>
                    <span className="experience-type">{exp.type}</span>
                  </div>
                  <div className="experience-company">
                    <FiBriefcase className="icon" />
                    {exp.company}
                  </div>
                </div>

                <div className="experience-meta">
                  <div className="meta-item">
                    <FiCalendar className="icon" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="meta-item">
                    <FiMapPin className="icon" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="experience-description">{exp.description}</p>

                <div className="experience-achievements">
                  <h4 className="achievements-title">Key Achievements:</h4>
                  <ul className="achievements-list">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="experience-technologies">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
