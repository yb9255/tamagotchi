import View from './View.js';

class ModalView extends View {
  constructor() {
    super(document.querySelector('#tablet').getContext('2d'));
    this.modal = document.querySelector('.modal');
  }

  openModal() {
    this.modal.classList.remove('hidden');
  }

  hiddenModal() {
    this.modal.classList.add('hidden');
  }
}

export default ModalView;
