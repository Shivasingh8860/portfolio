import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiTool, FiCheckCircle } from 'react-icons/fi';
import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div 
          className="modal-content"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <FiX size={24} />
          </button>
          
          <div className="modal-header">
            {project.status && (
              <span className="modal-badge">{project.status}</span>
            )}
            <h2 className="modal-title">{project.title}</h2>
          </div>
          
          <div className="modal-body">
            <div className="modal-section">
              <h3><FiCheckCircle className="modal-icon" /> The Problem & Solution</h3>
              <p>{project.description}</p>
              <p>This project was built to address specific real-world needs, optimizing workflows and providing an intuitive user experience while maintaining a robust backend architecture.</p>
            </div>
            
            <div className="modal-section">
              <h3><FiTool className="modal-icon" /> Tech Stack</h3>
              <div className="modal-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="modal-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline modal-btn">
              <FiGithub size={18} /> View Source
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary modal-btn">
              <FiExternalLink size={18} /> Live Demo
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
