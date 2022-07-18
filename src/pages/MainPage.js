import Page from './Page.js';
import { mainMarkup } from '../constants/markups';

class MainPage extends Page {
  constructor(params) {
    super(params);
    this.setTitle('Tamagotchi!');
  }

  getHtml() {
    return mainMarkup;
  }
}

export default MainPage;
