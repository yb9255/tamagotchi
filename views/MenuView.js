class MenuView {
  #menu = document.querySelector('.menu');
  #items = this.#menu.querySelectorAll('.menu-item');
  #currentMainView;
  #currentItemIndex = 0;

  constructor(currentMainView) {
    this.#currentMainView = currentMainView;

    this.drawMenu = this.drawMenu.bind(this);
    this.removeMenu = this.removeMenu.bind(this);
    this.selectMenu = this.selectMenu.bind(this);
  }

  drawMenu() {
    this.#currentMainView.clear();
    this.#handleMenu();
    this.#currentMainView.handleAnimationCancel(true);
  }

  removeMenu() {
    this.#currentMainView.clear();
    this.#currentMainView.handleAnimationCancel(false);
    this.#currentItemIndex = 0;
    this.#cancelMenu();
  }

  async selectMenu(callbacks) {
    if (!this.#currentMainView.animIsCanceled) return;

    this.#currentMainView.handleAnimationCancel(false);
    this.#cancelMenu();
    await this.#triggerCallback(callbacks);
    this.#currentItemIndex = 0;
  }

  #openMenu() {
    this.#menu.classList.remove('hidden');
    this.#items[this.#currentItemIndex].classList.add('focused');
  }

  #changeMenu() {
    this.#items[this.#currentItemIndex].classList.remove('focused');
    this.#currentItemIndex = (this.#currentItemIndex + 1) % this.#items.length;

    this.#items[this.#currentItemIndex].classList.add('focused');
  }

  async #triggerCallback({
    triggerFeedCallback,
    triggerPlayCallback,
    triggerStateCallback,
    triggerSleepCallback,
  }) {
    if (this.#currentItemIndex === 0) {
      await triggerFeedCallback();
      return;
    }

    if (this.#currentItemIndex === 1) {
      await triggerPlayCallback();
      return;
    }

    if (this.#currentItemIndex === 2) {
      await triggerStateCallback();
      return;
    }

    if (this.#currentItemIndex === 3) {
      await triggerSleepCallback();
      return;
    }
  }

  #handleMenu() {
    if (this.#menu.classList.contains('hidden')) {
      this.#openMenu();
      return;
    }

    this.#changeMenu();
  }

  #cancelMenu() {
    this.#items.forEach((item) => item.classList.remove('focused'));
    this.#menu.classList.add('hidden');
  }
}

export default MenuView;
