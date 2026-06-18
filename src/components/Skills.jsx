import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiLayout, FiTerminal } from 'react-icons/fi';
import { FaSpider } from 'react-icons/fa';
import Sticker from './Sticker';
import './Skills.css';

const skillCategories = [
  {
    title: 'Languages',
    icon: <FiTerminal className="skill-icon" />,
    skills: [
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'HTML & CSS', level: 95 },
      { name: 'SQL', level: 85 }
    ]
  },
  {
    title: 'Frameworks',
    icon: <FiLayout className="skill-icon" />,
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'Node.js / Express', level: 85 },
      { name: 'Django', level: 85 }
    ]
  },
  {
    title: 'Systems & Arch',
    icon: <FiLayout className="skill-icon" />,
    skills: [
      { name: 'DS & Algorithms', level: 90 },
      { name: 'REST/GraphQL APIs', level: 85 },
      { name: 'System Design', level: 80 }
    ]
  },
  {
    title: 'Infra & DB',
    icon: <FiDatabase className="skill-icon" />,
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Docker', level: 75 },
      { name: 'CI/CD', level: 80 }
    ]
  },
  {
    title: 'AI / ML',
    icon: <FiCode className="skill-icon" />,
    skills: [
      { name: 'OpenAI', level: 85 },
      { name: 'Pandas & NumPy', level: 90 },
      { name: 'Scikit-Learn', level: 80 },
      { name: 'Matplotlib & Seaborn', level: 85 }
    ]
  },
  {
    title: 'Tools & Platforms',
    icon: <FiTerminal className="skill-icon" />,
    skills: [
      { name: 'Git & GitHub', level: 95 },
      { name: 'Docker', level: 80 },
      { name: 'VSCode', level: 95 },
      { name: 'Jupyter', level: 85 }
    ]
  },
  {
    title: 'Soft Skills',
    icon: <FiCode className="skill-icon" />,
    skills: [
      { name: 'Problem-Solving', level: 95 },
      { name: 'Team Collaboration', level: 90 },
      { name: 'Communication', level: 90 },
      { name: 'Adaptability', level: 95 }
    ]
  }
];


const Skills = () => {
  return (
    <section id="skills" className="container skills-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        Core Tech <br/> Stack & Skills
      </motion.h2>
      
      <div className="skills-tree-container" style={{ position: 'relative' }}>
        <Sticker top="-30px" right="-30px" rotate={15} isCircle={true} color="#e23636">
          <FaSpider />
        </Sticker>
        <div className="tree-root">
          <motion.div 
            className="tree-root-label"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <FiTerminal className="root-icon" />
            <span>shiva_dev_environment/</span>
          </motion.div>
          
          <div className="tree-branches">
            {skillCategories.map((category, idx) => (
              <motion.div 
                className="tree-branch"
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="branch-header">
                  <div className="branch-connector"></div>
                  <div className="branch-icon-wrapper">
                    {category.icon}
                  </div>
                  <h3 className="branch-title">{category.title}/</h3>
                </div>
                
                <div className="branch-leaves">
                  <div className="branch-vertical-line"></div>
                  {category.skills.map((skill, sIdx) => (
                    <motion.div 
                      className="leaf-node" 
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (idx * 0.15) + (sIdx * 0.05) + 0.2 }}
                    >
                      <div className="leaf-connector"></div>
                      <div className="skill-badge">
                        <span className="skill-badge-name">{skill.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
