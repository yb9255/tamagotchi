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
