import Animatable from './Animatable.js';
import { LV1_IDLING_PATH, LV1_EATING_PATH } from '../constants/imagePath.js';
import { IDLING, EATING } from '../constants/gameState.js';
import { DX_OFFSET } from '../constants/offset.js';

class Lv1 extends Animatable {
  constructor() {
    super();
    this.dX = 55;
    this.dY = 55;
    this.frameWidth = 300;
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
    }, 300);
  }

  bounceUp(ms) {
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
    }, ms);
  }

  bounceDown(ms) {
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
    }, ms);
  }

  moveLeft(ms) {
    let moveCount = 2;
    this.dX -= DX_OFFSET;

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
      this.dX -= DX_OFFSET;
      moveCount--;

      if (!moveCount) {
        resolve();
        return true;
      }
    }, ms);
  }

  moveRight(ms) {
    let moveCount = 0;
    this.dX += DX_OFFSET;

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
      this.dX += DX_OFFSET;
      moveCount++;

      if (moveCount === 2) {
        resolve();
        return true;
      }
    }, ms);
  }

  async bounce(ms) {
    await this.bounceUp(ms);
    await this.bounceDown(ms);
  }

  async idle() {
    if (this.pending.length) {
      this.handleEvent(this.drawTamagotchi.bind(this, IDLING));
      return;
    }

    await this.bounce(300);
    await this.moveLeft(500);
    await this.bounce(300);
    await this.moveRight(500);
    await this.bounce(300);
    await this.moveRight(500);
    await this.bounce(300);
    await this.moveLeft(500);

    requestAnimationFrame(this.idle.bind(this));
  }
}

export default new Lv1();
