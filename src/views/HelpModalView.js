import mainStyles from '../css/main.css';

class HelpModalView {
  #helpModal = null;
  #backdrop = null;
  #helpModalBtn = null;
  #xBtn = null;

  constructor() {
    this.setHelpModalElements = this.setHelpModalElements.bind(this);
    this.showHelpModalBtn = this.showHelpModalBtn.bind(this);
  }

  setHelpModalElements(helpModal, backdrop, helpModalBtn, xBtn) {
    this.#helpModal = helpModal;
    this.#backdrop = backdrop;
    this.#helpModalBtn = helpModalBtn;
    this.#xBtn = xBtn;
  }

  addListeners(callback) {
    this.#backdrop.addEventListener('click', callback);
    this.#xBtn.addEventListener('click', callback);
    this.#helpModalBtn.addEventListener('click', callback);
  }

  showHelpModalBtn() {
    this.#helpModalBtn.classList.remove(`${mainStyles.hidden}`);
  }

  toggleHelpModal() {
    this.#backdrop.classList.toggle(`${mainStyles.hidden}`);
    this.#helpModal.classList.toggle(`${mainStyles.hidden}`);
  }
}

export default HelpModalView;
