import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiReact, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiMysql,
  SiGit, SiGithub, SiApache, SiFigma, SiEclipseide
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { FaCode } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import './Skills.css';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <SiReact />,
      color: '#61dafb',
      skills: [
        { name: 'React.js', icon: <SiReact />, level: 90 },
        { name: 'JavaScript', icon: <SiJavascript />, level: 88 },
        { name: 'HTML5', icon: <SiHtml5 />, level: 95 },
        { name: 'CSS3', icon: <SiCss3 />, level: 92 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 85 },
        { name: 'Bootstrap', icon: <SiBootstrap />, level: 80 },
      ]
    },
    {
      title: 'Backend & Languages',
      icon: <DiJava />,
      color: '#f89820',
      skills: [
        { name: 'Java', icon: <DiJava />, level: 90 },
        { name: 'Node.js', icon: <SiNodedotjs />, level: 85 },
        { name: 'Express.js', icon: <SiExpress />, level: 82 },
        { name: 'MySQL', icon: <SiMysql />, level: 88 },
        { name: 'C', icon: <FaCode />, level: 75 },
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: <SiGit />,
      color: '#f05032',
      skills: [
        { name: 'Git', icon: <SiGit />, level: 90 },
        { name: 'GitHub', icon: <SiGithub />, level: 88 },
        { name: 'VS Code', icon: <VscCode />, level: 95 },
        { name: 'Apache Tomcat', icon: <SiApache />, level: 80 },
        { name: 'Eclipse', icon: <SiEclipseide />, level: 75 },
      ]
    },
    {
      title: 'Design & UI/UX',
      icon: <SiFigma />,
      color: '#f24e1e',
      skills: [
        { name: 'Figma', icon: <SiFigma />, level: 78 },
        { name: 'Responsive Design', icon: <SiCss3 />, level: 90 },
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-container">
        {/* Section Header */}
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">My Expertise</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-description">
            A comprehensive toolkit for building modern web applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="skill-category"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="category-header">
                <div className="category-icon" style={{ color: category.color }}>
                  {category.icon}
                </div>
                <h3 className="category-title">{category.title}</h3>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skillIndex}
                    skill={skill}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          className="skills-summary"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="summary-card">
            <div className="summary-icon">💻</div>
            <div className="summary-content">
              <h4>Full-Stack Proficiency</h4>
              <p>End-to-end development from concept to deployment</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">🚀</div>
            <div className="summary-content">
              <h4>Performance Focused</h4>
              <p>Optimized code for fast, responsive applications</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">📱</div>
            <div className="summary-content">
              <h4>Responsive Design</h4>
              <p>Beautiful interfaces across all devices</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">🔧</div>
            <div className="summary-content">
              <h4>Modern Tools</h4>
              <p>Latest technologies and best practices</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Individual skill item with progress bar
const SkillItem = ({ skill, delay, isInView }) => {
  return (
    <motion.div
      className="skill-item"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className="skill-header">
        <div className="skill-info">
          <span className="skill-icon">{skill.icon}</span>
          <span className="skill-name">{skill.name}</span>
        </div>
        <span className="skill-percentage">{skill.level}%</span>
      </div>
      <div className="skill-progress">
        <motion.div
          className="skill-progress-bar"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

export default Skills;
