"""Refresh public Steam metadata and download library artwork. No API key needed."""
import concurrent.futures, json, pathlib, re, time, urllib.request, urllib.parse

ROOT = pathlib.Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'public' / 'games'
ASSETS.mkdir(parents=True, exist_ok=True)

def request(url):
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=25) as response:
                return response.read()
        except Exception:
            if attempt == 2: raise
            time.sleep(1 + attempt)

def get_json(url):
    return json.loads(request(url))

def enrich(game):
    game = dict(game)
    appid = game['steamId']
    if not appid and game['title'] in ['Mafia: The Old Country', 'First Date: Late To Date']:
        result = get_json('https://store.steampowered.com/api/storesearch/?term=' + urllib.parse.quote(game['title']) + '&l=english&cc=us')
        matches = result.get('items', [])
        if matches:
            appid = game['steamId'] = matches[0]['id']
    if not appid:
        return game
    try:
        url = f'https://store.steampowered.com/api/appdetails?appids={appid}&l=english&cc=us'
        result = get_json(url).get(str(appid), {})
        if result.get('success'):
            data = result['data']
            game['verifiedSteamTitle'] = data['name']
            game['genre'] = ' / '.join(g['description'] for g in data.get('genres', [])[:2])
            meta = data.get('metacritic', {})
            game['metascore'] = meta.get('score')
            game['metacriticUrl'] = meta.get('url')
            game['metadataSource'] = url
        game['storeUrl'] = f'https://store.steampowered.com/app/{appid}/'
        game['storeLabel'] = 'Steam'
        for suffix in ['library_600x900_2x.jpg', 'library_600x900.jpg', 'portrait.png', 'header.jpg']:
            image_url = f'https://cdn.akamai.steamstatic.com/steam/apps/{appid}/{suffix}'
            try:
                blob = request(image_url)
                if not (blob.startswith(b'\xff\xd8') or blob.startswith(b'\x89PNG')): continue
                filename = f'{appid}' + ('.png' if blob.startswith(b'\x89PNG') else '.jpg')
                (ASSETS / filename).write_bytes(blob)
                game['cover'] = '/games/' + filename
                game['coverSource'] = image_url
                break
            except Exception: continue
        print(json.dumps({ 'title': game['title'], 'match': game.get('verifiedSteamTitle'), 'score': game.get('metascore'), 'cover': game.get('cover') }), flush=True)
    except Exception as error:
        print('ERROR ' + game['title'] + ': ' + str(error), flush=True)
    return game

if __name__ == '__main__':
    seeds = json.loads((ROOT / 'scripts/comfort-games.json').read_text(encoding='utf-8'))
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        games = list(pool.map(enrich, seeds))
    (ROOT / 'src/comfortGames.json').write_text(json.dumps(games, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Saved {len(games)} games.', flush=True)
