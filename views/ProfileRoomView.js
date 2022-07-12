import profileRoomStyles from '../css/profile-room.css';
import { GROWTH } from '../constants/gameState.js';
import {
  EGG_IMAGE_PATH,
  CHILD_STAND_IMAGE_PATH,
  ADULT_STAND_IMAGE_PATH,
} from '../constants/imagePath.js';

class ProfileRoomView {
  #roomLeft = null;
  #hostInfo = null;
  #hostPetProfile = null;
  #hostPetCard = null;

  constructor() {}

  setProfileRoomElements(roomLeft) {
    this.#roomLeft = roomLeft;
    this.#hostInfo = this.#roomLeft.querySelector(
      `.${profileRoomStyles['host-info']}`,
    );
    this.#hostPetCard = this.#roomLeft.querySelector(
      `.${profileRoomStyles['host-pet-card']}`,
    );
    this.#hostPetProfile = this.#roomLeft.querySelector(
      `.${profileRoomStyles['host-pet-profile']}`,
    );
  }

  drawProfileRoom(profileImage, gameState) {
    console.log(gameState.growth);

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
      `<img src="${profileImage}" alt="profile" />`,
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
}

export default ProfileRoomView;
