# Reversible English-Japanese Anki Card

This package contains a beginner-friendly note type that creates two cards:

1. English to Japanese
2. Japanese to English

## Fields

Create the fields in this order:

1. `English`
2. `Japanese`
3. `Pronunciation`
4. `PartOfSpeech`
5. `ExampleEnglish`
6. `ExampleJapanese`

The card uses Anki's built-in text-to-speech support. You do not need to
generate MP3 files or create audio fields.

## Install

In Anki, create a new note type with the fields above. Add two card types and
paste in the matching files from `templates/`:

- Card 1 uses `card1-en-ja-front.html` and `card1-en-ja-back.html`
- Card 2 uses `card2-ja-en-front.html` and `card2-ja-en-back.html`
- Both cards use `styling.css`

The templates use:

```text
{{tts en_US:English}}
{{tts en_US:ExampleEnglish}}
```

Anki reads the word and example sentence using an installed US English system
voice. The replay buttons work without custom JavaScript.

TTS requires Anki 2.1.20+, AnkiMobile 2.0.56+, or AnkiDroid 2.17+. Windows,
macOS, and iOS use system voices. Linux requires a TTS add-on or voice provider.

To inspect the voices available on a device, temporarily add this to a card
template:

```text
{{tts-voices:}}
```

## Preview

Open `preview/index.html` in a browser. Use the controls above the card to
switch direction, reveal the answer, and toggle dark mode.
