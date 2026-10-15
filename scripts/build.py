"""Create an offline, self-contained game using Python's standard library."""
from pathlib import Path
import base64
import json
import re

root = Path(__file__).resolve().parent.parent

def data_uri(path):
    mime = {".svg":"image/svg+xml", ".png":"image/png", ".mp3":"audio/mpeg"}[path.suffix]
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode("ascii")

assets = {p.stem: data_uri(p) for p in (root / "assets").glob("*.png")}
sounds = {p.stem: data_uri(p) for p in (root / "assets").glob("*.mp3")}
emblem = data_uri(root / "assets/emblem.svg")
html = (root / "index.html").read_text()
css = (root / "style.css").read_text()
js = (root / "app.js").read_text()
js = "const ASSET_URLS = " + json.dumps(assets) + ";\n" + js
js = js.replace('src="assets/${h.id}.png"', 'src="${ASSET_URLS[h.id]}"')
js = js.replace('src="assets/monster-${m.id}.png"', 'src="${ASSET_URLS["monster-"+m.id]}"')
js = "const SOUND_URLS = " + json.dumps(sounds) + ";\n" + js
js = js.replace('return `assets/voice-${id}.mp3`', 'return SOUND_URLS["voice-"+id]')
js = js.replace("assets/emblem.svg", emblem)
html = re.sub(r'<link rel="stylesheet" href="style\.css(?:\?v=[\d.]+)?">', lambda _: "<style>\n" + css + "\n</style>", html)
html = re.sub(r'<script src="app\.js(?:\?v=[\d.]+)?" defer></script>', "", html)
html = html.replace("assets/emblem.svg", emblem)
html = html.replace("</body>", "<script>\n" + js + "\n</script>\n</body>")
assert "assets/" not in html, "Unbundled asset reference"
target = root / "小英雄基地.html"
target.write_text(html)
print(f"Built {target.name} ({target.stat().st_size / 1024 / 1024:.2f} MB); all assets embedded.")
