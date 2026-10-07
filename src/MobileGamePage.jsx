import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import lazyBall1 from './assets/lazy.png';
import lazyBall2 from './assets/lazy2.png';
import lazyBall3 from './assets/lazy3.png';
import lazyCargo1 from './assets/LazyCargo/1.png';
import lazyCargo2 from './assets/LazyCargo/2.png';
import lazyCargo3 from './assets/LazyCargo/3.png';
import lazyCargo4 from './assets/LazyCargo/4.png';
import lazyCargo5 from './assets/LazyCargo/5.png';
import lazyCargo6 from './assets/LazyCargo/6.png';
import lazyCargo7 from './assets/LazyCargo/7.png';
import lazyCargo8 from './assets/LazyCargo/8.png';
import lazyCargo9 from './assets/LazyCargo/9.png';
import lazyCargo10 from './assets/LazyCargo/10.png';
import lazyCargoPoster from './assets/LazyCargo/Posters/LazyCargo Poster.png';
import betweenTheLetters1 from './assets/BTL/1.png';
import betweenTheLetters2 from './assets/BTL/2.png';
import betweenTheLetters3 from './assets/BTL/3.png';
import betweenTheLetters4 from './assets/BTL/4.png';
import betweenTheLetters5 from './assets/BTL/5.png';
import betweenTheLetters6 from './assets/BTL/6.png';
import betweenTheLetters7 from './assets/BTL/7.png';
import betweenTheLetters8 from './assets/BTL/8.png';
import betweenTheLettersPoster from './assets/BTL/Posters/BTL Poster.png';

const MOBILE_GAMES = {
  'lazy-ball': {
    slug: 'lazy-ball',
    title: 'Lazy Ball',
    status: 'Playable now',
    genre: 'Physics arcade',
    description: 'Guide a wonderfully stubborn ball through sharp obstacles, precision levels, and an endless test of reflexes.',
    longDescription: 'Lazy Ball turns a simple line into your most important tool. Draw, steer, and react at just the right moment to keep the ball moving toward safety. Master handcrafted levels, chase high scores in Endless Mode, and collect rewards as every run gets faster and trickier.',
    tags: ['Arcade', 'Skill', 'Physics'],
    images: [lazyBall1, lazyBall2, lazyBall3],
    portrait: false,
    poster: lazyBall1,
    appStore: 'https://apps.apple.com/tr/app/lazy-ball/id6762310824',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.DefaultCompany.LazyBall',
    liveUrl: 'https://lazyball.online/',
    luminisUrl: 'https://www.luminisst.com/games/lazy-ball',
  },
  'lazy-cargo': {
    slug: 'lazy-cargo',
    title: 'Lazy Cargo',
    status: 'Available now',
    genre: 'Cargo puzzle',
    description: 'A playful delivery puzzle about clumsy traffic, clever routes, and keeping the whole cargo flow moving.',
    longDescription: 'Move the vans, plan the route, and clear the traffic one smart decision at a time. Lazy Cargo is a colorful mobile puzzle packed with satisfying problem solving, escalating layouts, and useful boosters for the moments when the cargo chaos gets serious.',
    tags: ['Puzzle', 'Delivery', 'Strategy'],
    images: [lazyCargo1, lazyCargo2, lazyCargo3, lazyCargo4, lazyCargo5, lazyCargo6, lazyCargo7, lazyCargo8, lazyCargo9, lazyCargo10],
    portrait: true,
    poster: lazyCargoPoster,
    appStore: 'https://apps.apple.com/il/app/lazy-cargo/id6795626742',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.LuminisStudio.LazyCargo&hl=en',
    luminisUrl: 'https://www.luminisst.com/games/lazy-cargo',
  },
  'between-the-letters': {
    slug: 'between-the-letters',
    title: 'Between The Letters',
    status: 'Coming soon',
    genre: 'Word puzzle',
    description: 'Connect letters, uncover hidden words, and solve satisfying Arabic word puzzles one thoughtful move at a time.',
    longDescription: 'Between The Letters is a calm, clever Arabic word puzzle built around one simple idea: connect the letters and reveal every hidden word. Each board begins as a compact challenge, then grows into a satisfying test of vocabulary, pattern spotting, and creative thinking across a journey of countries and cities.',
    tags: ['Words', 'Puzzle', 'Relaxing'],
    images: [betweenTheLetters1, betweenTheLetters2, betweenTheLetters3, betweenTheLetters4, betweenTheLetters5, betweenTheLetters6, betweenTheLetters7, betweenTheLetters8],
    portrait: true,
    poster: betweenTheLettersPoster,
    luminisUrl: 'https://www.luminisst.com/games/between-the-letters',
  },
};

