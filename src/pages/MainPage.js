import Page from './Page.js';
import styles from '../css/main.css';
import navbarStyles from '../css/navbar.css';

import { LOGO_IMAGE_PATH } from '../constants/imagePath.js';

class MainPage extends Page {
  constructor(params) {
    super(params);
    this.setTitle('Tamagotchi!');
  }

  getHtml() {
    return `
      <div class="${styles.container}">
        <nav>
          <img src="${LOGO_IMAGE_PATH}" alt="logo" />
          <div class="${navbarStyles['navbar-links']}">
            <a href="/" data-link>main</a>
            <a href="/profile" data-link>profile</a>
            <a href="/" class="${navbarStyles.logout}" data-link>logout</a>
          </div>
        </nav>
        <div class="${styles['tamagotchi-container']}">
          <canvas id="${styles.frame}" width="900" height="900"></canvas>
          <canvas id="${styles.tablet}" width="400" height="400"></canvas>
          <div class="${styles.btns}">
            <button class="${styles.btn} ${styles['btn--1']}"></button>
            <button class="${styles.btn} ${styles['btn--2']}"></button>
            <button class="${styles.btn} ${styles['btn--3']}"></button>
          </div>
          <div class="${styles.modal}"><span>Press Any Button!</span></div>
          <div class="${styles.menu} ${styles.hidden}">
            <div class="${styles['menu-item']}">FEED</div>
            <div class="${styles['menu-item']}">PLAY</div>
            <div class="${styles['menu-item']}">STATE</div>
            <div class="${styles['menu-item']}">SLEEP</div>
          </div>
          <img class="${styles['mood-img']} ${styles.hidden}" />
        </div>
      </div>
    `;
  }
}

export default MainPage;
