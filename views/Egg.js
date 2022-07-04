import Animatable from './Animatable.js';
import {
  DX_OFFSET,
  STANDUP_TIME,
  SHAKED_TIME,
  BREAKUP_TIME,
} from '../constants/egg.js';
import { EGG_IMAGE_PATH } from '../constants/imagePath.js';

class Egg extends Animatable {
  constructor() {
    super();
    this.callback;
    this.frameWidth = 180;
    this.dX = 110;
    this.dY = 120;
    this.image.src = EGG_IMAGE_PATH;

    this.drawStandingEgg = this.drawStandingEgg.bind(this);
    this.drawShakedEgg = this.drawShakedEgg.bind(this);
    this.drawBreakingEgg = this.drawBreakingEgg.bind(this);
  }

  async drawStandingEgg() {
    const lastFrame = 3;
    let currentFrame = 0;

    await this.loadImage(EGG_IMAGE_PATH);

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * currentFrame,
        0,
        200,
        200,
        this.dX,
        this.dY,
        200,
        200,
      );
      currentFrame++;

      if (lastFrame === currentFrame) {
        resolve();
        return true;
      }
    }, STANDUP_TIME);
  }

  async drawShakedEgg() {
    const standFrame = this.frameWidth * 2;
    let shakeCount = 3;

    await this.loadImage(EGG_IMAGE_PATH);

    return this.animate((resolve) => {
      if (shakeCount === 3) {
        this.context.drawImage(
          this.image,
          standFrame,
          0,
          200,
          200,
          this.dX - DX_OFFSET,
          this.dY,
          200,
          200,
        );
      }

      if (shakeCount === 2) {
        this.context.drawImage(
          this.image,
          standFrame,
          0,
          200,
          200,
          this.dX + DX_OFFSET,
          this.dY,
          200,
          200,
        );
      }

      if (shakeCount === 1) {
        this.context.drawImage(
          this.image,
          standFrame,
          0,
          200,
          200,
          this.dX,
          this.dY,
          200,
          200,
        );
      }

      shakeCount--;

      if (!shakeCount) {
        resolve();
        return true;
      }
    }, SHAKED_TIME);
  }

  async drawBreakingEgg() {
    const lastFrame = 6;
    let currentFrame = 2;

    await this.loadImage(EGG_IMAGE_PATH);

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * currentFrame,
        0,
        200,
        200,
        this.dX,
        this.dY,
        200,
        200,
      );
      currentFrame++;

      if (lastFrame === currentFrame) {
        resolve();
        return true;
      }
    }, BREAKUP_TIME);
  }
}

export default new Egg();
