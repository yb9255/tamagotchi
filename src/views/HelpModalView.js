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

  addListeners() {
    this.#backdrop.addEventListener('click', this.#toggleHelpModal.bind(this));
    this.#xBtn.addEventListener('click', this.#toggleHelpModal.bind(this));
    this.#helpModalBtn.addEventListener(
      'click',
      this.#toggleHelpModal.bind(this),
    );
  }

  showHelpModalBtn() {
    this.#helpModalBtn.classList.remove(`${mainStyles.hidden}`);
  }

  #toggleHelpModal() {
    this.#backdrop.classList.toggle(`${mainStyles.hidden}`);
    this.#helpModal.classList.toggle(`${mainStyles.hidden}`);
  }
}

export default HelpModalView;
