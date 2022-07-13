import View from './View.js';

import {
  CHILD_IDLING_IMAGE_PATH,
  CHILD_EATING_IMAGE_PATH,
  CHILD_PLAY_IMAGE_PATH,
  CHILD_DENY_IMAGE_PATH,
  CHILD_SLEEPING_IMAGE_PATH,
  CHILD_GROWING_UP_IMAGE_PATH,
} from '../constants/imagePath.js';

import {
  DX_OFFSET,
  BOUNCE_TIME,
  FEED_TIME,
  MOVE_TIME,
  PLAY_TIME,
  DENY_TIME,
  SLEEP_TIME,
} from '../constants/child.js';

class ChildView extends View {
  #dx = 55;
  #dy = 55;
  #frameWidth = 300;

  constructor() {
    super();

    this.drawIdlingChild = this.drawIdlingChild.bind(this);
    this.drawEatingChild = this.drawEatingChild.bind(this);
    this.drawPlayingChild = this.drawPlayingChild.bind(this);
    this.drawDenyingChild = this.drawDenyingChild.bind(this);
    this.drawSleepingChild = this.drawSleepingChild.bind(this);
    this.drawGrowingUp = this.drawGrowingUp.bind(this);
  }

  async drawIdlingChild() {
    await this.loadImage(this.image, CHILD_IDLING_IMAGE_PATH);
    await this.#idle();
  }

  async drawEatingChild() {
    await this.loadImage(this.image, CHILD_EATING_IMAGE_PATH);
    return this.#feed();
  }

  async drawPlayingChild() {
    await this.loadImage(this.image, CHILD_PLAY_IMAGE_PATH);
    return this.#play();
  }
  async drawDenyingChild() {
    await this.loadImage(this.image, CHILD_DENY_IMAGE_PATH);
    return this.#deny();
  }

  async drawSleepingChild() {
    await this.loadImage(this.image, CHILD_SLEEPING_IMAGE_PATH);
    return this.#sleep();
  }

  async drawGrowingUp() {
    await this.loadImage(this.image, CHILD_GROWING_UP_IMAGE_PATH);
    return this.#growup();
  }

  #bounceUp() {
    const frameCount = 2;
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
    }, BOUNCE_TIME);
  }

  #bounceDown() {
    let currentFrame = 2;

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
      currentFrame--;

      if (currentFrame < 0) {
        resolve();
        return true;
      }
    }, BOUNCE_TIME);
  }

  #moveLeft() {
    let moveCount = 2;
    this.#dx -= DX_OFFSET;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        0,
        0,
        300,
        300,
        this.#dx,
        this.#dy,
        300,
        300,
      );
      this.#dx -= DX_OFFSET;
      moveCount--;

      if (!moveCount) {
        resolve();
        return true;
      }
    }, MOVE_TIME);
  }

  #moveRight() {
    let moveCount = 0;
    this.#dx += DX_OFFSET;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        0,
        0,
        300,
        300,
        this.#dx,
        this.#dy,
        300,
        300,
      );
      this.#dx += DX_OFFSET;
      moveCount++;

      if (moveCount === 2) {
        resolve();
        return true;
      }
    }, MOVE_TIME);
  }

  async #idle() {
    this.#dx = 55;
    this.#dy = 55;

    await this.#bounceUp();
    await this.#bounceDown();
    await this.#moveLeft();
    await this.#bounceUp();
    await this.#bounceDown();
    await this.#moveRight();
    await this.#bounceUp();
    await this.#bounceDown();
    await this.#moveRight();
    await this.#bounceUp();
    await this.#bounceDown();
    await this.#moveLeft();

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

  #growup() {
    this.#dx = 55;
    this.#dy = 55;

    const frameCount = 9;
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
    }, 300);
  }
}

export default ChildView;
