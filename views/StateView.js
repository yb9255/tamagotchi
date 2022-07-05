import View from './View.js';
import { STATE_POINT_IMAGE_PATH } from '../constants/imagePath.js';

class StateView extends View {
  constructor() {
    super(document.querySelector('#tablet').getContext('2d'));
    this.stateContainer = document.querySelector('.state-view-container');
    this.stateItems = document.querySelectorAll('.state-item');
    this.frameWidth = 200;
    this.funStateImage = new Image();
    this.hungerStateImage = new Image();
    this.tirednessStateImage = new Image();
  }

  async drawStateView(fun, hunger, tireness) {
    this._writeStateName();
    this._drawFunState(fun);
    this._drawHungerState(hunger);
    this._drawTirednessState(tireness);
  }

  _writeStateName() {
    this.context.font = '40px VT323';
    this.context.fillStyle = '#444';
    this.context.fillText('FUN', 40, 80);
    this.context.fillText('HUNGER', 40, 180);
    this.context.fillText('TIREDNESS', 40, 280);
  }

  async _drawFunState(fun) {
    const dx = 135;
    const dy = 30;

    await this.loadImage(this.funStateImage, STATE_POINT_IMAGE_PATH);

    this.context.drawImage(
      this.funStateImage,
      this.frameWidth * fun,
      0,
      200,
      50,
      dx,
      dy,
      300,
      75,
    );
  }

  async _drawHungerState(hunger) {
    const dx = 135;
    const dy = 130;

    await this.loadImage(this.hungerStateImage, STATE_POINT_IMAGE_PATH);

    this.context.drawImage(
      this.hungerStateImage,
      this.frameWidth * hunger,
      0,
      200,
      50,
      dx,
      dy,
      300,
      75,
    );
  }

  async _drawTirednessState(tiredness) {
    const dx = 135;
    const dy = 233;

    await this.loadImage(this.tirednessStateImage, STATE_POINT_IMAGE_PATH);

    this.context.drawImage(
      this.hungerStateImage,
      this.frameWidth * Math.floor(tiredness),
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
