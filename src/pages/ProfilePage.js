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
        <div class="${profileStyles.modal} ${profileStyles.hidden}">
          <form>
            <input class="${profileStyles['name-input']}" placeholder="Pet Name" maxlength="10"/>
            <textarea class="${profileStyles['description-text-area']}" placeholder="Description" maxlength="60"></textarea>
            <button>Submit New Profile!</button>
          </form>
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
            <h1>Tamagotchi Profile</h1>
            <button class="${profileStyles['edit-my-profile']}">Edit the Profile</button>
          </div>
          <div class="${profileStyles['profile-body']}">
            <div class="${profileStyles['profile-left']}">
            </div>
            <div class="${profileStyles['profile-right']}">
              <h2>Description</h2>
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis maxime quos quaerat quo minima atque blanditiis, ipsum tempore expedita illum adipisci sequi velit suscipit odio in excepturi repellat! Maxime, esse?</span>
            </div>
          </div>
          <div class="${profileStyles['profile-footer']}">
          </div>
        </div>
      </div>
    `;
  }
}

export default ProfilePage;
