const LOCAL_AUDIO_URL = "/sounds/single-key-press.mp3";
const WRONG_KEY_AUDIO_URL = "/sounds/wrong-key-error.mp3";
let baseAudio: HTMLAudioElement | null = null;
let wrongBaseAudio: HTMLAudioElement | null = null;

function getBaseAudio() {
  if (!baseAudio) {
    baseAudio = new Audio(LOCAL_AUDIO_URL);
    baseAudio.preload = "auto";
    baseAudio.volume = 1.0;
  }
  return baseAudio;
}

function getWrongBaseAudio() {
  if (!wrongBaseAudio) {
    wrongBaseAudio = new Audio(WRONG_KEY_AUDIO_URL);
    wrongBaseAudio.preload = "auto";
    wrongBaseAudio.volume = 1.0;
  }
  return wrongBaseAudio;
}

// Eagerly preload the audio element
getBaseAudio();
getWrongBaseAudio();

export function playKeyPressSound() {
  // Explicit verification of localStorage
  const rawPreference = localStorage.getItem("settings_key_press_sound");
  const isSoundEnabled = rawPreference === "true";
  
  if (!isSoundEnabled) {
    return;
  }

  try {
    const template = getBaseAudio();
    
    // Use cloneNode(true) so rapid, consecutive keystrokes play smoothly without overlap bugs
    const audioClone = template.cloneNode(true) as HTMLAudioElement;
    
    // Ensure we start from the beginning for every click
    audioClone.currentTime = 0;
    audioClone.volume = 1.0;

    // Play instantly with a catch block for autoplay policy restrictions
    audioClone.play().catch((err) => {
      console.warn("[Audio] Autoplay blocked or playback failed:", err);
    });

  } catch (error) {
    console.error("[Audio] Failed to play key press sound:", error);
  }
}

export function playWrongKeySound() {
  const rawPreference = localStorage.getItem("settings_key_press_sound");
  const isSoundEnabled = rawPreference === "true";
  
  if (!isSoundEnabled) {
    return;
  }

  try {
    const template = getWrongBaseAudio();
    
    // Use cloneNode(true) so rapid, consecutive keystrokes play smoothly without overlap bugs
    const audioClone = template.cloneNode(true) as HTMLAudioElement;
    
    // Ensure we start from the beginning for every click
    audioClone.currentTime = 0;
    audioClone.volume = 1.0;

    // Play instantly with a catch block for autoplay policy restrictions
    audioClone.play().catch((err) => {
      console.warn("[Audio] Autoplay blocked or playback failed:", err);
    });

  } catch (error) {
    console.error("[Audio] Failed to play wrong key sound:", error);
  }
}
