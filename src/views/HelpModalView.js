import mainStyles from '../css/main.css';

class HelpModalView {
  #helpModal = null;
  #backdrop = null;
  #helpModalBtn = null;

  constructor() {
    this.toggleHelpModal = this.toggleHelpModal.bind(this);
  }

  setHelpModalElements(helpModal, backdrop, helpModalBtn) {
    this.#helpModal = helpModal;
    this.#backdrop = backdrop;
    this.#helpModalBtn = helpModalBtn;
  }

  showHelpModalBtn() {
    this.#helpModalBtn.classList.remove(`${mainStyles.hidden}`);
  }

  hideHelpModalBtn() {
    this.#helpModalBtn.classList.add(`${mainStyles.hidden}`);
  }

  toggleHelpModal() {
    this.#backdrop.classList.toggle(`${mainStyles.hidden}`);
    this.#helpModal.classList.toggle(`${mainStyles.hidden}`);
  }

  openModal() {
    this.#backdrop.classList.remove(`${mainStyles.hidden}`);
    this.#helpModal.classList.remove(`${mainStyles.hidden}`);
  }

  closeModal() {
    this.#backdrop.classList.add(`${mainStyles.hidden}`);
    this.#helpModal.classList.add(`${mainStyles.hidden}`);
  }
}

export default HelpModalView;
