import Animatable from './Animatable.js';
import {
  CHILD_IDLING_PATH,
  CHILD_EATING_PATH,
} from '../constants/imagePath.js';
import { IDLING, EATING } from '../constants/gameState.js';
import {
  DX_OFFSET,
  LEFT,
  RIGHT,
  BOUNCE_TIME,
  FEED_TIME,
  MOVE_TIME,
} from '../constants/child.js';

class Child extends Animatable {
  constructor() {
    super();
    this.dX = 55;
    this.dY = 55;
    this.frameWidth = 300;
    this.a = 1;
  }

  drawChild(state) {
    this.dX = 55;
    this.dY = 55;

    switch (state) {
      case IDLING:
        this.image.src = CHILD_IDLING_PATH;
        this.image.addEventListener('load', this._idle.bind(this));
        break;
      case EATING:
        this.image.src = CHILD_EATING_PATH;
        this.pending.push(this._feed.bind(this));
        break;
    }
  }

  _feed() {
    const frameCount = 6;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * currentFrame,
        0,
        300,
        300,
        this.dX,
        this.dY,
        300,
        300,
      );
      currentFrame++;

      if (currentFrame > frameCount) {
        clearTimeout(this.timer);
        resolve();

        return true;
      }
    }, FEED_TIME);
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
        this.dX,
        this.dY,
        300,
        300,
      );
      currentFrame++;

      if (currentFrame > frameCount) {
        clearTimeout(this.timer);
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
        this.dX,
        this.dY,
        300,
        300,
      );
      currentFrame--;

      if (currentFrame < 0) {
        clearTimeout(this.timer);
        resolve();

        return true;
      }
    }, BOUNCE_TIME);
  }

  _move(direction) {
    const isLeft = direction === LEFT;
    let moveCount = isLeft ? 2 : 0;

    isLeft ? (this.dX -= DX_OFFSET) : (this.dX += DX_OFFSET);

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        0,
        0,
        300,
        300,
        this.dX,
        this.dY,
        300,
        300,
      );
      isLeft ? (this.dX -= DX_OFFSET) : (this.dX += DX_OFFSET);
      isLeft ? moveCount-- : moveCount++;

      const isResolved = isLeft ? !moveCount : moveCount === 2;

      if (isResolved) {
        clearTimeout(this.timer);
        resolve();

        return true;
      }
    }, MOVE_TIME);
  }

  async _bounce() {
    await this._bounceUp();
    await this._bounceDown();
  }

  async _idle() {
    if (this.pending.length) {
      this.handleEvent(this.drawChild.bind(this, IDLING));
      return;
    }

    await this._bounce();
    await this._move(LEFT);
    await this._bounce();
    await this._move(RIGHT);
    await this._bounce();
    await this._move(RIGHT);
    await this._bounce();
    await this._move(LEFT);

    requestAnimationFrame(this._idle.bind(this));
  }
}

export default new Child();
