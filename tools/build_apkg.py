from pathlib import Path

import genanki


ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = ROOT / "templates"
DIST = ROOT / "dist"

MODEL_ID = 1607392319
DECK_ID = 2059400110


def read_template(filename: str) -> str:
    return (TEMPLATES / filename).read_text(encoding="utf-8")


model = genanki.Model(
    MODEL_ID,
    "Beginner English-Japanese Reversible",
    fields=[
        {"name": "English"},
        {"name": "Japanese"},
        {"name": "Pronunciation"},
        {"name": "PartOfSpeech"},
        {"name": "ExampleEnglish"},
        {"name": "ExampleJapanese"},
    ],
    templates=[
        {
            "name": "English → Japanese",
            "qfmt": read_template("card1-en-ja-front.html"),
            "afmt": read_template("card1-en-ja-back.html"),
        },
        {
            "name": "Japanese → English",
            "qfmt": read_template("card2-ja-en-front.html"),
            "afmt": read_template("card2-ja-en-back.html"),
        },
    ],
    css=read_template("styling.css"),
    model_type=genanki.Model.FRONT_BACK,
)

deck = genanki.Deck(DECK_ID, "Beginner English-Japanese Vocabulary")

deck.add_note(
    genanki.Note(
        model=model,
        fields=[
            "abandon",
            "捨てる、断念する",
            "/əˈbændən/",
            "verb / 動詞",
            "He had to abandon the plan.",
            "彼はその計画を断念しなければならなかった。",
        ],
        tags=["sample"],
    )
)

DIST.mkdir(exist_ok=True)
output = DIST / "beginner-english-japanese.apkg"
genanki.Package(deck).write_to_file(output)
print(output)
