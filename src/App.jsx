import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HeroCubes from './HeroCubes';
import StarField from './StarField';
import ProjectPage from './ProjectPage';
import { ALL_PROJECTS } from './projectsData';
import ppAvatar from './assets/PP.jpeg';

function Carousel({ images, slides, alt }) {
  const providedSlides = slides || images;
  const localSlides = Array.isArray(providedSlides) && providedSlides.length && typeof providedSlides[0] === 'object'
    ? providedSlides
    : (providedSlides || []).map(s => ({ type: 'image', src: s }));

  const [index, setIndex] = useState(0);
  const videoRefs = React.useRef({});

  useEffect(() => {
    if (!localSlides.length) return;
    let timer = null;
    const advance = () => setIndex(p => (p + 1) % localSlides.length);

    const schedule = () => {
      const s = localSlides[index];
      const explicit = s && s.delay;
      if (s && s.type === 'video') {
        const vid = videoRefs.current[index];
        const startTimer = (d) => {
          if (explicit && !isNaN(explicit)) {
            timer = setTimeout(advance, Math.max(3000, Math.min(explicit * 1000, 60000)));
            return;
          }
          const delay = (!d || isNaN(d)) ? 3000 : Math.max(3000, Math.min(d * 1000, 15000));
          timer = setTimeout(advance, delay);
        };
        if (explicit && !isNaN(explicit)) {
          startTimer();
        } else if (vid) {
          if (vid.readyState >= 1 && vid.duration && !isNaN(vid.duration)) startTimer(vid.duration);
          else {
            const onLoaded = () => { startTimer(vid.duration); vid.removeEventListener('loadedmetadata', onLoaded); };
            vid.addEventListener('loadedmetadata', onLoaded);
            timer = setTimeout(advance, 3000);
          }
        } else timer = setTimeout(advance, 3000);
      } else {
        timer = setTimeout(advance, 3000);
      }
    };

    schedule();
    return () => clearTimeout(timer);
  }, [localSlides.length, index]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {localSlides.map((s, i) => (
        s.type === 'video' ? (
          <video
            key={i}
            ref={el => (videoRefs.current[i] = el)}
            src={s.src}
            alt={`${alt} ${i + 1}`}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', opacity: index === i ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out'
            }}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img key={i} src={s.src} alt={`${alt} ${i + 1}`} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: index === i ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out'
          }} />
        )
      ))}
    </div>
  );
}

const FILTERS = ['All Projects', 'Game Development', 'Website', 'Mobile App'];

