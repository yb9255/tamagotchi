import profileStyles from '../css/profile.css';
import { GROWTH } from '../constants/gameState.js';
import {
  CHILD_STAND_IMAGE_PATH,
  ADULT_STAND_IMAGE_PATH,
  EGG_IMAGE_PATH,
} from '../constants/imagePath.js';

class ProfileView {
  #updateModal = null;
  #backdrop = null;
  #profileCard = null;
  #hostInfo = null;
  #hostPetCard = null;
  #hostPetProfile = null;

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

  setProfileElements(profileCard) {
    this.#profileCard = profileCard;
    this.#hostInfo = this.#profileCard.querySelector(
      `.${profileStyles['host-info']}`,
    );
    this.#hostPetCard = this.#profileCard.querySelector(
      `.${profileStyles['host-pet-card']}`,
    );
    this.#hostPetProfile = this.#profileCard.querySelector(
      `.${profileStyles['host-pet-profile']}`,
    );
  }

  drawProfile(userState, gameState) {
    if (this.#hostInfo.children.length) {
      this.#hostInfo.innerHTML = '';
      this.#hostPetCard.querySelector('img').remove();
      this.#hostPetProfile.innerHTML = '';
    }

    if (gameState.growth === GROWTH[0]) {
      this.#hostPetCard.insertAdjacentHTML(
        'afterbegin',
        `<img src=".${EGG_IMAGE_PATH}" alt="egg stand" />`,
      );
    } else if (gameState.growth === GROWTH[1]) {
      this.#hostPetCard.insertAdjacentHTML(
        'afterbegin',
        `<img src=".${CHILD_STAND_IMAGE_PATH}" alt="child stand" />`,
      );
    } else if (gameState.growth === GROWTH[2]) {
      this.#hostPetCard.insertAdjacentHTML(
        'afterbegin',
        `<img src=".${ADULT_STAND_IMAGE_PATH}" alt="adult stand" />`,
      );
    }

    this.#hostInfo.insertAdjacentHTML(
      'afterbegin',
      `
        <img src="${userState.picture}" alt="profile" />
        <span>${userState.email.split('@')[0]}</span>
      `,
    );

    this.#hostPetProfile.insertAdjacentHTML(
      'afterbegin',
      `
        <span>Name: ${gameState.profileName}</span>
        <span>Description: ${gameState.profileDescription}</span>
        <span>Happiness: ${gameState.happiness}</span>
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
