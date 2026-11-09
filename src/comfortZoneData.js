import games from './comfortGames.json';

// Personal lists and playtime transcribed from the supplied screenshots.
// Artwork and platform-specific scores include source URLs in comfortGames.json.
export const steamProfile = { name: 'M I R A G E', url: 'https://steamcommunity.com/profiles/76561199116822970/' };

export const gameShelves = [
  { id: 'completed', label: 'Completed Games', shortLabel: 'Completed', icon: '✓', description: 'All the way to the credits. Worlds explored, stories that stayed with me.', emptyTitle: 'Every finished game leaves a story.', emptyDescription: 'Completed games will find their place on this shelf.', games: [] },
  { id: 'backlog', label: 'Backlog', shortLabel: 'Backlog', icon: '▷', description: 'The next adventure. Games waiting for the right moment.', emptyTitle: 'Room for the next adventure.', emptyDescription: 'Games waiting to be played will appear here.', games: [] },
  { id: 'wishlist', label: 'Wishlist', shortLabel: 'Wishlist', icon: '♡', description: 'On my radar. Worlds I want to explore someday.', emptyTitle: 'There are more worlds to discover.', emptyDescription: 'Games on my wishlist will appear here.', games: [] },
].map((shelf) => ({ ...shelf, games: games.filter((game) => game.shelf === shelf.id) }));
