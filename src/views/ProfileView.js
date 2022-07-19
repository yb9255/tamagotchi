import profileStyles from '../css/profile.css';
import { GROWTH } from '../constants/gameState.js';
import {
  CHILD_STAND_IMAGE_PATH,
  ADULT_STAND_IMAGE_PATH,
} from '../constants/imagePath.js';

class ProfileView {
  #updateModal = null;
  #backdrop = null;
  #profileBody = null;
  #profileHeading = null;

  constructor() {
    this.setModals = this.setModals.bind(this);
    this.setProfileElements = this.setProfileElements.bind(this);
    this.drawProfile = this.drawProfile.bind(this);
    this.openUpdateModal = this.openUpdateModal.bind(this);
    this.closeUpdateModal = this.closeUpdateModal.bind(this);
  }

  setModals(updateModal, backdrop) {
    this.#updateModal = updateModal;
    this.#backdrop = backdrop;
  }

  setProfileElements(profileHeading, profileBody) {
    this.#profileHeading = profileHeading;
    this.#profileBody = profileBody;
  }

  drawProfile(userState, gameState) {
    const profileLeft = this.#profileBody.querySelector(
      `.${profileStyles['profile-left']}`,
    );

    const profileRight = this.#profileBody.querySelector(
      `.${profileStyles['profile-right']}`,
    );

    if (profileLeft.children) {
      profileLeft.innerHTML = '';
      profileRight.querySelector('span').remove();
      this.#profileHeading.innerHTML = '';
    }

    this.#profileHeading.insertAdjacentHTML(
      'beforeend',
      `
        <img src=${userState.picture} alt="user profile" />
        <span>${userState.email.split('@')[0]}'s Tamagotchi</span>
      `,
    );

    if (gameState.growth === GROWTH[1]) {
      profileLeft.insertAdjacentHTML(
        'afterbegin',
        `<img src=".${CHILD_STAND_IMAGE_PATH}" alt="child stand" />`,
      );
    } else if (gameState.growth === GROWTH[2]) {
      profileLeft.insertAdjacentHTML(
        'afterbegin',
        `<img src=".${ADULT_STAND_IMAGE_PATH}" alt="adult stand" />`,
      );
    }

    profileLeft.insertAdjacentHTML(
      'beforeend',
      `
        <h2>${gameState.profileName}</h2>
        <span><span class="${profileStyles.heart}">♥️</span> ${gameState.happiness}</span>
      `,
    );

    profileRight.insertAdjacentHTML(
      'beforeend',
      `
        <span>${gameState.profileDescription}</span>
      `,
    );
  }

  openUpdateModal() {
    this.#updateModal.classList.remove(`${profileStyles.hidden}`);
    this.#backdrop.classList.remove(`${profileStyles.hidden}`);
  }

  closeUpdateModal() {
    this.#updateModal.classList.add(`${profileStyles.hidden}`);
    this.#backdrop.classList.add(`${profileStyles.hidden}`);
  }
}

export default ProfileView;
