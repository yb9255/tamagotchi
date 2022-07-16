import View from './View.js';
import mainStyles from '../../css/main.css';

import {
  MOOD_HEART_IMAGE_PATH,
  MOOD_ANGRY_IMAGE_PATH,
} from '../../constants/imagePath.js';

class MoodView extends View {
  #container = null;
  #imageElement = null;

  constructor() {
    super();

    this.drawHeart = this.drawHeart.bind(this);
    this.drawAngryEmoji = this.drawAngryEmoji.bind(this);
    this.clearMoodImage = this.clearMoodImage.bind(this);
  }

  setContainer(container) {
    this.#container = container;
    this.#imageElement = this.#container.querySelector(
      `.${mainStyles['mood-img']}`,
    );
  }

  async drawHeart() {
    await this.loadImage(this.#imageElement, MOOD_HEART_IMAGE_PATH);
    this.#imageElement.alt = 'mood heart';
    this.#imageElement.classList.remove(`${mainStyles.hidden}`);
  }

  async drawAngryEmoji() {
    await this.loadImage(this.#imageElement, MOOD_ANGRY_IMAGE_PATH);
    this.#imageElement.alt = 'mood angry';
    this.#imageElement.classList.remove(`${mainStyles.hidden}`);
  }

  clearMoodImage() {
    this.#imageElement.classList.add(`${mainStyles.hidden}`);
  }
}

export default MoodView;
