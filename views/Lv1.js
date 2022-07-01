import Animatable from './Animatable.js';
import { LV1_IDLING_PATH, LV1_EATING_PATH } from '../constants/imagePath.js';
import { IDLING, EATING } from '../constants/gameState.js';
import {
  DX_OFFSET,
  LEFT,
  RIGHT,
  BOUNCE_TIME,
  FEED_TIME,
  MOVE_TIME,
} from '../constants/animation.js';

class Lv1 extends Animatable {
  constructor() {
    super();
    this.dX = 55;
    this.dY = 55;
    this.frameWidth = 300;
    this.a = 1;
  }

  drawLv1(url) {
    this.dX = 55;
    this.dY = 55;

    switch (url) {
      case IDLING:
        this.image.src = LV1_IDLING_PATH;
        this.image.addEventListener('load', this.idle.bind(this));
        break;
      case EATING:
        this.image.src = LV1_EATING_PATH;
        this.pending.push(this.feed.bind(this));
        break;
    }
  }

  feed() {
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
        return;
      }
    }, FEED_TIME);
  }

  bounceUp() {
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

  bounceDown() {
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

  move(direction) {
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
        resolve();
        return true;
      }
    }, MOVE_TIME);
  }

  async bounce() {
    await this.bounceUp();
    await this.bounceDown();
  }

  async idle() {
    if (this.pending.length) {
      this.handleEvent(this.drawLv1.bind(this, IDLING));
      return;
    }

    await this.bounce();
    await this.move(LEFT);
    await this.bounce();
    await this.move(RIGHT);
    await this.bounce();
    await this.move(RIGHT);
    await this.bounce();
    await this.move(LEFT);

    requestAnimationFrame(this.idle.bind(this));
  }
}

export default new Lv1();
