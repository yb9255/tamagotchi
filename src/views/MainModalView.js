import mainStyles from '../css/main.css';

class MainModalView {
  #modal = null;

  constructor() {
    this.setModalElement = this.setModalElement.bind(this);
    this.openModal = this.openModal.bind(this);
    this.hiddenModal = this.hiddenModal.bind(this);
  }

  setModalElement(modal) {
    this.#modal = modal;
  }

  changeModalText(text) {
    this.#modal.innerHTML = '';
    this.#modal.insertAdjacentHTML('afterbegin', `<span>${text}</span>`);
  }

  openModal() {
    this.#modal.classList.remove(`${mainStyles.hidden}`);
  }

  hiddenModal() {
    this.#modal.classList.add(`${mainStyles.hidden}`);
  }
}

export default MainModalView;
