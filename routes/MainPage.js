import Page from './Page.js';

class MainPage extends Page {
  constructor(params) {
    super(params);
    this.setTitle('Tamagotchi!');
  }

  getHtml() {
    return `
      <a href="/login" data-link>login</a>
      <a href="/profile" data-link>profile</a>
      <div class="tamagotchi-container">
        <canvas id="frame" width="900" height="900"></canvas>
        <canvas id="tablet" width="400" height="400"></canvas>
        <div class="btns">
          <button class="btn btn--1"></button>
          <button class="btn btn--2"></button>
          <button class="btn btn--3"></button>
        </div>
        <div class="modal"><span>Press Any Button!</span></div>
        <div class="menu hidden">
          <div class="menu-item">FEED</div>
          <div class="menu-item">PLAY</div>
          <div class="menu-item">STATE</div>
          <div class="menu-item">SLEEP</div>
        </div>
      </div>
    `;
  }
}

export default MainPage;
