class GameState {
  constructor() {
    this.clock = 0;
    this.nextTimeToTick = Date.now();
    this.currentState = 'INIT';
    this.growth = 'INIT';
    this.fun = -1;
    this.hungry = -1;
    this.birthCount = -1;
    this.startGame = this.startGame.bind(this);
    this.hatchEgg = this.hatchEgg.bind(this);
  }

  tick() {
    this.clock++;
  }

  startGame(modal) {
    modal.classList.add('hidden');
    this.currentState = 'EGG';
    this.growth = 'EGG';
    this.birthCount = 5;
  }

  hatchEgg() {
    this.birthCount--;
    if (!this.birthCount) {
      this.growth = 'LV1';
      this.currentState = 'IDLING';
    }
  }
}

export default new GameState();
