import mainStyles from '../css/main.css';

class MenuView {
  #menu = null;
  #items = null;
  #currentMainView;
  #currentItemIndex = 0;

  constructor() {
    this.drawMenu = this.drawMenu.bind(this);
    this.removeMenu = this.removeMenu.bind(this);
    this.selectMenu = this.selectMenu.bind(this);
  }

  setCurrentMainView(currentMainView) {
    this.#currentMainView = currentMainView;
  }

  setMenuElements(menu, items) {
    this.#menu = menu;
    this.#items = items;
  }

  drawMenu() {
    this.#currentMainView.clear();
    this.#currentMainView.cancelAnimation();

    if (this.#menu.classList.contains(`${mainStyles.hidden}`)) {
      this.#openMenu();
      return;
    }

    this.#changeMenu();
  }

  removeMenu() {
    this.#currentMainView.clear();
    this.#currentItemIndex = 0;
    this.#cancelMenu();
  }

  async selectMenu(callbacks, gameState) {
    if (gameState.state !== 'MENU') return;

    this.#cancelMenu();
    await this.#triggerCallback(callbacks);
    this.#currentItemIndex = 0;
  }

  #openMenu() {
    this.#menu.classList.remove(`${mainStyles.hidden}`);
    this.#items[this.#currentItemIndex].classList.add(`${mainStyles.focused}`);
  }

  #changeMenu() {
    this.#items[this.#currentItemIndex].classList.remove(
      `${mainStyles.focused}`,
    );
    this.#currentItemIndex = (this.#currentItemIndex + 1) % this.#items.length;

    this.#items[this.#currentItemIndex].classList.add(`${mainStyles.focused}`);
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

  #cancelMenu() {
    this.#items.forEach((item) =>
      item.classList.remove(`${mainStyles.focused}`),
    );
    this.#menu.classList.add(`${mainStyles.hidden}`);
  }
}

export default MenuView;
