import { patchProfile } from '../utils/api.js';
import profileStyles from '../css/profile.css';

class UserProfileController {
  async handleSetProfilePage(profileView, userState, gameState) {
    const {
      profileBody,
      profileHeading,
      updateModal,
      backdrop,
      updateModalBtn,
      nameInput,
      descriptionTextArea,
      xBtn,
    } = this.#handleSetProfilePageElementsInClasses();

    profileView.setProfileElements(profileHeading, profileBody);
    profileView.setModals(updateModal, backdrop);

    updateModalBtn.addEventListener('click', () => {
      profileView.openUpdateModal();
    });

    [xBtn, backdrop].forEach((element) =>
      element.addEventListener('click', () => {
        profileView.closeUpdateModal();
        nameInput.value = '';
        descriptionTextArea.value = '';
      }),
    );

    profileView.drawProfile(userState, gameState);

    updateModal
      .querySelector('form')
      .addEventListener('submit', async (event) => {
        event.preventDefault();

        if (
          nameInput.value.trim() === '' &&
          descriptionTextArea.value.trim() === ''
        ) {
          return;
        }

        await patchProfile({
          profileName: nameInput.value,
          profileDescription: descriptionTextArea.value,
        });

        gameState.setProfile(nameInput.value, descriptionTextArea.value);
        profileView.drawProfile(userState, gameState);
        profileView.closeUpdateModal();
        nameInput.value = '';
        descriptionTextArea.value = '';
      });
  }

  #handleSetProfilePageElementsInClasses() {
    const profileBody = document.querySelector(
      `.${profileStyles['profile-body']}`,
    );
    const profileHeading = document.querySelector(
      `.${profileStyles['profile-heading']}`,
    );

    const updateModal = document.querySelector(`.${profileStyles.modal}`);
    const backdrop = document.querySelector(`.${profileStyles.backdrop}`);

    const updateModalBtn = document.querySelector(
      `.${profileStyles['edit-my-profile']}`,
    );

    const nameInput = document.querySelector(`.${profileStyles['name-input']}`);

    const descriptionTextArea = document.querySelector(
      `.${profileStyles['description-text-area']}`,
    );

    const xBtn = document.querySelector(`.${profileStyles['x-btn']}`);

    return {
      profileBody,
      profileHeading,
      updateModal,
      backdrop,
      updateModalBtn,
      nameInput,
      descriptionTextArea,
      xBtn,
    };
  }

  async handlePatchProfileInfo(newProfile, gameState) {
    gameState.setProfile(...newProfile);
    await patchProfile(newProfile);
  }
}

export default UserProfileController;
