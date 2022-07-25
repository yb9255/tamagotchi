import mainStyles from '../css/main.css';

class HelpModalView {
  #helpModal = null;
  #backdrop = null;

  constructor() {
    this.toggleHelpModal = this.toggleHelpModal.bind(this);
  }

  toggleHelpModal() {
    this.#backdrop.classList.toggle(`${mainStyles.hidden}`);
    this.#helpModal.classList.toggle(`${mainStyles.hidden}`);
  }
}

export default HelpModalView;
