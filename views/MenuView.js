class MenuView {
  constructor(currentMainView) {
    this.menu = document.querySelector('.menu');
    this.items = this.menu.querySelectorAll('.menu-item');
    this.currentMainView = currentMainView;
    this.currentItemIndex = 0;

    this.drawMenu = this.drawMenu.bind(this);
    this.removeMenu = this.removeMenu.bind(this);
    this.selectMenu = this.selectMenu.bind(this);
  }

  drawMenu() {
    this.currentMainView.clear();
    this._handleMenu();
    this.currentMainView.handleAnimationCancel(true);
  }

  removeMenu() {
    this.currentMainView.clear();
    this.currentMainView.handleAnimationCancel(false);
    this.currentItemIndex = 0;
    this._cancelMenu();
  }

  async selectMenu(callbacks) {
    if (!this.currentMainView.animIsCanceled) return;

    this.currentMainView.handleAnimationCancel(false);
    this._cancelMenu();
    await this._triggerCallback(callbacks);
    this.currentItemIndex = 0;
  }

  _openMenu() {
    this.menu.classList.remove('hidden');
    this.items[this.currentItemIndex].classList.add('focused');
  }

  _changeMenu() {
    this.items[this.currentItemIndex].classList.remove('focused');
    this.currentItemIndex = (this.currentItemIndex + 1) % this.items.length;

    this.items[this.currentItemIndex].classList.add('focused');
  }

  async _triggerCallback({
    feedCallback,
    playCallback,
    stateCallback,
    sleepCallback,
  }) {
    if (this.currentItemIndex === 0) {
      await feedCallback();
      return;
    }

    if (this.currentItemIndex === 1) {
      await playCallback();
      return;
    }

    if (this.currentItemIndex === 2) {
      await stateCallback();
      return;
    }

    if (this.currentItemIndex === 3) {
      await sleepCallback();
      return;
    }
  }

  _handleMenu() {
    if (this.menu.classList.contains('hidden')) {
      this._openMenu();
      return;
    }

    this._changeMenu();
  }

  _cancelMenu() {
    this.items.forEach((item) => item.classList.remove('focused'));
    this.menu.classList.add('hidden');
  }
}

export default MenuView;
