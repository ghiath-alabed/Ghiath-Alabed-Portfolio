import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gameShelves, steamProfile } from './comfortZoneData';
import './ComfortZone.css';

function GameCard({ game, index }) {
  const [coverFailed, setCoverFailed] = useState(false);
  const platform = game.scorePlatform || 'Metacritic';
  return (
    <article className="cz-game">
      <a className="cz-cover" href={game.storeUrl} target="_blank" rel="noreferrer" aria-label={`${game.title} — ${game.storeLabel}`}>
        {game.cover && !coverFailed ? <img src={game.cover} alt={`${game.title} cover art`} loading="lazy" onError={() => setCoverFailed(true)} /> : <span className="cz-cover-fallback">{game.title}</span>}
        <span className="cz-game-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="cz-cover-cta">{game.storeLabel} ↗</span>
      </a>
      <div className="cz-game-info"><h3>{game.title}</h3><p>{[game.year, game.genre].filter(Boolean).join(' · ')}</p></div>
      {(game.hours != null || game.replays > 1) && <div className="cz-game-playtime">{game.hours != null && <span>{game.hours.toLocaleString('en-US')} hours</span>}{game.replays > 1 && <span>↻ {game.replays} playthroughs</span>}</div>}
      {game.note && <p className="cz-game-note">{game.note}</p>}
      <div className="cz-rating-row">{Number.isFinite(game.metascore) && game.metacriticUrl ? <a className="cz-rating-link" href={game.metacriticUrl} target="_blank" rel="noreferrer" title={`Highest platform Metascore · ${platform} · ${game.metascore}/100`} aria-label={`${game.title}: highest Metacritic score ${game.metascore}/100 on ${platform}`}><span className={`cz-score${game.metascore < 50 ? ' cz-score--low' : game.metascore < 75 ? ' cz-score--mixed' : ''}`}>{game.metascore}</span><span>Metascore<small>{platform}</small></span><span className="cz-rating-arrow" aria-hidden="true">↗</span></a> : <span className="cz-no-score">— <span>Not yet rated</span></span>}</div>
    </article>
  );
}

export default function ComfortZone() {
  const [activeShelf, setActiveShelf] = useState('completed');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('shelf');
  const byId = new Map(gameShelves.flatMap((item) => item.games).map((game) => [game.id, game]));
  const shelves = gameShelves;
  const shelf = shelves.find((item) => item.id === activeShelf);
  const games = shelf.games.filter((game) => game.title.toLocaleLowerCase('en').includes(query.trim().toLocaleLowerCase('en')));
  if (sort === 'name') games.sort((a, b) => a.title.localeCompare(b.title, 'en'));
  if (sort === 'score') games.sort((a, b) => (b.metascore ?? -1) - (a.metascore ?? -1));
  const count = shelves.reduce((total, item) => total + item.games.length, 0);
  const visibleIds = new Set(shelves.flatMap((item) => item.games.map((game) => game.id)));
  const showcaseGames = ['completed-5', 'completed-16', 'completed-1', 'completed-18', 'completed-12'].filter((id) => visibleIds.has(id)).map((id) => byId.get(id));

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'ghiath.codes';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="comfort-page" lang="en">
      <header className="topbar cz-topbar">
        <Link className="brand" to="/" aria-label="Ghiath Alabed home">GHIATH<span>®</span></Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/#about">ABOUT</Link><Link to="/#projects">PROJECTS</Link><Link to="/#contact">CONTACT</Link><Link to="/comfort-zone" aria-current="page">COMFORT ZONE</Link>
        </nav>
        <a className="contact-link" href="mailto:ghiath@luminisst.com">LET’S TALK ↗</a>
      </header>
      <main className="cz-main">
        <section className="cz-intro" aria-labelledby="cz-title">
          <div className="cz-intro-text"><Link className="cz-back" to="/">↖ BACK TO PORTFOLIO</Link><p className="cz-eyebrow"><span /> OFF THE CLOCK. IN MY ELEMENT.</p><h1 id="cz-title">Comfort<br /><em>zone.</em><span className="cz-title-mark" aria-hidden="true">✳</span></h1><p className="cz-intro-copy">Good stories. New worlds. One more chapter.<br />A little corner for the games I spend my time with.</p><a className="cz-browse" href="#library">EXPLORE THE SHELVES <span>↓</span></a></div>
          <div className="cz-intro-aside"><div className="cz-showcase" aria-hidden="true"><span className="cz-showcase-orbit" />{showcaseGames.map((game, index) => <img key={game.id} className={`cz-showcase-cover cz-showcase-cover--${index}`} src={game.cover} alt="" />)}<span className="cz-showcase-caption">FROM THE COLLECTION / {String(count).padStart(2, '0')} GAMES</span></div><aside className="cz-steam" aria-label="Steam profile"><span className="cz-steam-icon"><i className="fa-brands fa-steam" aria-hidden="true" /></span><div className="cz-player"><h2>{steamProfile.name}</h2><p>My own pace. My own worlds.</p></div>{steamProfile.url ? <a href={steamProfile.url} target="_blank" rel="noreferrer">Steam profile <span>↗</span></a> : <p className="cz-steam-pending">Coming soon</p>}</aside></div>
        </section>
        <section className="cz-library" id="library" aria-labelledby="cz-library-title">
          <div className="cz-library-top"><div><span className="cz-eyebrow">01 / THE COLLECTION</span><h2 id="cz-library-title">A shelf for <em>every chapter.</em></h2></div><span className="cz-platform">{count} GAMES. THREE SHELVES.<br />ALWAYS ROOM FOR ONE MORE.</span></div>
          <div className="cz-shelves" aria-label="Game lists">{shelves.map((item, index) => <button type="button" key={item.id} className={item.id === activeShelf ? 'is-active' : ''} aria-pressed={item.id === activeShelf} onClick={() => { setActiveShelf(item.id); setQuery(''); }}><span className="cz-shelf-label"><span className="cz-tab-icon" aria-hidden="true">0{index + 1}</span>{item.shortLabel}<span className="cz-shelf-arrow" aria-hidden="true">↗</span></span><span className="cz-count">{String(item.games.length).padStart(2, '0')}</span></button>)}</div>
          <div className="cz-toolbar"><div><h3>{shelf.label}</h3><p>{shelf.description}</p></div><div className="cz-controls"><label className="cz-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search games in this list" placeholder="Search games…" value={query} onChange={(event) => setQuery(event.target.value)} /></label><select aria-label="Sort games" value={sort} onChange={(event) => setSort(event.target.value)}><option value="shelf">Shelf order</option><option value="name">Name: A–Z</option><option value="score">Metacritic score</option></select></div></div>
          <div aria-live="polite">{games.length > 0 ? <div className="cz-grid">{games.map((game, index) => <GameCard key={game.id} game={game} index={index} />)}</div> : <div className="cz-empty"><div className="cz-empty-covers" aria-hidden="true"><span /><span>{query ? '⌕' : shelf.icon}</span><span /></div><h3>{query ? 'No matching games on this shelf.' : shelf.emptyTitle}</h3><p>{query ? 'Try searching for another title.' : shelf.emptyDescription}</p>{query && <button type="button" onClick={() => setQuery('')}>Clear search</button>}</div>}</div>
          <div className="cz-library-foot"><span>{games.length} games / {shelf.label}</span><span>METACRITIC · HIGHEST PLATFORM SCORE / 100 · — UNRATED</span></div>
        </section>
        <footer className="cz-footer"><Link to="/">↖ Back to portfolio</Link><span>JUST ONE MORE GAME.</span><span>GHIATH®</span></footer>
      </main>
    </div>
  );
}