function StylizedTitle({ title }) {
  const words = title.split(' ');
  const finalWord = words.pop();

  return (
    <h1>
      {words.length > 0 && <>{words.join(' ')}<br /></>}
      <em>{finalWord}</em>
    </h1>
  );
}

function StoreButtons({ game }) {
  const hasStore = game.appStore || game.googlePlay;

  return (
    <div className="game-store-buttons">
      {game.appStore && (
        <a href={game.appStore} target="_blank" rel="noreferrer">
          <i className="fa-brands fa-apple" />
          <span><small>DOWNLOAD ON THE</small>APP STORE</span>
        </a>
      )}
      {game.googlePlay && (
        <a href={game.googlePlay} target="_blank" rel="noreferrer">
          <i className="fa-brands fa-google-play" />
          <span><small>GET IT ON</small>GOOGLE PLAY</span>
        </a>
      )}
      {!hasStore && <span className="game-coming-soon">COMING SOON</span>}
    </div>
  );
}

function PhoneScreenCarousel({ game }) {
  const phoneImages = [game.poster, ...game.images.filter((image) => image !== game.poster)];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % phoneImages.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [game.slug, phoneImages.length]);

  return (
    <div className="iphone-screen">
      {phoneImages.map((image, index) => (
        <img
          key={image}
          className={`game-hero-art-main${activeImage === index ? ' is-active' : ''}`}
          src={image}
          alt={activeImage === index ? `${game.title} screen ${index + 1}` : ''}
        />
      ))}
      <span className="iphone-dynamic-island" aria-hidden="true" />
      <span className="iphone-home-indicator" aria-hidden="true" />
    </div>
  );
}

