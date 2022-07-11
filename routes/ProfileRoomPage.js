import Page from './Page.js';
import profileRoomStyles from '../css/profile-room.css';
import navbarStyles from '../css/navbar.css';

import {
  CHILD_STAND_IMAGE_PATH,
  LOGO_IMAGE_PATH,
} from '../constants/imagePath.js';

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
              <img src="https://lh3.googleusercontent.com/a/AItbvmktChZQniyEYfd_RWGfoHMtzKHvCUQLWmcGKftP=s96-c" alt="user profile picture" />
              <h1>${this.userId}</h1>
            </div>
            <div class="${profileRoomStyles['host-pet-card']}">
              <img src=".${CHILD_STAND_IMAGE_PATH}" alt="pet stand" />
              <div class="${profileRoomStyles['host-pet-profile']}">
                <span>Name: yoobin</span>
                <span>Description: hi</span>
                <span>Happiness: 20</span>
              </div>
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