import React, { useEffect, useState } from 'react';
import HeroCubes from './HeroCubes';
import swarmImg from './assets/swarm.png';
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

function Carousel({ images, alt }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(p => (p + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {images.map((img, i) => (
        <img key={i} src={img} alt={`${alt} ${i + 1}`} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: index === i ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out'
        }} />
      ))}
    </div>
  );
}

const ALL_PROJECTS = [
  {
    title: 'Swarm',
    category: 'Game Development',
    tags: ['C#', 'Unity'],
    desc: 'A Roguelike game testing patience and skills. Players lose all progress on death and face boss fights.',
    images: [swarmImg, swarmImg2, swarmImg3, swarmImg4, swarmImg5],
    link: '#',
  },
  {
    title: 'Stick Torture',
    category: 'Game Development',
    tags: ['Unity', 'C#', 'Aseprite'],
    desc: 'A 2D platformer with trap mechanisms, escape levels, side-scroller combat, and boss fights.',
    images: [stickImg, stickImg2, stickImg3, stickImg4, stickImg5],
    link: '#',
  },
  {
    title: 'Lazy Ball',
    category: 'Game Development',
    tags: ['Unity', 'C#'],
    desc: 'A reflex-speed game with 3 modes: endless, normal, and puzzle. Draw the ball\'s path to reach the goal.',
    images: [lazyImg, lazyImg2, lazyImg3],
    link: '#',
  },
];

const FILTERS = ['All Projects', 'Game Development'];

