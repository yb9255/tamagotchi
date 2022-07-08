import mainStyles from '../css/main.css';

class ModalView {
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

export default ModalView;
