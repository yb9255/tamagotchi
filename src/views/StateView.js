import View from './View.js';
import { STATE_POINT_IMAGE_PATH } from '../constants/imagePath.js';

import {
  S_WIDTH,
  S_HEIGHT,
  D_WIDTH,
  D_HEIGHT,
} from '../constants/stateScreen.js';

class StateView extends View {
  #sy = 0;
  #frameWidth = 200;
  #funStateImage = new Image();
  #hungerStateImage = new Image();
  #tirednessStateImage = new Image();

  constructor() {
    super();

    this.drawStateView = this.drawStateView.bind(this);
  }

  async drawStateView(fun, hunger, tireness) {
    this.#writeStateName();
    this.#drawFunState(fun);
    this.#drawHungerState(hunger);
    this.#drawTirednessState(tireness);
  }

  #writeStateName() {
    this.context.font = '40px VT323';
    this.context.fillStyle = '#444';
    this.context.fillText('FUN', 40, 80);
    this.context.fillText('HUNGER', 40, 180);
    this.context.fillText('TIREDNESS', 40, 280);
  }

  async #drawFunState(fun) {
    const dx = 135;
    const dy = 30;

    await this.loadImage(this.#funStateImage, STATE_POINT_IMAGE_PATH);

    this.context.drawImage(
      this.#funStateImage,
      this.#frameWidth * fun,
      this.#sy,
      S_WIDTH,
      S_HEIGHT,
      dx,
      dy,
      D_WIDTH,
      D_HEIGHT,
    );
  }

  async #drawHungerState(hunger) {
    const dx = 135;
    const dy = 130;

    await this.loadImage(this.#hungerStateImage, STATE_POINT_IMAGE_PATH);

    this.context.drawImage(
      this.#hungerStateImage,
      this.#frameWidth * hunger,
      this.#sy,
      S_WIDTH,
      S_HEIGHT,
      dx,
      dy,
      D_WIDTH,
      D_HEIGHT,
    );
  }

  async #drawTirednessState(tiredness) {
    const dx = 135;
    const dy = 233;

    await this.loadImage(this.#tirednessStateImage, STATE_POINT_IMAGE_PATH);

    this.context.drawImage(
      this.#tirednessStateImage,
      this.#frameWidth * Math.floor(tiredness),
      this.#sy,
      S_WIDTH,
      S_HEIGHT,
      dx,
      dy,
      D_WIDTH,
      D_HEIGHT,
    );
  }
}

export default StateView;
