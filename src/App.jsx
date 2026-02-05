import React, { useEffect, useState } from 'react';

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
          <h1>ARCHITECTING <br /> THE <span className="highlight-purple">DIGITAL FUTURE</span></h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1.5rem auto' }}>
            Specializing in building exceptional digital experiences with a focus on premium aesthetics, performance, and charismatic design.
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
            <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://dribbble.com/your-username" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
              <i className="fab fa-dribbble"></i>
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
          <div className="stack-item"><i className="fab fa-react highlight-purple"></i> React</div>
          <div className="stack-item"><i className="fab fa-node-js" style={{ color: '#68a063' }}></i> Node.js</div>
          <div className="stack-item"><i className="fab fa-html5" style={{ color: '#e34f26' }}></i> HTML</div>
          <div className="stack-item"><i className="fab fa-css3-alt" style={{ color: '#264de4' }}></i> CSS</div>
          <div className="stack-item"><i className="fab fa-js highlight-gold"></i> JavaScript</div>
          <div className="stack-item"><i className="fab fa-python" style={{ color: '#ffe873' }}></i> Python</div>
          <div className="stack-item"><i className="fas fa-gamepad" style={{ color: '#8b8b8b' }}></i> Unity</div>
          <div className="stack-item"><i className="fas fa-code" style={{ color: '#9b4f96' }}></i> C#</div>
          <div className="stack-item"><i className="fas fa-palette" style={{ color: '#ff7a59' }}></i> Aseprite</div>
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
            <div className="card-img p1" aria-hidden="false">
                {/* Spotify-like circular badge (stylized, not the official logo) */}
                <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Music app image" className="music-badge-svg">
                  <defs>
                    <radialGradient id="gBadge" cx="50%" cy="40%" r="70%">
                      <stop offset="0%" stopColor="#7ef7b8" />
                      <stop offset="45%" stopColor="#1db954" />
                      <stop offset="100%" stopColor="#109b45" />
                    </radialGradient>
                    <filter id="sDrop" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.35"/>
                    </filter>
                  </defs>

                  {/* dark header strip (keeps card header look) */}
                  <rect x="0" y="0" width="200" height="90" rx="8" fill="#042e2f" />

                  <g transform="translate(100,62)">
                    <g filter="url(#sDrop)">
                      <circle r="56" fill="url(#gBadge)" />
                    </g>

                    {/* three stylized arcs */}
                    <path d="M-24 -8 C -8 -24, 24 -24, 40 -8" stroke="#083e2f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95" />
                    <path d="M-28 6 C -6 -12, 30 -12, 52 6" stroke="#083e2f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
                    <path d="M-32 20 C -4 2, 36 2, 64 20" stroke="#083e2f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
                  </g>
                </svg>
              </div>
            <div className="card-content">
              <h3>Music Stats App</h3>
              <p>A deep dive into your listening habits using Spotify API. Visualizes data with interactive charts.</p>
              <div className="card-tech">
                <span className="tech-tag">FastAPI</span>
                <span className="tech-tag">MySQL</span>
                <span className="tech-tag">React</span>
              </div>
              <a href="#" className="project-link">View Case Study <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card fade-in">
            <div className="card-img p2" aria-hidden="false">
              {/* Inline pixel-art style header for Swarm - Game Prototype */}
              <svg viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Swarm game pixel art" className="pixel-art-svg" preserveAspectRatio="xMidYMid slice">
                {/* base background */}
                <rect width="32" height="24" fill="#0a0a0a" />
                {/* sky gradient / vignette */}
                <rect x="0" y="0" width="32" height="12" fill="#0b1113" />

                {/* ground strip */}
                <rect x="0" y="18" width="32" height="6" fill="#060606" />

                {/* core (yellow) */}
                <rect x="14" y="9" width="4" height="4" fill="#f2c94c" />
                <rect x="13" y="10" width="6" height="2" fill="#f2c94c" opacity="0.9" />

                {/* swarm bots (green) - simple pixels */}
                <rect x="7" y="11" width="1" height="1" fill="#3fe07a" />
                <rect x="9" y="8" width="1" height="1" fill="#32c67a" />
                <rect x="11" y="6" width="1" height="1" fill="#2bb36a" />
                <rect x="18" y="7" width="1" height="1" fill="#2bb36a" />
                <rect x="21" y="10" width="1" height="1" fill="#3fe07a" />
                <rect x="23" y="13" width="1" height="1" fill="#32c67a" />

                {/* small effects (sparks) */}
                <rect x="12" y="7" width="1" height="1" fill="#9ae6b4" />
                <rect x="19" y="9" width="1" height="1" fill="#8fe6b0" />

                {/* UI overlay (rounded dark header area) to mimic card crop */}
                <rect x="0" y="0" width="32" height="12" fill="rgba(5,5,5,0.25)" />
              </svg>
            </div>
            <div className="card-content">
              <h3>Swarm - Game Prototype</h3>
              <p>A fast-paced arcade survival game concept. Control a swarm of nanobots to defend the core.</p>
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
            <div className="card-img p2" aria-hidden="false">
              {/* Inline pixel-art style header for Swarm - Game Prototype */}
              <svg viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Swarm game pixel art" className="pixel-art-svg" preserveAspectRatio="xMidYMid slice">
                {/* base background */}
                <rect width="32" height="24" fill="#0a0a0a" />
                {/* sky gradient / vignette */}
                <rect x="0" y="0" width="32" height="12" fill="#0b1113" />

                {/* ground strip */}
                <rect x="0" y="18" width="32" height="6" fill="#060606" />

                {/* core (yellow) */}
                <rect x="14" y="9" width="4" height="4" fill="#f2c94c" />
                <rect x="13" y="10" width="6" height="2" fill="#f2c94c" opacity="0.9" />

                {/* swarm bots (green) - simple pixels */}
                <rect x="7" y="11" width="1" height="1" fill="#3fe07a" />
                <rect x="9" y="8" width="1" height="1" fill="#32c67a" />
                <rect x="11" y="6" width="1" height="1" fill="#2bb36a" />
                <rect x="18" y="7" width="1" height="1" fill="#2bb36a" />
                <rect x="21" y="10" width="1" height="1" fill="#3fe07a" />
                <rect x="23" y="13" width="1" height="1" fill="#32c67a" />

                {/* small effects (sparks) */}
                <rect x="12" y="7" width="1" height="1" fill="#9ae6b4" />
                <rect x="19" y="9" width="1" height="1" fill="#8fe6b0" />

                {/* UI overlay (rounded dark header area) to mimic card crop */}
                <rect x="0" y="0" width="32" height="12" fill="rgba(5,5,5,0.25)" />
              </svg>
            </div>
            <div className="card-content">
              <h3>Swarm - Game Prototype</h3>
              <p>A fast-paced arcade survival game concept. Control a swarm of nanobots to defend the core.</p>
              <div className="card-tech">
                <span className="tech-tag">Unity</span>
                <span className="tech-tag">C#</span>
                <span className="tech-tag">Aseprite</span>
              </div>
              <a href="#" className="project-link">Live Demo <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>

          {/* Project 4 */}
          <div className="project-card fade-in">
            <div className="card-img p3" aria-hidden="false">
              {/* Inline phone mockup for Flutter Mini Apps (Age Calculator) */}
              <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Phone app mockup" className="phone-mock-svg">
                <defs>
                  <linearGradient id="phoneBg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0f1415" />
                    <stop offset="100%" stopColor="#0a0a0a" />
                  </linearGradient>
                  <linearGradient id="screenGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0b2b2b" />
                    <stop offset="100%" stopColor="#061617" />
                  </linearGradient>
                </defs>

                {/* phone body */}
                <rect x="10" y="6" width="180" height="148" rx="16" fill="url(#phoneBg)" stroke="#111" strokeWidth="1" />

                {/* speaker / notch */}
                <rect x="92" y="12" width="16" height="4" rx="2" fill="#1b1b1b" />

                {/* screen */}
                <rect x="24" y="28" width="152" height="116" rx="10" fill="url(#screenGrad)" />

                {/* App header */}
                <rect x="30" y="34" width="136" height="18" rx="4" fill="#0f8aa8" />
                <text x="40" y="48" fill="#fff" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700">Age Calc</text>

                {/* input labels and fields */}
                <text x="36" y="70" fill="#9fb" fontFamily="Inter, sans-serif" fontSize="8">Birth year</text>
                <rect x="36" y="74" width="120" height="12" rx="3" fill="#071718" stroke="#14393a" strokeWidth="0.6" />
                <text x="44" y="83" fill="#6fe0c0" fontFamily="Inter, sans-serif" fontSize="8">1992</text>

                <text x="36" y="98" fill="#9fb" fontFamily="Inter, sans-serif" fontSize="8">Current year</text>
                <rect x="36" y="102" width="120" height="12" rx="3" fill="#071718" stroke="#14393a" strokeWidth="0.6" />
                <text x="44" y="111" fill="#6fe0c0" fontFamily="Inter, sans-serif" fontSize="8">2025</text>

                {/* result pill */}
                <g>
                  <rect x="36" y="122" width="86" height="18" rx="9" fill="#163b3a" />
                  <text x="46" y="134" fill="#aef7e2" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700">Age: 33</text>
                </g>

                {/* small app icon top-left */}
                <circle cx="36" cy="44" r="6" fill="#1db954" />
                <path d="M32 42 C33.5 40.5, 38.5 40.5, 40 42" stroke="#063" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="card-content">
              <h3>Flutter Mini Apps</h3>
              <p>Collection of utility apps built with Flutter, demonstrating cross-platform capabilities.</p>
              <div className="card-tech">
                <span className="tech-tag">Flutter</span>
                <span className="tech-tag">Dart</span>
                <span className="tech-tag">Firebase</span>
              </div>
              <a href="#" className="project-link">View Code <i className="fas fa-arrow-right"></i></a>
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
