import React from 'react';
import { motion } from 'framer-motion';import { FiBriefcase, FiAward } from 'react-icons/fi';
import Sticker from './Sticker';
import './Experience.css';

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Tech Innovations Inc.',
    date: '2023 - Present',
    description: 'Lead developer for the core microservices architecture. Improved system performance by 40% and mentored junior developers.',
    icon: <FiBriefcase />
  },
  {
    title: 'Full Stack Developer',
    company: 'Web Solutions LLC',
    date: '2021 - 2023',
    description: 'Developed and maintained responsive web applications using React and Node.js. Integrated third-party APIs and payment gateways.',
    icon: <FiBriefcase />
  },
  {
    title: 'Computer Science Graduate',
    company: 'University of Technology',
    date: '2017 - 2021',
    description: 'B.S. in Computer Science with a focus on algorithms and distributed systems. Graduated with Honors.',
    icon: <FiAward />
  }
];

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container" style={{ position: 'relative' }}>
        <Sticker top="-20px" left="10%" rotate={-10} text="POW!" color="#e23636" />
        
        <div className="experience-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            My <br/> Journey
          </motion.h2>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {experiences.map((exp, index) => (
            <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
              <motion.div 
                className="timeline-content"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="timeline-icon">
                  {exp.icon}
                </div>
                <h3 className="timeline-title">{exp.title}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <span className="timeline-date">{exp.date}</span>
                <p className="timeline-description">{exp.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
