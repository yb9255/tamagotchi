import View from './View.js';

import {
  ADULT_IDLING_IMAGE_PATH,
  ADULT_EATING_IMAGE_PATH,
  ADULT_PLAY_IMAGE_PATH,
  ADULT_DENY_IMAGE_PATH,
  ADULT_SLEEPING_IMAGE_PATH,
} from '../constants/imagePath.js';

import {
  FEED_TIME,
  PLAY_TIME,
  DENY_TIME,
  SLEEP_TIME,
} from '../constants/child.js';

class AdultView extends View {
  #dx = 55;
  #dy = 55;
  #frameWidth = 300;

  constructor() {
    super();

    this.drawIdlingAdult = this.drawIdlingAdult.bind(this);
    this.drawEatingAdult = this.drawEatingAdult.bind(this);
    this.drawPlayingAdult = this.drawPlayingAdult.bind(this);
    this.drawDenyingAdult = this.drawDenyingAdult.bind(this);
    this.drawSleepingAdult = this.drawSleepingAdult.bind(this);
  }

  async drawIdlingAdult() {
    await this.loadImage(this.image, ADULT_IDLING_IMAGE_PATH);
    await this.#idle();
  }

  async drawEatingAdult() {
    await this.loadImage(this.image, ADULT_EATING_IMAGE_PATH);
    return this.#feed();
  }

  async drawPlayingAdult() {
    await this.loadImage(this.image, ADULT_PLAY_IMAGE_PATH);
    return this.#play();
  }
  async drawDenyingAdult() {
    await this.loadImage(this.image, ADULT_DENY_IMAGE_PATH);
    return this.#deny();
  }

  async drawSleepingAdult() {
    await this.loadImage(this.image, ADULT_SLEEPING_IMAGE_PATH);
    return this.#sleep();
  }

  async #idle() {
    this.#dx = 55;
    this.#dy = 55;

    const frameCount = 2;
    let currentFrame = 0;

    await this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.#frameWidth * (currentFrame % 2),
        0,
        300,
        300,
        this.#dx,
        this.#dy,
        300,
        300,
      );

      currentFrame++;

      if (currentFrame > frameCount) {
        resolve();
        return true;
      }
    }, FEED_TIME);

    this.#idle();
  }

  #feed() {
    this.#dx = 55;
    this.#dy = 55;
    const frameCount = 6;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.#frameWidth * currentFrame,
        0,
        300,
        300,
        this.#dx,
        this.#dy,
        300,
        300,
      );

      currentFrame++;

      if (currentFrame > frameCount) {
        resolve();
        return true;
      }
    }, FEED_TIME);
  }

  #play() {
    this.#dx = 55;
    this.#dy = 55;
    const frameCount = 6;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.#frameWidth * (currentFrame % 2),
        0,
        300,
        300,
        this.#dx,
        this.#dy,
        300,
        300,
      );

      currentFrame++;

      if (currentFrame > frameCount) {
        resolve();
        return true;
      }
    }, PLAY_TIME);
  }

  #deny() {
    this.#dx = 55;
    this.#dy = 55;
    const frameCount = 4;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.#frameWidth * (currentFrame % 2),
        0,
        300,
        300,
        this.#dx,
        this.#dy,
        300,
        300,
      );

      currentFrame++;

      if (currentFrame > frameCount) {
        resolve();
        return true;
      }
    }, DENY_TIME);
  }

  #sleep() {
    this.#dx = 55;
    this.#dy = 55;
    const frameCount = 9;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.#frameWidth * (currentFrame % 3),
        0,
        300,
        300,
        this.#dx,
        this.#dy,
        300,
        300,
      );

      currentFrame++;

      if (currentFrame > frameCount) {
        resolve();
        return true;
      }
    }, SLEEP_TIME);
  }
}

export default AdultView;
