const MSG_EN = "Speak a phrase into your microphone";
const MSG_ZH = "對著麥克風說一句話";
const TITLE_EN = "Speech Recognition";
const TITLE_ZH = "語音識別";
const msgEl = document.getElementById("msg");
let langChoice = document.querySelector("#lang-choice");

// Update settings
function updateSettings() {
  if (langChoice.checked) {
    document.title = TITLE_ZH;
    recognition.lang = "zh-TW";
    msgEl.innerText = MSG_ZH;
  } else {
    document.title = TITLE_EN;
    recognition.lang = "en";
    msgEl.innerText = MSG_EN;
  }
  console.log(recognition.lang);
}

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  if (recognition.lang == "en") {
    msgEl.innerHTML = `
      <div>You said: </div>
      <span class="box">${msg}</span>
    `;
  } else {
    msgEl.innerHTML = `
      <div>您說了: </div>
      <span class="box">${msg}</span>
    `;
  }
}

// Initialize
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
updateSettings();

// Start recognition and game
recognition.start();

// Update the language based on the toggle
langChoice.addEventListener("click", () => updateSettings());

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());
