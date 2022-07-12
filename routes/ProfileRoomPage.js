import Page from './Page.js';
import profileRoomStyles from '../css/profile-room.css';
import navbarStyles from '../css/navbar.css';

import { LOGO_IMAGE_PATH } from '../constants/imagePath.js';

class ProfileRoomPage extends Page {
  constructor(params) {
    super(params);
    this.userId = params.userId;
    this.setTitle('Profile Room');
  }

  getHtml() {
    return `
      <div class="${profileRoomStyles.container}">
        <nav>
          <img src=".${LOGO_IMAGE_PATH}" alt="logo" />
          <div class="${navbarStyles['navbar-links']}">
            <a href="/" data-link>main</a>
            <a href="/profile" data-link>profile</a>
            <a href="/login" class="${navbarStyles.logout}" data-link>logout</a>
          </div>
        </nav>
        <div class="${profileRoomStyles['room-container']}">
          <div class="${profileRoomStyles['room-left']}">
            <div class="${profileRoomStyles['host-info']}">
              <h1>${this.userId}</h1>
            </div>
            <div class="${profileRoomStyles['host-pet-card']}">
              <div class="${profileRoomStyles['host-pet-profile']}"></div>
            </div>
          </div>
          <div class="${profileRoomStyles['room-right']}">
            <h1>CHAT</h1>
            <div class="${profileRoomStyles['chat-log']}"></div>
            <form class="${profileRoomStyles['chat-box']}">
              <textarea class="${profileRoomStyles['chat-text-area']}"></textarea>
              <button class="${profileRoomStyles['chat-btn']}">Submit</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }
}

export default ProfileRoomPage;
