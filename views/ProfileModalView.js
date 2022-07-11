import View from './View.js';
import profileStyles from '../css/profile.css';
import { GROWTH } from '../constants/gameState.js';
import {
  CHILD_STAND_IMAGE_PATH,
  ADULT_STAND_IMAGE_PATH,
  EGG_IMAGE_PATH,
} from '../constants/imagePath.js';

class ProfileModalView extends View {
  #profileModal = null;
  #updateModal = null;
  #backdrop = null;

  constructor() {
    super();
  }

  setModals(profileModal, updateModal, backdrop) {
    this.#profileModal = profileModal;
    this.#updateModal = updateModal;
    this.#backdrop = backdrop;
  }

  drawProfileModal(gameState, closeModal = null) {
    this.#profileModal.innerHTML = '';
    this.#profileModal.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="${profileStyles['profile-detail']}"></div>
        <div class="${profileStyles['x-btn']}">&#10005;</div>
      `,
    );

    if (gameState.growth === GROWTH[0]) {
      const imgText = `<img src="${EGG_IMAGE_PATH}" alt="child stand" />`;
      this.#profileModal.insertAdjacentHTML('afterbegin', imgText);
    } else if (gameState.growth === GROWTH[1]) {
      const imgText = `<img src="${CHILD_STAND_IMAGE_PATH}" alt="child stand" />`;
      this.#profileModal.insertAdjacentHTML('afterbegin', imgText);
    } else if (gameState.growth === GROWTH[2]) {
      const imgText = `<img src="${ADULT_STAND_IMAGE_PATH}" alt="child stand" />`;
      this.#profileModal.insertAdjacentHTML('afterbegin', imgText);
    }

    this.#profileModal
      .querySelector(`.${profileStyles['profile-detail']}`)
      .insertAdjacentHTML(
        'afterbegin',
        `
          <span class="${profileStyles['profile-name']}">name: ${gameState.profileName}</span>
          <span class="${profileStyles['profile-description']}">Description: ${gameState.profileDescription}</span>
          <span class="${profileStyles['profile-happiness']}">Happiness: ${gameState.happiness}</span>
        `,
      );

    if (closeModal) {
      this.#profileModal
        .querySelector(`.${profileStyles['x-btn']}`)
        .addEventListener('click', closeModal);
    }
  }

  openProfileModal() {
    this.#profileModal.classList.remove(`${profileStyles.hidden}`);
    this.#backdrop.classList.remove(`${profileStyles.hidden}`);
  }

  openUpdateModal() {
    this.#updateModal.classList.remove(`${profileStyles.hidden}`);
    this.#backdrop.classList.remove(`${profileStyles.hidden}`);
  }

  closeProfileModal() {
    this.#profileModal.classList.add(`${profileStyles.hidden}`);
    this.#backdrop.classList.add(`${profileStyles.hidden}`);
  }

  closeUpdateModal() {
    this.#updateModal.classList.add(`${profileStyles.hidden}`);
    this.#backdrop.classList.add(`${profileStyles.hidden}`);
  }
}

export default ProfileModalView;
