import json, re, html, urllib.parse
from fetch_comfort_games import ROOT, ASSETS, request, get_json

PAGES = {
 'Grand Theft Auto: Liberty City Stories': 'Grand_Theft_Auto:_Liberty_City_Stories',
 'Alan Wake 2': 'Alan_Wake_2',
 'Grand Theft Auto VI': 'Grand_Theft_Auto_VI',
 '007 First Light': '007_First_Light',
 'Call of Duty: Black Ops 6': 'Call_of_Duty:_Black_Ops_6',
}
path = ROOT / 'src/comfortGames.json'
games = json.loads(path.read_text(encoding='utf-8'))
for game in games:
    if game['title'] not in PAGES: continue
    try:
        page_url = 'https://en.wikipedia.org/wiki/' + urllib.parse.quote(PAGES[game['title']], safe=':_')
        page = request(page_url).decode('utf-8')
        match = re.search(r'<meta property="og:image" content="([^"]+)"', page)
        if not match: raise ValueError('Cover not found')
        url = html.unescape(match.group(1))
        blob = request(url)
        ext = '.png' if blob.startswith(b'\x89PNG') else '.webp' if blob.startswith(b'RIFF') else '.jpg'
        name = game['id'] + ext
        (ASSETS / name).write_bytes(blob)
        game['cover'] = '/games/' + name
        game['coverSource'] = url
        print(game['title'] + ': ' + url, flush=True)
    except Exception as error: print('ERROR ' + game['title'] + ': ' + str(error), flush=True)
path.write_text(json.dumps(games, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
