import Page from './Page.js';
import styles from '../css/login.css';
import { LOGO_IMAGE_PATH } from '../constants/imagePath';

class LoginPage extends Page {
  constructor() {
    super();
    this.setTitle('Tamagotchi!');
  }

  getHtml() {
    return `
      <div class="${styles.container}">
        <div class="${styles['login-heading']}>
          <img src="${LOGO_IMAGE_PATH}" alt="logo" />
        </div>
      </div>
    `;
  }
}

export default LoginPage;
