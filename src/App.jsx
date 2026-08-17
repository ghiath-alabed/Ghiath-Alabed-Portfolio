import { useEffect, useRef, useState } from 'react';
import portrait from './assets/new landing foto.png';
import mouse from './assets/mouse-3d.png';
import keyboard from './assets/keyboard-3d.png';
import graphicsTablet from './assets/graphics-tablet-3d.png';
import airpods from './assets/airpods-3d.png';
import invitationCover from './assets/inv1.png';
import invitation2 from './assets/inv2.png';
import invitation3 from './assets/inv3.png';
import invitation4 from './assets/inv4.png';
import freelancyoCover from './assets/1.png';
import freelancyo2 from './assets/2.png';
import freelancyo3 from './assets/3.png';
import freelancyo4 from './assets/4.png';
import lazyBallCover from './assets/lazy.png';
import lazyBall2 from './assets/lazy2.png';
import lazyBall3 from './assets/lazy3.png';
import stickTortureCover from './assets/stick.png';
import stickTorture2 from './assets/stick2.png';
import stickTorture3 from './assets/stick3.png';
import sidequestCover from './assets/Sidequest1.png';
import swarmCover from './assets/swarm.png';
import swarm2 from './assets/swarm2.png';
import swarm3 from './assets/swarm3.png';
import badReview1 from './assets/bad review/1.png';
import badReview2 from './assets/bad review/2.png';
import badReview3 from './assets/bad review/3.png';
import badReview4 from './assets/bad review/4.png';
import badReview5 from './assets/bad review/5.png';
import badReview6 from './assets/bad review/6.png';
import badReview7 from './assets/bad review/7.png';
import badReview8 from './assets/bad review/8.png';
import shawarmaExpress1 from './assets/shawarma express/1.png';
import shawarmaExpress2 from './assets/shawarma express/2.png';
import shawarmaExpress3 from './assets/shawarma express/3.png';
import shawarmaExpress4 from './assets/shawarma express/4.png';

const OBJECTS = [
  {
    id: 'keyboard-left',
    src: keyboard,
    label: 'Floating keyboard',
    className: 'object-keyboard object-keyboard-left',
    duration: '6.8s',
    delay: '-1.1s',
  },
  {
    id: 'airpods-right',
    src: airpods,
    label: 'Floating wireless earbuds',
    className: 'object-airpods-right',
    duration: '5.9s',
    delay: '-3.4s',
  },
  {
    id: 'mouse-left',
    src: mouse,
    label: 'Floating mouse',
    className: 'object-mouse object-mouse-left',
    duration: '6.4s',
    delay: '-2.2s',
  },
  {
    id: 'graphics-tablet-right',
    src: graphicsTablet,
    label: 'Floating graphics tablet',
    className: 'object-tablet-right',
    duration: '7.3s',
    delay: '-4.7s',
  },
];

const FEATURED_PROJECTS = [
  {
    slug: 'invitation-app',
    title: 'Invitation App',
    category: 'Website',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    images: [invitationCover, invitation2, invitation3, invitation4],
    liveUrl: 'https://invitations-app-bay.vercel.app/',
  },
  {
    slug: 'freelancyo',
    title: 'FreeLancyo',
    category: 'Website',
    tags: ['React', 'JavaScript', 'Vite'],
    images: [freelancyoCover, freelancyo2, freelancyo3, freelancyo4],
    liveUrl: 'https://freelancyo.com/',
  },
  {
    slug: 'lazy-ball',
    title: 'Lazy Ball',
    category: 'Game Development',
    tags: ['Unity', 'C#'],
    images: [lazyBallCover, lazyBall2, lazyBall3],
    liveUrl: 'https://lazyball.online/',
  },
  {
    slug: 'bad-review',
    title: 'Bad Review',
    category: 'Game Jam',
    categories: ['Game Development', 'Game Jam'],
    tags: ['Unity', 'C#', 'Game Jam'],
    images: [
      badReview1,
      badReview2,
      badReview3,
      badReview4,
      badReview5,
      badReview6,
      badReview7,
      badReview8,
    ],
    liveUrl: 'https://ghiath-alabed.itch.io/bad-review',
  },
  {
    slug: 'stick-torture',
    title: 'Stick Torture',
    category: 'Game Development',
    tags: ['Unity', 'C#', 'Aseprite'],
    images: [stickTortureCover, stickTorture2, stickTorture3],
  },
  {
    slug: 'sidequest',
    title: 'Sidequest',
    category: 'Mobile App',
    tags: ['React Native', 'Expo'],
    images: [sidequestCover],
  },
  {
    slug: 'swarm',
    title: 'Swarm',
    category: 'Game Development',
    tags: ['Unity', 'C#'],
    images: [swarmCover, swarm2, swarm3],
  },
  {
    slug: 'shawarma-express',
    title: 'Shawarma Express',
    category: 'Partner Project',
    tags: ['Partner Project', 'Website'],
    images: [shawarmaExpress1, shawarmaExpress2, shawarmaExpress3, shawarmaExpress4],
    liveUrl: 'https://shawarma-express-ten.vercel.app/',
  },
];

