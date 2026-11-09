"""Record the highest verified platform Metascore for each matching game edition."""
import concurrent.futures
import datetime
import json
import re
import runpy
import urllib.parse
from pathlib import Path
from fetch_comfort_games import ROOT, request

product_data = runpy.run_path(str(Path(__file__).with_name('fetch-comfort-metacritic.py')))['product_data']

def refresh(game):
    game = dict(game)
    previous_url = game.get('metacriticUrl')
    if not previous_url:
        raise ValueError('Missing Metacritic URL for ' + game['title'])
    slug = urllib.parse.urlparse(previous_url).path.strip('/').split('/')[-1]
    url = f'https://www.metacritic.com/game/{slug}/'
    product = product_data(request(url).decode('utf-8'), slug)
    platforms = []
    for platform in product.get('platforms', []):
        summary = platform.get('criticScoreSummary') or {}
        score = summary.get('score')
        if isinstance(score, (int, float)) and not isinstance(score, bool):
            platforms.append({
                'platform': platform['name'],
                'score': score,
                'url': url + '?platform=' + platform['slug'],
            })
    game['platformScores'] = platforms
    game['scorePolicy'] = 'highest-platform-same-edition'
    game['scoreCheckedAt'] = datetime.date.today().isoformat()
    game['verifiedMetacriticTitle'] = product['title']
    if platforms:
        best = max(platforms, key=lambda entry: entry['score'])
        game.update(metascore=best['score'], scorePlatform=best['platform'], metacriticUrl=best['url'], scoreSource=best['url'], scoreStatus='verified')
    else:
        game.update(metascore=None, scorePlatform=None, metacriticUrl=url, scoreSource=url, scoreStatus='unscored')
    print(json.dumps({'title':game['title'], 'score':game['metascore'], 'platform':game['scorePlatform'], 'platformsChecked':len(platforms)}), flush=True)
    return game

if __name__ == '__main__':
    path = ROOT / 'src/comfortGames.json'
    games = json.loads(path.read_text(encoding='utf-8'))
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        # Keep the existing file intact if any source could not be verified.
        games = list(pool.map(refresh, games))
    path.write_text(json.dumps(games, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
