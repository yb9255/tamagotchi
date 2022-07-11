import mainStyles from '../css/main.css';

class MainModalView {
  #modal = null;

  constructor() {}

  setModalElement(modal) {
    this.#modal = modal;
  }

  openModal() {
    this.#modal.classList.remove(`${mainStyles.hidden}`);
  }

  hiddenModal() {
    this.#modal.classList.add(`${mainStyles.hidden}`);
  }
}

export default MainModalView;
