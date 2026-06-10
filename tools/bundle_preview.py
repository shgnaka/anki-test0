import argparse
from base64 import b64encode
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

html = (ROOT / "preview" / "index.html").read_text(encoding="utf-8")
css = (
    (ROOT / "templates" / "styling.css").read_text(encoding="utf-8")
    + (ROOT / "preview" / "preview.css").read_text(encoding="utf-8")
)
javascript = (ROOT / "preview" / "preview.js").read_text(encoding="utf-8")

html = html.replace(
    '<link rel="stylesheet" href="../templates/styling.css" />',
    f"<style>{css}</style>",
)
html = html.replace('<link rel="stylesheet" href="preview.css" />', "")
html = html.replace(
    '<script src="preview.js"></script>',
    f"<script>{javascript}</script>",
)

parser = argparse.ArgumentParser()
parser.add_argument("--output", type=Path)
args = parser.parse_args()

if args.output:
    args.output.write_text(html, encoding="utf-8")
else:
    print(b64encode(html.encode("utf-8")).decode("ascii"))
