import json
import sqlite3
import sys
import tempfile
import zipfile
from pathlib import Path


apkg = Path(sys.argv[1])

with tempfile.TemporaryDirectory() as temp_dir:
    with zipfile.ZipFile(apkg) as archive:
        collection_name = next(
            name for name in archive.namelist() if name.startswith("collection.anki2")
        )
        archive.extract(collection_name, temp_dir)

    connection = sqlite3.connect(Path(temp_dir) / collection_name)
    models = json.loads(connection.execute("SELECT models FROM col").fetchone()[0])
    note_count = connection.execute("SELECT COUNT(*) FROM notes").fetchone()[0]
    card_count = connection.execute("SELECT COUNT(*) FROM cards").fetchone()[0]
    connection.close()

model = next(iter(models.values()))
field_names = [field["name"] for field in model["flds"]]
template_names = [template["name"] for template in model["tmpls"]]
templates = " ".join(
    template["qfmt"] + template["afmt"] for template in model["tmpls"]
)

assert field_names == [
    "英単語",
    "日本語の意味",
    "品詞",
    "英語の例文",
    "例文の日本語訳",
]
assert template_names == ["English → Japanese", "Japanese → English"]
assert note_count == 1
assert card_count == 2
assert "{{tts en_US:英単語}}" in templates
assert "{{tts en_US:英語の例文}}" in templates

print(
    f"verified: {len(field_names)} fields, {len(template_names)} templates, "
    f"{note_count} note, {card_count} cards"
)
