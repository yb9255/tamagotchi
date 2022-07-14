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
  #profileFooter = null;

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

  setProfileElements(profileBody, profileFooter) {
    this.#profileBody = profileBody;
    this.#profileFooter = profileFooter;
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
      this.#profileFooter.innerHTML = '';
    }

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
        <span>Name: ${gameState.profileName}</span>
        <span>Happiness: ${gameState.happiness}</span>
      `,
    );

    profileRight.insertAdjacentHTML(
      'beforeend',
      `
        <span>${gameState.profileDescription}</span>
      `,
    );

    this.#profileFooter.insertAdjacentHTML(
      'beforeend',
      `
        <h4>Owner</h4>
        <div class="${profileStyles['user-profile']}">
          <img src=${userState.picture} alt="user profile" />
          <span>${userState.email.split('@')[0]}</span>
        </div>
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
