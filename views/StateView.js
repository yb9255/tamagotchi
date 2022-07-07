import View from './View.js';
import { STATE_POINT_IMAGE_PATH } from '../constants/imagePath.js';

class StateView extends View {
  #frameWidth = 200;
  #funStateImage = new Image();
  #hungerStateImage = new Image();
  #tirednessStateImage = new Image();

  constructor() {
    super(document.querySelector('#tablet').getContext('2d'));
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
      0,
      200,
      50,
      dx,
      dy,
      300,
      75,
    );
  }

  async #drawHungerState(hunger) {
    const dx = 135;
    const dy = 130;

    await this.loadImage(this.#hungerStateImage, STATE_POINT_IMAGE_PATH);

    this.context.drawImage(
      this.#hungerStateImage,
      this.#frameWidth * hunger,
      0,
      200,
      50,
      dx,
      dy,
      300,
      75,
    );
  }

  async #drawTirednessState(tiredness) {
    const dx = 135;
    const dy = 233;

    await this.loadImage(this.#tirednessStateImage, STATE_POINT_IMAGE_PATH);

    this.context.drawImage(
      this.#tirednessStateImage,
      this.#frameWidth * Math.floor(tiredness),
      0,
      200,
      50,
      dx,
      dy,
      300,
      75,
    );
  }
}

export default StateView;