const TOP_SKILLS = [
  { name: 'Unity', icon: 'fa-brands fa-unity' },
  { name: 'C#', icon: 'fa-solid fa-code' },
  { name: 'Python', icon: 'fa-brands fa-python' },
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'C++', icon: 'fa-solid fa-terminal' },
  { name: 'JavaScript', icon: 'fa-brands fa-js' },
  { name: 'Aseprite', icon: 'fa-solid fa-palette' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js' },
  { name: 'HTML', icon: 'fa-brands fa-html5' },
  { name: 'CSS', icon: 'fa-brands fa-css3-alt' },
];

const PROJECT_FILTERS = [
  { label: 'All Projects', category: null },
  { label: 'Games', category: 'Game Development' },
  { label: 'Game Jams', category: 'Game Jam' },
  { label: 'Websites', category: 'Website' },
  { label: 'Mobile Apps', category: 'Mobile App' },
  { label: 'Partners Projects', category: 'Partner Project' },
];

function ProjectCarousel({ images, title }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (images.length < 2) return undefined;
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <div className="project-carousel">
      {images.map((image, index) => (
        <img
          key={image}
          className={`project-slide${activeImage === index ? ' is-active' : ''}`}
          src={image}
          alt={activeImage === index ? `${title} preview ${index + 1}` : ''}
          loading="lazy"
        />
      ))}
      {images.length > 1 && (
        <div className="project-carousel-dots" aria-hidden="true">
          {images.map((image, index) => (
            <span key={image} className={activeImage === index ? 'is-active' : ''} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [launched, setLaunched] = useState({});
  const [openAbout, setOpenAbout] = useState(null);
  const [activeProjectFilter, setActiveProjectFilter] = useState('All Projects');
  const returnTimers = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [activeProjectFilter]);

  useEffect(() => () => {
    Object.values(returnTimers.current).forEach(window.clearTimeout);
  }, []);

  const selectedCategory = PROJECT_FILTERS.find((filter) => filter.label === activeProjectFilter)?.category;
  const visibleProjects = selectedCategory
    ? FEATURED_PROJECTS.filter((project) => (
      project.category === selectedCategory || project.categories?.includes(selectedCategory)
    ))
    : FEATURED_PROJECTS;

  const launchObject = (event, id) => {
    if (launched[id]) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const objectX = rect.left + rect.width / 2;
    const objectY = rect.top + rect.height / 2;
    let directionX = objectX - window.innerWidth / 2;
    let directionY = objectY - window.innerHeight / 2;
    const length = Math.hypot(directionX, directionY) || 1;

    directionX /= length;
    directionY /= length;

    const distance = Math.max(window.innerWidth, window.innerHeight) * 1.2;
    const wobble = (Math.random() - 0.5) * 180;

    setLaunched((current) => ({
      ...current,
      [id]: {
        x: directionX * distance + directionY * wobble,
        y: directionY * distance - directionX * wobble,
        rotation: `${directionX > 0 ? 42 : -42}deg`,
      },
    }));

    window.clearTimeout(returnTimers.current[id]);
    returnTimers.current[id] = window.setTimeout(() => {
      setLaunched((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      delete returnTimers.current[id];
    }, 5000);
  };

  return (
    <main className="landing">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Ghiath Alabed home">
          GHIATH<span>®</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#about">ABOUT</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <a className="contact-link" href="mailto:ghiath@luminisst.com">LET'S TALK ↗</a>
      </header>

      <section className="hero-stage" id="top" aria-label="Ghiath Alabed introduction">
        <p className="eyebrow">PLAYFUL CODE. SERIOUS CRAFT.</p>
        <div className="nameplate" aria-hidden="true">GHIATH</div>

        <div className="portrait-wrap">
          <div className="portrait-halo" />
          <img className="portrait" src={portrait} alt="Ghiath Alabed" />
        </div>

        <div className="shoulder-links-layer">
          <a
            className="shoulder-social shoulder-social-linkedin"
            href="https://www.linkedin.com/in/ghiath-al-abed-034a4239a/"
            target="_blank"
            rel="noreferrer"
          >
            <span><i className="fa-brands fa-linkedin-in" /> LinkedIn</span>
            <small>GHIATH ALABED</small>
          </a>
          <a
            className="shoulder-social shoulder-social-instagram"
            href="https://www.instagram.com/ghiath.codes/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Instagram <i className="fa-brands fa-instagram" /></span>
            <small>@GHIATH.CODES</small>
          </a>
        </div>

        <div className="objects-layer" aria-label="Interactive floating objects">
          {OBJECTS.map((item) => {
            const exit = launched[item.id];
            return (
              <button
                key={item.id}
                type="button"
                className={`floating-object ${item.className}${exit ? ' is-launched' : ''}`}
                style={{
                  '--swing-duration': item.duration,
                  '--swing-delay': item.delay,
                  '--exit-x': exit ? `${exit.x}px` : '0px',
                  '--exit-y': exit ? `${exit.y}px` : '0px',
                  '--exit-rotation': exit?.rotation || '0deg',
                }}
                onClick={(event) => launchObject(event, item.id)}
                aria-label={`${item.label} — click to send it flying; it returns after five seconds`}
              >
                <span className="object-swing">
                  <img src={item.src} alt="" draggable="false" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="hero-meta">
          <p>COMPUTER ENGINEER<br />&amp; GAME DEVELOPER</p>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
            SCROLL <span>↓</span>
          </a>
          <p className="interaction-hint"><span>CLICK</span> AN OBJECT<br />IT RETURNS IN 5 SEC</p>
        </div>
      </section>

      <section className="about-section content-section" id="about">
        <div className="section-kicker reveal" data-reveal>
          <span>01</span>
          <p>ABOUT ME</p>
        </div>

        <div className="about-grid">
          <div className="about-headline reveal" data-reveal>
            <h2>I build ideas<br />you can <em>feel.</em></h2>
          </div>

          <div className="about-copy reveal" data-reveal>
            <article className={`about-content-block${openAbout === 'journey' ? ' is-open' : ''}`}>
              <button
                className="about-accordion-trigger"
                type="button"
                onClick={() => setOpenAbout((current) => current === 'journey' ? null : 'journey')}
                aria-expanded={openAbout === 'journey'}
                aria-controls="journey-content"
              >
                <span className="about-accordion-title"><i className="fa-solid fa-rocket" />My Journey</span>
                <span className="about-accordion-mark"><i className="fa-solid fa-plus" /></span>
              </button>
              <div className="about-accordion-panel" id="journey-content">
                <div className="about-accordion-inner">
                  <p>
                    I am a passionate software engineer with a strong background in <strong>game
                    development</strong> and <strong>full-stack web technologies</strong>. My journey
                    started with creating interactive worlds in Unity, which evolved into building
                    scalable, high-performance applications that solve real-world problems.
                  </p>
                </div>
              </div>
            </article>

            <article className={`about-content-block${openAbout === 'work' ? ' is-open' : ''}`}>
              <button
                className="about-accordion-trigger"
                type="button"
                onClick={() => setOpenAbout((current) => current === 'work' ? null : 'work')}
                aria-expanded={openAbout === 'work'}
                aria-controls="work-content"
              >
                <span className="about-accordion-title"><i className="fa-solid fa-code" />What I Do</span>
                <span className="about-accordion-mark"><i className="fa-solid fa-plus" /></span>
              </button>
              <div className="about-accordion-panel" id="work-content">
                <div className="about-accordion-inner">
                  <ul className="about-work-list">
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
            </article>
          </div>
        </div>

        <div className="about-bottom reveal" data-reveal>
          <div className="mini-stat"><strong>3+</strong><span>YEARS<br />BUILDING</span></div>
          <div className="mini-stat"><strong>10+</strong><span>PROJECTS<br />SHIPPED</span></div>
          <div className="skills-wrap">
            <p>TOP SKILLS</p>
            <div className="skills-cloud" aria-label="Core skills">
              {TOP_SKILLS.map((skill) => (
                <span key={skill.name}><i className={skill.icon} />{skill.name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section content-section" id="projects">
        <div className="projects-heading reveal" data-reveal>
          <div className="section-kicker section-kicker-light">
            <span>02</span>
            <p>SELECTED PROJECTS</p>
          </div>
          <h2>Work that moves.</h2>
          <p>A selection of digital products, experiments and game worlds.</p>
        </div>

        <div className="projects-layout">
          <aside className="project-filter-bar" aria-label="Project filters">
            <div>
              <p className="project-filter-label">PROJECT INDEX</p>
              <div className="project-filter-list">
                {PROJECT_FILTERS.map((filter, index) => (
                  <button
                    type="button"
                    key={filter.label}
                    className={activeProjectFilter === filter.label ? 'is-active' : ''}
                    onClick={() => setActiveProjectFilter(filter.label)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="project-filter-count">{String(visibleProjects.length).padStart(2, '0')} PROJECTS</p>
          </aside>

          <div className="projects-grid">
            {visibleProjects.map((project, index) => (
              <article
                className="project-card reveal"
                data-reveal
                key={`${activeProjectFilter}-${project.slug}`}
                style={{ '--reveal-delay': `${index * 120}ms` }}
              >
                <a
                  className="project-visual"
                  href={project.liveUrl || '#contact'}
                  target={project.liveUrl ? '_blank' : undefined}
                  rel={project.liveUrl ? 'noreferrer' : undefined}
                  aria-label={`${project.title}${project.liveUrl ? ' live website' : ''}`}
                >
                  <ProjectCarousel images={project.images} title={project.title} />
                  <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="project-open">OPEN ↗</span>
                </a>
                <div className="project-info">
                  <div>
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section content-section" id="contact">
        <div className="contact-orbit" aria-hidden="true"><span>AVAILABLE FOR NEW PROJECTS • </span></div>
        <div className="contact-content reveal" data-reveal>
          <div className="section-kicker section-kicker-light">
            <span>03</span>
            <p>CONTACT</p>
          </div>
          <p className="contact-intro">HAVE AN IDEA?</p>
          <h2>Let’s make it<br /><em>move.</em></h2>
          <a className="contact-button" href="mailto:alabedghiath8@gmail.com">
            <span>START A CONVERSATION</span>
            <strong>↗</strong>
          </a>
        </div>

        <footer className="site-footer">
          <p>© 2026 GHIATH ALABED</p>
          <div>
            <a href="https://github.com/ghiath-alabed" target="_blank" rel="noreferrer">GITHUB</a>
            <a href="https://www.linkedin.com/in/ghiath-al-abed-034a4239a/" target="_blank" rel="noreferrer">LINKEDIN</a>
            <a href="https://www.instagram.com/ghiath.codes/" target="_blank" rel="noreferrer">INSTAGRAM</a>
          </div>
          <a href="#top">BACK TO TOP ↑</a>
        </footer>
      </section>
    </main>
  );
}

export default App;
