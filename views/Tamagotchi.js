import Animation from './Animation.js';

class Tamagotchi extends Animation {
  constructor() {
    super();
    this.context = document.querySelector('#tablet').getContext('2d');
    this.image;
  }

  drawTamagotchi() {
    this.image = new Image();
    const url = './image/lv1-idle.png';
    this.image.src = url;

    this.image.onload = async () => {
      await this.bounceUp();
      await this.bounceUp();
      await this.bounceUp();
    };
  }

  bounceUp() {
    let currentFrameX = 0;
    let frameCount = 2;
    let frameWidth = 300;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        frameWidth * currentFrameX,
        0,
        300,
        300,
        55,
        55,
        300,
        300,
      );
      currentFrameX++;
      if (currentFrameX > frameCount) {
        resolve(true);
      }
    });
  }
}

export default new Tamagotchi();
