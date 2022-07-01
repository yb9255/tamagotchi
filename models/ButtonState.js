class ButtonState {
  constructor() {
    this.state = null;
    this.leftCallback = null;
    this.middleCallback = null;
    this.rightCallback = null;
    this.leftBtn = document.querySelector('.btn--1');
    this.middleBtn = document.querySelector('.btn--2');
    this.rightBtn = document.querySelector('.btn--3');
    this.modal = document.querySelector('.modal');
  }

  addAllListeners() {
    this.leftBtn.addEventListener('click', this.leftCallback);
    this.middleBtn.addEventListener('click', this.middleCallback);
    this.rightBtn.addEventListener('click', this.rightCallback);
  }

  removeAllListeners() {
    this.leftBtn.removeEventListener('click', this.leftCallback);
    this.middleBtn.removeEventListener('click', this.middleCallback);
    this.rightBtn.removeEventListener('click', this.rightCallback);
  }
}

export default new ButtonState();
