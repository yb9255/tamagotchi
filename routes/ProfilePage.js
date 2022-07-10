import Page from './Page.js';
import navbarStyles from '../css/navbar.css';

import { LOGO_IMAGE_PATH } from '../constants/imagePath.js';

class ProfilePage extends Page {
  constructor(params) {
    super(params);
    this.setTitle('Tamagotchi!');
  }

  getHtml() {
    return `
      <div></div>
        <nav>
          <img src="${LOGO_IMAGE_PATH}" alt="logo" />
          <div class="${navbarStyles['navbar-links']}">
            <a href="/" data-link>main</a>
            <a href="/profile" data-link>profile</a>
            <a href="/login" class="${navbarStyles.logout}" data-link>logout</a>
          </div>
        </nav>
        <h1>profile</h1>
    `;
  }
}

export default ProfilePage;
