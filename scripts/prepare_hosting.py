"""Only explicitly allowed, credential-free static assets may be deployed."""
from pathlib import Path
import json
import shutil

root = Path(__file__).resolve().parent.parent
dest = root / "dist"
if dest.exists():
    shutil.rmtree(dest)
dest.mkdir()
for filename in ["index.html", "style.css", "app.js", "404.html"]:
    shutil.copy2(root / filename, dest / filename)
(dest / "assets").mkdir()
for filename in json.loads((root / "asset-manifest.json").read_text()):
    shutil.copy2(root / "assets" / filename, dest / "assets" / filename)
version = json.loads((root / "package.json").read_text())["version"]
(dest / "version.json").write_text(json.dumps({"version":version},ensure_ascii=False)+"\n")
files = sorted(p.relative_to(dest).as_posix() for p in dest.rglob("*") if p.is_file())
assert len(files) == 5 + len(json.loads((root / "asset-manifest.json").read_text()))
print(f"Static Hosting release v{version}: {len(files)} allowed files; no source tools, dependencies or credentials.")
