class Buttons {
  constructor() {
    this.state;
    this.callback;
  }

  handleEventListenersOnBtns(state) {
    this.state = state;

    if (state.growth === 'INIT') {
      this.callback = this.startGame.bind(this);
      this.addEventListenersToAll('click', this.callback);
    } else if (state.growth === 'EGG') {
      this.callback = this.hatchEgg.bind(this);
      this.addEventListenersToAll('click', this.callback);
    }
  }

  addEventListenersToAll(type, cb) {
    this.leftBtn.addEventListener(type, cb);
    this.middleBtn.addEventListener(type, cb);
    this.rightBtn.addEventListener(type, cb);
  }

  removeEventListenersToAll(type, cb) {
    this.leftBtn.removeEventListener(type, cb);
    this.middleBtn.removeEventListener(type, cb);
    this.rightBtn.removeEventListener(type, cb);
  }
}

export default new Buttons();
