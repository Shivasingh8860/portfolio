import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { FiCode, FiDatabase, FiLayout, FiTerminal, FiShield } from 'react-icons/fi';
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
    icon: <FiShield className="skill-icon" />,
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
      { name: 'Scikit-Learn', level: 80 }
    ]
  },
  {
    title: 'Soft Skills',
    icon: <FiCode className="skill-icon" />,
    skills: [
      { name: 'Problem-Solving', level: 95 },
      { name: 'Team Collaboration', level: 90 },
      { name: 'Adaptability', level: 95 }
    ]
  }
];

// Interactive 3D Card Component
const SkillCard = ({ category, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate rotation (-10 to 10 degrees based on mouse position)
    const x = (clientX - left - width / 2) / 15;
    const y = (clientY - top - height / 2) / 15;
    
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const transform = useMotionTemplate`perspective(1000px) rotateX(${-mouseY.get()}deg) rotateY(${mouseX.get()}deg)`;

  return (
    <motion.div
      className="skill-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className="skill-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="skill-card-header">
          <div className="skill-icon-wrapper">
            {category.icon}
          </div>
          <h3 className="skill-card-title">{category.title}</h3>
        </div>

        <div className="skill-card-body">
          {category.skills.map((skill, sIdx) => (
            <div className="skill-item" key={sIdx}>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
              </div>
              <div className="skill-progress-bg">
                <motion.div 
                  className="skill-progress-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: 0.2 + (sIdx * 0.1), ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="web-shooter-head"></div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="container skills-section">
      <div style={{ position: 'relative' }}>
        <Sticker top="-40px" right="0" rotate={15} isCircle={true} color="#e23636">
          <FaSpider />
        </Sticker>
        
        <motion.div 
          className="skills-header"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Core Tech <br/> Stack & Skills</h2>
          <p className="skills-subtitle">Hover over the cards to interact with the web interface.</p>
        </motion.div>
      </div>
      
      <div className="skills-grid">
        {skillCategories.map((category, idx) => (
          <SkillCard key={idx} category={category} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
