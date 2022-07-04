class ModalView {
  constructor() {
    this.modal = document.querySelector('.modal');
  }

  openModal() {
    this.modal.classList.remove('hidden');
  }

  hiddenModal() {
    this.modal.classList.add('hidden');
  }
}

export default new ModalView();
