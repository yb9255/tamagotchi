import View from './View.js';
import mainStyles from '../css/main.css';

import {
  MOOD_HEART_IMAGE_PATH,
  MOOD_ANGRY_IMAGE_PATH,
} from '../constants/imagePath.js';

class MoodView extends View {
  #container = null;
  #imageElement = null;

  constructor() {
    super();

    this.appendHeart = this.appendHeart.bind(this);
    this.appendAngryEmoji = this.appendAngryEmoji.bind(this);
    this.clearMoodImage = this.clearMoodImage.bind(this);
  }

  setContainer(container) {
    this.#container = container;
    this.#imageElement = this.#container.querySelector(
      `.${mainStyles['mood-img']}`,
    );
  }

  async appendHeart() {
    await this.loadImage(this.#imageElement, MOOD_HEART_IMAGE_PATH);
    this.#imageElement.alt = 'mood heart';
    this.#imageElement.classList.remove(`${mainStyles.hidden}`);
  }

  async appendAngryEmoji() {
    await this.loadImage(this.#imageElement, MOOD_ANGRY_IMAGE_PATH);
    this.#imageElement.alt = 'mood angry';
    this.#imageElement.classList.remove(`${mainStyles.hidden}`);
  }

  clearMoodImage() {
    this.#imageElement.classList.add(`${mainStyles.hidden}`);
  }
}

export default MoodView;