function App() {
  const [activeFilter, setActiveFilter] = useState('All Projects');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => document.querySelectorAll('.fade-in').forEach(el => observer.unobserve(el));
  }, []);

  const filtered = activeFilter === 'All Projects'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      {/* Space background — fixed, covers entire site */}
      <div className="space-bg" aria-hidden="true" />

      {/* Navigation */}
      <nav>
        <a href="#home" className="logo">&lt;Ghiath<span>Dev</span>/&gt;</a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-controls">
          <a href="#contact" className="btn btn-gold" style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}>Let's Talk</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-left fade-in">
          <div className="hero-subtitle">&lt; Creative Developer & Computer Engineer /&gt;</div>
           <h1>GHIATH ALABED</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '1.5rem 0' }}>
            Bridging the gap between software engineering and game design. Focused on building
            high-performance interactive experiences using Unity and modern software architecture.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-gold" style={{ marginLeft: '1rem' }}>Resume</a>
          </div>
          <div className="social-icons">
            <a href="https://github.com/ghiath-alabed" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/ghiath-al-abed-034a4239a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="https://www.instagram.com/ilyas.dev1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="hero-right">
          <HeroCubes />
        </div>
      </section>

      {/* ── ABOUT ME ── */}
      <section className="section" id="about">
        <div className="section-header fade-in" style={{ textAlign: 'center' }}>
          <h2>About Me</h2>
          <div className="line" style={{ margin: '0.75rem auto 0' }}></div>
        </div>

        <div className="about-grid fade-in">
          {/* Left card */}
          <div className="about-card">
            <div className="about-avatar">
              <div className="avatar-ring">
                <div className="avatar-placeholder"><i className="fas fa-user"></i></div>
              </div>
              <div className="avatar-online" />
            </div>
            <h3 className="about-name">Ghiath Al-Abed</h3>
            <p className="about-role">COMPUTER ENGINEER</p>
            <p className="about-bio">
              Passionate game developer with expertise in Unity and C#. Creating immersive gaming
              experiences and always looking for new challenges!
            </p>
            <p className="about-skills-label">TOP SKILLS</p>
            <div className="about-skill-tags">
              {[
                { icon: 'fas fa-gamepad',  label: 'Unity',      color: '#38bdf8' },
                { icon: 'fas fa-code',     label: 'C#',         color: '#38bdf8' },
                { icon: 'fab fa-python',   label: 'Python',     color: '#38bdf8' },
                { icon: 'fab fa-react',    label: 'React',      color: '#38bdf8' },
                { icon: 'fas fa-terminal', label: 'C++',        color: '#38bdf8' },
                { icon: 'fab fa-js',       label: 'JavaScript', color: '#38bdf8' },
                { icon: 'fas fa-palette',  label: 'Aseprite',   color: '#38bdf8' },
                { icon: 'fab fa-node-js',  label: 'Node.js',    color: '#38bdf8' },
                { icon: 'fab fa-html5',    label: 'HTML',       color: '#38bdf8' },
                { icon: 'fab fa-css3-alt', label: 'CSS',        color: '#38bdf8' },
              ].map(({ icon, label, color }) => (
                <span key={label} className="about-skill-tag">
                  <i className={icon} style={{ color, fontSize: '0.75rem' }}></i>
                  {label}
                </span>
              ))}
            </div>
            <div className="about-stats">
              <div><span className="stat-num">3+</span><span className="stat-lbl">YEARS EXP</span></div>
              <div><span className="stat-num">10+</span><span className="stat-lbl">PROJECTS</span></div>
              <div><span className="stat-num">100%</span><span className="stat-lbl">PASSION</span></div>
            </div>
          </div>

          {/* Right content */}
          <div className="about-content">
            <div className="about-block">
              <h4><span className="about-icon"><i className="fas fa-rocket"></i></span> My Journey</h4>
              <p>
                I am a passionate software engineer with a strong background in <strong>game development</strong> and{' '}
                <strong>full-stack web technologies</strong>. My journey started with creating interactive worlds
                in Unity, which evolved into building scalable, high-performance applications that solve
                real-world problems.
              </p>
            </div>
            <div className="about-block">
              <h4><span className="about-icon"><i className="fas fa-code"></i></span> What I Do</h4>
              <ul className="about-list">
                <li>Developing high-performance web applications using <strong>React</strong> and <strong>JavaScript</strong>.</li>
                <li>Creating immersive interactive experiences with <strong>Unity</strong> and <strong>C#</strong>.</li>
                <li>Building pixel-art assets and game animations with <strong>Aseprite</strong>.</li>
                <li>Crafting backend systems and APIs to power scalable solutions.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ padding: '6rem 5%' }} id="projects">
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.8rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: '1rem' }}>
            Featured Projects
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 2rem' }}>
            A selection of my recent work, ranging from web applications to game development.
          </p>
          <div className="project-filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-btn${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >{f}</button>
            ))}
          </div>
        </div>

        <div className="projects-grid fade-in">
          {filtered.map((proj) => (
            <div key={proj.title} className="project-card">
              <div className="card-img">
                <Carousel images={proj.images} alt={proj.title} />
                <span className="card-category-badge">{proj.category}</span>
              </div>
              <div className="card-content">
                <div className="card-top-row">
                  <h3>{proj.title}</h3>
                  <a href={proj.link} className="card-ext-link" aria-label="Open project"><i className="fas fa-external-link-alt"></i></a>
                </div>
                <p>{proj.desc}</p>
                <div className="card-tech">
                  {proj.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <a href={proj.link} className="card-details-btn">Details &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section" id="contact">
        <div className="contact-container fade-in">
          <h2>Ready to Collaborate?</h2>
          <p>I am currently open for freelance projects and full-time opportunities.</p>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <a href="mailto:alabedghiath8@gmail.com" className="btn btn-primary" style={{ marginBottom: '0.75rem' }}>
              Say Hello <i className="fas fa-paper-plane" style={{ marginLeft: '8px' }}></i>
            </a>
            <a href="https://www.linkedin.com/in/ghiath-al-abed-034a4239a/" className="btn btn-gold" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin" style={{ marginRight: '8px' }}></i>LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2026 Ghiath Developer. Built with <span style={{ color: 'var(--burgundy)' }}>&#10084;</span> and Code.</p>
      </footer>
    </>
  );
}

export default App;
