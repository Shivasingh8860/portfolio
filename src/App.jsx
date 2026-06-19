import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import SmoothScroll from './components/SmoothScroll';
import WebBackground from './components/WebBackground';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Symbiote Easter Egg Hook
  useEffect(() => {
    let keys = [];
    const secretCode = ['v', 'e', 'n', 'o', 'm'];

    const handleKeyDown = (e) => {
      keys.push(e.key.toLowerCase());
      if (keys.length > secretCode.length) {
        keys.shift();
      }

      if (keys.join('') === secretCode.join('')) {
        const root = document.documentElement;
        const isSymbiote = root.getAttribute('data-symbiote') === 'true';
        root.setAttribute('data-symbiote', !isSymbiote);
        // Reset keys so it doesn't trigger repeatedly
        keys = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="main-app">
            <WebBackground />
            <CustomCursor />
            <SmoothScroll />
            <ScrollProgress />
            <Navbar />
            <main>
              <Hero />
              <Projects />
              <Skills />
              <Contact />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
