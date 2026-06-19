import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTerminal, FiImage } from 'react-icons/fi';
import { GiSpiderWeb } from 'react-icons/gi';
import profileImg from '../assets/Confident man in a smart suit.png';
import Sticker from './Sticker';
import './Hero.css';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('terminal');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState([
    'Welcome to Shiva\'s interactive shell v1.0.0',
    'Type "help" to see a list of available commands.',
    ''
  ]);
  
  const terminalContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'terminal' && terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalLines, activeTab]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    const cleanCmd = trimmed.toLowerCase();
    let response = [];

    if (cleanCmd === 'help') {
      response = [
        `shiva@dev:~$ ${trimmed}`,
        'Available commands:',
        '  about       - Brief introduction and philosophy',
        '  skills      - List main technical skills & stacks',
        '  projects    - Summary of production projects',
        '  contact     - Display communication channels',
        '  clear       - Clear the console output',
        ''
      ];
    } else if (cleanCmd === 'about') {
      response = [
        `shiva@dev:~$ ${trimmed}`,
        'Full Stack Software Engineer & Systems Architect.',
        'Specializes in building distributed systems, low-latency applications,',
        'and pixel-perfect, highly responsive developer experiences.',
        ''
      ];
    } else if (cleanCmd === 'skills') {
      response = [
        `shiva@dev:~$ ${trimmed}`,
        'Core Technologies & Proficiencies:',
        '  - Languages:  TypeScript, JavaScript, Python, html, css, SQL,',
        '  - Frameworks: React, Next.js, Node.js, Express, Django',
        '  - Systems:    DS & Algorithms, REST/GraphQL APIs, System Design',
        '  - Infra/DB:   SQL, PostgreSQL, MongoDB, Docker, CI/CD',
        '  - AI/ML:      OpenAI,Pandas,NumPy,Scikit-Learn,Matplotlib & Seaborn',
        '  - Tools & Platforms:Git, GitHub, Docker, VsCode, Jupyter Notebook',
        '  - Soft Skills:Problem-Solving, Team Collaboration, Communication,Adaptability',
        ''
      ];
    } else if (cleanCmd === 'projects') {
      response = [
        `shiva@dev:~$ ${trimmed}`,
        'Key Featured Projects:',
        '  1. Real Time Bus Tracker (React, Node, WebSockets, Maps API)',
        '  2. Event Management System (Python Flask, SQLite, Bootstrap)',
        '  3. AI HR Platform (React, Node, MongoDB, OpenAI matching)',
        'Type "explore" or click "View Systems" to see details.',
        ''
      ];
    } else if (cleanCmd === 'explore') {
      response = [
        `shiva@dev:~$ ${trimmed}`,
        'Redirecting view to projects section...',
        ''
      ];
      window.location.hash = '#projects';
    } else if (cleanCmd === 'contact') {
      response = [
        `shiva@dev:~$ ${trimmed}`,
        'Communication channels:',
        '  Email:      Shiva.s729103@gmail.com',
        '  GitHub:     github.com/Shivasingh8860',
        '  LinkedIn:   linkedin.com/in/shiva-singh-47590b371',
        ''
      ];
    } else if (cleanCmd === 'clear') {
      setTerminalLines([]);
      setTerminalInput('');
      return;
    } else if (cleanCmd === '') {
      response = [`shiva@dev:~$ `];
    } else {
      response = [
        `shiva@dev:~$ ${trimmed}`,
        `Command not found: "${trimmed}". Type "help" for instructions.`,
        ''
      ];
    }

    setTerminalLines((prev) => [...prev, ...response]);
    setTerminalInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(terminalInput);
  };

  return (
    <section 
      id="home" 
      className="hero-section"
    >
      <div className="bg-glow hero-glow"></div>
      
      <div className="hero-split-container">
        
        {/* Comic Stickers */}
        <Sticker top="12%" left="92%" rotate={15} color="#004de6">
          <GiSpiderWeb />
        </Sticker>
        <Sticker bottom="25%" right="40%" rotate={-10} text="THWIP!" color="#e23636" />

        <div className="hero-content-side">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-subtitle"
          >
            <span className="badge">Full Stack Engineer & Systems Architect</span>
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Hi, I'm <span className="spidey-name">Shiva</span>. I build <br/>
            scalable, high-performance web systems.
          </motion.h1>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Specializing in building robust full-stack applications, distributed
            systems, and modern web architectures. Focused on writing clean,
            maintainable code, optimizing performance, and designing intuitive
            user interfaces.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <a href="#projects" className="btn-primary">
              View Systems & Projects
            </a>
            <a href="#contact" className="btn-outline">
              Contact Engineer
            </a>
          </motion.div>

          <motion.div 
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a href="https://github.com/Shivasingh8860" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub size={22} /></a>
            <a href="https://www.linkedin.com/in/shiva-singh-47590b371?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin size={22} /></a>
            <a href="#contact" aria-label="Email"><FiMail size={22} /></a>
          </motion.div>
        </div>

        <motion.div 
          className="hero-image-side"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <div className="image-aura-bg"></div>
          
          {/* Dev Workspace Window Mockup */}
          <div className="dev-workspace-window">
            <div className="window-header">
              <div className="window-controls">
                <span className="control-btn red"></span>
                <span className="control-btn yellow"></span>
                <span className="control-btn green"></span>
              </div>
              <div className="window-tabs">
                <button 
                  className={`window-tab ${activeTab === 'terminal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('terminal')}
                >
                  <FiTerminal className="window-tab-icon" />
                  <span>terminal.sh</span>
                </button>
                <button 
                  className={`window-tab ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FiImage className="window-tab-icon" />
                  <span>profile.png</span>
                </button>
              </div>
            </div>

            <div className="window-body">
              <AnimatePresence mode="wait">
                {activeTab === 'terminal' ? (
                  <motion.div 
                    ref={terminalContainerRef}
                    key="terminal"
                    className="terminal-content"
                    onClick={focusInput}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {terminalLines.map((line, idx) => (
                      <div key={idx} className="terminal-line">
                        {line}
                      </div>
                    ))}
                    <form onSubmit={handleSubmit} className="terminal-input-row">
                      <span className="terminal-prompt">shiva@dev:~$</span>
                      <input 
                        ref={inputRef}
                        type="text" 
                        className="terminal-input"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        autoFocus
                      />
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="profile"
                    className="profile-tab-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={profileImg} alt="Shiva Portrait" className="profile-tab-image" />
                    <div className="profile-tech-overlay">
                      <span className="profile-name">Shiva</span>
                      <span className="profile-title">Full Stack & Systems Architect</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
