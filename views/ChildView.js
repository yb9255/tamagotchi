import View from './View.js';

import {
  CHILD_IDLING_IMAGE_PATH,
  CHILD_EATING_IMAGE_PATH,
  CHILD_PLAY_IMAGE_PATH,
  CHILD_DENY_IMAGE_PATH,
} from '../constants/imagePath.js';

import {
  DX_OFFSET,
  BOUNCE_TIME,
  FEED_TIME,
  MOVE_TIME,
  PLAY_TIME,
  DENY_TIME,
} from '../constants/child.js';

class ChildView extends View {
  constructor() {
    super(document.querySelector('#tablet').getContext('2d'));
    this.dx = 55;
    this.dy = 55;
    this.frameWidth = 300;

    this.drawIdlingChild = this.drawIdlingChild.bind(this);
    this.drawEatingChild = this.drawEatingChild.bind(this);
    this.drawPlayingChild = this.drawPlayingChild.bind(this);
    this.drawDenyingChild = this.drawDenyingChild.bind(this);
  }

  async drawIdlingChild() {
    await this.loadImage(this.image, CHILD_IDLING_IMAGE_PATH);
    await this._idle();
  }

  async drawEatingChild() {
    await this.loadImage(this.image, CHILD_EATING_IMAGE_PATH);
    await this._feed();
  }

  async drawPlayingChild() {
    await this.loadImage(this.image, CHILD_PLAY_IMAGE_PATH);
    await this._play();
  }
  async drawDenyingChild() {
    await this.loadImage(this.image, CHILD_DENY_IMAGE_PATH);
    await this._deny();
  }

  _bounceUp() {
    const frameCount = 2;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * currentFrame,
        0,
        300,
        300,
        this.dx,
        this.dy,
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

  _bounceDown() {
    let currentFrame = 2;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * currentFrame,
        0,
        300,
        300,
        this.dx,
        this.dy,
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

  _moveLeft() {
    let moveCount = 2;
    this.dx -= DX_OFFSET;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        0,
        0,
        300,
        300,
        this.dx,
        this.dy,
        300,
        300,
      );
      this.dx -= DX_OFFSET;
      moveCount--;

      if (!moveCount) {
        resolve();
        return true;
      }
    }, MOVE_TIME);
  }

  _moveRight() {
    let moveCount = 0;
    this.dx += DX_OFFSET;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        0,
        0,
        300,
        300,
        this.dx,
        this.dy,
        300,
        300,
      );
      this.dx += DX_OFFSET;
      moveCount++;

      if (moveCount === 2) {
        resolve();
        return true;
      }
    }, MOVE_TIME);
  }

  async _idle() {
    this.dx = 55;
    this.dy = 55;

    await this._bounceUp();
    await this._bounceDown();
    await this._moveLeft();
    await this._bounceUp();
    await this._bounceDown();
    await this._moveRight();
    await this._bounceUp();
    await this._bounceDown();
    await this._moveRight();
    await this._bounceUp();
    await this._bounceDown();
    await this._moveLeft();

    this._idle();
  }

  _feed() {
    this.dx = 55;
    this.dy = 55;
    const frameCount = 6;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * currentFrame,
        0,
        300,
        300,
        this.dx,
        this.dy,
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

  _play() {
    this.dx = 55;
    this.dy = 55;
    const frameCount = 6;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * (currentFrame % 2),
        0,
        300,
        300,
        this.dx,
        this.dy,
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

  _deny() {
    this.dx = 55;
    this.dy = 55;
    const frameCount = 4;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * (currentFrame % 2),
        0,
        300,
        300,
        this.dx,
        this.dy,
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
}

export default ChildView;
