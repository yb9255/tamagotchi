import {
  START_GAME_AUDIO_PATH,
  MENU_NAVIGATE_AUDIO_PATH,
  SHAKE_EGG_AUDIO_PATH,
  CANCEL_AUDIO_PATH,
  EAT_AUDIO_PATH,
  HANGOUT_AUDIO_PATH,
  SLEEP_AUDIO_PATH,
  DENY_AUDIO_PATH,
  GROW_UP_AUDIO_PATH,
  ANGRY_ALERT_AUDIO_PATH,
} from '../constants/audioPath.js';

class AudioController {
  #startGame = new Audio(START_GAME_AUDIO_PATH);
  #shakeEgg = new Audio(SHAKE_EGG_AUDIO_PATH);
  #menuNavigate = new Audio(MENU_NAVIGATE_AUDIO_PATH);
  #cancelMenu = new Audio(CANCEL_AUDIO_PATH);
  #eat = new Audio(EAT_AUDIO_PATH);
  #hangout = new Audio(HANGOUT_AUDIO_PATH);
  #sleep = new Audio(SLEEP_AUDIO_PATH);
  #deny = new Audio(DENY_AUDIO_PATH);
  #growUp = new Audio(GROW_UP_AUDIO_PATH);
  #angryAlert = new Audio(ANGRY_ALERT_AUDIO_PATH);

  constructor() {
    this.playStartGameSound = this.playStartGameSound.bind(this);
    this.playShakeEggSound = this.playShakeEggSound.bind(this);
    this.playSelectMenuSound = this.playSelectMenuSound.bind(this);
    this.playCancelMenuSound = this.playCancelMenuSound.bind(this);
    this.playEatSound = this.playEatSound.bind(this);
    this.playHangoutSound = this.playHangoutSound.bind(this);
    this.playSleepSound = this.playSleepSound.bind(this);
    this.playDenySound = this.playDenySound.bind(this);
    this.playgrowUpSound = this.playgrowUpSound.bind(this);
    this.playAngryAlertSound = this.playAngryAlertSound.bind(this);
  }

  playStartGameSound() {
    this.#startGame.currentTime = 0;
    this.#startGame.volume = 0.1;
    this.#startGame.play();
  }

  playShakeEggSound() {
    this.#shakeEgg.currentTime = 0;
    this.#shakeEgg.volume = 0.1;
    this.#shakeEgg.play();
  }

  playSelectMenuSound() {
    this.#menuNavigate.currentTime = 0;
    this.#menuNavigate.volume = 0.1;
    this.#menuNavigate.play();
  }

  playCancelMenuSound() {
    this.#cancelMenu.currentTime = 0;
    this.#cancelMenu.volume = 0.1;
    this.#cancelMenu.play();
  }

  playEatSound() {
    this.#eat.currentTime = 0;
    this.#eat.volume = 0.2;
    this.#eat.play();
  }

  playHangoutSound() {
    this.#hangout.currentTime = 0;
    this.#hangout.volume = 0.2;
    this.#hangout.play();
  }

  playSleepSound() {
    this.#sleep.currentTime = 0;
    this.#sleep.volume = 0.1;
    this.#sleep.play();
  }

  playDenySound() {
    this.#deny.currentTime = 0;
    this.#deny.volume = 0.1;
    this.#deny.play();
  }

  playgrowUpSound() {
    this.#growUp.currentTime = 0;
    this.#growUp.volume = 0.1;
    this.#growUp.play();
  }

  playAngryAlertSound() {
    this.#angryAlert.currentTime = 0;
    this.#angryAlert.volume = 0.1;
    this.#angryAlert.play();
  }
}

export default AudioController;