function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const location = useLocation();
  const filtersRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  // Scroll to section when navigated here from another page (e.g. ProjectPage nav links)
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(target);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      if (attempts++ < 12) setTimeout(tryScroll, 80);
    };
    setTimeout(tryScroll, 50);
  }, [location.state]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => document.querySelectorAll('.fade-in').forEach(el => observer.unobserve(el));
  }, []);

  // compute indicator position when activeFilter changes or on resize
  useEffect(() => {
    const container = filtersRef.current;
    if (!container) return;
    const btns = Array.from(container.querySelectorAll('.filter-btn'));
    const idx = FILTERS.indexOf(activeFilter);
    const btn = btns[idx];
    if (!btn) {
      setIndicator(i => ({ ...i, visible: false }));
      return;
    }

    // small horizontal padding inside the rounded track
    const padding = 6;
    const left = btn.offsetLeft + padding;
    const width = Math.max(24, btn.offsetWidth - padding * 2);

    // set with a tiny delay to allow rendering/layout changes
    requestAnimationFrame(() => setIndicator({ left, width, visible: true }));

    const onResize = () => {
      const b2 = container.querySelectorAll('.filter-btn')[idx];
      if (!b2) return;
      const l2 = b2.offsetLeft + padding;
      const w2 = Math.max(24, b2.offsetWidth - padding * 2);
      setIndicator({ left: l2, width: w2, visible: true });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeFilter]);

  const filtered = activeFilter === 'All Projects'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      {/* Navigation */}
      <nav>
        <a href="#/" className="logo" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>&lt;Ghiath<span>Dev</span>/&gt;</a>
        <div className="nav-links">
          <a href="#/" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a>
          <a href="#/" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
          <a href="#/" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>Projects</a>
          <a href="#/" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
        </div>
        <div className="nav-controls">
          <a href="#/" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}>Let's Talk</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-left fade-in">
          <div className="hero-subtitle">&lt; Creative Developer & Computer Engineer &gt;</div>
          <h1>GHIATH ALABED</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '1.5rem 0' }}>
            Bridging the gap between software engineering and game design. Focused on building
            high-performance interactive experiences using Unity and modern software architecture.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a href="#/" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }} className="btn btn-primary">View Projects</a>
            <a href="#/" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="btn btn-primary" style={{ marginLeft: '1rem' }}>About Me</a>
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
                <img src={ppAvatar} alt="Ghiath Alabed" className="avatar-img" />
              </div>
              <div className="avatar-online" />
            </div>
            <h3 className="about-name">Ghiath Alabed</h3>
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
                <li>Designing and implementing cross-platform mobile applications with <strong>React Native</strong> and <strong>Expo</strong>.</li>
                <li>Designing engaging level layouts and programming complex game mechanics.</li>
                <li>Crafting intuitive user interfaces and integrating immersive sound effects.</li>
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
          <div className="project-filters" ref={filtersRef}>
            <div
              className="filter-indicator"
              style={{ left: indicator.left + 'px', width: indicator.width + 'px', opacity: indicator.visible ? 1 : 0 }}
              aria-hidden
            />
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
                <Carousel
                  slides={proj.video ? [{ type: 'video', src: proj.video, delay: proj.videoDelay }, ...proj.images.map(s => ({ type: 'image', src: s }))] : proj.images}
                  alt={proj.title}
                />
                <span className="card-category-badge">{proj.category}</span>
              </div>
                <div className="card-content">
                <div className="card-top-row">
                  <h3>
                    {proj.titleHighlight
                      ? (() => {
                          const idx = proj.title.indexOf(proj.titleHighlight);
                          if (idx === -1) return proj.title;
                          return (
                            <>
                              {proj.title.slice(0, idx)}
                              <span style={{ color: '#38bdf8' }}>{proj.titleHighlight}</span>
                              {proj.title.slice(idx + proj.titleHighlight.length)}
                            </>
                          );
                        })()
                      : proj.title}
                  </h3>
                  <Link to={`/project/${proj.slug}`} className="card-ext-link" aria-label="Open project" onClick={() => window.scrollTo(0,0)}>
                    <i className="fas fa-external-link-alt"></i>
                  </Link>
                </div>
                <div className="card-tech">
                  {proj.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <Link to={`/project/${proj.slug}`} className="card-details-btn" onClick={() => window.scrollTo(0,0)}>Details &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact-section fade-in" id="contact">
        <div className="contact-left">
          <h2 className="contact-title">Ready to<br />Collaborate?</h2>
          <p className="contact-sub">I am currently open for freelance projects and full-time opportunities.</p>
        </div>
        <div className="contact-right">
          <a href="mailto:alabedghiath8@gmail.com" className="btn btn-primary contact-float-btn">
            Say Hello <i className="fas fa-paper-plane" style={{ marginLeft: '8px' }}></i>
          </a>
          <a href="https://www.linkedin.com/in/ghiath-al-abed-034a4239a/" className="btn btn-primary contact-float-btn contact-float-btn--delay" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin" style={{ marginRight: '8px' }}></i>LinkedIn
          </a>
        </div>
      </section>

      <footer>
        <p>&copy; 2026 Ghiath Developer. Built with <span style={{ color: 'var(--burgundy)' }}>&#10084;</span> and Code.</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <>
      <StarField />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
    </>
  );
}

export default App;
