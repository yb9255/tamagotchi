import { INIT, GROWTH, IDLING, MENU } from '../constants/gameState.js';

class GameState {
  constructor() {
    this.state = INIT;
    this.growth = INIT;
    this.fun = -1;
    this.hungry = -1;
    this.birthCount = -1;

    this.setStatesByTime = this.setStatesByTime.bind(this);
    this.startGame = this.startGame.bind(this);
    this.hatchEgg = this.hatchEgg.bind(this);
    this.setMenuState = this.setMenuState.bind(this);
    this.cancelMenuState = this.cancelMenuState.bind(this);
  }

  setStatesByTime() {
    if (
      (this.growth === GROWTH[1] || this.growth === GROWTH[2]) &&
      this.state !== MENU
    ) {
      if (this.fun) {
        this.fun -= 1;
      }

      if (this.hungry < 10) {
        this.hungry += 1;
      }
    }
  }

  startGame() {
    this.state = GROWTH[0];
    this.growth = GROWTH[0];
    this.birthCount = 5;
  }

  async hatchEgg(shake) {
    if (this.birthCount <= 0) {
      this.growth = GROWTH[1];
      this.fun = 10;
      this.hungry = 0;
      this.state = IDLING;
    }

    if (this.birthCount) {
      await shake();
      this.birthCount--;
    }
  }

  setMenuState() {
    this.state = MENU;
  }

  cancelMenuState() {
    this.state = IDLING;
  }
}

export default new GameState();
