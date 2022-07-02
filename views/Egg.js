import Animatable from './Animatable.js';
import { STANDING, SHAKED, BIRTH, DX_OFFSET } from '../constants/egg.js';
import { EGG_PATH } from '../constants/imagePath.js';

class Egg extends Animatable {
  constructor() {
    super();
    this.callback;
    this.frameWidth = 180;
    this.dX = 110;
    this.dY = 120;
  }

  drawEgg(state) {
    this.image.removeEventListener('load', this.callback);
    this.image.src = EGG_PATH;

    switch (state) {
      case STANDING:
        this.callback = this._standUpEgg.bind(this);
        break;
      case SHAKED:
        this.callback = this._shakeEgg.bind(this);
        break;
      case BIRTH:
        this.callback = this._breakEgg.bind(this);
        break;
    }

    this.image.addEventListener('load', this.callback);
  }

  _standUpEgg() {
    const lastFrame = 3;
    let currentFrame = 0;

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
        clearTimeout(this.timer);
        resolve();

        return true;
      }
    }, 500);
  }

  _shakeEgg() {
    const standFrame = this.frameWidth * 2;
    let shakeCount = 3;

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
        clearTimeout(this.timer);
        resolve();

        return true;
      }
    }, 1000);
  }

  _breakEgg() {
    const lastFrame = 4;
    let currentFrame = 2;

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
        clearTimeout(this.timer);
        resolve();

        return true;
      }
    }, 500);
  }
}

export default new Egg();