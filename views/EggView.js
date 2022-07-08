import View from './View.js';
import {
  DX_OFFSET,
  STANDUP_TIME,
  SHAKED_TIME,
  BREAKUP_TIME,
} from '../constants/egg.js';
import { EGG_IMAGE_PATH } from '../constants/imagePath.js';

class EggView extends View {
  #frameWidth = 180;
  #dx = 110;
  #dy = 120;

  constructor() {
    super();
    this.drawStandingEgg = this.drawStandingEgg.bind(this);
    this.drawShakedEgg = this.drawShakedEgg.bind(this);
    this.drawBreakingEgg = this.drawBreakingEgg.bind(this);
  }

  async drawStandingEgg() {
    await this.loadImage(this.image, EGG_IMAGE_PATH);
    return this.#standEgg();
  }

  async drawShakedEgg() {
    await this.loadImage(this.image, EGG_IMAGE_PATH);
    return this.#shakeEgg();
  }

  async drawBreakingEgg() {
    await this.loadImage(this.image, EGG_IMAGE_PATH);
    return this.#breakEgg();
  }

  #standEgg() {
    const lastFrame = 3;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.#frameWidth * currentFrame,
        0,
        200,
        200,
        this.#dx,
        this.#dy,
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

  #shakeEgg() {
    const standFrame = this.#frameWidth * 2;
    let shakeCount = 3;

    return this.animate((resolve) => {
      if (shakeCount === 3) {
        this.context.drawImage(
          this.image,
          standFrame,
          0,
          200,
          200,
          this.#dx - DX_OFFSET,
          this.#dy,
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
          this.#dx + DX_OFFSET,
          this.#dy,
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
          this.#dx,
          this.#dy,
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

  #breakEgg() {
    const lastFrame = 6;
    let currentFrame = 2;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.#frameWidth * currentFrame,
        0,
        200,
        200,
        this.#dx,
        this.#dy,
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

export default EggView;
