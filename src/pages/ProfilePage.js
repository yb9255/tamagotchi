import Page from './Page.js';

import { profileMarkup } from '../constants/markups.js';

class ProfilePage extends Page {
  constructor(params) {
    super(params);
    this.setTitle('Profile');
  }

  getHtml() {
    return profileMarkup;
  }
}

export default ProfilePage;
