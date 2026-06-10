const data = {
  English: "abandon",
  Japanese: "捨てる、断念する",
  Pronunciation: "/əˈbændən/",
  PartOfSpeech: "verb / 動詞",
  ExampleEnglish: "He had to abandon the plan.",
  ExampleJapanese: "彼はその計画を断念しなければならなかった。",
};

let direction = "en-ja";
let showingAnswer = false;

const root = document.querySelector("#card-root");
const directionButton = document.querySelector("#direction");
const revealButton = document.querySelector("#reveal");
const themeButton = document.querySelector("#theme");

const audioButton = (label, small = false) => `
  <span class="audio-button${small ? " audio-button--small" : ""}">
    <button class="preview-audio" type="button" aria-label="${label}"></button>
  </span>
`;

function corners(includeTop = false) {
  return `
    ${includeTop ? '<div class="corner corner--top" aria-hidden="true"></div><div class="corner-dots corner-dots--top" aria-hidden="true"></div>' : ""}
    <div class="corner corner--bottom" aria-hidden="true"></div>
    <div class="corner-dots corner-dots--bottom" aria-hidden="true"></div>
  `;
}

function englishFront() {
  return `
    <main class="study-card study-card--front">
      ${corners(true)}
      <section class="prompt-block">
        <div class="word-row word-row--vocabulary">
          ${audioButton("Play word audio")}
          <div class="prompt prompt--english fit-one-line">${data.English}</div>
        </div>
        <div class="rule"></div>
        <div class="metadata">
          <span class="pronunciation">${data.Pronunciation}</span>
          <span class="metadata-divider"></span>
          <span class="part-of-speech">${data.PartOfSpeech}</span>
        </div>
      </section>
    </main>`;
}

function englishBack() {
  return `
    <main class="study-card study-card--back">
      <header class="answer-header">
        <div class="answer-kicker">${data.English}</div>
        <div class="rule"></div>
      </header>
      <section class="answer-content">
        <div class="answer answer--japanese">${data.Japanese}</div>
        <div class="accent-rule" aria-hidden="true"><span></span></div>
        <div class="example-row">
          ${audioButton("Play example audio", true)}
          <div class="example example--english">${data.ExampleEnglish}</div>
        </div>
        <div class="translation">${data.ExampleJapanese}</div>
      </section>
      ${corners()}
    </main>`;
}

function japaneseFront() {
  return `
    <main class="study-card study-card--front">
      ${corners(true)}
      <section class="prompt-block">
        <div class="word-row word-row--vocabulary">
          <div class="prompt prompt--japanese fit-one-line">${data.Japanese}</div>
        </div>
        <div class="rule"></div>
        <div class="metadata metadata--single">
          <span class="part-of-speech">${data.PartOfSpeech}</span>
        </div>
      </section>
    </main>`;
}

function japaneseBack() {
  return `
    <main class="study-card study-card--back">
      <header class="answer-header">
        <div class="answer-kicker">${data.Japanese}</div>
        <div class="rule"></div>
      </header>
      <section class="answer-content">
        <div class="word-row word-row--answer">
          ${audioButton("Play word audio")}
          <div class="answer answer--english">${data.English}</div>
        </div>
        <div class="metadata metadata--answer">
          <span class="pronunciation">${data.Pronunciation}</span>
          <span class="metadata-divider"></span>
          <span class="part-of-speech">${data.PartOfSpeech}</span>
        </div>
        <div class="accent-rule" aria-hidden="true"><span></span></div>
        <div class="example example--japanese">${data.ExampleJapanese}</div>
        <div class="example-row example-row--translation">
          ${audioButton("Play example audio", true)}
          <div class="translation translation--english">${data.ExampleEnglish}</div>
        </div>
      </section>
      ${corners()}
    </main>`;
}

function render() {
  if (direction === "en-ja") {
    root.innerHTML = showingAnswer ? englishBack() : englishFront();
  } else {
    root.innerHTML = showingAnswer ? japaneseBack() : japaneseFront();
  }

  directionButton.textContent =
    direction === "en-ja" ? "English → Japanese" : "Japanese → English";
  revealButton.textContent = showingAnswer ? "Show front" : "Show answer";
  fitVocabularyToOneLine();
}

function fitVocabularyToOneLine() {
  const word = root.querySelector(".fit-one-line");
  if (!word) return;

  let size = Number.parseFloat(window.getComputedStyle(word).fontSize);
  while (word.scrollWidth > word.clientWidth && size > 28) {
    size -= 1;
    word.style.fontSize = `${size}px`;
  }
}

directionButton.addEventListener("click", () => {
  direction = direction === "en-ja" ? "ja-en" : "en-ja";
  showingAnswer = false;
  render();
});

revealButton.addEventListener("click", () => {
  showingAnswer = !showingAnswer;
  render();
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("nightMode");
  themeButton.textContent = document.body.classList.contains("nightMode")
    ? "Light mode"
    : "Dark mode";
});

root.addEventListener("click", (event) => {
  if (event.target.closest(".preview-audio")) {
    event.target.closest(".audio-button").animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.92)" },
        { transform: "scale(1)" },
      ],
      { duration: 220 },
    );
  }
});

render();
