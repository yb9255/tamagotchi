class ButtonState {
  constructor() {
    this.state = null;
    this.leftCallback = null;
    this.middleCallback = null;
    this.rightCallback = null;
    this.leftBtn = null;
    this.middleBtn = null;
    this.rightBtn = null;
    this.addListeners = this.addListeners.bind(this);
    this.removeListeners = this.removeListeners.bind(this);
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
  }

  setButtonElements(leftBtn, middleBtn, rightBtn) {
    this.leftBtn = leftBtn;
    this.middleBtn = middleBtn;
    this.rightBtn = rightBtn;
  }

  addListeners({ leftCallback, middleCallback, rightCallback }) {
    this.leftCallback = leftCallback;
    this.middleCallback = middleCallback;
    this.rightCallback = rightCallback;

    this.leftBtn.addEventListener('click', this.leftCallback);
    this.middleBtn.addEventListener('click', this.middleCallback);
    this.rightBtn.addEventListener('click', this.rightCallback);
  }

  removeListeners() {
    this.leftBtn.removeEventListener('click', this.leftCallback);
    this.middleBtn.removeEventListener('click', this.middleCallback);
    this.rightBtn.removeEventListener('click', this.rightCallback);
  }
}

export default ButtonState;
