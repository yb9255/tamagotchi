import ButtonState from './ButtonState.js';
import { TICK_SECONDS } from '../constants/gameState';

class GameState {
  constructor() {
    this.clock = 0;
    this.nextTimeToTick = Date.now();
    this.currentState = 'INIT';
    this.buttonState = ButtonState;
    this.growth = 'INIT';
    this.fun = -1;
    this.hungry = -1;
    this.birthCount = -1;
    this.handleEventOverTime = this.handleEventOverTime.bind(this);
  }

  tick() {
    this.clock++;
  }

  handleEventOverTime() {
    const now = Date.now();

    if (this.growth !== this.buttonState.state) {
      if (this.growth === 'INIT') {
        this.buttonState.state = this.growth;
        this.buttonState.leftCallback =
          this.buttonState.middleCallback =
          this.buttonState.rightCallback =
            this.startGame.bind(null);
      } else if (this.growth === 'EGG') {
        this.buttonState.state = this.growth;
      }
      //else if (this.growth === 'LV1') {
      // }
    }

    if (this.nextTimeToTick <= now) {
      this.tick();
      this.nextTimeToTick += TICK_SECONDS;
      console.log(this.clock);
    }

    requestAnimationFrame(this.handleEventOverTime);
  }

  startGame() {
    document.querySelector('.modal').classList.add('hidden');
    this.currentState = 'EGG';
    this.growth = 'EGG';
    this.birthCount = 5;
  }

  hatchEgg() {
    this.state.birthCount--;
    if (!this.state.birthCount) {
      this.state.growth = 'LV1';
      this.state.currentState = 'IDLING';
    }
  }
}

export default new GameState();
