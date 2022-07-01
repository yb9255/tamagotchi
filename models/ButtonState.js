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
}

export default new ButtonState();
