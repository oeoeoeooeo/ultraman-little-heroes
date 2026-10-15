"""Create an offline, self-contained game using Python's standard library."""
from pathlib import Path
import base64
import json
import re

root = Path(__file__).resolve().parent.parent

def data_uri(path):
    mime = "image/svg+xml" if path.suffix == ".svg" else "image/png"
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode("ascii")

assets = {p.stem: data_uri(p) for p in (root / "assets").glob("*.png")}
emblem = data_uri(root / "assets/emblem.svg")
html = (root / "index.html").read_text()
css = (root / "style.css").read_text()
js = (root / "app.js").read_text()
js = "const ASSET_URLS = " + json.dumps(assets) + ";\n" + js
js = js.replace('src="assets/${h.id}.png"', 'src="${ASSET_URLS[h.id]}"')
js = js.replace("assets/emblem.svg", emblem)
html = re.sub(r'<link rel="stylesheet" href="style\.css(?:\?v=[\d.]+)?">', lambda _: "<style>\n" + css + "\n</style>", html)
html = re.sub(r'<script src="app\.js(?:\?v=[\d.]+)?" defer></script>', "", html)
html = html.replace("assets/emblem.svg", emblem)
html = html.replace("</body>", "<script>\n" + js + "\n</script>\n</body>")
assert "assets/" not in html, "Unbundled asset reference"
target = root / "小英雄基地.html"
target.write_text(html)
print(f"Built {target.name} ({target.stat().st_size / 1024 / 1024:.2f} MB); all assets embedded.")
