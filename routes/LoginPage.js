import Page from './Page.js';
import styles from '../css/login.css';
import { LOGO_IMAGE_PATH } from '../constants/imagePath';

class LoginPage extends Page {
  constructor(params) {
    super(params);
    this.setTitle('Tamagotchi!');
  }

  getHtml() {
    return `
      <div class="${styles.container}">
        <img src="${LOGO_IMAGE_PATH}" alt="logo" />
        <button class=${styles['login-btn']}>Sign in with Google</button>
      </div>
    `;
  }
}

export default LoginPage;
