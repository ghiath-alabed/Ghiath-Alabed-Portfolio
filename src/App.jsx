import React, { useEffect, useState } from 'react';
import swarmImg from './assets/swarm.png';
// NOTE: Make sure to add swarm2.png and swarm3.png to your assets folder!
import swarmImg2 from './assets/swarm2.png';
import swarmImg3 from './assets/swarm3.png';
import swarmImg4 from './assets/swarm4.png';
import swarmImg5 from './assets/swarm5.png';
import stickImg from './assets/stick.png';
import stickImg2 from './assets/stick2.png';
import stickImg3 from './assets/stick3.png';
import stickImg4 from './assets/stick4.png';
import stickImg5 from './assets/stick5.png';
import lazyImg from './assets/lazy.png';
import lazyImg2 from './assets/lazy2.png';
import lazyImg3 from './assets/lazy3.png';

function App() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Theme handling (dark / light)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Carousel Logic for Swarm Project
  const swarmImages = [swarmImg, swarmImg2, swarmImg3, swarmImg4, swarmImg5];
  const [swarmIndex, setSwarmIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSwarmIndex((prev) => (prev + 1) % swarmImages.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Carousel Logic for Stick Torture Project
  const stickImages = [stickImg, stickImg2, stickImg3, stickImg4, stickImg5];
  const [stickIndex, setStickIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStickIndex((prev) => (prev + 1) % stickImages.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Carousel Logic for Lazy Ball Project
  const lazyImages = [lazyImg, lazyImg2, lazyImg3];
  const [lazyIndex, setLazyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLazyIndex((prev) => (prev + 1) % lazyImages.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Ambient Background */}
      <div className="ambient-light"></div>

      {/* Navigation */}
      <nav>
        <a href="#" className="logo">&lt;Ghiath<span>Dev</span>/&gt;</a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Work</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-controls">
          <a href="#contact" className="btn btn-gold" style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}>Let's Talk</a>
          <button
            onClick={toggleTheme}
            className="btn theme-toggle"
            aria-pressed={theme === 'light'}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            style={{ marginLeft: '0.75rem', fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}
          >
            <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'} style={{ marginRight: '8px' }}></i>
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="about">
        <div className="fade-in">
          <div className="hero-subtitle"> &lt; Creative Developer & Software Engineer /&gt; </div>
          <h1>WHERE <br /> LOGIC <span className="highlight-purple">MEETS IMAGINATION</span></h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1.5rem auto' }}>
            Bridging the gap between software engineering and game design. Focused on building high-performance interactive experiences using Unity and modern software architecture.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-gold" style={{ marginLeft: '1rem' }}>Resume</a>
          </div>

          <div className="social-icons">
            <a href="https://github.com/ghiath-alabed" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/ghiath-al-abed-034a4239a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://instagram.com/abidzade_i/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section className="section" id="skills">
        <div className="section-header fade-in">
          <h2>Technical Arsenal</h2>
          <div className="line"></div>
        </div>

        <div className="stack-grid fade-in">
          <div className="stack-item"><i className="fas fa-gamepad" style={{ color: '#8b8b8b' }}></i> Unity</div>
          <div className="stack-item"><i className="fas fa-code" style={{ color: '#9b4f96' }}></i> C#</div>
          <div className="stack-item"><i className="fas fa-palette" style={{ color: '#ff7a59' }}></i> Aseprite</div>
          <div className="stack-item"><i className="fab fa-react highlight-purple"></i> React</div>
          <div className="stack-item"><i className="fab fa-node-js" style={{ color: '#68a063' }}></i> Node.js</div>
          <div className="stack-item"><i className="fab fa-html5" style={{ color: '#e34f26' }}></i> HTML</div>
          <div className="stack-item"><i className="fab fa-css3-alt" style={{ color: '#264de4' }}></i> CSS</div>
          <div className="stack-item"><i className="fab fa-js highlight-gold"></i> JavaScript</div>
          <div className="stack-item"><i className="fab fa-python" style={{ color: '#ffe873' }}></i> Python</div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <div className="section-header fade-in">
          <h2>Selected Works</h2>
          <div className="line"></div>
        </div>

        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card fade-in">
            <div className="card-img p1" aria-hidden="false" style={{ position: 'relative', overflow: 'hidden' }}>
              {swarmImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Swarm Game Screenshot ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: swarmIndex === index ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    zIndex: swarmIndex === index ? 2 : 1
                  }}
                />
              ))}
            </div>
            <div className="card-content">
              <h3>Swarm - Game (Unity)</h3>
              <p>Swarm is a Roguelike game that aims to test the player's patience and skills. As evident from the name of the genre, when the player dies, they lose everything they have collected and accumulated in waves and have to start over. It also includes boss fights. I wish everyone good games.</p>
              <div className="card-tech">
                <span className="tech-tag">C#</span>
                <span className="tech-tag">Unity</span>
              </div>
              <a href="#" className="project-link">View Case Study <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card fade-in">
            <div className="card-img p2" aria-hidden="false" style={{ position: 'relative', overflow: 'hidden' }}>
              {stickImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Stick Torture Game Screenshot ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: stickIndex === index ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    zIndex: stickIndex === index ? 2 : 1
                  }}
                />
              ))}
            </div>
            <div className="card-content">
              <h3>Stick Torture - Game (Unity)</h3>
              <p>Stick Torture is a 2D platformer that challenges quick reflexes and patience. It consists of various maps and stages, featuring a diverse range of boss fights. Most importantly, the trap mechanism serves as the ultimate test of patience for the player. The stages include both "escape-from-trap" levels and side-scroller combat against enemies levels. At the end of each stage, players will encounter the final boss fight. I wish the gaming community wishes us good luck in advance.</p>
              <div className="card-tech">
                <span className="tech-tag">Unity</span>
                <span className="tech-tag">C#</span>
                <span className="tech-tag">Aseprite</span>
              </div>
              <a href="#" className="project-link">Live Demo <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card fade-in">
            <div className="card-img p2" aria-hidden="false" style={{ position: 'relative', overflow: 'hidden' }}>
              {lazyImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Lazy Ball Game Screenshot ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: lazyIndex === index ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    zIndex: lazyIndex === index ? 2 : 1
                  }}
                />
              ))}
            </div>
            <div className="card-content">
              <h3>Lazy Ball - Game (Unity)</h3>
              <p>Lazy Ball is a game that measures the player's reflex speed. It features 3 different modes: endless, normal levels, and puzzle levels. We need to guide our ball to the level finisher by drawing its path. In some game modes, our drawing rights will be limited; like I wish, the gaming community wishes us good luck in advance.</p>
              <div className="card-tech">
                <span className="tech-tag">Unity</span>
                <span className="tech-tag">C#</span>
              </div>
              <a href="#" className="project-link">Live Demo <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>


        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact">
        <div className="contact-container fade-in">
          <h2>Ready to Collaborate?</h2>
          <p>I am currently open for freelance projects and full-time opportunities.</p>

          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <a href="mailto:alabedghiath8@gmail.com" className="btn btn-primary" style={{ marginBottom: '0.75rem' }}>
              Say Hello <i className="fas fa-paper-plane" style={{ marginLeft: '8px' }}></i>
            </a>

            <div className="contact-links" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <a href="https://www.linkedin.com/in/ghiath-al-abed-034a4239a/" className="btn btn-gold" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin" style={{ marginRight: '8px' }}></i>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2023 Ghiath Developer. Built with <span style={{ color: 'var(--burgundy)' }}>&#10084;</span> and Code.</p>
      </footer>
    </>
  );
}

export default App;
