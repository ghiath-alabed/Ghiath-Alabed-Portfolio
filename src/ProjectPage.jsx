import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_PROJECTS } from './projectsData';
import StarField from './StarField';

function ImageGallery({ images = [], video, alt, videoDelay }) {
  const slides = video ? [{ type: 'video', src: video, delay: videoDelay }, ...images.map(s => ({ type: 'image', src: s }))] : images.map(s => ({ type: 'image', src: s }));
  const [active, setActive] = useState(0);
  const videoRefs = React.useRef({});

  useEffect(() => {
    if (!slides.length) return;
    let timer = null;

    const advance = () => setActive(p => (p + 1) % slides.length);

    const schedule = () => {
      const s = slides[active];
      if (s && s.type === 'video') {
        const vid = videoRefs.current[active];
        const explicit = s.delay;
        const startTimer = (d) => {
          if (explicit && !isNaN(explicit)) {
            timer = setTimeout(advance, Math.max(3000, Math.min(explicit * 1000, 60000)));
            return;
          }
          const delay = (!d || isNaN(d)) ? 3500 : Math.max(3000, Math.min(d * 1000, 15000));
          timer = setTimeout(advance, delay);
        };

        if (explicit && !isNaN(explicit)) {
          startTimer();
        } else if (vid) {
          if (vid.readyState >= 1 && vid.duration && !isNaN(vid.duration)) {
            startTimer(vid.duration);
          } else {
            const loaded = () => { startTimer(vid.duration); vid.removeEventListener('loadedmetadata', loaded); };
            vid.addEventListener('loadedmetadata', loaded);
            // fallback if loadedmetadata never fires
            timer = setTimeout(advance, 3500);
          }
        } else {
          timer = setTimeout(advance, 3500);
        }
      } else {
        timer = setTimeout(advance, 3500);
      }
    };

    schedule();
    return () => { clearTimeout(timer); };
  }, [slides.length, active]);

  return (
    <div className="pg-gallery">
      <div className="pg-main-img">
        {slides.map((s, i) => (
          s.type === 'video' ? (
              <video
                key={i}
                ref={el => (videoRefs.current[i] = el)}
                src={s.src}
                className={`pg-slide${active === i ? ' pg-slide-active' : ''}`}
                autoPlay
                loop
                muted
                playsInline
              />
          ) : (
            <img
              key={i}
              src={s.src}
              alt={`${alt} screenshot ${i + 1}`}
              className={`pg-slide${active === i ? ' pg-slide-active' : ''}`}
            />
          )
        ))}
      </div>

      {slides.length > 1 && (
        <div className="pg-thumbs">
          {slides.map((s, i) => (
            <button
              key={i}
              className={`pg-thumb${active === i ? ' pg-thumb-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={s.type === 'video' ? `Play video` : `View screenshot ${i}`}
            >
              {s.type === 'video' ? (
                <div className="pg-thumb-video">▶</div>
              ) : (
                <img src={s.src} alt={`${alt} thumb ${i + 1}`} />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="pg-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`pg-dot${active === i ? ' pg-dot-active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const project = ALL_PROJECTS.find(p => p.slug === slug);

  useLayoutEffect(() => {
    // Ensure we start at the top of the page before paint
    try { window.scrollTo(0, 0); } catch (e) {}

    // Also schedule a couple of retries after layout settles
    const t1 = setTimeout(() => window.scrollTo(0, 0), 50);
    const t2 = setTimeout(() => window.scrollTo(0, 0), 250);

    // If gallery media loads later, force scroll again
    const media = document.querySelector('.pg-main-img img, .pg-main-img video');
    const onMediaLoaded = () => { window.scrollTo(0, 0); };
    if (media) {
      const ev = media.tagName === 'VIDEO' ? 'loadedmetadata' : 'load';
      media.addEventListener(ev, onMediaLoaded);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (media) {
        const ev = media.tagName === 'VIDEO' ? 'loadedmetadata' : 'load';
        media.removeEventListener(ev, onMediaLoaded);
      }
    };
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }, 50);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [slug]);

  if (!project) {
    return (
      <>
        <StarField />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem' }}>Project not found</h2>
          <Link to="/" className="btn btn-primary">← Back Home</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <StarField />

      {/* Navbar */}
      <nav>
        <Link to="/" className="logo">&lt;Ghiath<span>Dev</span>/&gt;</Link>
        <div className="nav-links">
          <Link to="/" state={{ scrollTo: 'home' }}>Home</Link>
          <Link to="/" state={{ scrollTo: 'about' }}>About</Link>
          <Link to="/" state={{ scrollTo: 'projects' }}>Projects</Link>
          <Link to="/" state={{ scrollTo: 'contact' }}>Contact</Link>
        </div>
        <div className="nav-controls">
          <Link to="/" state={{ scrollTo: 'contact' }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}>Let's Talk</Link>
        </div>
      </nav>

      <main className="pg-main fade-in">
        {/* Breadcrumb */}
        <div className="pg-breadcrumb fade-in">
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to="/" state={{ scrollTo: 'projects' }}>Projects</Link>
          <span> / </span>
          <span>{project.title}</span>
        </div>

        {/* Hero row */}
        <div className="pg-hero fade-in">
          <div className="pg-hero-left">
            <span className="card-category-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '1rem' }}>
              {project.category}
            </span>
            <h1 className="pg-title">
              {project.titleHighlight
                ? (() => {
                    const idx = project.title.indexOf(project.titleHighlight);
                    if (idx === -1) return project.title;
                    return (
                      <>
                        {project.title.slice(0, idx)}
                        <span style={{ color: '#38bdf8', WebkitTextFillColor: '#38bdf8' }}>
                          {project.titleHighlight}
                        </span>
                        {project.title.slice(idx + project.titleHighlight.length)}
                      </>
                    );
                  })()
                : project.title}
            </h1>
            
          </div>
          <Link to="/" state={{ scrollTo: 'projects' }} className="btn btn-primary" style={{ alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>
            ← All Projects
          </Link>
        </div>

        {/* Gallery */}
        <div className="fade-in">
          <ImageGallery video={project.video} images={project.images} alt={project.title} videoDelay={project.videoDelay} />
        </div>

        {/* Content grid */}
        <div className="pg-content-grid fade-in">
          {/* Description */}
          <div className="pg-section-card">
            <h2 className="pg-section-title"><i className="fas fa-align-left"></i> About This Project</h2>
            <p className="pg-desc">{project.longDesc || project.desc}</p>

            {project.features && project.features.length > 0 && (
              <>
                <h3 className="pg-sub-title">Key Features</h3>
                <ul className="pg-feature-list">
                  {project.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </>
            )}
          </div>

          {/* Right column */}
          <div className="pg-right-col">
            {/* Links */}
            <div className="pg-section-card">
              <h2 className="pg-section-title"><i className="fas fa-link"></i> Links</h2>
              <div className="pg-links">
                {project.youtube && (
                  <a href={project.youtube} target="_blank" rel="noopener noreferrer" className="pg-link-btn pg-yt">
                    <i className="fab fa-youtube"></i> Watch on YouTube
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="pg-link-btn pg-gh">
                    <i className="fab fa-github"></i> View on GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pg-link-btn pg-live">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
                {!project.youtube && !project.github && !project.liveUrl && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Links coming soon.</p>
                )}
              </div>
            </div>

            {/* Tech stack */}
            <div className="pg-section-card">
              <h2 className="pg-section-title"><i className="fas fa-code"></i> Tech Stack</h2>
              <div className="card-tech" style={{ marginTop: '0.5rem' }}>
                {project.tags.map(t => <span key={t} className="tech-tag" style={{ fontSize: '0.85rem', padding: '0.35rem 0.9rem' }}>{t}</span>)}
              </div>
            </div>

            {/* Status */}
            {project.status && (
              <div className="pg-section-card">
                <h2 className="pg-section-title"><i className="fas fa-info-circle"></i> Status</h2>
                <span className={`pg-status-badge pg-status-${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {project.status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Back button */}
        <div className="pg-back fade-in">
          <Link to="/" state={{ scrollTo: 'projects' }} className="btn btn-primary">← Back to Projects</Link>
        </div>
      </main>

      <footer>
        <p>&copy; 2026 Ghiath Developer. Built with <span style={{ color: 'var(--burgundy)' }}>&#10084;</span> and Code.</p>
      </footer>
    </>
  );
}

export default ProjectPage;