function GameGallery({ game }) {
  const viewportRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const media = game.images.slice(0, 6).map((src) => ({ type: 'image', src }));

  const updateSliderState = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const nextProgress = maxScroll > 0 ? (viewport.scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(nextProgress);
    setCanGoBack(viewport.scrollLeft > 2);
    setCanGoForward(viewport.scrollLeft < maxScroll - 2);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    viewport.scrollLeft = 0;
    const frame = window.requestAnimationFrame(updateSliderState);
    window.addEventListener('resize', updateSliderState);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateSliderState);
    };
  }, [game.slug]);

  const moveSlider = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({ left: viewport.clientWidth * 0.78 * direction, behavior: 'smooth' });
  };

  const dragSlider = (event) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    viewport.scrollLeft = (Number(event.target.value) / 100) * maxScroll;
  };

  return (
    <div className={`game-gallery${game.portrait ? ' is-portrait' : ''}`}>
      <div
        className="game-gallery-viewport"
        ref={viewportRef}
        onScroll={updateSliderState}
        aria-label={`${game.title} media gallery`}
      >
        <div className="game-gallery-rail">
          {media.map((item, index) => (
            <figure key={`${item.src}-${index}`} className="game-gallery-card">
              <img src={item.src} alt={`${game.title} screenshot ${index + 1}`} loading="lazy" />
              <figcaption>FRAME {String(index + 1).padStart(2, '0')}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="game-gallery-controls">
        <button type="button" onClick={() => moveSlider(-1)} disabled={!canGoBack} aria-label="Previous screenshots">←</button>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={scrollProgress}
          onChange={dragSlider}
          aria-label="Gallery position"
          style={{ '--gallery-progress': `${scrollProgress}%` }}
        />
        <button type="button" onClick={() => moveSlider(1)} disabled={!canGoForward} aria-label="Next screenshots">→</button>
      </div>
    </div>
  );
}

function MobileGamePage() {
  const { slug } = useParams();
  const game = MOBILE_GAMES[slug];

  useEffect(() => {
    const scrollTimer = window.setTimeout(() => {
      const hashTarget = window.location.hash && document.querySelector(window.location.hash);
      if (hashTarget) hashTarget.scrollIntoView({ block: 'start' });
      else window.scrollTo(0, 0);
    }, 60);
    document.title = game ? `${game.title} — ghiath.codes` : 'Game not found — ghiath.codes';
    return () => {
      window.clearTimeout(scrollTimer);
      document.title = 'ghiath.codes';
    };
  }, [game]);

  if (!game) {
    return (
      <main className="game-not-found">
        <p>404 / GAME NOT FOUND</p>
        <h1>This level does not exist.</h1>
        <Link to="/#projects">BACK TO PROJECTS →</Link>
      </main>
    );
  }

  const gameSlugs = Object.keys(MOBILE_GAMES);
  const nextSlug = gameSlugs[(gameSlugs.indexOf(game.slug) + 1) % gameSlugs.length];
  const nextGame = MOBILE_GAMES[nextSlug];

  return (
    <main className="game-detail-page">
      <header className="topbar game-detail-topbar">
        <Link className="brand" to="/" aria-label="Ghiath Alabed home">GHIATH<span>®</span></Link>
        <nav className="main-nav" aria-label="Game page navigation">
          <Link to="/#about">ABOUT</Link>
          <Link to="/#projects">PROJECTS</Link>
          <a href="#gallery">GALLERY</a>
        </nav>
        <Link className="contact-link" to="/#projects">ALL PROJECTS ←</Link>
      </header>

      <section className="game-detail-hero" id="top">
        <div className="game-hero-copy">
          <div className="game-page-kicker"><span>GAME / MOBILE</span><span>{game.status}</span></div>
          <StylizedTitle title={game.title} />
          <p className="game-hero-description">{game.description}</p>
          <StoreButtons game={game} />
          <dl className="game-quick-facts">
            <div><dt>TYPE</dt><dd>{game.genre}</dd></div>
            <div><dt>PLATFORM</dt><dd>iOS / Android</dd></div>
            <div><dt>BUILT WITH</dt><dd>Unity / C#</dd></div>
          </dl>
        </div>

        <figure className={`game-hero-art${game.portrait ? ' is-portrait' : ' is-landscape'}`}>
          <div className="iphone-mockup">
            <span className="iphone-action-button iphone-mute-button" aria-hidden="true" />
            <span className="iphone-action-button iphone-volume-up" aria-hidden="true" />
            <span className="iphone-action-button iphone-volume-down" aria-hidden="true" />
            <span className="iphone-action-button iphone-power-button" aria-hidden="true" />
            <PhoneScreenCarousel game={game} />
          </div>
          <figcaption><span>01</span> KEY ART / {game.title.toUpperCase()}</figcaption>
        </figure>
      </section>

      <section className="game-about-section">
        <div className="game-section-heading">
          <span>01 / ABOUT THE GAME</span>
          <p>DESIGNED FOR SMALL SCREENS.<br />BUILT FOR BIG MOMENTS.</p>
        </div>
        <div className="game-about-grid">
          <h2>Playful by design.<br /><em>Precise</em> by code.</h2>
          <div>
            <p>{game.longDescription}</p>
            <div className="game-tag-list">
              {game.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <a className="game-studio-link" href={game.luminisUrl} target="_blank" rel="noreferrer">
              VIEW ON LUMINIS STUDIO <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="game-showcase-section" id="gallery">
        <div className="game-showcase-title">
          <span>INSIDE THE GAME</span>
          <h2>A closer look.</h2>
        </div>
        <GameGallery game={game} />
      </section>

      <section className="game-next-section">
        <p>NEXT MOBILE GAME</p>
        <Link to={`/games/${nextGame.slug}`}>
          <span>{nextGame.title}</span>
          <strong>→</strong>
        </Link>
        <footer className="game-page-footer">
          <p>© 2026 GHIATH ALABED</p>
          <Link to="/#projects">BACK TO PROJECTS</Link>
          <a href="#top">BACK TO TOP ↑</a>
        </footer>
      </section>
    </main>
  );
}

export default MobileGamePage;
