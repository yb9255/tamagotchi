import View from './View.js';

class ModalView extends View {
  #modal = document.querySelector('.modal');

  constructor() {
    super(document.querySelector('#tablet').getContext('2d'));
  }

  openModal() {
    this.#modal.classList.remove('hidden');
  }

  hiddenModal() {
    this.#modal.classList.add('hidden');
  }
}

export default ModalView;
