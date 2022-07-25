import navbarStyles from '../css/navbar.css';
import loginStyles from '../css/login.css';
import mainStyles from '../css/main.css';
import profileStyles from '../css/profile.css';

import { LOGO_IMAGE_PATH } from '../constants/imagePath';

export const loginMarkup = `
  <div class="${loginStyles.container}">
    <img src="${LOGO_IMAGE_PATH}" alt="logo" />
    <button class=${loginStyles['login-btn']}>Sign in with Google</button>
  </div>
`;

export const mainMarkup = `
  <div class="${mainStyles.container}">
    <nav>
      <img src="${LOGO_IMAGE_PATH}" alt="logo" />
      <div class="${navbarStyles['navbar-links']}">
        <a href="/" data-link>main</a>
        <a href="/profile" class="${navbarStyles.hidden}" data-link>profile</a>
        <a href="/" class="${navbarStyles.logout}" data-link>logout</a>
      </div>
    </nav>
    <div class="${mainStyles['help-modal-btn']} ${mainStyles.hidden}">Help</div> 
    <div class="${mainStyles['help-modal']}"></div>
    <div class="${mainStyles.backdrop}"></div>
    <div class="${mainStyles['tamagotchi-container']}">
      <canvas id="${mainStyles.frame}" width="900" height="900">Frame Canvas</canvas>
      <canvas id="${mainStyles.tablet}" width="400" height="400">Tablet Canvas</canvas>
      <div class="${mainStyles.btns}">
        <div class="${mainStyles['btn-container']}">
          <button class="${mainStyles.btn} ${mainStyles['btn--1']}"></button>
        </div>
        <div class="${mainStyles['btn-container']}">
          <button class="${mainStyles.btn} ${mainStyles['btn--2']}"></button>
        </div>
        <div class="${mainStyles['btn-container']}">
          <button class="${mainStyles.btn} ${mainStyles['btn--3']}"></button>
        </div>
      </div>
      <div class="${mainStyles.modal}"><span>파란색 버튼을 클릭해주세요!</span></div>
      <div class="${mainStyles.menu} ${mainStyles.hidden}">
        <div class="${mainStyles['menu-item']}">FEED</div>
        <div class="${mainStyles['menu-item']}">PLAY</div>
        <div class="${mainStyles['menu-item']}">STATE</div>
        <div class="${mainStyles['menu-item']}">SLEEP</div>
      </div>
      <img class="${mainStyles['mood-img']} ${mainStyles.hidden}" />
    </div>
  </div>
`;

export const profileMarkup = `
  <div class="${profileStyles.container}">
    <div class="${profileStyles.modal} ${profileStyles.hidden}" data-testid="modal">
      <form>
        <input class="${profileStyles['name-input']}" placeholder="Pet Name" maxlength="10"/>
        <textarea class="${profileStyles['description-text-area']}" placeholder="Description" maxlength="200"></textarea>
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
        <a href="/" class="${navbarStyles.logout}" data-link>logout</a>
      </div>
    </nav>
    <div class="${profileStyles['profile-container']}">
      <button class="${profileStyles['edit-my-profile']}">Edit the Profile</button>
      <div class="${profileStyles['profile-body']}">
        <div class="${profileStyles['profile-heading']}"></div>
        <div class="${profileStyles['profile-left']}"></div>
        <div class="${profileStyles['profile-right']}">
          <h2>Description</h2>
          <span></span>
        </div>
        <img src="${LOGO_IMAGE_PATH}" alt="logo" />
      </div>
    </div>
  </div>
`;
