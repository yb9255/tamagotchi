import { INIT, GROWTH, IDLING } from '../constants/gameState.js';

class GameState {
  constructor() {
    this.clock = 0;
    this.nextTimeToTick = Date.now();
    this.currentState = INIT;
    this.growth = INIT;
    this.fun = -1;
    this.hungry = -1;
    this.birthCount = -1;
    this.startGame = this.startGame.bind(this);
    this.hatchEgg = this.hatchEgg.bind(this);
    this.modal = document.querySelector('.modal');
  }

  tick() {
    this.clock++;
  }

  startGame() {
    this.currentState = GROWTH[0];
    this.growth = GROWTH[0];
    this.birthCount = 5;
  }

  hatchEgg(shake, breakEgg) {
    if (!this.birthCount) {
      breakEgg();
      this.modal.classList.add('hidden');
      this.growth = GROWTH[1];
      this.currentState = IDLING;
    }

    if (this.birthCount) {
      shake();
      this.birthCount--;
    }
  }
}

export default new GameState();
