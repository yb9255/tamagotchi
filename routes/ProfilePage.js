import Page from './Page.js';
import profileStyles from '../css/profile.css';
import navbarStyles from '../css/navbar.css';

import { LOGO_IMAGE_PATH } from '../constants/imagePath.js';

class ProfilePage extends Page {
  constructor(params) {
    super(params);
    this.setTitle('Profile');
  }

  getHtml() {
    return `
      <div class="${profileStyles.container}">
        <div class="${profileStyles.modal} ${profileStyles['update-modal']} ${profileStyles.hidden}">
          <form>
            <input class="${profileStyles['name-input']}" placeholder="Pet Name" minlength="5" maxlength="10"/>
            <input class="${profileStyles['description-input']}" placeholder="Description" />
            <button>Submit New Profile!</button>
          </form>
          <div class="${profileStyles['x-btn']}">&#10005;</div>
        </div>
        <div class="${profileStyles.modal} ${profileStyles['profile-modal']} ${profileStyles.hidden}">
          <div class="${profileStyles['profile-detail']}"></div>
          <div class="${profileStyles['x-btn']}">&#10005;</div>
        </div>
        <div class="${profileStyles.backdrop} ${profileStyles.hidden}"></div>
        <nav>
          <img src="${LOGO_IMAGE_PATH}" alt="logo" />
          <div class="${navbarStyles['navbar-links']}">
            <a href="/" data-link>main</a>
            <a href="/profile" data-link>profile</a>
            <a href="/login" class="${navbarStyles.logout}" data-link>logout</a>
          </div>
        </nav>
        <div class="${profileStyles['profile-container']}">
          <div class="${profileStyles['profile-heading']}">
            <h1>Show Your Tamagotchi!</h1>
            <div class="${profileStyles['heading-btn-container']}">
              <button class="${profileStyles['see-my-profile']}">See Tamagotchi's Profile</button>
              <button class="${profileStyles['edit-my-profile']}">Edit Tamagotchi's Profile</button>
              <button class="${profileStyles['make-profile-room']}">Show My Tamagotchi</button>
            </div>
          </div>
          <div class="profile-rooms"></div>
        </div>
      </div>
    `;
  }
}

export default ProfilePage;
