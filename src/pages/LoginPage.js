import Page from './Page.js';
import { loginMarkup } from '../constants/markups';

class LoginPage extends Page {
  constructor(params) {
    super(params);
    this.setTitle('Tamagotchi!');
  }

  getHtml() {
    return loginMarkup;
  }
}

export default LoginPage;
