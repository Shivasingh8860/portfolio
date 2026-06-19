import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import Sticker from './Sticker';
import ProjectModal from './ProjectModal';
import './Projects.css';

const projects = [
  {
    title: 'Real Time Bus Tracker',
    description: 'A real-time transit telemetry platform implementing WebSockets and Maps APIs for low-latency bus tracking, route optimization, and live ETAs.',
    tags: ['React', 'Node.js', 'WebSockets', 'Maps API'],
    github: 'https://github.com/Shivasingh8860/bus.tracker',
    demo: '#',
    status: 'Telemetry Live'
  },
  {
    title: 'Event Management System',
    description: 'An event orchestrator built with Flask 3.0 and SQLite (PostgreSQL ready). Features automated check-ins via dynamic QR code generation, secure Flask-Login authentication, and a responsive Bootstrap 5.3 frontend.',
    tags: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
    github: 'https://github.com/Shivasingh8860/Event-management',
    demo: '#',
    status: 'Operational'
  },
  {
    title: 'AI HR Platform',
    description: 'An intelligent recruitment platform featuring resume parsing with OpenAI (with deterministic fallback) and weighted candidate matching. Includes secure JWT auth with role-based access, document uploads, and a modern React/Vite dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
    github: 'https://github.com/Shivasingh8860/AI-HR',
    demo: '#',
    status: 'Model v1.0'
  }
];

const categories = ['All', 'React', 'Python', 'Node.js', 'WebSockets'];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(p => 
    filter === 'All' ? true : p.tags.includes(filter)
  );

  return (
    <section id="projects" className="projects-section">
      <div className="container" style={{ position: 'relative' }}>
        <Sticker top="0" right="10%" rotate={-15} text="BAM!" color="#ffdd00" />
        <div className="projects-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Technical <br/> Showcases
          </motion.h2>
          <div className="filter-bar" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`btn-outline ${filter === cat ? 'active' : ''}`}
                style={filter === cat ? { background: 'var(--accent-red)', color: '#fff', borderColor: 'var(--accent-red)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div 
                layout
                className="project-card" 
                key={project.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
            >
              <div className="project-content">
                <div className="project-header">
                  <span className="project-number">0{index + 1}</span>
                  {project.status && (
                    <div className="status-badge">
                      <span className="status-dot"></span>
                      {project.status}
                    </div>
                  )}
                  <div className="project-links">
                    <a href={project.github} aria-label="GitHub Repository"><FiGithub size={22} /></a>
                    <a href={project.demo} aria-label="Live Demo"><FiExternalLink size={22} /></a>
                  </div>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                
                <button 
                  className="btn-outline read-more-btn" 
                  onClick={() => setSelectedProject(project)}
                  style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                >
                  Read More <FiArrowRight />
                </button>
              </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;
