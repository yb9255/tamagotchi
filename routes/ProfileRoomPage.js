import Page from './Page.js';

class ProfileRoomPage extends Page {
  constructor(params) {
    super(params);
    this.userId = params.userId;
    this.setTitle('Profile Room');
  }

  getHtml() {
    return `
      <h1>${this.userId}</h1>
    `;
  }
}

export default ProfileRoomPage;
