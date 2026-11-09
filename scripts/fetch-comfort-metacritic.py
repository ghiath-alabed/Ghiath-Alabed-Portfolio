"""Supplement Steam's missing PC scores with platform-specific Metacritic data."""
import concurrent.futures, html, json, re, sys
from fetch_comfort_games import ROOT, ASSETS, request

SLUGS = {
 '2668510': 'red-dead-redemption-featuring-undead-nightmare',
 '1547000': 'grand-theft-auto-san-andreas-the-definitive',
 '1546990': 'grand-theft-auto-vice-city-the-definitive-edition',
 '1546970': 'grand-theft-auto-iii-the-definitive-edition',
 '1030830': 'mafia-ii-definitive-edition',
 '1941540': 'mafia-the-old-country',
 '1888930': 'the-last-of-us-part-i',
 '2531310': 'the-last-of-us-part-ii-remastered',
 '1659420': 'uncharted-legacy-of-thieves-collection',
 '2215430': 'ghost-of-tsushima-directors-cut',
 '1817070': 'marvels-spider-man-remastered',
 '2208920': 'assassins-creed-valhalla',
 '3035570': 'assassins-creed-mirage',
 '289650': 'assassins-creed-unity',
 '582160': 'assassins-creed-origins',
 '1238840': 'battlefield-1',
 '2933620': 'call-of-duty-black-ops-6',
 '238090': 'sniper-elite-iii',
 '2080640': 'first-date-late-to-date',
 '3768760': '007-first-light',
 '1774580': 'star-wars-jedi-survivor',
 '242050': 'assassins-creed-iv-black-flag',
 '360430': 'mafia-iii-definitive-edition',
 '1238810': 'battlefield-v',
 '208650': 'batman-arkham-knight',
 '911400': 'assassins-creed-iii-remastered',
 '812140': 'assassins-creed-odyssey',
 '2239550': 'watch-dogs-legion',
 '447040': 'watch-dogs-2',
 '235600': 'tom-clancys-splinter-cell-blacklist',
 '1715130': 'crysis-remastered',
 '2096600': 'crysis-2-remastered',
 '2096610': 'crysis-3-remastered',
 '2369390': 'far-cry-6',
 '742420': 'saints-row',
 '2651280': 'marvels-spider-man-2',
 '3159330': 'assassins-creed-shadows',
 '2461850': 'senuas-saga-hellblade-ii',
}
SPECIAL = {
 'Grand Theft Auto: Liberty City Stories': ('grand-theft-auto-liberty-city-stories', 'https://www.rockstargames.com/games/libertycitystories', 'Rockstar Games'),
 'Alan Wake 2': ('alan-wake-ii', 'https://store.epicgames.com/en-US/p/alan-wake-2', 'Epic Games'),
 'Grand Theft Auto VI': ('grand-theft-auto-vi', 'https://www.rockstargames.com/VI', 'Rockstar Games'),
}

def product_data(page, slug):
    match = re.search(r'<script[^>]*id="__NUXT_DATA__"[^>]*>(.*?)</script>', page)
    if not match: raise ValueError('No product data')
    data = json.loads(match.group(1))
    def resolve(value, depth=0):
        if depth > 15: return None
        if isinstance(value, dict): return {k: resolve(data[x],depth+1) if isinstance(x,int) and x >= 0 else None for k,x in value.items()}
        if isinstance(value, list): return [resolve(data[x],depth+1) if isinstance(x,int) and x >= 0 else x for x in value]
        return value
    for item in data:
        if isinstance(item, dict) and 'slug' in item and 'platforms' in item and 'images' in item:
            if data[item['slug']] == slug:
                return resolve(item)
    raise ValueError('Matching product not found')

def enrich(game):
    slug = SLUGS.get(str(game['steamId']))
    if game['title'] in SPECIAL:
        slug, game['storeUrl'], game['storeLabel'] = SPECIAL[game['title']]
    if not slug: return game
    url = f'https://www.metacritic.com/game/{slug}/?platform=pc'
    try:
        page = request(url).decode('utf-8')
        product = product_data(page, slug)
        pc = next((p for p in product.get('platforms', []) if p.get('name') == 'PC'), None)
        score = (pc or {}).get('criticScoreSummary', {}).get('score')
        game['metascore'] = score
        game['metacriticUrl'] = url
        game['scoreSource'] = url
        game['verifiedMetacriticTitle'] = product.get('title')
        game['scoreStatus'] = 'verified' if score is not None else 'unscored' if pc else 'no-pc-edition'
        if product.get('genres'): game['genre'] = product['genres'][0]['name']
        if not game.get('cover') or game['steamId'] == 2933620:
            filename = next((x['filename'] for x in product.get('images', []) if x.get('filename')), None)
            candidates = re.findall(r'https://[^"<>\s]+', page)
            image_url = next((html.unescape(x).split(' ')[0] for x in candidates if filename and filename in x and x.startswith('https:')), None)
            if image_url:
                blob = request(image_url)
                ext = '.png' if blob.startswith(b'\x89PNG') else '.webp' if blob.startswith(b'RIFF') else '.jpg'
                name = slug + ext
                (ASSETS / name).write_bytes(blob)
                game['cover'] = '/games/' + name
                game['coverSource'] = image_url
        print(json.dumps({'title':game['title'], 'verified': product['title'], 'score':score, 'cover':game.get('cover')}), flush=True)
    except Exception as error:
        print('ERROR ' + game['title'] + ': ' + str(error), flush=True)
    return game

if __name__ == '__main__':
    path = ROOT / 'src/comfortGames.json'
    games = json.loads(path.read_text(encoding='utf-8'))
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        games = list(pool.map(lambda game: enrich(game) if len(sys.argv) == 1 or str(game['steamId']) in sys.argv[1:] else game, games))
    path.write_text(json.dumps(games, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
