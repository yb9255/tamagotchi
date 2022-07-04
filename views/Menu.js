class Menu {
  constructor() {
    this.menu = document.querySelector('.menu');
    this.items = this.menu.querySelectorAll('.menu-item');
    this.currentItemIndex = 0;

    this.handleMenu = this.handleMenu.bind(this);
    this.cancelMenu = this.cancelMenu.bind(this);
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

  async selectMenu({
    feedCallback,
    playCallback,
    stateCallback,
    sleepCallback,
  }) {
    this.items[this.currentItemIndex].classList.remove('focused');
    this.menu.classList.add('hidden');

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

  handleMenu() {
    if (this.menu.classList.contains('hidden')) {
      this._openMenu();
      return;
    }

    this._changeMenu();
  }

  cancelMenu() {
    this.items[this.currentItemIndex].classList.remove('focused');
    this.currentItemIndex = 0;
    this.menu.classList.add('hidden');
  }
}

export default new Menu();
