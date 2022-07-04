import { INIT, GROWTH, IDLING, MENU } from '../constants/gameState.js';

class GameState {
  constructor() {
    this.state = INIT;
    this.growth = INIT;
    this.fun = -1;
    this.hunger = -1;
    this.birthCount = -1;
    this.tiredness = -1;
    this.exp = -1;

    this.setStatesByTime = this.setStatesByTime.bind(this);
    this.startGame = this.startGame.bind(this);
    this.hatchEgg = this.hatchEgg.bind(this);
    this.setMenuState = this.setMenuState.bind(this);
    this.cancelMenuState = this.cancelMenuState.bind(this);
    this.reduceHunger = this.reduceHunger.bind(this);
  }

  setStatesByTime() {
    if (
      (this.growth === GROWTH[1] || this.growth === GROWTH[2]) &&
      this.state === IDLING
    ) {
      if (this.fun) {
        this.fun -= 1;
      }

      if (this.hunger < 10) {
        this.hunger += 1;
      }

      if (this.fun > 5 && this.hunger < 5) {
        this.exp += 0.5;
      }

      this.tiredness += 0.5;
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
      this.fun = 5;
      this.hunger = 5;
      this.tiredness = 0;
      this.exp = 0;
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

  reduceHunger() {
    this.hunger -= 3;

    if (this.hunger < 0) {
      this.hunger = 0;
    }
  }

  makePetFun() {
    this.fun += 3;
    this.tiredness += 1;

    if (this.fun > 10) {
      this.fun = 10;
    }
  }
}

export default new GameState();
